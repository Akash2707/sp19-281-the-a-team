import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Login from './Login/Login';
import Home from './Home/Home';
import DocQuiz from './DocQuiz/DocQuiz';
import ShowAssignments from './DocQuiz/ShowAssignments';
import ShowSubmittedAssignments from './DocQuiz/ShowSubmittedAssignments';
import CreateQuiz from './CreateQuiz/CreateQuiz';
import AttemptQuiz from './AttemptQuiz/AttemptQuiz';

//Create a Main Component
class Main extends Component {
    render(){
        return(
            <div>
                {/*Render Different Component based on Route*/}
                <Route path="/" component={Login}/>
                <Route path="/attemptquiz" component={AttemptQuiz}/>
                <Route path="/submitassignment" component={DocQuiz}/>
                <Route path="/getassignments" component={ShowAssignments}/>
                <Route path="/getsubmissions" component={ShowSubmittedAssignments}/>
            </div>
        )
    }
}
//Export The Main Component
export default Main;
