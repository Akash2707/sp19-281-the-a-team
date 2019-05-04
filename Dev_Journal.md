# CMPE281 - Team Hackathon Project : Quizzbox

## Team: the-A-team

## Team Members:
* [Aakash Thakkar](https://github.com/Akash2707)
* [Harsh Patel](https://github.com/harsh2911)
* [Pranali Bhavsar](https://github.com/pranali139)
* [Ye Mei](https://github.com/MeirYeMei)

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

### Tasks to be done:
### Aakash Thakkar
   * Develop frontend of quiz creation and assignment creation.
### Harsh Patel
   * Develop frontend of attempt assignment and admin dashboard.
### Pranali Bhavsar
  * Develop frontend for attempt quiz, quiz list and admin/user scoreboard
### Ye Mei
  - finished login / signup froentend UI
### Challanges Faced:
  * Everyone had quite good skills in frontend so, did not faced any major problem.
  * Integration of frontend took a while although.
  </br>
## Week 2 (04/20/2019 - 04/26/2019)
### Team meeting #2
  - Discussed backend API design.
  * Talked on how data will flow in API.
  * Everyone presented thier overview how they will design their API.
  * Integrating mongo cluster
### Tasks to be done
### Aakash Thakkar
  * Develop GoAPI for admin module.
  * Integrate to mongo shard cluster
### Harsh Patel
  * Develop Go backend api for assignment module.
  * Integrate to mongo shard cluster
### Pranali Bhavsar
  * Develop Go API for quiz module.
  * Integrate to mongo shard cluster
### Ye Mei
  - finished go backend api for login and signup
  - Integrate to mongo cluster
### Challenges Faced:
  * Understanding working of GoAPI.
  * Debugging error in GoAPI.
  </br>
## Week 3 (04/27/2019 - 05/03/2019)
### Team meeting #3
- Integrated all the components together
- How to host froentend on Heroku
- Debuging and polishing
* Discussion on which wow factor can be implemented.

### Aakash Thakkar
  * Deploy admin service to Elastic Kubernetes Service.
### Harsh Patel
  * Deploy assignment service to Google Kubernetes Engine
  * Created Amazon API gateway.
### Pranali Bhavsar
  * Deploy quiz service to Azure Kubernetes Service.
### Ye Mei
  - dockerize go backend
  - Host 3 go backend instances on AWS
  - Install load balancer
  - Hosted frontend in Heroku
 ### Challenges Faced:
 * Learning new deployment platforms.
 * Integration everyone's work.
 * Debugging deployment error on differnet platforms.
