import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Login from './Login/Login';
import Home from './Home/Home';
import DocQuiz from './DocQuiz/DocQuiz';
import CreateQuiz from './CreateQuiz/CreateQuiz';
import AttemptQuiz from './AttemptQuiz/AttemptQuiz';
import QuizSelection from './CreateQuiz/QuizSelection';
import CreateQuizAtt from './CreateQuiz/CreateQuizAtt';

//Create a Main Component
class Main extends Component {
    render(){
        return(
            <div>
                {/*Render Different Component based on Route*/}
                <Route path="/" component={Login}/>
                <Route path="/attemptquiz" component={AttemptQuiz}/>
                <Route path="/createquiz" component={CreateQuiz}/>
               	<Route path="/selectquiz" component={QuizSelection}/>
                <Route path="/createquizatt" component={CreateQuizAtt}/>
            </div>
        )
    }
}
//Export The Main Component
export default Main;