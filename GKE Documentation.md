## Google Kubernetes Engine Documentation.

* I have used Google Kubernetes Engine to deploy my assignment backend and I am storing pdf files in AWS S3 bucket.

### Below are the steps for GKE deployment:


* #### First set your projectid and region:

      gcloud config set project MyProject  
      gcloud config set compute/zone us-west1-a  

* #### Get your docker image in project:

      docker pull patelharsh9999/backend:backend-v1.0
      docker images

* #### Create a container cluster:

      gcloud container clusters create assignment-cluster --num-nodes=2
      
* #### It may take several minutes for the cluster to be created. After that check the up vms.
    
      gcloud compute instances list
      
* #### Now deploy the application:

      kubectl run assignment-backend --image=patelharsh9999/backend:backend-v1.0 --port 3000 --env AWS_ACCESS_KEY_ID=<Key-Id> --env AWS_SECRET_ACCESS_KEY=<access-key>
      
* #### Now expose the service:

      kubectl expose deployment assignment-backend --type=LoadBalancer --port 3000 --target-port 3000
      
* #### To Scale Up and See details:

      kubectl get service
      kubectl scale deployment payments --replicas=3
      kubectl get deployment payments
      kubectl get pods
      kubectl get services
      
