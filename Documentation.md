# CMPE - 281 Team Hackathon Project
# QuizzBox
## Team Members:
* ### Harsh Patel
* ### Pranali Bhavsar
* ### Aakash Thakkar
* ### Ye Mei
<br/>

## Architecture Diagram:

## Description:

### QuizzBox:  
QuizBoxx is an interactive quiz and assignment taking platform. It has a admin who has access to create quioz and assigmnets.
Quiz is designed for creating one or small answer quiz. Assignment has feature of submitting with PDF. User can attempt quiz
and assignemnt as per thier choice. Review their quiz score and quizzes are multiple attempt quizzes. Admin can look at PDF
submission and also look at score for individual quiz attempted by users. QuizzBox is a potential platform for learning quiz, 
class learning, fun quizzes and many more. 

### Frontend - User/Admin:  
User will interact with appliction from frontend. Request from here will be directed to Amazon API Gateway. API gateway will
interact with microservices.

### GoAPI: 
GOAPI works as microservies. 
  * User GoAPI: Login and signup user to attempt quiz.
  * Quiz GoAPI: Provides quiz, score quiz and create score board.
  * Assignment: Provides assignement, review assignment and list assignment.
  * Admin: Creates quiz and assignment and stores answers and questions.
  
### Load Balancer:
Load balancer is used to distribute traffic of User microservice to scale application horizontally.

### Amazon API Gateway:
Amazon API Gateway is used to redirect request from user to different microservices. It enables user to retrieve data from mutiple
microservices within single round trip.

### Mongo Shard Clusters:
We have 3 mongo shard cluster. Quiz, assignment and admin each are using one mongo shard clusters. Every mongo shard cluster
has replica set of 1 mongos, 2 config server, 2 shard cluster with with 2 nodes each. This will help in data partition.

### Google Kubernetes Engine:
Google Kubernetes Engine has three kubernetes pods running of Assignment microservice. 

### Azure Kubernetes Service:
Azure Kubernetes Service contains three kubernetes pods running of Quiz microservice.

### Elastic Kubernetes Service:
Elastic Kubernetes Services is configured to contain three kubernetes pods replica of Admin.

### Mongo Cluster:
Mongo Cluster had 1 master node and 4 slave nodes. It serves as database to user microservice.

### S3 Bucket:
S3 bucket is used to store document (PDF submission) and retrieve document to review.

<br/>

## AFK Scale Cube:

#### Figure:

### X-axis:
X-axis scaling consists of running multiple copies of an application behind a load balancer. We have 3 docker images for User
microservice running behind a load balancer. Quiz, Assignment and Admin have 3 replica sets of kubernetes containers.

### Y-axis:
Y-axis axis scaling splits the application into multiple, different services. We have split our application functionality into
independent microservices.

### Z-axis:
Z-axis splits are commonly used to scale databases. Data is partitioned across a set of servers based on an attribute of 
each record. We had shared mongo cluster to partition data.  

<br/>



