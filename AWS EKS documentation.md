## AWS EKS Documentation.

* I have used AWS Elastic kubernetes Service to deploy my admin backend.

### Below are the steps for EKS deployment:

### Firsly, We need to have some pre-requisite for creating the cluster:

* #### First you need to create IAM Role which will support EKS policies:

  - In the IAM Console, choose Roles and create Roles
  - Here we will allow EKS so that it will manage the clusters in our behalf and then Click : Next Permissions
  - Choose Next : Tags
  - Next : Review
  - We can enter a unique name for our role, such as eksService role and then Create role.
  
* #### Now we will VPC for our cluster:

  - Go to AWS CloudFormation.
  - In the stack creation we will use a Amazon provided S3 template URL for creation of VPC:  
  
    https://amazon-eks.s3-us-west-2.amazonaws.com/cloudformation/2019-02-11/amazon-eks-vpc-sample.yaml
    
  - On the Specification page we will just use whatever the default value is present.
  - On the Review page, create VPC
  _ Once the stack is created we will select the output of that stack from the console and we will record all the details such as VPCId, SubnetIds and Security Group.
  
  ![VPC Stack](Image)
  
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
       
*#### Create our Amazon EKS Cluster:
        
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
