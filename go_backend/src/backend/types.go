/*
	Gumball API in Go (Version 2)
	Uses MongoDB and RabbitMQ
*/

package main

type login struct {
	Username string
	Password string
}

type signup struct {
	Name     string
	Username string
	Password string
}

type gumballMachine struct {
	ID            int
	CountGumballs int
	ModelNumber   string
	SerialNumber  string
}

type order struct {
	ID          string
	OrderStatus string
}

var orders map[string]order
