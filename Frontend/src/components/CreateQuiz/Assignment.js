import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';


class Assignment extends Component {

    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            assignmentTitle: "",
            que1: "",
            que2: "",
            que3: "",
            message: "",
            flag: ""

        }
        //Bind the handlers to this class
        this.handleChange = this.handleChange.bind(this);
        this.quizCreateHandler = this.quizCreateHandler.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    quizCreateHandler = (e) => {
        //prevent page from refresh
        e.preventDefault();
        const data = {
            AssignmentName: this.state.assignmentTitle,
            Question1: this.state.que1,
            Question2: this.state.que2,
            Question3: this.state.que3,
        }
        //set the with credentials to true
        // axios.defaults.withCredentials = true;
        let headers = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        //make a post request with the user data
        axios.post('http://a40766acc6e0b11e9926d06aa54c672c-474657251.us-west-2.elb.amazonaws.com/assignment', data, headers)
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    this.setState({
                        message: "Assignment was created Successfully",
                        flag: true
                    })
                }
            })
            .catch(error => {
                this.setState({
                    authFlag: false,
                    message: "Fail to create assignment"
                })
            });

    }

    render() {

        let redirectVar = null;
        if (this.state.flag == true)
            redirectVar = <Redirect to="/displayquizes" />

        return (
            <div style={{ textAlign: "center" }}>
                {redirectVar}
                <br />
                <div className="container">

                    <h2 className="quiz-heading" style={{margin:"10px 0px 25px 0px"}}>Assignment</h2>
                    <div style={{ width: "70%", "margin": "0 auto" }}>
                        <form onSubmit={this.quizCreateHandler}>
                            <div style={{ width: "60%", "margin": "0 auto" }}>
                                <div className="form-group">
                                    <div className="title">
                                        <input type="text" class="form-control" onChange={this.handleChange} required name={"assignmentTitle"} placeholder="Enter Assignment Title" />
                                    </div>
                                </div><br />
                                <div>
                                    <div className="form-group">
                                        <div className="question">
                                            <textarea type="text" class="form-control" onChange={this.handleChange} required name={"que1"} placeholder="Enter Question 1 here" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="question">
                                            <textarea type="text" class="form-control" onChange={this.handleChange} required name={"que2"} placeholder="Enter Question 2 here" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="question">
                                            <textarea type="text" class="form-control" onChange={this.handleChange} required name={"que3"} placeholder="Enter Question 3 here" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="submitquiz">
                                            <button class="btn btn-success btn-lg" type="submit">Submit</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {this.state.message}
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Assignment;
