import React, {Component} from 'react';

class CreateQuizz extends Component{
    render(){

        let navibar = null;
        
        navibar = (
            <div>
            <nav class="navbar navbar-expand-sm navbar-dark bg-dark" style={{height:"50px", borderRadius:"0px"}}>
            <h4 class="navbar-brand" style={{paddingTop:"10px", fontSize:"20px"}}>QuizzBox</h4>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                </ul>
                
                <button class="btn btn-outline-primary my-2 my-sm-0 submitquiz" type="submit">Home</button>
                <button class="btn btn-outline-success my-2 my-sm-0 submitquiz" type="submit">Logout</button>
               
            </div>
            </nav>
            </div>

        )
        return(
            
            <div class="col-md-12 container" style={{margin: "0px" , padding:"0px"}}>
                 {navibar}  
            </div>
        )
    }
}

export default CreateQuizz;