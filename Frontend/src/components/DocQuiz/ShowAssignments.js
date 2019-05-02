import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';

class ShowAssignments extends Component {
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            assignments: [],
            errorMessage: '',
        }
        //Bind the handlers to this class
        this.submitAssignment = this.submitAssignment.bind(this);
    }

    submitAssignment(assignment) {

            let detailPage = null
            detailPage = this.props.history.push({
                pathname: "/submitassignment",
                state: {
                    assignment: assignment
                }
            })

    }

    componentDidMount() {
        //make a post request with the user data
        axios.get('http://52.33.173.178:3000/getassignments')
            .then(response => {
                console.log("Status Code : ", response);
                if (response.status === 200) {
                    this.setState({
                        assignments: response.data,
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


    render() {
        let assignments = this.state.assignments.map(assignment => {

            return (
                <tr>
                    <td>{assignment.assignmentName}</td>
                    <td><button className="btn btn-dark" onClick={() => { this.submitAssignment(assignment) }}>Submit Assignment</button></td>
                </tr>
            )
        })

        return (
            <div>
                <br />
                <div className="container">

                    <h2 className="quiz-heading">Assignments</h2>
                    <table class="table">
                        <thead class="thead-dark">
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {assignments}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default ShowAssignments;
