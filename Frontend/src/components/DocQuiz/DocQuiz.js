import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';

class DocQuiz extends Component {
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            pdf: "",
            pdfMessage: "",
            question1: "",
            question2: "",
            question3: "",
            assignmentId: "",
            assignmentName: "",
            submitted: false
        }
        //Bind the handlers to this class
        this.fileAdded = this.fileAdded.bind(this);
        this.uploadPDF = this.uploadPDF.bind(this);
    }

    componentDidMount() {
        console.log(this.props.location.state)
        try {

            this.setState({
                assignmentId: this.props.location.state.assignment.assignmentId,
                assignmentName: this.props.location.state.assignment.assignmentName,
                question1: this.props.location.state.assignment.question1,
                question2: this.props.location.state.assignment.question2,
                question3: this.props.location.state.assignment.question3,
            })


        } catch (e) {
            this.setState({
                assignmentID: ""
            })
        }

    }

    fileAdded = (e) => {
        var image = e.target.files[0]
        var reader = new FileReader();
        var url = reader.readAsDataURL(e.target.files[0]);

        reader.onloadend = function (e) {
            this.setState({
                pdf: image
            })
        }.bind(this);


    }

    uploadPDF = (e) => {
        e.preventDefault();
        const formData = new FormData();
        var tempDate = new Date();
        var date = tempDate.getFullYear() + '-' + (tempDate.getMonth()+1) + '-' + tempDate.getDate() +' '+ tempDate.getHours()+':'+ tempDate.getMinutes()+':'+ tempDate.getSeconds();
        formData.append('pdf', this.state.pdf);
        formData.append('assignmentId', this.state.assignmentId);
        formData.append('username', localStorage.getItem('username'));
        formData.append('time', date);

        axios.post("http://35.192.223.198:3000/submitassignment", formData)
            .then((response) => {
                console.log("Status Code : ", response);
                this.setState({
                  submitted: true
                })
            }).catch((error) => {
                console.log(error.response.data);
                this.setState({
                    pdfMessage: error.response.data
                })
            });
    }

    render() {
        if(this.state.submitted == true){
            return (<Redirect to="/getassignments"/>)
        }
        return (
            <div>
                <br />
                <div className="container">

                    <h2 className="quiz-heading">{this.state.assignmentName}</h2>
                    <form>
                        <div className="col-md-8 form-group">
                            <div className="col-md-12 question" >
                                <br />
                                Question-1
                            </div>
                            <div className="col-md-4 answer">
                            {this.state.question1}
                            </div>
                        </div>
                        <div className="col-md-8 form-group">
                            <div className="col-md-12 question" >
                                <br />
                                Question-2
                            </div>
                            <div className="col-md-4 answer">
                            {this.state.question2}
                            </div>
                        </div>
                        <div className="col-md-8 form-group">
                            <div className="col-md-12 question" >
                                <br />
                                Question-3
                            </div>
                            <div className="col-md-4 answer">
                            {this.state.question3}
                            </div>

                        </div>
                        <div className="col-md-8 form-group">
                            <br />
                            <input type="file" className="" name="pdf" onChange={this.fileAdded} accept="pdf/*" style={{ marginLeft: '20px' }} />

                        </div>


                        <div className="col-md-8 form-group">
                            <div className="submitquiz">
                                <button class="btn btn-success btn-lg" type="button" onClick={this.uploadPDF}>Upload</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default DocQuiz;
