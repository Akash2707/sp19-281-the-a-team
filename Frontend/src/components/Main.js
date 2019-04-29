import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import Login from './Login/Login';
import SignUp from "./Signup/Signup"
import Home from './Home/Home';
import DocQuiz from './DocQuiz/DocQuiz';
import CreateQuiz from './CreateQuiz/CreateQuiz';
import AttemptQuiz from './AttemptQuiz/AttemptQuiz';

//Create a Main Component
class Main extends Component {
    render(){
        return(
            <div>
                {/*Render Different Component based on Route*/}
                <Switch>
                    <Route path="/" exact component={Login}/>
                    <Route path="/signup" component={SignUp}/>
                    <Route path="/attemptquiz" component={AttemptQuiz}/>
                </Switch>
            </div>
        )
    }
}
//Export The Main Component
export default Main;