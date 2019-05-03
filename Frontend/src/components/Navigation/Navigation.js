import React, {Component} from 'react';
import { Redirect } from 'react-router';

class Navigation extends Component{


    constructor(props) {
        super(props);
        this.state = {
            temp: null
        }
        this.logoutHandler = this.logoutHandler.bind(this);
       
    }

    componentDidMount(){
        this.setState({
            temp: localStorage.getItem('username')
        })
    }

    logoutHandler = (e) => {
        localStorage.removeItem('username');
        // localStorage.clear();
        window.location.reload();
    }
    
    render(){

        let redirectvar = null
        if(localStorage.getItem('username') == null){
            redirectvar = <Redirect to="/login" />
        }
        let navibar = null;
        
    
        if(this.state.temp == "admin"){
            navibar = (
                <div>
                <nav className="col-md-12 navbar navbar-expand-sm navbar-dark bg-dark" style={{height:"50px", borderRadius:"0px" ,position: "fixed",top: "0" , zIndex: "999", width:"100%" , marginBottom:"50px"}}>
                <h4 className="navbar-brand" style={{paddingTop:"10px", fontSize:"20px"}}>QuizzBox</h4>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
    
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                    </ul>
                    <a href="/selectquiz"><button className="btn btn-outline-warning my-2 my-sm-0 submitquiz" type="submit">Create Quiz</button></a>
                    <a href="/displayquizes"><button className="btn btn-outline-primary my-2 my-sm-0 submitquiz" type="submit">Score</button></a>
                    <button className="btn btn-outline-success my-2 my-sm-0 submitquiz" type="submit" onClick={this.logoutHandler}>Logout</button>
                   
                </div>
                </nav>
                </div>
    
            )
        }
        else if(this.state.temp != null){

        navibar = (
            <div>
            <nav className="col-md-12 navbar navbar-expand-sm navbar-dark bg-dark" style={{height:"50px", borderRadius:"0px" ,position: "fixed",top: "0" , zIndex: "999", width:"100%" , marginBottom:"50px"}}>
            <h4 className="navbar-brand" style={{paddingTop:"10px", fontSize:"20px"}}>QuizzBox</h4>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                </ul>
                <a href="/quizlist"><button className="btn btn-outline-primary my-2 my-sm-0 submitquiz" type="submit">Quiz</button></a>
                <a href="/getassignments"><button className="btn btn-outline-primary my-2 my-sm-0 submitquiz" type="submit">Assignment</button></a>
                <a href="/scoreboard"><button className="btn btn-outline-primary my-2 my-sm-0 submitquiz" type="submit">Score</button></a>
                <button className="btn btn-outline-success my-2 my-sm-0 submitquiz" type="submit" onClick={this.logoutHandler}>Logout</button>
               
            </div>
            </nav>
            </div>

        )}
        else{
            navibar = null

        }
        return(
        
            
            <div className="col-md-12 container" style={{margin: "0px" , padding:"0px"}}>
                {redirectvar}
                 {navibar}  
            </div>
        )
    }
}

export default Navigation;