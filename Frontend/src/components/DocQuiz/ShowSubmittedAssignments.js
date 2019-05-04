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
          axios.get('https://7vtdp12dgc.execute-api.us-west-2.amazonaws.com/quizzbox/assignment/getsubmissions/' + assignmentID )
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
                  <div className="col-md-11">
                      <div className="col-md-5 boxrow">
                          <span>{submission.username}</span>
                      </div>
                      <div className="col-md-3 boxrow">
                          <span>{submission.time}</span>
                      </div>
                      <div className="col-md-3 boxrow">
                          <button className="btn btn-dark" onClick={() => { this.viewAssignment(submission) }}>View Submission</button>
                      </div>
                  </div>
                  <div className="col=md=12">
                      {fileDisplay}
                  </div>
                </div>
                )
            })
        }

        return (

                <div className="container">

                    <h2 className="quiz-heading">Assignments</h2>
                    <div className="col-md-12">
                      <div className="col-md-11 blackbox">
                        <div className="col-md-5">
                          <span>User-Name</span>
                        </div>
                        <div className="col-md-3">
                         <span>Date</span>
                       </div>
                       <div className="col-md-3">
                         <span>View</span>
                      </div>
                      </div>
                      {submissions}

                </div>
                </div>

        )
    }
}

export default ShowSubmittedAssignments;
