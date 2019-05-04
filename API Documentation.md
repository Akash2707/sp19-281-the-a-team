## API Documentation

### User Service:

* #### Post/login
        
        Post Api for login
        Accept: application/json
        
        Body:
        {
          "username":"user"
          "password":"123456"
        }
        
        Response:
        - 200 created
        - 400 Invalid Request
        
 * #### Post/signup
        
        Post Api for signup
        Accept: application/json
        
        Body:
        {
          "name":"user"
          "username":"user@gmail.com"
          "password":"123456"
        }
        
        Response:
        - 200 created
        - 400 Invalid Request


### Admin Service:

 * #### GET/getonewordquiz
        
        GET Api for listing created Quiz
        Accept: application/json
        
        Response:
        {
          "name":"quiz-1"
        }
        
 * #### GET/getassignments
        
        GET Api for listing created Assignment
        Accept: application/json
        
        Response:
        {
          "name":"assignment-1"
        }
        
 * #### Post/createquiz
        
        Post Api for creating quiz
        Accept: application/json
        
        Body:
        {
          "quizName":"quiz-1"
          "title":"quiz-1"
          "question1":"What is your name"
          "question2":"What is your hobby"
          "question3":"What is your education"
          "question4":"What is your birthdate"
          "question5":"What is your gender"
          "answer1":"user"
          "answer2":"dance"
          "answer3":"BE"
          "answer4":"19/09"
          "answer5":"Female"
        }
        
        Response:
        - 200 created
        - 400 Invalid Request   
        
 * #### Post/assignment
        
        Post Api for crearting assignment
        Accept: application/json
        
        Body:
        {
          "assignmentName":"quiz-1"
          "question1":"What is your name"
          "question2":"What is your hobby"
          "question3":"What is your education"
        }
        
        Response:
        - 200 created
        - 400 Invalid Request 
        
* ### Quiz Service:

* #### GET/quizlist
        
        GET Api for listing created quiz
        Accept: application/json
        
        Response:
        {
          "quizlist":
          [
            {
              "quizName":"assignment-1"
              "quizID":"123"
              "question1":"What is your name"
              "question2":"What is your hobby"
              "question3":"What is your education"
              "question4":"What is your birthdate"
              "question5":"What is your gender"
            }
          ]
          
        }

 * #### Post/postanswer
        
        Post Api for submitting quiz
        Accept: application/json
        
        Body:
        {
          "quizName":"quiz-1"
          username:"user"
          "quizID":"quiz-1"
          "answer1":"user"
          "answer2":"dance"
          "answer3":"BE"
          "answer4":"19/09"
          "answer5":"Female"
          "time":"2019-09-11-14:03"
        }
        
        Response:
        - 200 created
        - 400 Invalid Request 
        
 * #### GET/scoreboard/{username}
        
        GET Api for listing score to user
        Accept: application/json
        
        Response:
        {
          "quizName":"quiz-1"
          "score":"5"
          "time":"2019-09-11-14:03"
        }
        
 * #### GET/viewscore/{quizID}
        
        GET Api for listing score to admin for each quiz
        Accept: application/json
        
        Response:
        {
          "username":"quiz-1"
          "score":"5"
          "time":"2019-09-11-14:03"
        }

### Assignment Service:

* #### GET/getassignments/
        
        GET Api for listing created assignment.
        Accept: application/json
        
        Response:
        {
          "assignmentlist":
          [
            {
              "assignmentName":"assignment-1"
              "assignmentId":"123"
              "question1":"What is your name"
              "question2":"What is your hobby"
              "question3":"What is your education"
            }
          ]
        }
        
* #### GET/getsubmissions/{assignmentId}
        
        GET Api for listing admin submitted assignment for each assignment.
        Accept: application/json
        
        Response:
        {
          "assignmentlist":
          [
            {
              "assignmentURL":"https://assignment.pdf"
              "username":"user"
              "time":"2019-09-11-14:03"
            }
          ]
        }


 * #### Post/assignment
        
        Post Api for submitting assignment
        Accept: application/json
        
        FormData:
        {
          "file":"assignment.pdf"
          "time":"2019-09-11-14:03"
          "username":"user"
        }
        
        Response:
        - 200 created
        - 400 Invalid Request 
