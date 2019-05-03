import React, { Component } from 'react';

class QuizSelection extends Component {
    render() {
        return (
            <div>
                <br />
                <div className="container">

                    <h2 className="quiz-heading">Type Selection</h2><br />
                    <div className="col-md-12" >
                    
                        <div className="col-md-12" style={{display: "inline-block"}}>
                            <div className="col-md-6 selectquiz">
                                <button class="btn btn-success btn-lg selection square" type="submit" onClick={() => {
                                    this.props.history.push({
                                        pathname: "/createquiz"
                                    })
                                }}>Quiz</button>
                            </div>
                            <div className=" col-md-3 selectquiz">
                                <button class="btn btn-success btn-lg selection square" type="submit" onClick={() => {
                                    this.props.history.push({
                                        pathname: "/assignment"
                                    })
                                }}>Assignment</button>
                            </div>
                        </div>
                        
                    
                    </div>
                </div>
            </div>
        )
    }
}

export default QuizSelection;