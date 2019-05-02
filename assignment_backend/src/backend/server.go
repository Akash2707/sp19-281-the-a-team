/*
	Gumball API in Go (Version 2)
	Uses MongoDB and RabbitMQ
*/

package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/codegangsta/negroni"
	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"github.com/unrolled/render"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/lithammer/shortuuid"
)

import "github.com/aws/aws-sdk-go/service/s3/s3manager"

// MongoDB Config
// to create new collection: connect using mongo shell:
// mongo ds145356.mlab.com:45356/quizzbox -u admin -p admin123
var mongodb_server = "52.35.140.144:27017"
var mongodb_server_1 = "52.37.128.85:27017"
var mongodb_database = "quizzbox"
var mongodb_collection = "assignment"
var mongodb_collection1 = "submissions"
var mongodb_username = "admin"
var mongodb_password = "admin123"

//var mongodb_collection1 = "submissions"

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
	mx.HandleFunc("/getassignments", getAssignmentsHandler(formatter)).Methods("GET")
	mx.HandleFunc("/submitassignment", postAssignmentHandler(formatter)).Methods("POST")
	mx.HandleFunc("/getsubmissions/{assignmentId}", getSubmissionsHandler(formatter)).Methods("GET")
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

func getAssignmentsHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {

		fmt.Println("Inside get assignemts function")

		// // Open MongoDB Session
		// //session, err := mgo.Dial(mongodb_server)
		// var server mgo.DialInfo
		// server.Addrs = append(server.Addrs, mongodb_server)
		// fmt.Println(server.Addrs)

		// // server.Username = "admin"
		// // server.Password = "admin123"
		// //server.Database = mongodb_database
		// //server.Source = "admin"
		// //server.Direct = true
		// session, err := mgo.DialWithInfo(&server)
		// if err != nil {
		// 	panic(err)
		// }
		// defer session.Close()
		// session.SetMode(mgo.Monotonic, true)
		session, err := mgo.Dial(mongodb_server_1)
		if err != nil {
			panic(err)
		}
		err = session.DB(mongodb_database).Login(mongodb_username, mongodb_password)
		if err != nil {
			message := struct {Message string}{"Some error occured while login to database!!"}
			formatter.JSON(w, http.StatusInternalServerError, message)
			return
		}
		defer session.Close()
		session.SetMode(mgo.Monotonic, true)

		c := session.DB(mongodb_database).C(mongodb_collection)

		var assignments_array []assignment
		err = c.Find(bson.M{}).All(&assignments_array)
		fmt.Println("Assignments", assignments_array)
		formatter.JSON(w, http.StatusOK, assignments_array)
	}
}

func postAssignmentHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {

		req.ParseMultipartForm(32 << 20)
  	file, handler, err := req.FormFile("pdf")
    if err != nil {
    	fmt.Println(err)
      return
    }
    defer file.Close()
    fmt.Println(w, "%v", handler.Header)

		sess := session.Must(session.NewSession(&aws.Config{Region: aws.String("us-west-2")}))

		// Create an uploader with the session and default options
		uploader := s3manager.NewUploader(sess)

		// Upload the file to S3.
		result, err := uploader.Upload(&s3manager.UploadInput{
		    Bucket: aws.String("quizzboxassignments"),
		    Key:    aws.String(shortuuid.New() + handler.Filename),
		    Body:   file,
		})
		if err != nil {
				fmt.Println(err)
		    return
		}

		fmt.Println("file uploaded to, %s\n", result.Location)
		fmt.Println(req.PostFormValue("username"))
		fmt.Println(req.PostFormValue("assignmentId"))

		session, err := mgo.Dial(mongodb_server)
		if err != nil {
			panic(err)
		}
		err = session.DB(mongodb_database).Login(mongodb_username, mongodb_password)
		if err != nil {
			message := struct {Message string}{"Some error occured while login to database!!"}
			formatter.JSON(w, http.StatusInternalServerError, message)
			return
		}
		defer session.Close()
		session.SetMode(mgo.Monotonic, true)

		c := session.DB(mongodb_database).C(mongodb_collection1)

		t := bson.M{"assignmentId": req.PostFormValue("assignmentId"), "username": req.PostFormValue("username"), "file": result.Location, "time": req.PostFormValue("time")}

		fmt.Println("OK")
		err = c.Insert(t)
		if err != nil {
			formatter.JSON(w, http.StatusInternalServerError, struct{ Status string }{"Error in server"})
		}
		formatter.JSON(w, http.StatusOK, struct{ Status string }{"Success"})

	}
}


func getSubmissionsHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		fmt.Println("Inside get submissions function")
		params := mux.Vars(req)
		var assignmentId string = params["assignmentId"]
		fmt.Println("Assignment ID: ", assignmentId)


		session, err := mgo.Dial(mongodb_server)
		if err != nil {
			panic(err)
		}
		err = session.DB(mongodb_database).Login(mongodb_username, mongodb_password)
		if err != nil {
			message := struct {Message string}{"Some error occured while login to database!!"}
			formatter.JSON(w, http.StatusInternalServerError, message)
			return
		}
		defer session.Close()
		session.SetMode(mgo.Monotonic, true)

		c := session.DB(mongodb_database).C(mongodb_collection1)

		var submissions_array []submission
		err = c.Find(bson.M{"assignmentId": assignmentId}).All(&submissions_array)
		if err != nil {
				formatter.JSON(w, http.StatusInternalServerError, struct{status string}{"Error in get"})
		}
		fmt.Println("submissions", submissions_array)
		formatter.JSON(w, http.StatusOK, submissions_array)
	}
}
