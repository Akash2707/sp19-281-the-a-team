import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import Login from './Login/Login';
import SignUp from "./Signup/Signup"
import Home from './Home/Home';
import DocQuiz from './DocQuiz/DocQuiz';
import ShowAssignments from './DocQuiz/ShowAssignments';
import ShowSubmittedAssignments from './DocQuiz/ShowSubmittedAssignments';
import CreateQuiz from './CreateQuiz/CreateQuiz';
import AttemptQuiz from './AttemptQuiz/AttemptQuiz';
import QuizSelection from './CreateQuiz/QuizSelection';
import Assignment from './CreateQuiz/Assignment';
import DisplayQuiz from './AdminQuizDisplay/QuizDisplay';

//Create a Main Component
class Main extends Component {
    render(){
        return(
            <div>
                {/*Render Different Component based on Route*/}

                <Route path="/login" component={Login}/>
                <Route path="/attemptquiz" component={AttemptQuiz}/>
                <Route path="/submitassignment" component={DocQuiz}/>
                <Route path="/getassignments" component={ShowAssignments}/>
                <Route path="/getsubmissions" component={ShowSubmittedAssignments}/>
                <Route path="/createquiz" component={CreateQuiz}/>
               	<Route path="/selectquiz" component={QuizSelection}/>
                <Route path="/assignment" component={Assignment}/>
                <Route path="/displayquizes" component={DisplayQuiz}/>
                <Route path="/signup" component={SignUp}/>
                    
            </div>
        )
    }
}
//Export The Main Component
export default Main;
