import React, {Component} from 'react';

class CreateQuizz extends Component{
    render(){
        return(
            <div>
                <br/>
                <div className="container">

                <h2 className="quiz-heading">One word Quiz Creation</h2>
                    <form>
                    	<div className="col-md-8 form-group">
                            <div className="col-md-8 title">
                                    <input  type="text" class="form-control" name="quizTitle" placeholder="Enter Quiz Title"/>
                            </div>
                        </div><br/>
                       <div className="col-md-8 form-group">
                             <div className="col-md-8 question">
                                   <textarea  type="text" class="form-control" name="que1" placeholder="Enter Question 1 here"/>
                            </div>
                            <div className="col-md-8 answer">
                                    <input  type="text" class="form-control" name="ans1" placeholder="Enter Answer 1 here"/>
                            </div>
                        </div> 
                        <div className="col-md-8 form-group">
                            <div className="col-md-8 answer">
                                    <textarea  type="text" class="form-control" name="que2" placeholder="Enter Question 2 here"/>
                            </div>
                            <div className="col-md-8 answer">
                                    <input  type="text" class="form-control" name="ans2" placeholder="Enter Answer 2 here"/>
                            </div>
                        </div>
                        <div className="col-md-8 form-group">
                             <div className="col-md-8 answer">
                                    <textarea  type="text" class="form-control" name="que3" placeholder="Enter Question 3 here"/>
                            </div>
                            <div className="col-md-8 answer">
                                    <input  type="text" class="form-control" name="ans3" placeholder="Enter Answer 3 here"/>
                            </div>
                        </div>
                        <div className="col-md-8 form-group">
                             <div className="col-md-8 answer">
                                    <textarea  type="text" class="form-control" name="que4" placeholder="Enter Question 4 here"/>
                            </div>
                            <div className="col-md-8 answer">
                                    <input  type="text" class="form-control" name="ans4" placeholder="Enter Answer 4 here"/>
                            </div>
                        </div>
                        <div className="col-md-8 form-group">
                            <div className="col-md-8 answer">
                                    <textarea  type="text" class="form-control" name="que5" placeholder="Enter Question 5 here"/>
                            </div>
                            <div className="col-md-8 answer">
                                    <input  type="text" class="form-control" name="ans5" placeholder="Enter Answer 5 here"/>
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

export default CreateQuizz;