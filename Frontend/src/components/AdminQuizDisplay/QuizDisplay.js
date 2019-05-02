import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';

class QuizDisplay extends Component {

    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            quizData: [],
            assignmentData: [],
            message: "",
            flag: "",

        }
        //Bind the handlers to this class

    }

    componentDidMount() {
        // console.log("sdate" + this.props.location.state.sdate)

        // axios.defaults.withCredentials = true;

        axios.get("http://34.210.207.21:3000/getonewordquiz")
            .then(response => {
                if (response.status == 200) {
                    console.log("status" + response.status)
                    this.setState({
                        quizData: response.data,
                    })
                } else {
                    this.setState({
                    })
                }
            })
            .catch(error => {
                this.setState({
                    message: "Error in receiving data"
                })
            });

        axios.get("http://34.210.207.21:3000/getassignment")
            .then(response => {
                if (response.status == 200) {
                    console.log("status" + response.status)
                    this.setState({
                        assignmentData: response.data
                    })
                } else {
                    this.setState({
                    })
                }
            })
            .catch(error => {
                this.setState({
                    message: "Error in receiving data"
                })
            });
    }

    render() {


        let quizDetails = null
        if (this.state.quizData != null) {
            quizDetails = this.state.quizData.map(quiz => {
                try {
                    console.log("head" + quiz.quizName)
                    var name = quiz.quizName
                } catch (e) { }
                return (
                    <tbody>
                        <tr>
                            <td>{name}</td>
                            <td><button className="btn btn-dark" onClick={() => {
                                this.props.history.push({
                                    pathname: "/getscores",
                                    state: {
                                        quizId: quiz.quizID
                                    }

                                })
                            }}
                            >View Scores</button ></td>
                        </tr>
                    </tbody>
                )
            })
        }

        let assignmentDetails = null
        if (this.state.assignmentData != null) {
            assignmentDetails = this.state.assignmentData.map(assignment => {
                try {
                    console.log("head" + assignment.assignmentName)
                    var name = assignment.assignmentName
                } catch (e) { }
                return (
                    <tbody>
                        <tr>
                            <td>{name}</td>
                            <td><button className="btn btn-dark" onClick={() => {
                                this.props.history.push({
                                    pathname: "/getsubmissions",
                                    state: {
                                        assignmentId: assignment.assignmentId
                                    }

                                })
                            }}>View Submissions</button></td>
                        </tr>
                    </tbody>
                )
            })
        }

        return (
            <div style={{ textAlign: "center" }}>

                <br />
                <div className="container">
                    <h2 className="quiz-heading">Quizzes and Assignments Created </h2><br /><br />
                    <div className="col-md-6" >
                        <h4 className="quiz-heading" style={{ fontSize: "20px" }}>One word Quizzes</h4>
                        <table class="table">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">Quiz Name</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            {quizDetails}
                        </table>
                    </div>
                    <div className="col-md-6" >
                        <h4 className="quiz-heading" style={{ fontSize: "20px" }}> Assignments </h4>
                        <table class="table">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">Assignment Name</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            {assignmentDetails}
                        </table>
                    </div>

                </div>
            </div>
        )
    }
}

export default QuizDisplay;