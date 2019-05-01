package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/codegangsta/negroni"
	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"github.com/unrolled/render"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

// MongoDB Config
// to create new collection: connect using mongo shell:
// mongo ds145356.mlab.com:45356/quizzbox -u admin -p admin123
// var mongodb_server = "mongodb://admin:admin123@ds145356.mlab.com:45356/quizzbox"
// var mongodb_database = "quizzbox"
// var mongodb_collection = "quizzbox"

var mongodbServer = "localhost:27017"
var mongodbDatabase = "quizbox"
var mongodbCollection = "quizbox"

// NewServer configures and returns a Server.
// func NewServer() *negroni.Negroni {
// 	formatter := render.New(render.Options{
// 		IndentJSON: true,
// 	})
// 	n := negroni.Classic()
// 	mx := mux.NewRouter()
// 	initRoutes(mx, formatter)
// 	n.UseHandler(mx)
// 	return n
// }

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
	mx.HandleFunc("/login", loginHandler(formatter)).Methods("POST")
	mx.HandleFunc("/signup", signupHandler(formatter)).Methods("POST")

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

func loginHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		var info login
		_ = json.NewDecoder(req.Body).Decode(&info)
		fmt.Println("Got: ", info.Username, info.Password)
		var server mgo.DialInfo
		server.Addrs = append(server.Addrs, mongodbServer)
		fmt.Println(server.Addrs)
		server.Timeout = 10000000000
		server.Username = "admin"
		server.Password = "123"
		//server.Database = mongodb_database
		//server.Source = "admin"
		//server.Direct = true
		session, err := mgo.DialWithInfo(&server)
		//session, err := mgo.Dial(mongodb_server)

		if err != nil {
			panic(err)
		}
		defer session.Close()
		session.SetMode(mgo.Monotonic, true)
		c := session.DB(mongodbDatabase).C(mongodbCollection)

		//query := bson.M{"UserName": info.UserName}
		//change := bson.M{"$set": bson.M{"CountGumballs": m.CountGumballs}}
		//err = c.Update(query, change)
		//var result bson.M
		var n int
		n, err = c.Find(bson.M{"Username": info.Username, "Password": info.Password}).Count()
		if err != nil {
			log.Fatal(err)
		}

		if n == 0 {
			fmt.Println("Not correct")
			formatter.JSON(w, http.StatusNotFound, n)
		} else {
			fmt.Println("OK")
			formatter.JSON(w, http.StatusOK, n)
		}
	}
}

func signupHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		var info signup
		_ = json.NewDecoder(req.Body).Decode(&info)
		fmt.Println("Got: ", info.Name, info.Username, info.Password)
		var server mgo.DialInfo
		server.Addrs = append(server.Addrs, mongodbServer)
		fmt.Println(server.Addrs)
		server.Timeout = 10000000000
		server.Username = "admin"
		server.Password = "123"
		//server.Database = mongodb_database
		//server.Source = "admin"
		//server.Direct = true
		session, err := mgo.DialWithInfo(&server)
		//mgo.Dial(mongodb_server)
		if err != nil {
			panic(err)
		}
		defer session.Close()
		session.SetMode(mgo.Monotonic, true)
		c := session.DB(mongodbDatabase).C(mongodbCollection)

		//query := bson.M{"UserName": info.UserName}
		//change := bson.M{"$set": bson.M{"CountGumballs": m.CountGumballs}}
		//err = c.Update(query, change)
		//var result bson.M
		var n int

		n, err = c.Find(bson.M{"Username": info.Username}).Count()
		if err != nil {
			log.Fatal(err)
		}

		t := bson.M{"Name": info.Name, "Username": info.Username, "Password": info.Password}

		if n != 0 {
			fmt.Println("Not correct")
			formatter.JSON(w, http.StatusBadRequest, n)
		} else {
			fmt.Println("OK")
			err = c.Insert(t)
			if err != nil {
				log.Fatal(err)
			}
			formatter.JSON(w, http.StatusOK, n)
		}
	}
}

// // API Gumball Machine Handler
// func gumballHandler(formatter *render.Render) http.HandlerFunc {
// 	return func(w http.ResponseWriter, req *http.Request) {
// 		session, err := mgo.Dial(mongodb_server)
// 		if err != nil {
// 			panic(err)
// 		}
// 		defer session.Close()
// 		session.SetMode(mgo.Monotonic, true)
// 		c := session.DB(mongodb_database).C(mongodb_collection)
// 		var result bson.M
// 		err = c.Find(bson.M{"SerialNumber": "1234998871109"}).One(&result)
// 		if err != nil {
// 			log.Fatal(err)
// 		}
// 		fmt.Println("Gumball Machine:", result)
// 		formatter.JSON(w, http.StatusOK, result)
// 	}
// }

// // API Update Gumball Inventory
// func gumballUpdateHandler(formatter *render.Render) http.HandlerFunc {
// 	return func(w http.ResponseWriter, req *http.Request) {
// 		var m gumballMachine
// 		_ = json.NewDecoder(req.Body).Decode(&m)
// 		fmt.Println("Update Gumball Inventory To: ", m.CountGumballs)
// 		session, err := mgo.Dial(mongodb_server)
// 		if err != nil {
// 			panic(err)
// 		}
// 		defer session.Close()
// 		session.SetMode(mgo.Monotonic, true)
// 		c := session.DB(mongodb_database).C(mongodb_collection)
// 		query := bson.M{"SerialNumber": "1234998871109"}
// 		change := bson.M{"$set": bson.M{"CountGumballs": m.CountGumballs}}
// 		err = c.Update(query, change)
// 		if err != nil {
// 			log.Fatal(err)
// 		}
// 		var result bson.M
// 		err = c.Find(bson.M{"SerialNumber": "1234998871109"}).One(&result)
// 		if err != nil {
// 			log.Fatal(err)
// 		}
// 		fmt.Println("Gumball Machine:", result)
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
