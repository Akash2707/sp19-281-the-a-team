# CMPE281 - Team Hackathon Project : Quizzbox

## Team: the-A-team

## Team Members:
* [Aakash Thakkar](https://github.com/Akash2707)
* [Harsh Patel](https://github.com/harsh2911)
* [Pranali Bhavsar](https://github.com/pranali139)
* [Ye Mei](https://github.com/MeirYeMei)

## Description

### 1. Frontend - login/sign up

```Technology Stack:``` React, Material-UI
User will use signup and login page to create account and sign in to the app.

### 5. Go APIs
Login/signup API checks whether the username is available to be register, and whether the username/password pair is valid to login.
Quiz Creation API...

# AKF Scale Cube

### X-axis Scaling: 
- All the go backend API services have three instances running on the cloud and have a load balancer in front of them.

### Y-axis Scaling:
- All the API functionalities are implement individually. 

### Z-axis Scaling:
- All clusters are sharded to store multiple copies of the data.

# Weekly Progress
## Week 1 (04/13/2019 - 04/19/2019)
### Team meeting #1
- Discussed what app we want to build
- Discussed the design of the project
- Distributed components of the project

### Aakash Thakkar
### Harsh Patel
### Pranali Bhavsar
### Ye Mei
  - finished login / signup froentend UI
  
## Week 2 (04/20/2019 - 04/26/2019)
### Team meeting #2
  - Discussed backend API design

### Aakash Thakkar
### Harsh Patel
### Pranali Bhavsar
### Ye Mei
  - finished go backend api for login and signup
  
## Week 3 (04/27/2019 - 05/03/2019)
### Team meeting #1
- Integrated all the components together
- Host froentend on Heruku
- Debuging and polishing

### Aakash Thakkar
### Harsh Patel
### Pranali Bhavsar
### Ye Mei
  - dockerize go backend
  - Host 3 go backend instances on AWS
  - Install load balancer
