import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';

class CreateQuizz extends Component {

    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            quizTitle: "",
            que1: "",
            que2: "",
            que3: "",
            que4: "",
            que5: "",
            ans1: "",
            ans2: "",
            ans3: "",
            ans4: "",
            ans5: "",
            message: "",
            flag : ""
            
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
            QuizName: this.state.quizTitle,
            Question1: this.state.que1,
            Question2: this.state.que2,
            Question3: this.state.que3,
            Question4: this.state.que4,
            Question5: this.state.que5,
            Answer1: this.state.ans1,
            Answer2: this.state.ans2,
            Answer3: this.state.ans3,
            Answer4: this.state.ans4,
            Answer5: this.state.ans5
        }
        console.log("12345")
        //set the with credentials to true
        // axios.defaults.withCredentials = true;
        let headers = {
            headers:{
                "Content-Type": "application/json"
            }
        }
        //make a post request with the user data
        axios.post('http://34.210.207.21:3000/createquiz', data, headers )
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    this.setState({
                        message: "Quiz was created Successfully",
                        flag:true
                    })
                }
            })
            .catch(error => {
                this.setState({
                    authFlag: false,
                    message: "Fail to create quiz"
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

                    <h2 className="quiz-heading">One word Quiz Creation</h2>
                    <div style={{ width: "70%", "margin": "0 auto" }}>
                        <form onSubmit={this.quizCreateHandler}>
                            <div className="form-group">
                                <div className="title">
                                    <input type="text" class="form-control" onChange={this.handleChange} required name={"quizTitle"} placeholder="Enter Quiz Title" />
                                </div>
                            </div><br />
                            <div className="form-group">
                                <div className="question">
                                    <textarea type="text" class="form-control" onChange={this.handleChange} required name={"que1"} placeholder="Enter Question 1 here" />
                                </div>
                                <div className="answer">
                                    <input type="text" class="form-control" onChange={this.handleChange} required name={"ans1"} placeholder="Enter Answer 1 here" />
                                </div>
                            </div><br />
                            <div className=" form-group">
                                <div className="question">
                                    <textarea type="text" class="form-control" onChange={this.handleChange} required  name={"que2"} placeholder="Enter Question 2 here" />
                                </div>
                                <div className="answer">
                                    <input type="text" class="form-control" onChange={this.handleChange} required name={"ans2"} placeholder="Enter Answer 2 here" />
                                </div>
                            </div><br />
                            <div className="form-group">
                                <div className="question">
                                    <textarea type="text" class="form-control" onChange={this.handleChange} required name={"que3"} placeholder="Enter Question 3 here" />
                                </div>
                                <div className="answer">
                                    <input type="text" class="form-control" onChange={this.handleChange} required name={"ans3"} placeholder="Enter Answer 3 here" />
                                </div>
                            </div><br />
                            <div className="form-group">
                                <div className="question">
                                    <textarea type="text" class="form-control" onChange={this.handleChange} required name={"que4"} placeholder="Enter Question 4 here" />
                                </div>
                                <div className="answer">
                                    <input type="text" class="form-control" onChange={this.handleChange} required name={"ans4"} placeholder="Enter Answer 4 here" />
                                </div>
                            </div><br />
                            <div className="form-group">
                                <div className="question">
                                    <textarea type="text" class="form-control" onChange={this.handleChange} required name={"que5"} placeholder="Enter Question 5 here" />
                                </div>
                                <div className="answer">
                                    <input type="text" class="form-control" onChange={this.handleChange} required name={"ans5"} placeholder="Enter Answer 5 here" />
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="submitquiz">
                                    <button class="btn btn-success btn-lg" type="submit">Create</button>
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

export default CreateQuizz;