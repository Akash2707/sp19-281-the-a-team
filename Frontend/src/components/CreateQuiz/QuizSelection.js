import React, { Component } from 'react';

class QuizSelection extends Component {
    render() {
        return (
            <div>
                <br />
                <div className="container">

                    <h2 className="quiz-heading">Select the type of the quiz you wish to create :</h2><br />

                    <form>
                        <div className="col-md-12 form-group">
                            <div className="selectquiz">
                                <button class="btn btn-success btn-lg selection" type="submit" onClick={() => {
                                    this.props.history.push({
                                        pathname: "/createquiz"
                                    })
                                }}>One Word Quiz</button>
                            </div>
                        </div><br />
                        <div className="col-md-12 form-group">
                            <div className="selectquiz">
                                <button class="btn btn-success btn-lg selection" type="submit" onClick={() => {
                                    this.props.history.push({
                                        pathname: "/assignment"
                                    })
                                }}>Assignment</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default QuizSelection;