## Azure Kubernetes Service Documentation:

* I have used Azure Kubernetes Service to deploy my quiz backend.

### Refrence Link: https://docs.microsoft.com/en-us/azure/aks/tutorial-kubernetes-prepare-app

### Below are the steps for AKS deployment:


* #### First Install Azure CLI:

* #### Login to Azure CLI:

      az login

* #### Create Resource Group:

      az group create --name testResourceGroup --location westus
      
* #### Create repository:

      az acr create --resource-group testResourceGroup --name testarch --sku Basic

* #### Now login to repo:

      az acr login --name testarch
      
* #### Now tag the docker image:

      docker tag pranali139/backend:v1.0 testarch.azurecr.io/pranali139/backend:v1.0
      
* #### Now run the following steps:

      az ad sp create-for-rbac --skip-assignment
      
* #### Now get the testarch id:

      az acr show --resource-group testResourceGroup --name testarch --query "id" --output tsv
      
* #### Create a role assignment:

      az role assignment create --assignee <appId> --scope <acrId> --role Reader
      
* ####  Create the AKS cluster:
      az aks create \
      --resource-group testResourceGroup \
      --name myAKSCluster \
      --node-count 1 \
      --service-principal <appId> \
      --client-secret <password> \
      --generate-ssh-keys
      
* #### Connect to the kubernetes server:

      az aks get-credentials --resource-group myResourceGroup --name myAKSCluster
      
* #### Run the Kubernetes deployment:
      kubectl run quiz-backend --image=testarch.azurecr.io/pranali139/backend:v1.0 --port 3000 
      
* #### Expose the Service:
      kubectl expose deployment quiz-backend --type=LoadBalancer --port 3000 --target-port 3000
      
