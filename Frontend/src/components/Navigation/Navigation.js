import React, {Component} from 'react';

class CreateQuizz extends Component{
    render(){

        let navibar = null;
        
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
                <button className="btn btn-outline-warning my-2 my-sm-0 submitquiz" type="submit">Score-Board</button>
                <button className="btn btn-outline-primary my-2 my-sm-0 submitquiz" type="submit">Home</button>
                <button className="btn btn-outline-success my-2 my-sm-0 submitquiz" type="submit">Logout</button>
               
            </div>
            </nav>
            </div>

        )
        return(
            
            <div className="col-md-12 container" style={{margin: "0px" , padding:"0px"}}>
                 {navibar}  
            </div>
        )
    }
}

export default CreateQuizz;