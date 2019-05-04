import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';

class AdminScoreBoard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            scores: [],
            errorMessage: '',
            quizId: ''
        }

    }

    componentDidMount() {
        var quizId = ''
        try {
            this.setState({
                quizId: this.props.location.state.quizId,
            })
            quizId = this.props.location.state.quizId
            //make a post request with the user data
            axios.get('http://40.85.147.13:3000/viewscore/' + quizId)
                .then(response => {
                    console.log("Status Code : ", response);
                    if (response.status === 200) {
                        this.setState({
                            scores: response.data
                        })
                        console.log(this.state.scores)
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

        } catch (e) {
            this.setState({
                quizId: ""
            })
        }

    }

    render() {

        let scorelist = null
        if(this.state.scores != null){
        scorelist = this.state.scores.map(score => {

            return (

                <div className="col-md-12">
                    <hr />
                    <div className="col-md-5">
                        <h2>{score.username}</h2>
                    </div>
                    <div className="col-md-3">
                        <h2>{score.score}</h2>
                    </div>
                    <div className="col-md-4">
                        <h2>{score.time}</h2>
                    </div>
                </div>

            )
        })
    }

        return (
            <div className="container">
                <br />
                <div>
                    <h2 className="quiz-heading">Score Board</h2>

                    <div className="col-md-10">

                        <div className="col-md-12" style={{ marginTop: "20px" }}>
                            <div className="col-md-5">
                                <h3 className="scoreboard">User Name</h3>
                            </div>
                            <div className="col-md-3">
                                <h3 className="scoreboard"> Score</h3>
                            </div>
                            <div className="col-md-4">
                                <h3 className="scoreboard">Time</h3>
                            </div>
                        </div>

                        {scorelist}

                    </div>


                </div>
            </div>
        )
    }
}

export default AdminScoreBoard;
