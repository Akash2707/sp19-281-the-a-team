## AWS EKS Documentation.

* I have used AWS Elastic Container Service for kubernetes (EKS) to deploy my admin backend.

### Below are the steps for EKS deployment:

### Firsly, We need to have some pre-requisite for creating the cluster:

* #### First you need to create IAM Role which will support EKS policies:

  - In the IAM Console, choose Roles and create Roles
  - Here we will allow EKS so that it will manage the clusters in our behalf and then Click : Next Permissions
  - Choose Next : Tags
  - Next : Review
  - We can enter a unique name for our role, such as eksServiceRole and then Create role.
  
* #### Now we will VPC for our cluster:

  - Go to AWS CloudFormation.
  - In the stack creation we will use a Amazon provided S3 template URL for creation of VPC:  
  
    https://amazon-eks.s3-us-west-2.amazonaws.com/cloudformation/2019-02-11/amazon-eks-vpc-sample.yaml
    
  - On the Specification page we will just use whatever the default value is present.
  - On the Review page, create VPC
  _ Once the stack is created we will select the output of that stack from the console and we will record all the details such as VPCId, SubnetIds and Security Group.
  
  ![VPC Stack](https://github.com/nguyensjsu/sp19-281-the-a-team/blob/master/Images_AWS-EKS/VPC%20stack.png)
  
* #### After the stack is created we will add kubectl service for Amazon EKS
  
    - You can download the Amazon EKS-vended kubectl binary for your cluster's Kubernetes version from Amazon S3:  
    
          curl -o kubectl https://amazon-eks.s3-us-west-2.amazonaws.com/1.12.7/2019-03-27/bin/darwin/amd64/kubectl
    
    - Apply permission:  
          
          chmod +x ./kubectl  
          
    - Now we will copy the binary to $PATH:
    
          mkdir -p $HOME/bin && cp ./kubectl $HOME/bin/kubectl && export PATH=$HOME/bin:$PATH
          
    - We can verify the version :
    
          kubectl version --short --client
          
* #### Install aws-iam-authenticator on macOS

    - Download the Amazon EKS-vended aws-iam-authenticator binary from Amazon S3:
        
          curl -o aws-iam-authenticator https://amazon-eks.s3-us-west-2.amazonaws.com/1.12.7/2019-03-27/bin/darwin/amd64/aws-iam-authenticator
        
    - Add the permissions:
    
          chmod +x ./aws-iam-authenticator
        
    - Now we will copy the binary to $PATH:
    
          mkdir -p $HOME/bin && cp ./aws-iam-authenticator $HOME/bin/aws-iam-authenticator && export PATH=$HOME/bin:$PATH
        
    - Add your path to $HOME/bin:
    
          echo 'export PATH=$HOME/bin:$PATH' >> ~/.bash_profile
        
    - Test:
      
          aws-iam-authenticator help
       
### Now we will begin creating the Cluster and Working Nodes:
       
* #### Create our Amazon EKS Cluster:

  - Open Amazon EKS console.
  
  - Choose Create Cluster.
  
  - On the Create Cluster Page fill the following information :
    
     - Cluster Name : Name of the cluster (admin_backend)
     - Kubernetes Version : Your kubernetes version for that cluster.
     - Role ARN : Here We will select the ARN Role that we created in the pre-requisite step (eksServiceRole)
     - VPC : Here we will select the VPCID we marked down from CloudFormation of VPC.
     - Subnets : Here we will select the Subnets we marked down from CloudFormation of VPC.
     - Security Groups : Here we will select the Security Group we marked down from CloudFormation of VPC.
     - Endpoint private acess: Disabled.
     - Endpoint public access : Enable.
     - Logging : You can have various logging features for your Cluster upon your desire.
     - Now you can create the cluster.
     
  - On the Cluster Page if you select the name of your cluster you can see the details of newly creatrd cluster.
  
   ![EKS Cluster](https://github.com/nguyensjsu/sp19-281-the-a-team/blob/master/Images_AWS-EKS/cluster.png)
   
   
 * #### Create a kubeconif file with AWS CLI.
  
   - Check the version of AWS : 
   
          aws --version
      
   - Use the AWS CLI update-kubeconfig command to create or update your kubeconfig for your cluster.
    
          aws eks --region us-west-2 update-kubeconfig --name admin_backend
          
   - Here if you have created your cluster with root access permission and you gets an error for Denied Access then you need to obtain the access key and secret key for the root user and add them into .aws/credentials file.
      
   - Test the configuration : 
   
         kubectl get svc
         
* #### Launch and configure AWS EKS Worker Nodes:

  - Wait until the cluster gets Active.
  - Open AWS CloudFormation Console:
  - From the Navigation Bar, select the region that supports Amazon EKS (Oregon).
  - Choose Create Stack.
  - Here we will Specify S3 image URL for Node group:  
  
    https://amazon-eks.s3-us-west-2.amazonaws.com/cloudformation/2019-02-11/amazon-eks-nodegroup.yaml
  
  - On the Specify Details Page, fill out the following configuration and then Click Next:
  
      - Stack Name : Choose any Stack Name that you wish to create (worker-groups)
      - Cluster Name : We will enter the name of the EKS Clustert that we just created.
      - ClusterControlPlaneSecurityGroup : Here we will select the Security Group we marked down from CloudFormation of VPC.
      - NodeGroupName : Enter any name of your Node group,
      - NodeAutoScalingGroupMinSize: Enter the minimum number nodes for your AutoScaling Group.
      - NodeAutoScalingGroupDesiredCapacity: Enter the desired number nodes for your AutoScaling Group.
      - NodeAutoScalingGroupMaxSize: Enter the maximum number nodes for your AutoScaling Group.
      - NodeInstanceType: Choose an instance type for your worker nodes.
      - NodeImageId For Oregon (us-west-2) :  ami-0923e4b35a30a5f53
      - KeyName: KeyPair of your Availability Zone
      - VpcId: Here we will select the VPCID we marked down from CloudFormation of VPC.
      - Subnets : Here we will select the Subnets we marked down from CloudFormation of VPC.
      
   - On the Options Page Enter the Tag and Go Next.
   - On the Review page, review your information, acknowledge that the stack might create IAM resources, and then choose Create.
   - Once the stack is ready record the NodeInstanceRole from the outputs.
   
   ![EKS Stack Worker Group](https://github.com/nguyensjsu/sp19-281-the-a-team/blob/master/Images_AWS-EKS/Workergroups.png)

 * Now to enable worker nodes to join the cluster : 
 
    - Download the Configuration map using following command : 
    
      curl -o aws-auth-cm.yaml https://amazon-eks.s3-us-west-2.amazonaws.com/cloudformation/2019-02-11/aws-auth-cm.yaml
      
    - Open the file and just update the rolearn: <ARN of instance role (not instance profile)> with rolearn : NodeInstanceRole from the output you recorded.
    
    - Apply the configuration : 
    
          kubectl apply -f aws-auth-cm.yaml
     
     - Check the status of the Node : 
     
            kubectl get nodes --watch
      
* #### After the Nodes are ready we will create the admin backend yaml file for deployment and service: 

![Deployment yaml](https://github.com/nguyensjsu/sp19-281-the-a-team/blob/master/Images_AWS-EKS/quizzbox-deployment.png)

![Service yaml](https://github.com/nguyensjsu/sp19-281-the-a-team/blob/master/Images_AWS-EKS/quizzbox-service.png)

 * kubectl create -f quizzbox-deployment.yaml --save-config
 * kubectl create -f quizzbox-service.yaml
 
 * Check the status of the running pods and service: 
 
    - kubectl get pods --all-namespaces -o wide
    - get services --all-namespaces -o wide


      
      
  
     
  
        
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
