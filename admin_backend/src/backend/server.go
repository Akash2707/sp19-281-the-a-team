/*
	Gumball API in Go (Version 2)
	Uses MongoDB and RabbitMQ
*/

package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/codegangsta/negroni"
	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	uuid "github.com/satori/go.uuid"
	"github.com/unrolled/render"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

// MongoDB Config
// to create new collection: connect using mongo shell:
// mongo ds145356.mlab.com:45356/quizzbox -u admin -p admin123
var mongodb_server = "52.37.128.85:27017"
var mongodb_database = "quizzbox"
var mongodb_collection = "oneWordQuiz"
var mongodb_collection_1 = "assignment"
var mongodb_username = "admin"
var mongodb_password = "admin123"

// NewServer configures and returns a Server.
func NewServer() *negroni.Negroni {
	formatter := render.New(render.Options{
		IndentJSON: true,
	})
	n := negroni.Classic()
	mx := mux.NewRouter()
	initRoutes(mx, formatter)
	allowedHeaders := handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization"})
	allowedMethods := handlers.AllowedMethods([]string{"GET", "POST", "PUT", "HEAD", "DELETE", "OPTIONS"})
	allowedOrigins := handlers.AllowedOrigins([]string{"*"})

	n.UseHandler(handlers.CORS(allowedHeaders, allowedMethods, allowedOrigins)(mx))
	return n
}

// API Routes
func initRoutes(mx *mux.Router, formatter *render.Render) {
	mx.HandleFunc("/ping", pingHandler(formatter)).Methods("GET")
	mx.HandleFunc("/createquiz", oneWordQuizHandler(formatter)).Methods("POST")
	mx.HandleFunc("/assignment", assignmentHandler(formatter)).Methods("POST")
	mx.HandleFunc("/getonewordquiz", getOneWordQuizHandler(formatter)).Methods("GET")
	mx.HandleFunc("/getassignment", getAssignmentHandler(formatter)).Methods("GET")
}

// Helper Functions
func failOnError(err error, msg string) {
	if err != nil {
		log.Fatalf("%s: %s", msg, err)
		panic(fmt.Sprintf("%s: %s", msg, err))
	}
}

// API Ping Handler
func pingHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		formatter.JSON(w, http.StatusOK, struct{ Test string }{"API version 1.0 alive!"})
	}
}

func oneWordQuizHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {

		var info oneWordQuiz
		_ = json.NewDecoder(req.Body).Decode(&info)

		fmt.Println("One Word", info.QuizName)
		uuid, _ := uuid.NewV4()
		info.QuizID = uuid.String()
		// Open MongoDB Session
		//session, err := mgo.Dial(mongodb_server)
		session, err := mgo.Dial(mongodb_server)
		if err != nil {
			panic(err)
		}
		err = session.DB(mongodb_database).Login(mongodb_username, mongodb_password)
		if err != nil {
			message := struct{ Message string }{"Some error occured while login to database!!"}
			formatter.JSON(w, http.StatusInternalServerError, message)
			return
		}
		defer session.Close()
		session.SetMode(mgo.Monotonic, true)
		c := session.DB(mongodb_database).C(mongodb_collection)
		fmt.Println(info)
		t := bson.M{"quizID": info.QuizID, "quizName": info.QuizName, "question1": info.Question1, "answer1": info.Answer1, "question2": info.Question2, "answer2": info.Answer2,
			"question3": info.Question3, "answer3": info.Answer3, "question4": info.Question4, "answer4": info.Answer4, "question5": info.Question5, "answer5": info.Answer5}

		fmt.Println("OK")
		err = c.Insert(t)
		if err != nil {
			log.Fatal(err)
		}
		formatter.JSON(w, http.StatusOK, struct{ Status string }{"Success"})

	}
}

func assignmentHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {

		var data assignmentQuiz
		_ = json.NewDecoder(req.Body).Decode(&data)

		fmt.Println("Assignment", data.AssignmentName)
		uuid, _ := uuid.NewV4()
		data.AssignmentID = uuid.String()
		// Open MongoDB Session
		//session, err := mgo.Dial(mongodb_server)
		session, err := mgo.Dial(mongodb_server)
		if err != nil {
			panic(err)
		}
		err = session.DB(mongodb_database).Login(mongodb_username, mongodb_password)
		if err != nil {
			message := struct{ Message string }{"Some error occured while login to database!!"}
			formatter.JSON(w, http.StatusInternalServerError, message)
			return
		}
		defer session.Close()
		session.SetMode(mgo.Monotonic, true)
		c := session.DB(mongodb_database).C(mongodb_collection_1)
		fmt.Println(data)
		t := bson.M{"assignmentId": data.AssignmentID, "assignmentName": data.AssignmentName, "question1": data.Question1, "question2": data.Question2, "question3": data.Question3}
		fmt.Println("OK")
		err = c.Insert(t)
		if err != nil {
			log.Fatal(err)
		}
		formatter.JSON(w, http.StatusOK, struct{ Status string }{"Success"})

	}
}

func getOneWordQuizHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {

		// Open MongoDB Session
		//session, err := mgo.Dial(mongodb_server)
		session, err := mgo.Dial(mongodb_server)
		if err != nil {
			panic(err)
		}
		err = session.DB(mongodb_database).Login(mongodb_username, mongodb_password)
		if err != nil {
			message := struct{ Message string }{"Some error occured while login to database!!"}
			formatter.JSON(w, http.StatusInternalServerError, message)
			return
		}
		defer session.Close()
		session.SetMode(mgo.Monotonic, true)
		c := session.DB(mongodb_database).C(mongodb_collection)
		t := bson.M{}
		fmt.Println("OK")
		var quizResult []bson.M
		err = c.Find(t).All(&quizResult)
		if err != nil {
			message := struct{ Message string }{"No one word quiz was found!!"}
			w.WriteHeader(http.StatusNotFound)
			json.NewEncoder(w).Encode(message)
			return
		}
		formatter.JSON(w, http.StatusOK, quizResult)

	}
}

func getAssignmentHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {

		// Open MongoDB Session
		//session, err := mgo.Dial(mongodb_server)
		session, err := mgo.Dial(mongodb_server)
		if err != nil {
			panic(err)
		}
		err = session.DB(mongodb_database).Login(mongodb_username, mongodb_password)
		if err != nil {
			message := struct{ Message string }{"Some error occured while login to database!!"}
			formatter.JSON(w, http.StatusInternalServerError, message)
			return
		}
		defer session.Close()
		session.SetMode(mgo.Monotonic, true)
		c := session.DB(mongodb_database).C(mongodb_collection_1)
		t := bson.M{}
		fmt.Println("OK")
		var assigResult []bson.M
		err = c.Find(t).All(&assigResult)
		if err != nil {
			message := struct{ Message string }{"No assignments were found!!"}
			w.WriteHeader(http.StatusNotFound)
			json.NewEncoder(w).Encode(message)
			return
		}
		formatter.JSON(w, http.StatusOK, assigResult)

	}
}
