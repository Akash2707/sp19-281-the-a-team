import React, { Component } from 'react';

class CreateQuizzAtt extends Component {
    render() {
        return (
            <div style={{ textAlign: "center" }}>
                <br />
                <div className="container">

                    <h2 className="quiz-heading">Quiz Creation with Attachments</h2>
                    <div style={{ width: "70%", "margin": "0 auto" }}>
                        <form>
                            <div style={{ width: "60%", "margin": "0 auto" }}>
                                <div className="form-group">
                                    <div className="title">
                                        <input type="text" class="form-control" name="quizTitle" placeholder="Enter Quiz Title" />
                                    </div>
                                </div><br />
                                <div>
                                    <div className="form-group">
                                        <div className="question">
                                            <textarea type="text" class="form-control" name="que1" placeholder="Enter Question 1 here" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="question">
                                            <textarea type="text" class="form-control" name="que2" placeholder="Enter Question 2 here" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="question">
                                            <textarea type="text" class="form-control" name="que3" placeholder="Enter Question 3 here" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="submitquiz">
                                            <button class="btn btn-success btn-lg" type="submit">Submit</button>
                                        </div>
                                    </div>
                            </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default CreateQuizzAtt;