/*
	Gumball API in Go (Version 2)
	Uses MongoDB and RabbitMQ
*/

package main

type gumballMachine struct {
	Id            int
	CountGumballs int
	ModelNumber   string
	SerialNumber  string
}

type order struct {
	Id          string
	OrderStatus string
}

var orders map[string]order

type assignment struct {
	AssignmentID   string `json:"assignmentId" bson:"assignmentId"`
	AssignmentName string `json:"assignmentName" bson:"assignmentName"`
	Question1      string `json:"question1" bson:"question1"`
	Question2      string `json:"question2" bson:"question2"`
	Question3      string `json:"question3" bson:"question3"`
}

type submission struct {
	AssignmentID  string `json:"assignmentId" bson:"assignmentId"`
	UserName 			string `json:"username" bson:"username"`
	File      		string `json:"file" bson:"file"`
	Time      		string `json:"time" bson:"time"`
}
