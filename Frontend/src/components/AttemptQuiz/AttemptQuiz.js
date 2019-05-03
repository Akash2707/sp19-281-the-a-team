import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';


class AttemptQuiz extends Component{

    constructor(props) {
        super(props);
        this.state = {
            errorMessage: '',
            ans1:'',
            ans2:'',
            ans3:'',
            ans4:'',
            ans5:'',
            submitFlag: false,
            question1:'',
            question2:'',
            question3:'',
            question4:'',
            question5:'',
            quizID:'',
            quizName:'',

        }
        this.ans1Handler = this.ans1Handler.bind(this);
        this.ans2Handler = this.ans2Handler.bind(this);
        this.ans3Handler = this.ans3Handler.bind(this);
        this.ans4Handler = this.ans4Handler.bind(this);
        this.ans5Handler = this.ans5Handler.bind(this);
        this.submitQuiz = this.submitQuiz.bind(this);
    }

    ans1Handler = (e) => {
        this.setState({
            ans1: e.target.value
        })
    }

    ans2Handler = (e) => {
        this.setState({
            ans2: e.target.value
        })
    }

    ans3Handler = (e) => {
        this.setState({
            ans3: e.target.value
        })
    }

    ans4Handler = (e) => {
        this.setState({
            ans4: e.target.value
        })
    }

    ans5Handler = (e) => {
        this.setState({
            ans5: e.target.value
        })
    }

    componentDidMount() {
        console.log(this.props.location.state)
        try {

            this.setState({
                assignmentId: this.props.location.state.quiz.quizID,
                assignmentName: this.props.location.state.quiz.quizName,
                question1: this.props.location.state.quiz.question1,
                question2: this.props.location.state.quiz.question2,
                question3: this.props.location.state.quiz.question3,
                question4: this.props.location.state.quiz.question4,
                question5: this.props.location.state.quiz.question5,
                quizID: this.props.location.state.quiz.quizID,
                quizName: this.props.location.state.quiz.quizName,
                
                
            })


        } catch (e) {
            this.setState({
                quizID: ""
            })
        }

    }

    submitQuiz= (e) => {
        var headers = new Headers();
        var tempDate = new Date();
        var date = tempDate.getFullYear() + '-' + (tempDate.getMonth()+1) + '-' + tempDate.getDate() +' '+ tempDate.getHours()+':'+ tempDate.getMinutes()+':'+ tempDate.getSeconds();
        e.preventDefault();
        const data = {
            answer1: this.state.ans1,
            answer2: this.state.ans2,
            answer3: this.state.ans3,
            answer4: this.state.ans4,
            answer5: this.state.ans5,
            quizID:  this.state.quizID,
            quizName:this.state.quizName,
            time:    date,
            username: localStorage.getItem('username')
        }

        axios.post('http://localhost:3000/postanswer', data)
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    this.setState({
                        submitFlag: true
                    })
                } else {
                    this.setState({
                        submitFlag: false
                    })
                }
            })
            .catch(error => {
                this.setState({
                    submitFlag: false,
                    errormsg: 'Could not submit quiz'
                })
            });
    }


    render(){

        let redirectVar = null;
        if (this.state.submitFlag == true) {
            redirectVar = <Redirect to="/scoreboard" />
        }
        return(
            <div>
                <br/>
                {redirectVar}
                <div className="container">

                <h2 className="quiz-heading">Quiz-Name</h2>
                <div className ="col-md-8">
                    <form>
                       <div className="col-md-12 form-group">
                            <div className="col-md-8 question" >
                                    {this.state.question1}
                            </div>
                            <div className="col-md-12 answer">
                                    <input  onChange={this.ans1Handler} type="text" class="form-control" name="ans1" placeholder="Answer"/>
                            </div>
                        </div> 
                        <div className="col-md-12 form-group">
                            <div className="col-md-12 question" >
                                {this.state.question2}
                            </div>
                            <div className="col-md-12 answer">
                                    <input  onChange={this.ans2Handler} type="text" class="form-control" name="ans2" placeholder="Answer"/>
                            </div>
                        </div>
                        <div className="col-md-12 form-group">
                            <div className="col-md-8 question" >
                                {this.state.question3}
                            </div>
                            <div className="col-md-12 answer">
                                    <input  onChange={this.ans3Handler} type="text" class="form-control" name="ans3" placeholder="Answer"/>
                            </div>
                        </div>
                        <div className="col-md-12 form-group">
                            <div className="col-md-12 question" >
                                {this.state.question4}
                            </div>
                            <div className="col-md-12 answer">
                                    <input onChange={this.ans4Handler} type="text" class="form-control" name="ans4" placeholder="Answer"/>
                            </div>
                        </div>
                        <div className="col-md-12 form-group">
                            <div className="col-md-12 question" >
                                {this.state.question5}
                            </div>
                            <div className="col-md-12 answer">
                                    <input onChange={this.ans5Handler} type="text" class="form-control" name="ans5" placeholder="Answer"/>
                            </div>
                        </div>  

                        <div className="col-md-12 form-group">
                            <div className="submitquiz">
                                <button class="btn btn-success btn-lg" type="submit" onClick={this.submitQuiz}>Submit</button>
                            </div> 
                        </div> 
                   </form>
                   </div>
                    
                </div>
            </div>
        )
    }
}

export default AttemptQuiz;