/*
	Gumball API in Go (Version 2)
	Uses MongoDB and RabbitMQ
*/

package main

type oneWordQuiz struct {
	QuizID    string
	QuizName  string
	Question1 string
	Answer1   string
	Question2 string
	Answer2   string
	Question3 string
	Answer3   string
	Question4 string
	Answer4   string
	Question5 string
	Answer5   string
}

type assignmentQuiz struct {
	AssignmentID   string
	AssignmentName string
	Question1      string
	Question2      string
	Question3      string
}
