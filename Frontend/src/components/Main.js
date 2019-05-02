import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Login from './Login/Login';
import Home from './Home/Home';
import DocQuiz from './DocQuiz/DocQuiz';
import CreateQuiz from './CreateQuiz/CreateQuiz';
import AttemptQuiz from './AttemptQuiz/AttemptQuiz';
import QuizList from './QuizList/QuizList';
import Navigation from './Navigation/Navigation';
import UserScoreBoard from './UserScoreBoard/UserScoreBoard';
import AdminScoreBoard from './AdminScoreBoard/AdminScoreBoard';

//Create a Main Component
class Main extends Component {
    render(){
        return(
            <div>
                {/*Render Different Component based on Route*/}
                <Route path="/" component={Login}/>
                <Route path="/attemptquiz" component={AttemptQuiz}/>
                <Route path="/quizlist" component={QuizList}/>
                <Route path="/" component={Navigation}/>
                <Route path="/scoreboard" component={UserScoreBoard}/>
                <Route path="/listscore" component={AdminScoreBoard}/>
               
            </div>
        )
    }
}
//Export The Main Component
export default Main;