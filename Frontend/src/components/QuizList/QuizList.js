import React, {Component} from 'react';

class QuizList extends Component{
    render(){
        return(
            <div>
                <br/>
                <div class="container">
                    <h2 className="quiz-heading">Select Quiz</h2>

                    <div className="col-md-8">
                        <button class="col-md-6 btn btn-outline-primary btn-lg selectquiz" type="submit">Quiz-1</button>
                    </div>
                    
                     
                </div>
            </div>
        )
    }
}

export default QuizList;