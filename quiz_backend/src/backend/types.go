/*
	Gumball API in Go (Version 2)
	Uses MongoDB and RabbitMQ 
*/
	
package main

// type gumballMachine struct {
// 	Id             	int 	
// 	CountGumballs   int    	
// 	ModelNumber 	string	    
// 	SerialNumber 	string	
// }

// type order struct {
// 	Id             	string 	
// 	OrderStatus 	string	
// }

type quizlist struct {
	QuizID         string `json:"quizID" bson:"quizID"`
	QuizName 	   string `json:"quizName" bson:"quizName"`
	Question1      string `json:"question1" bson:"question1"`
	Question2      string `json:"question2" bson:"question2"`
	Question3      string `json:"question3" bson:"question3"`
	Question4      string `json:"question4" bson:"question4"`
	Question5      string `json:"question5" bson:"question5"`
}

type answerlist struct {
	Answer1        string `json:"answer1" bson:"answer1"`
	Answer2        string `json:"answer2" bson:"answer2"`
	Answer3        string `json:"answer3" bson:"answer3"`
	Answer4        string `json:"answer4" bson:"answer4"`
	Answer5        string `json:"answer5" bson:"answer5"`
}

type quizscore struct {
	QuizID         string `json:"quizID" bson:"quizID"`
	QuizName 	   string `json:"quizName" bson:"quizName"`
	UserName 	   string `json:"username" bson:"username"`
	Time 	   	   string `json:"time" bson:"time"`
	Answer1        string `json:"answer1" bson:"answer1"`
	Answer2        string `json:"answer2" bson:"answer2"`
	Answer3        string `json:"answer3" bson:"answer3"`
	Answer4        string `json:"answer4" bson:"answer4"`
	Answer5        string `json:"answer5" bson:"answer5"`
	Score          int `json:"score" bson:"score"`
}
// var orders map[string] order

type scoreboard struct {
	QuizID         string `json:"quizID" bson:"quizID"`
	QuizName 	   string `json:"quizName" bson:"quizName"`
	Time 	   	   string `json:"time" bson:"time"`
	Score          int `json:"score" bson:"score"`
}

type adminscore struct {
	UserName         string `json:"username" bson:"username"`
	Time 	   	   string `json:"time" bson:"time"`
	Score          int `json:"score" bson:"score"`
}