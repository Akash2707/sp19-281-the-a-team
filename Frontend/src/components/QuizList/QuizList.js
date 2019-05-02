import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';

class QuizList extends Component{

    constructor(props) {
        super(props);
        this.state = {
            quizlist: [],
            errorMessage: ''
        }

        this.selectQuiz = this.selectQuiz.bind(this);
    }

    componentDidMount() {
        //make a post request with the user data
        axios.get('http://localhost:3000/quizlist')
            .then(response => {
                console.log("Status Code : ", response);
                if (response.status === 200) {
                    this.setState({
                        quizlist: response.data,
                    })
                } else {
                    this.setState({
                        onSuccess: false,
                        errorMessage: "error in server"
                    })
                }
            })
            .catch(error => {
                console.log(error);
                this.setState({
                    onSuccess: false,
                    errorMessage: "Internal server error"
                })
            });
    }


    selectQuiz(quiz) {
        
        let quizPage = null
        quizPage = this.props.history.push({
            pathname: "/attemptquiz",
            state: {
                quiz: quiz
            }
        })
    
}

render() {
    let quizs = this.state.quizlist.map(quiz => {

        return (
            <div className="col-md-8">
                 <button className="col-md-6 btn btn-outline-secondary btn-lg selectquiz" type="submit" onClick={() => { this.selectQuiz(quiz) }} style={{color:"#000000", fontSize:"20px", fontWeight:"bold"}}>  {quiz.quizName} </button>
            </div>
        )
    })

        return(
            <div className="container"> 
                <br/>
                <div>
                    <h2 className="quiz-heading">Select Quiz</h2>

                    {quizs}
                     
                </div>
            </div>
        )
    }
}

export default QuizList;