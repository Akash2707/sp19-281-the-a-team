import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import {Page, Document, pdfjs} from "react-pdf";
 pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

class ShowSubmittedAssignments extends Component {
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            assignmentId: "",
            submissions: [],
            errorMessage: '',
            numPages: null,
            pageNumber: 1,
            fileFlag: false,
            fileURL: '',
            fileTime: ''
        }
        //Bind the handlers to this class

    }

    onDocumentLoadSuccess = ({ numPages }) => {
        this.setState({ numPages })
    }

    goToPrevPage = () => {
        if(this.state.numPages != 1){
            this.setState(state => ({ pageNumber: this.state.pageNumber - 1 }))
        }
    }

    goToNextPage = () => {
        if(this.state.numPages != 1){
            this.setState(state => ({ pageNumber: this.state.pageNumber + 1 }))
        }
    }

    viewAssignment = (e) => {
        this.setState({
            fileFlag: !this.state.fileFlag,
            fileURL: e.file,
            fileTime: e.time
        })
    }


    componentDidMount() {
      console.log(this.props.location.state)
      var assignmentID = ''
      try {

          this.setState({
              assignmentId: this.props.location.state.assignmentId,
          })
          assignmentID = this.props.location.state.assignmentId
          axios.get('http://52.33.173.178:3000/getsubmissions/' + assignmentID )
              .then(response => {
                  console.log("Status Code : ", response);
                  if (response.status === 200) {
                      this.setState({
                          submissions: response.data,
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

      } catch (e) {
          this.setState({
              assignmentId: ""
          })
      }
        //make a post request with the user data

    }


    render() {
        let submissions = null
        if(this.state.submissions != null){
            submissions = this.state.submissions.map(submission => {
              let fileDisplay = null
                          if(submission.time == this.state.fileTime && this.state.fileFlag == true){
                              fileDisplay = (
                                  <div>
                                      <div style={{width: 600}}>
                                          <Document
                                              file = {this.state.fileURL}
                                              onLoadSuccess = {this.onDocumentLoadSuccess}
                                          >
                                              <Page pageNumber={this.state.pageNumber} width={600} />
                                          </Document>
                                      </div>
                                      <nav>
                                          <button class="prev-button" onClick={this.goToPrevPage}> Prev </button>
                                          <button class="prev-button" onClick={this.goToNextPage}> Next </button>
                                      </nav>
                                      <p class= "pagenumber-display">
                                          Page {this.state.pageNumber} of {this.state.numPages}
                                      </p>
                                  </div>
                              )
                          }else{
                              fileDisplay = null
                          }
                return (
                  <div>
                    <tr>
                        <td>{submission.username}</td>
                        <td>{submission.time}</td>
                        <td><button className="btn btn-dark" onClick={() => { this.viewAssignment(submission) }}>View Submission</button></td>
                    </tr>
                    <tr>
                      {fileDisplay}
                    </tr>
                    </div>
                )
            })
        }

        return (
            <div>
                <br />
                <div className="container">

                    <h2 className="quiz-heading">Assignments</h2>
                    <table class="table">
                        <thead class="thead-dark">
                            <tr>
                                <th scope="col">UserName</th>
                                <th scope="col">Time</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {submissions}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default ShowSubmittedAssignments;
