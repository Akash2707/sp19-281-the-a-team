/*
	Gumball API in Go (Version 2)
	Uses MongoDB and RabbitMQ 
*/

package main

import (
	"fmt"
	"log"
	"net/http"
	"encoding/json"
	"github.com/codegangsta/negroni"
	"github.com/gorilla/mux"
	"github.com/gorilla/handlers"
	"github.com/unrolled/render"
	"gopkg.in/mgo.v2"
    "gopkg.in/mgo.v2/bson"
)

// MongoDB Config
// to create new collection: connect using mongo shell: 
// mongo ds145356.mlab.com:45356/quizzbox -u admin -p admin123
var mongodb_server = "localhost:27017"
var mongodb_database = "quizzbox"
var mongodb_collection = "oneWordQuiz"
var mongodb_collection_1 = "quizAnswers"

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

	// mx.HandleFunc("/ping", pingHandler(formatter)).Methods("GET")
	// mx.HandleFunc("/gumball", gumballHandler(formatter)).Methods("GET")
	// mx.HandleFunc("/gumball", gumballUpdateHandler(formatter)).Methods("PUT")
	mx.HandleFunc("/quizlist", getQuizHandler(formatter)).Methods("GET")
	mx.HandleFunc("/postanswer", postAnswerHandler(formatter)).Methods("POST")
	mx.HandleFunc("/scoreboard/{userName}", scoreBoardHandler(formatter)).Methods("GET")
	mx.HandleFunc("/viewscore/{quizID}", adminScoreHandler(formatter)).Methods("GET")

}

// Helper Functions
func failOnError(err error, msg string) {
	if err != nil {
		log.Fatalf("%s: %s", msg, err)
		panic(fmt.Sprintf("%s: %s", msg, err))
	}
}

func getQuizHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {

		fmt.Println("Inside get quiz function")
		session, err := mgo.Dial(mongodb_server)
		if err != nil {
			panic(err)
		}
		defer session.Close()
		session.SetMode(mgo.Monotonic, true)

		c := session.DB(mongodb_database).C(mongodb_collection)

		var quiz_array []quizlist
		err = c.Find(nil).Select(bson.M{"quizID": 1, "quizName":1, "question1":1, "question2":1, "question3":1,"question4":1,"question5":1}).All(&quiz_array)
		fmt.Println("QuizList", quiz_array)
		formatter.JSON(w, http.StatusOK, quiz_array)
	}
}

func postAnswerHandler(formatter *render.Render) http.HandlerFunc {
    return func(w http.ResponseWriter, req *http.Request) {

        var info quizscore
        _ = json.NewDecoder(req.Body).Decode(&info)

       fmt.Println("Post Answer", info.QuizName)
        // uuid, _ := uuid.NewV4()
        // info.QuizID = uuid.String()
        // Open MongoDB Session
        //session, err := mgo.Dial(mongodb_server)
        session, err := mgo.Dial(mongodb_server)
        if err != nil {
            panic(err)
        }
        defer session.Close()
        session.SetMode(mgo.Monotonic, true)
		c := session.DB(mongodb_database).C(mongodb_collection_1)
		cc := session.DB(mongodb_database).C(mongodb_collection)
		fmt.Println(info)
		
		var ans answerlist
		err = cc.Find(bson.M{"quizID": info.QuizID}).Select(bson.M{"answer1":1, "answer2":1,"answer3":1,"answer4":1, "answer5":1}).One(&ans)
		fmt.Println("QuizAnswers", ans)
		
		score:=0

		if(ans.Answer1  == info.Answer1){
			score += 1
		}
		if(ans.Answer2  == info.Answer2){
			score += 1
		}
		if(ans.Answer3  == info.Answer3){
			score += 1
		}
		if(ans.Answer4  == info.Answer4){
			score += 1
		}
		if(ans.Answer5  == info.Answer5){
			score += 1
		}

		

        t := bson.M{"quizID": info.QuizID, "quizName": info.QuizName, "username": info.UserName, "answer1": info.Answer1, "answer2": info.Answer2, "answer3": info.Answer3, "answer4": info.Answer4,
             "answer5": info.Answer5, "score": score, "time": info.Time}

        fmt.Println("OK")
        err = c.Insert(t)
        if err != nil {
            log.Fatal(err)
        }
        formatter.JSON(w, http.StatusOK, struct{ Status string }{"Success"})

    }
}

func scoreBoardHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		params := mux.Vars(req)
		var userName string = params["userName"]
		fmt.Println("Inside scoreboard function")
		fmt.Println(userName)
		session, err := mgo.Dial(mongodb_server)
		if err != nil {
			panic(err)
		}
		defer session.Close()
		session.SetMode(mgo.Monotonic, true)

		c := session.DB(mongodb_database).C(mongodb_collection_1)

		var report []scoreboard
		err = c.Find(bson.M{"username": userName}).Select(bson.M{"quizID": 1, "quizName": 1, "score": 1, "time": 1}).All(&report)
		fmt.Println("ScoreBoard", report)
		formatter.JSON(w, http.StatusOK, report)
	}
}


func adminScoreHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		params := mux.Vars(req)
		var quizID string = params["quizID"]
		fmt.Println("Inside scoreboard function")
		fmt.Println(quizID)
		session, err := mgo.Dial(mongodb_server)
		if err != nil {
			panic(err)
		}
		defer session.Close()
		session.SetMode(mgo.Monotonic, true)

		c := session.DB(mongodb_database).C(mongodb_collection_1)

		var report_admin []adminscore
		err = c.Find(bson.M{"quizID": quizID}).Select(bson.M{ "username": 1, "score": 1, "time": 1}).All(&report_admin)
		fmt.Println("ScoreBoard", report_admin)
		formatter.JSON(w, http.StatusOK, report_admin)
	}
}



// API Ping Handler
// func pingHandler(formatter *render.Render) http.HandlerFunc {
// 	return func(w http.ResponseWriter, req *http.Request) {
// 		formatter.JSON(w, http.StatusOK, struct{ Test string }{"API version 1.0 alive!"})
// 	}
// }

// API Gumball Machine Handler
// func gumballHandler(formatter *render.Render) http.HandlerFunc {
// 	return func(w http.ResponseWriter, req *http.Request) {
// 		session, err := mgo.Dial(mongodb_server)
//         if err != nil {
//                 panic(err)
//         }
//         defer session.Close()
//         session.SetMode(mgo.Monotonic, true)
//         c := session.DB(mongodb_database).C(mongodb_collection)
//         var result bson.M
//         err = c.Find(bson.M{"SerialNumber" : "1234998871109"}).One(&result)
//         if err != nil {
//                 log.Fatal(err)
//         }
//         fmt.Println("Gumball Machine:", result )
// 		formatter.JSON(w, http.StatusOK, result)
// 	}
// }

// API Update Gumball Inventory
// func gumballUpdateHandler(formatter *render.Render) http.HandlerFunc {
// 	return func(w http.ResponseWriter, req *http.Request) {
//     	var m gumballMachine
//     	_ = json.NewDecoder(req.Body).Decode(&m)		
//     	fmt.Println("Update Gumball Inventory To: ", m.CountGumballs)
// 		session, err := mgo.Dial(mongodb_server)
//         if err != nil {
//                 panic(err)
//         }
//         defer session.Close()
//         session.SetMode(mgo.Monotonic, true)
//         c := session.DB(mongodb_database).C(mongodb_collection)
//         query := bson.M{"SerialNumber" : "1234998871109"}
//         change := bson.M{"$set": bson.M{ "CountGumballs" : m.CountGumballs}}
//         err = c.Update(query, change)
//         if err != nil {
//                 log.Fatal(err)
//         }
//        	var result bson.M
//         err = c.Find(bson.M{"SerialNumber" : "1234998871109"}).One(&result)
//         if err != nil {
//                 log.Fatal(err)
//         }        
//         fmt.Println("Gumball Machine:", result )
// 		formatter.JSON(w, http.StatusOK, result)
// 	}
// }






/*

	-- RabbitMQ Setup
	-- Default User/Pass: guest/guest

	http://localhost:8080

	-- RabbitMQ Create Queue:  

		Queue Name: gumball
		Durable:	no

	-- Gumball MongoDB Create Database

		Database Name: cmpe281
		Collection Name: gumball

  	-- Gumball MongoDB Collection (Create Document) --

	use cmpe281
	show dbs
	
    db.gumball.insert(
	    { 
	      Id: 1,
	      CountGumballs: NumberInt(202),
	      ModelNumber: 'M102988',
	      SerialNumber: '1234998871109' 
	    }
	) ;

    -- Gumball MongoDB Collection - Find Gumball Document --

    db.gumball.find( { Id: 1 } ) ;

    {
        "_id" : ObjectId("54741c01fa0bd1f1cdf71312"),
        "Id" : 1,
        "CountGumballs" : 202,
        "ModelNumber" : "M102988",
        "SerialNumber" : "1234998871109"
    }

    -- Gumball MongoDB Collection - Update Gumball Document --

    db.gumball.update( 
        { Id: 1 }, 
        { $set : { CountGumballs : NumberInt(10) } },
        { multi : false } 
    )

    -- Gumball Delete Documents

    db.gumball.remove({})

 */
