import React, {Component} from 'react';

class AttemptQuiz extends Component{
    render(){
        return(
            <div>
                <br/>
                <div className="container">

                <h2 className="quiz-heading">Quiz-Name</h2>
                    <form>
                       <div className="col-md-8 form-group">
                            <div className="col-md-8 question" >
                                    Question-1
                            </div>
                            <div className="col-md-8 answer">
                                    <input  type="text" class="form-control" name="ans1" placeholder="Answer"/>
                            </div>
                        </div> 
                        <div className="col-md-8 form-group">
                            <div className="col-md-8 question" >
                                    Question-2
                            </div>
                            <div className="col-md-8 answer">
                                    <input  type="text" class="form-control" name="ans2" placeholder="Answer"/>
                            </div>
                        </div>
                        <div className="col-md-8 form-group">
                            <div className="col-md-8 question" >
                                    Question-3
                            </div>
                            <div className="col-md-8 answer">
                                    <input  type="text" class="form-control" name="ans3" placeholder="Answer"/>
                            </div>
                        </div>
                        <div className="col-md-8 form-group">
                            <div className="col-md-8 question" >
                                    Question-4
                            </div>
                            <div className="col-md-8 answer">
                                    <input  type="text" class="form-control" name="ans4" placeholder="Answer"/>
                            </div>
                        </div>
                        <div className="col-md-8 form-group">
                            <div className="col-md-8 question" >
                                    Question-5
                            </div>
                            <div className="col-md-8 answer">
                                    <input  type="text" class="form-control" name="ans5" placeholder="Answer"/>
                            </div>
                        </div>  

                        <div className="col-md-8 form-group">
                            <div className="submitquiz">
                                <button class="btn btn-success btn-lg" type="submit">Submit</button>
                            </div> 
                        </div> 
                   </form>
                </div>
            </div>
        )
    }
}

export default AttemptQuiz;