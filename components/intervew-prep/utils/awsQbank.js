export const awsQbank = [
    {
        "id": 1,
        "topic": "aws",
        "question": "What is AWS?\r",
        "answer": "AWS (Amazon Web Services) is a comprehensive cloud computing platform that offers over 200 fully featured services from data centers globally. It is designed to help businesses move faster, lower IT costs, and scale applications. AWS covers a wide range of functions, including computing power, storage, databases, machine learning, analytics, IoT, and more.\r\n Example & Detail:\r\n Using the AWS CLI, you can view all available services:\r\naws help\r\n\r\nThis command outputs a list of AWS services along with their command references. AWS’s global infrastructure includes multiple regions and availability zones, ensuring high availability and low latency for applications.\r",
        "tags": [],
        "keyFeatures": [],
        "actionWords": [],
        "codeExample": ""
    },
    {
        "id": 2,
        "topic": "aws",
        "question": " What is Amazon EC2?\r",
        "answer": " Amazon EC2 (Elastic Compute Cloud) provides resizable compute capacity in the cloud. It allows you to launch virtual servers, known as instances, which you can configure based on your requirements. EC2 is flexible and supports a wide range of operating systems, instance types, and configurations.\n Example & Detail:\n Launching an EC2 instance via the AWS CLI:\naws ec2 run-instances --image-id ami-0123456789abcdef0 \\\n                      --count 1 \\\n                      --instance-type t2.micro \\\n                      --key-name MyKeyPair \\\n                      --security-group-ids sg-0123456789abcdef0 \\\n                      --subnet-id subnet-0123456789abcdef0\n\n-This command creates an instance using a specific Amazon Machine Image (AMI). In-depth details include:\n-AMI: A template that contains the software configuration (OS, application server, and applications).\n-Instance Type: Determines the hardware of the host computer used for your instance.\n-Security Groups: Virtual firewalls that control inbound and outbound traffic.\n-Key Pair: Used for securely accessing your instance via SSH.\n",
        "tags": [],
        "keyFeatures": [],
        "actionWords": [],
        "codeExample": ""
    },
    {
        "id": 3,
        "topic": "aws",
        "question": "What is Amazon S3 and how do you use it?",
        "answer": "Amazon S3 (Simple Storage Service) is an object storage service that provides industry-leading scalability, data availability, security, and performance. S3 stores data as objects within buckets and is commonly used for backup, archival, big data analytics, and static website hosting.\n\nKey points to note:\n-Buckets: Containers for objects that have globally unique names.\n-Objects: The files themselves, along with metadata.\n-Access Control: Can be managed using bucket policies and ACLs.\n-Versioning: Allows you to preserve, retrieve, and restore every version of every object stored in your bucket.\n",
        "tags": [],
        "keyFeatures": [],
        "actionWords": [],
        "codeExample": " Example & Detail:\n Uploading a file with the AWS CLI:\naws s3 cp myfile.txt s3://mybucket/myfile.txt"
    },
    {
        "id": 4,
        "topic": "aws",
        "question": "What is AWS IAM?",
        "answer": " AWS Identity and Access Management (IAM) is a web service that helps you securely control access to AWS resources. With IAM, you can create and manage AWS users, groups, roles, and policies to allow or deny access to AWS resources.\r\n\r\n\r\nDetails include:\r\nUsers and Groups: Allows centralized management of identities.\r\nRoles: Provide temporary security credentials to AWS services.\r\nPolicies: JSON documents that define permissions.\r\nBest Practices: Enable multi-factor authentication (MFA) and use roles for applications running on EC2.\r\n",
        "tags": [],
        "keyFeatures": [],
        "actionWords": [],
        "codeExample": " Example & Detail:\r\n Creating an IAM user via the CLI:\r\naws iam create-user --user-name newuser\r\n\r\nAfter user creation, you would typically attach a policy, for example:\r\naws iam attach-user-policy --user-name newuser \\\r\n    --policy-arn arn:aws:iam::aws:policy/AmazonS3ReadOnlyAccess"
    },
    {
        "id": 5,
        "topic": "aws",
        "question": "What is AWS Lambda?\r",
        "answer": "AWS Lambda is a serverless compute service that lets you run code without provisioning or managing servers. It executes your code only when needed and scales automatically, making it ideal for event-driven applications.\r\n \r\n\r\nAdditional details:\r\nEvent Sources: Triggers include changes in S3, updates in DynamoDB, API Gateway calls, and more.\r\nExecution Environment: Automatically manages compute fleet, memory allocation, and monitoring.\r\nPricing: Based on the number of requests and compute time.\r\n",
        "tags": [],
        "keyFeatures": [],
        "actionWords": [],
        "codeExample": "Example & Detail:\r\n A simple Python Lambda function:\r\ndef lambda_handler(event, context):\r\n     Process input event and return response\r\n    return {\r\n        \"statusCode\": 200,\r\n        \"body\": \"Hello, AWS Lambda!\"\r\n    }"
    },
    {
        "id": 6,
        "topic": "aws",
        "question": "What is AWS CloudFormation?\r",
        "answer": " AWS CloudFormation provides a common language for you to describe and provision all the infrastructure resources in your cloud environment. It allows you to use a template file (in JSON or YAML) to automate the creation and management of a collection of AWS resources.\r\n Details include:\r\nTemplates: Reusable and version-controllable files.\r\nStacks: Collections of resources defined by a template.\r\nChange Sets: Allow you to preview changes before applying them.\r\nBenefits: Consistent and predictable provisioning with reduced manual errors.",
        "tags": [],
        "keyFeatures": [],
        "actionWords": [],
        "codeExample": "Example & Detail:\r\n A simple CloudFormation YAML snippet to create an S3 bucket:\r\nResources:\r\n  MyBucket:\r\n    Type: AWS::S3::Bucket\r\n    Properties:\r\n      BucketName: my-sample-bucket\r\n\r"
    },
    {
        "id": 7,
        "topic": "aws",
        "question": "What is AWS VPC?\r",
        "answer": " Amazon VPC (Virtual Private Cloud) lets you provision a logically isolated section of the AWS cloud where you can launch AWS resources in a virtual network that you define.\r\n Key details:\r\nSubnets: Divide your VPC's IP address range into smaller segments.\r\nRoute Tables: Determine how traffic is directed within your VPC.\r\nInternet Gateways: Allow communication between your VPC and the internet.\r\nSecurity: Use network ACLs and security groups to control access.",
        "tags": [],
        "keyFeatures": [],
        "actionWords": [],
        "codeExample": "Example & Detail:\r\n Creating a VPC with a specified CIDR block:\r\naws ec2 create-vpc --cidr-block 10.0.0.0/16\r\n\r"
    },
    {
        "id": 8,
        "topic": "aws",
        "question": "What is AWS RDS?\r",
        "answer": " AWS RDS (Relational Database Service) simplifies the setup, operation, and scaling of a relational database in the cloud. It supports multiple database engines, including MySQL, PostgreSQL, Oracle, SQL Server, and MariaDB.\r\n Details to consider:\r\nAutomated Backups: Enable point-in-time recovery.\r\nMulti-AZ Deployments: Increase availability and durability.\r\nScaling: Adjust instance sizes and storage as needed.\r\nMonitoring: Use CloudWatch to track database performance metrics.\r\n",
        "tags": [],
        "keyFeatures": [],
        "actionWords": [],
        "codeExample": "Example & Detail:\r\n Launching a MySQL RDS instance:\r\naws rds create-db-instance --db-instance-identifier mydbinstance \\\r\n                           --allocated-storage 20 \\\r\n                           --db-instance-class db.t2.micro \\\r\n                           --engine mysql \\\r\n                           --master-username admin \\\r\n                           --master-user-password password\r\n\r"
    },
    {
        "id": 9,
        "topic": "aws",
        "question": "What is AWS DynamoDB?\r",
        "answer": " AWS DynamoDB is a fast and flexible NoSQL database service for all applications that need consistent, single-digit millisecond latency at any scale. It offers both key-value and document data structures.\r\n Key details:\r\nScalability: Automatically scales throughput capacity.\r\nConsistency: Offers both eventual and strong consistency models.\r\nGlobal Tables: Support multi-region replication for high availability.\r\nSecurity: Integrates with IAM for fine-grained access control.\r\n",
        "tags": [],
        "keyFeatures": [],
        "actionWords": [],
        "codeExample": "Example & Detail:\r\n Creating a DynamoDB table using Python's boto3 library:\r\nimport boto3\r\n\r\ndynamodb = boto3.resource('dynamodb')\r\ntable = dynamodb.create_table(\r\n    TableName='Movies',\r\n    KeySchema=[\r\n        {'AttributeName': 'year', 'KeyType': 'HASH'},    Partition key\r\n        {'AttributeName': 'title', 'KeyType': 'RANGE'}     Sort key\r\n    ],\r\n    AttributeDefinitions=[\r\n        {'AttributeName': 'year', 'AttributeType': 'N'},\r\n        {'AttributeName': 'title', 'AttributeType': 'S'}\r\n    ],\r\n    ProvisionedThroughput={'ReadCapacityUnits': 5, 'WriteCapacityUnits': 5}\r\n)\r\ntable.wait_until_exists()\r\nprint(\"Table status:\", table.table_status)\r\n\r"
    },
    {
        "id": 10,
        "topic": "aws",
        "question": "What is AWS ECS?\r",
        "answer": "AWS ECS (Elastic Container Service) is a highly scalable, high-performance container orchestration service that supports Docker containers and allows you to easily run applications on a managed cluster.\r\n Additional details:\r\nClusters: Logical grouping of tasks or services.\r\nTask Definitions: Define how containers are launched, including resource allocation, port mappings, and environment variables.\r\nScheduling: ECS supports different scheduling options (service scheduler, task scheduler) for optimal container management.\r\n",
        "tags": [],
        "keyFeatures": [],
        "actionWords": [],
        "codeExample": "Example & Detail:\r\n A sample ECS task definition in JSON:\r\n{\r\n  \"family\": \"sample-task\",\r\n  \"containerDefinitions\": [\r\n    {\r\n      \"name\": \"web\",\r\n      \"image\": \"nginx\",\r\n      \"cpu\": 10,\r\n      \"memory\": 500,\r\n      \"essential\": true,\r\n      \"portMappings\": [\r\n        {\"containerPort\": 80, \"hostPort\": 80}\r\n      ]\r\n    }\r\n  ]\r\n}\r\n\r"
    },
    {
        "id": 11,
        "topic": "aws",
        "question": "What is AWS EKS?\r",
        "answer": " AWS EKS (Elastic Kubernetes Service) is a managed Kubernetes service that makes it easy to run Kubernetes on AWS without needing to install, operate, and maintain your own Kubernetes control plane.\r\n\r\n\r\nKey details include:\r\nManaged Control Plane: AWS manages the Kubernetes master nodes.\r\nWorker Nodes: You can provision nodes either on EC2 or using AWS Fargate for serverless Kubernetes.\r\nIntegration: EKS integrates with AWS IAM for authentication and AWS VPC for network isolation.\r\n",
        "tags": [],
        "keyFeatures": [],
        "actionWords": [],
        "codeExample": " Example & Detail:\r\n Creating an EKS cluster with the command-line tool eksctl:\r\neksctl create cluster --name my-cluster --region us-west-2 \\\r\n                      --nodegroup-name linux-nodes --node-type t3.medium \\\r\n                      --nodes 3"
    },
    {
        "id": 12,
        "topic": "aws",
        "question": "What is AWS SQS?\r",
        "answer": "AWS SQS (Simple Queue Service) is a fully managed message queuing service that enables you to decouple and scale microservices, distributed systems, and serverless applications.\r\n\r\n\r\nAdditional details:\r\nQueues: SQS offers both standard (best-effort ordering, high throughput) and FIFO (first-in-first-out, exactly-once processing) queues.\r\nDecoupling: Helps to decouple application components, improving fault tolerance.\r\nVisibility Timeout: Controls how long a message is hidden after being retrieved.\r\n",
        "tags": [],
        "keyFeatures": [],
        "actionWords": [],
        "codeExample": " Example & Detail:\r\n Sending a message using the AWS CLI:\r\naws sqs send-message --queue-url https://sqs.us-east-1.amazonaws.com/123456789012/MyQueue \\\r\n                     --message-body \"Hello, SQS!\""
    },
    {
        "id": 13,
        "topic": "aws",
        "question": "What is AWS SNS?\r",
        "answer": "AWS SNS (Simple Notification Service) is a fully managed messaging service that coordinates the delivery of messages to subscribing endpoints or clients. It supports multiple messaging protocols such as HTTP/S, email, SMS, and mobile push notifications.\r\n \r\n\r\nDetails include:\r\nTopics: Central hubs to which messages are published.\r\nSubscriptions: Endpoints (such as Lambda, HTTP, SQS) receive messages published to a topic.\r\nFan-out Architecture: Enables one message to be delivered to multiple subscribers simultaneously.\r\n",
        "tags": [],
        "keyFeatures": [],
        "actionWords": [],
        "codeExample": "Example & Detail:\r\n Publishing a message via the AWS CLI:\r\naws sns publish --topic-arn arn:aws:sns:us-east-1:123456789012:MyTopic \\\r\n                --message \"Notification message\""
    },
    {
        "id": 14,
        "topic": "aws",
        "question": "What is AWS CloudWatch?\r",
        "answer": "AWS CloudWatch is a monitoring and observability service designed to provide data and actionable insights to monitor applications, respond to system-wide performance changes, and optimize resource utilization.\r\n \r\n\r\nKey points:\r\nMetrics and Logs: Monitor performance, set alarms, and analyze logs from AWS resources.\r\nDashboard: Visualize metrics across multiple AWS services in one place.\r\nCustom Metrics: You can publish your own application metrics for more detailed insights.\r\n",
        "tags": [],
        "keyFeatures": [],
        "actionWords": [],
        "codeExample": "Example & Detail:\r\n Creating an alarm to monitor CPU utilization:\r\naws cloudwatch put-metric-alarm --alarm-name CPUAlarm \\\r\n                                --metric-name CPUUtilization \\\r\n                                --namespace AWS/EC2 \\\r\n                                --statistic Average \\\r\n                                --period 300 \\\r\n                                --threshold 70 \\\r\n                                --comparison-operator GreaterThanThreshold \\\r\n                                --dimensions Name=InstanceId,Value=i-0123456789abcdef0 \\\r\n                                --evaluation-periods 2 \\\r\n                                --alarm-actions arn:aws:sns:us-east-1:123456789012:MyTopic"
    },
    {
        "id": 15,
        "topic": "aws",
        "question": "What is AWS CloudTrail?\r",
        "answer": " AWS CloudTrail records AWS API calls for your account and delivers log files to an Amazon S3 bucket. This service enables governance, compliance, operational auditing, and risk auditing of your AWS account.\r\n Details include:\r\nAudit Trail: Maintains history of API calls for security and troubleshooting.\r\nIntegration: Can be integrated with CloudWatch Logs for real-time monitoring.\r\nEvent History: Provides a view of user activity and resource changes over the past 90 days.\r\n",
        "tags": [],
        "keyFeatures": [],
        "actionWords": [],
        "codeExample": "Example & Detail:\r\n Enabling CloudTrail logging via the CLI:\r\naws cloudtrail create-trail --name myTrail --s3-bucket-name my-cloudtrail-bucket\r\naws cloudtrail start-logging --name myTrail\r\n\r"
    },
    {
        "id": 16,
        "topic": "aws",
        "question": "What is AWS Auto Scaling?",
        "answer": " AWS Auto Scaling dynamically adjusts the capacity of your AWS resources to maintain steady, predictable performance at the lowest possible cost. It monitors your applications and automatically adjusts capacity to maintain performance.\r\n \r\n\r\nKey details:\r\nScaling Policies: Define how your application scales in response to changes in demand.\r\nHealth Checks: Automatically replace unhealthy instances.\r\nIntegration: Works with ELB to ensure traffic is evenly distributed.",
        "tags": [],
        "keyFeatures": [],
        "actionWords": [],
        "codeExample": "Example & Detail:\r\n Creating an auto scaling group using the CLI:\r\naws autoscaling create-auto-scaling-group --auto-scaling-group-name my-asg \\\r\n                                          --launch-configuration-name my-lc \\\r\n                                          --min-size 1 --max-size 5 \\\r\n                                          --desired-capacity 2 \\\r\n                                          --availability-zones us-east-1a us-east-1b"
    },
    {
        "id": 17,
        "topic": "aws",
        "question": " What is AWS ELB?\r",
        "answer": " AWS ELB (Elastic Load Balancing) automatically distributes incoming application traffic across multiple targets, such as EC2 instances, containers, and IP addresses, to improve fault tolerance and ensure high availability.\r\n \r\n\r\nImportant details:\r\nTypes: Classic Load Balancer, Application Load Balancer, and Network Load Balancer, each designed for different use cases.\r\nHealth Checks: Ensure that traffic is sent only to healthy instances.\r\nSSL Termination: Offload SSL processing from your application servers.\r\n",
        "tags": [],
        "keyFeatures": [],
        "actionWords": [],
        "codeExample": "Example & Detail:\r\n Creating an Application Load Balancer (ALB) using the CLI:\r\naws elbv2 create-load-balancer --name my-alb \\\r\n                               --subnets subnet-0123456789abcdef0 subnet-0fedcba9876543210 \\\r\n                               --security-groups sg-0123456789abcdef0"
    },
    {
        "id": 18,
        "topic": "aws",
        "question": "What is AWS EBS?\r",
        "answer": " AWS EBS (Elastic Block Store) provides persistent, high-performance block storage volumes for use with Amazon EC2 instances. It is designed for workloads that require a database, file system, or access to raw block-level storage.\r\n \r\n\r\nKey points:\r\nVolume Types: Different types (e.g., gp2, gp3, io1) cater to varying performance needs.\r\nSnapshots: Create backups of your EBS volumes that can be stored in S3.\r\nEncryption: Supports encryption at rest and in transit for data security.",
        "tags": [],
        "keyFeatures": [],
        "actionWords": [],
        "codeExample": "Example & Detail:\r\n Creating and attaching an EBS volume:\r\naws ec2 create-volume --availability-zone us-east-1a --size 10 --volume-type gp2\r\naws ec2 attach-volume --volume-id vol-0123456789abcdef0 \\\r\n                      --instance-id i-0123456789abcdef0 \\\r\n                      --device /dev/sdf"
    },
    {
        "id": 19,
        "topic": "aws",
        "question": " What is AWS Route 53?\r",
        "answer": "AWS Route 53 is a highly available and scalable Domain Name System (DNS) web service designed to route end-user requests to internet applications by translating human-friendly domain names into IP addresses.\r\n \r\n\r\nKey details include:\r\nDNS Management: Configure routing policies (simple, weighted, latency-based, failover).\r\nHealth Checks: Monitor the health of your application endpoints.\r\nDomain Registration: Route 53 also offers domain registration services.\r\n",
        "tags": [],
        "keyFeatures": [],
        "actionWords": [],
        "codeExample": "Example & Detail:\r\n Creating a hosted zone for your domain:\r\naws route53 create-hosted-zone --name example.com --caller-reference \"my-reference\""
    },
    {
        "id": 20,
        "topic": "aws",
        "question": "What are AWS Lambda Layers?",
        "answer": " AWS Lambda Layers provide a way to manage and share code and data across multiple Lambda functions. Layers let you package libraries and custom runtimes separately from your function code, making it easier to update and manage common dependencies.\r\n Additional points:\r\nReuse: Layers can be shared across functions and even accounts.\r\nVersioning: Each layer can have multiple versions, allowing you to update without modifying your function code directly.\r\n",
        "tags": [],
        "keyFeatures": [],
        "actionWords": [],
        "codeExample": "Example & Detail:\r\n Publishing a Lambda layer using the CLI:\r\naws lambda publish-layer-version --layer-name my-layer \\\r\n                                   --zip-file fileb://layer.zip \\\r\n                                   --compatible-runtimes python3.8\r\n\r"
    },
    {
        "id": 21,
        "topic": "aws",
        "question": "What is AWS Fargate?",
        "answer": "AWS Fargate is a serverless compute engine for containers that works with both Amazon ECS and Amazon EKS. It allows you to run containers without having to manage the underlying EC2 instances, simplifying operations and scaling.\r\n \r\n\r\nKey details:\r\nNo Server Management: AWS handles server provisioning and scaling.\r\nBilling: You pay only for the resources that your containers use.\r\nIntegration: Works with ECS and EKS for container orchestration.\r\n",
        "tags": [],
        "keyFeatures": [],
        "actionWords": [],
        "codeExample": "Example & Detail:\r\n A Fargate task definition snippet (JSON):\r\n{\r\n  \"family\": \"fargate-task\",\r\n  \"networkMode\": \"awsvpc\",\r\n  \"requiresCompatibilities\": [\"FARGATE\"],\r\n  \"cpu\": \"256\",\r\n  \"memory\": \"512\",\r\n  \"containerDefinitions\": [\r\n    {\r\n      \"name\": \"app\",\r\n      \"image\": \"nginx\",\r\n      \"portMappings\": [{\"containerPort\": 80, \"hostPort\": 80}]\r\n    }\r\n  ]\r\n}"
    },
    {
        "id": 22,
        "topic": "aws",
        "question": "What is AWS API Gateway?\r",
        "answer": "AWS API Gateway is a fully managed service that makes it easy for developers to create, publish, maintain, monitor, and secure APIs at any scale. It supports RESTful APIs as well as WebSocket APIs for real-time two-way communication.\r\n \r\n\r\nDetails include:\r\nResource Management: Define resources and methods that integrate with backend endpoints.\r\nSecurity: Supports throttling, authentication, and authorization (e.g., IAM, Cognito, Lambda authorizers).\r\nDeployment: APIs are deployed to stages, enabling versioning and different environments (dev, test, prod).\r\n",
        "tags": [],
        "keyFeatures": [],
        "actionWords": [],
        "codeExample": "Example & Detail:\r\n Creating a REST API using the CLI:\r\naws apigateway create-rest-api --name 'MyAPI'"
    },
    {
        "id": 23,
        "topic": "aws",
        "question": "What are AWS Step Functions?",
        "answer": "AWS Step Functions allow you to coordinate multiple AWS services into serverless workflows so you can build and update apps quickly. They provide a visual representation of your application logic as a series of steps with defined transitions.\r\n Key points:\r\nWorkflow Coordination: Orchestrates AWS services and Lambda functions seamlessly.\r\nError Handling: Built-in retry and error handling strategies.\r\nVisual Console: Monitor and debug workflow execution visually.\r\n",
        "tags": [],
        "keyFeatures": [],
        "actionWords": [],
        "codeExample": "Example & Detail:\r\n A simple state machine definition in JSON:\r\n{\r\n  \"Comment\": \"A simple example state machine\",\r\n  \"StartAt\": \"HelloWorld\",\r\n  \"States\": {\r\n    \"HelloWorld\": {\r\n      \"Type\": \"Task\",\r\n      \"Resource\": \"arn:aws:lambda:us-east-1:123456789012:function:HelloWorldFunction\",\r\n      \"End\": true\r\n    }\r\n  }\r\n}\r\n\r"
    },
    {
        "id": 24,
        "topic": "aws",
        "question": "What is AWS Kinesis?\r",
        "answer": " AWS Kinesis is a platform on AWS to collect, process, and analyze real-time, streaming data so you can get timely insights and react quickly to new information. It includes services such as Kinesis Data Streams, Kinesis Data Firehose, and Kinesis Data Analytics.\r\n \r\n\r\nAdditional details:\r\nData Ingestion: Capture data from various sources like IoT devices, logs, or social media.\r\nProcessing: Real-time processing using Kinesis Data Analytics or custom consumer applications.\r\n",
        "tags": [],
        "keyFeatures": [],
        "actionWords": [],
        "codeExample": "Example & Detail:\r\n Creating a Kinesis data stream using the CLI:\r\naws kinesis create-stream --stream-name my-stream --shard-count 1"
    },
    {
        "id": 25,
        "topic": "aws",
        "question": "What is AWS Redshift?\r",
        "answer": "AWS Redshift is a fast, fully managed data warehouse that makes it simple and cost-effective to analyze all your data using standard SQL and your existing Business Intelligence (BI) tools.\r\n \r\n\r\nKey details include:\r\nMassively Parallel Processing (MPP): Enables high-performance analysis of large datasets.\r\nColumnar Storage: Optimized for complex queries on large volumes of data.\r\nScalability: Easily scale your data warehouse by adding nodes.\r\n",
        "tags": [],
        "keyFeatures": [],
        "actionWords": [],
        "codeExample": "Example & Detail:\r\n Connecting to a Redshift cluster using a JDBC URL:\r\njdbc:redshift://examplecluster.abc123xyz789.us-west-2.redshift.amazonaws.com:5439/dev"
    },
    {
        "id": 26,
        "topic": "aws",
        "question": "What is AWS Elastic Beanstalk?",
        "answer": "AWS Elastic Beanstalk is a platform-as-a-service (PaaS) that simplifies the process of deploying and managing applications in the AWS cloud. It abstracts away the underlying infrastructure so you can focus on writing code.\n \n\nDetails include:\nEnvironment Management: Automatically handles capacity provisioning, load balancing, auto scaling, and application health monitoring.\nSupported Platforms: Multiple languages and platforms (Java, .NET, Node.js, PHP, Python, Ruby, Go, Docker).\nCustomization: You can customize environment configurations with configuration files.\n",
        "tags": [],
        "keyFeatures": [],
        "actionWords": [],
        "codeExample": "Example & Detail:\n Using the EB CLI to deploy a Python application:\neb init -p python-3.8 my-app\neb create my-env"
    },
    {
        "id": 27,
        "topic": "aws",
        "question": " What is AWS CodeDeploy?\r",
        "answer": "AWS CodeDeploy is a deployment service that automates application deployments to various compute services like EC2, Lambda, and on-premises servers. It helps ensure that application updates are released consistently and reliably.\r\n \r\n\r\nAdditional details:\r\nDeployment Strategies: Supports in-place, blue/green deployments, and can integrate with Auto Scaling.\r\nRollbacks: Automatically revert to a previous version if a deployment fails.\r\nIntegration: Works seamlessly with CodePipeline for CI/CD.\r\n",
        "tags": [],
        "keyFeatures": [],
        "actionWords": [],
        "codeExample": "Example & Detail:\r\n A simple deployment configuration in YAML for CodeDeploy:\r\nversion: 0.0\r\nos: linux\r\nfiles:\r\n  - source: /\r\n    destination: /var/www/html"
    },
    {
        "id": 28,
        "topic": "aws",
        "question": "What is AWS CodePipeline?",
        "answer": "AWS CodePipeline is a fully managed continuous delivery service that helps you automate your release pipelines for fast and reliable application and infrastructure updates.\r\n \r\n\r\nKey points:\r\nStages: Define the flow from source code, build, test, and deploy.\r\nAutomation: Integrates with other AWS services (CodeBuild, CodeDeploy) to automate the entire process.\r\n",
        "tags": [],
        "keyFeatures": [],
        "actionWords": [],
        "codeExample": "Example & Detail:\r\n A simple pipeline definition in JSON:\r\n{\r\n  \"pipeline\": {\r\n    \"name\": \"MyPipeline\",\r\n    \"roleArn\": \"arn:aws:iam::123456789012:role/AWS-CodePipeline-Service\",\r\n    \"stages\": [\r\n      {\r\n        \"name\": \"Source\",\r\n        \"actions\": [\r\n          {\r\n            \"name\": \"SourceAction\",\r\n            \"actionTypeId\": {\r\n              \"category\": \"Source\",\r\n              \"owner\": \"AWS\",\r\n              \"provider\": \"CodeCommit\",\r\n              \"version\": \"1\"\r\n            },\r\n            \"configuration\": {\r\n              \"RepositoryName\": \"MyRepo\",\r\n              \"BranchName\": \"master\"\r\n            }\r\n          }\r\n        ]\r\n      }\r\n    ]\r\n  }\r\n}"
    },
    {
        "id": 29,
        "topic": "aws",
        "question": "What is AWS CodeBuild?",
        "answer": " AWS CodeBuild is a fully managed build service in the cloud that compiles your source code, runs tests, and produces deployable software packages. It scales continuously and processes multiple builds concurrently.\r\n \r\nDetails include:\r\nPhases: The build lifecycle is divided into install, pre-build, build, and post-build phases.\r\nArtifacts: Define the output files that will be stored and later used in deployments.\r\nIntegration: Works with CodePipeline for continuous integration.\r\n",
        "tags": [],
        "keyFeatures": [],
        "actionWords": [],
        "codeExample": "Example & Detail:\r\n A sample buildspec.yml file:\r\nversion: 0.2\r\nphases:\r\n  install:\r\n    commands:\r\n      - echo Installing dependencies...\r\n      - pip install -r requirements.txt\r\n  build:\r\n    commands:\r\n      - echo Build started on `date`\r\n      - python setup.py build\r\nartifacts:\r\n  files:\r\n "
    },
    {
        "id": 30,
        "topic": "aws",
        "question": "What is AWS SAM (Serverless Application Model)?",
        "answer": "AWS SAM is an open-source framework that simplifies building, testing, and deploying serverless applications. It extends AWS CloudFormation to provide a simplified syntax for defining serverless resources such as functions, APIs, and databases.\r\n \r\n\r\nKey details:\r\nSimplification: Reduces the boilerplate code needed to deploy serverless resources.\r\nLocal Testing: SAM CLI supports local testing and debugging of serverless applications.\r\nDeployment: Leverages CloudFormation for managing the complete lifecycle of serverless apps.\r\n",
        "tags": [],
        "keyFeatures": [],
        "actionWords": [],
        "codeExample": "Example & Detail:\r\n A simple SAM template in YAML:\r\nAWSTemplateFormatVersion: '2010-09-09'\r\nTransform: AWS::Serverless-2016-10-31\r\nResources:\r\n  HelloWorldFunction:\r\n    Type: AWS::Serverless::Function\r\n    Properties:\r\n      CodeUri: hello_world/\r\n      Handler: app.lambda_handler\r\n      Runtime: python3.8"
    },
    {
        "id": 31,
        "topic": "aws",
        "question": "What is AWS CDK?",
        "answer": " The AWS Cloud Development Kit (CDK) allows you to define your cloud infrastructure using familiar programming languages like TypeScript, Python, Java, or C. It translates high-level constructs into CloudFormation templates, streamlining infrastructure provisioning.\r\n \r\n\r\nDetails include:\r\nProgramming Languages: Enables infrastructure as code using languages you already know.\r\nReusable Constructs: Create reusable components and share them across projects.\r\nIntegration: Synthesizes to CloudFormation, making deployments consistent and repeatable.\r\n",
        "tags": [],
        "keyFeatures": [],
        "actionWords": [],
        "codeExample": "Example & Detail:\r\n Creating an S3 bucket in TypeScript using AWS CDK:\r\nimport * as cdk from '@aws-cdk/core';\r\nimport * as s3 from '@aws-cdk/aws-s3';\r\n\r\nclass MyStack extends cdk.Stack {\r\n  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {\r\n    super(scope, id, props);\r\n    new s3.Bucket(this, 'MyBucket', {\r\n      versioned: true,\r\n    });\r\n  }\r\n}\r\n\r\nconst app = new cdk.App();\r\nnew MyStack(app, 'MyStack');\r\napp.synth();"
    },
    {
        "id": 32,
        "topic": "aws",
        "question": "What is AWS Secrets Manager?\r",
        "answer": " AWS Secrets Manager enables you to store, manage, and retrieve sensitive information (like database credentials, API keys, and other secrets) securely. It automates secrets rotation and provides fine-grained access control.\n \n\nKey details include:\nRotation: Automatically rotates credentials according to a defined schedule.\nSecurity: Encrypts secrets using AWS KMS and integrates with IAM policies.\nAudit: Provides logging and audit trails to track access to secrets.\n",
        "tags": [],
        "keyFeatures": [],
        "actionWords": [],
        "codeExample": "Example & Detail:\n Retrieving a secret via the CLI:\naws secretsmanager get-secret-value --secret-id MySecret"
    },
    {
        "id": 33,
        "topic": "aws",
        "question": "What is AWS Systems Manager?",
        "answer": "AWS Systems Manager is a unified interface that allows you to view and control your AWS infrastructure. It integrates with various AWS services to help manage EC2 instances, automate operational tasks, and maintain security and compliance.\r\n \r\n\r\nDetails include:\r\nAutomation: Create and run automation workflows for common maintenance tasks.\r\nInventory: Collect software inventory and configuration information from your instances.\r\nPatch Management: Automate the patching of managed instances.\r\n",
        "tags": [],
        "keyFeatures": [],
        "actionWords": [],
        "codeExample": "Example & Detail:\r\n Executing a command on an EC2 instance using SSM:\r\naws ssm send-command --instance-ids \"i-0123456789abcdef0\" \\\r\n                     --document-name \"AWS-RunShellScript\" \\\r\n                     --parameters commands=[\"echo Hello World\"]"
    },
    {
        "id": 34,
        "topic": "aws",
        "question": "What is AWS Trusted Advisor?\r",
        "answer": " AWS Trusted Advisor is an online tool that inspects your AWS environment and makes recommendations for cost optimization, performance, security, fault tolerance, and service limits.\r\n \r\n\r\nKey details:\r\nChecks: Offers real-time guidance based on AWS best practices.\r\nDashboard: Provides a summary view to identify areas for improvement.\r\nActionable Insights: Helps optimize your infrastructure for cost, security, and performance.\r\n",
        "tags": [],
        "keyFeatures": [],
        "actionWords": [],
        "codeExample": "Example & Detail:\r\n Retrieve a check result using the CLI:\r\naws support describe-trusted-advisor-check-result --check-id YOUR_CHECK_ID"
    },
    {
        "id": 35,
        "topic": "aws",
        "question": "What is the AWS Well-Architected Framework?",
        "answer": " The AWS Well-Architected Framework is a set of best practices designed to help cloud architects build secure, high-performing, resilient, and efficient infrastructure for their applications. It is organized into five pillars: operational excellence, security, reliability, performance efficiency, and cost optimization.\r\n Example & Detail:\r\n While no direct code snippet applies, you can use the AWS Well-Architected Tool in the AWS Console to review and improve your architecture against these best practices. Key aspects include:\r\nGuidelines: Provides in-depth questions and best practices for each pillar.\r\nAssessment: Helps identify potential risks and areas for improvement.\r\nContinuous Improvement: Encourages regular review of your architecture as your application evolves.\r",
        "tags": [],
        "keyFeatures": [],
        "actionWords": [],
        "codeExample": ""
    },
    {
        "id": 36,
        "topic": "aws",
        "question": "What is AWS Direct Connect?\r",
        "answer": "AWS Direct Connect establishes a dedicated network connection between your premises and AWS, reducing network costs, increasing bandwidth throughput, and providing a more consistent network experience than internet-based connections.\r\n Key points:\r\nDedicated Connection: Provides a secure, high-bandwidth connection.\r\nUse Cases: Ideal for hybrid cloud environments or transferring large data volumes.\r\nReliability: Often used alongside VPN for additional security and redundancy.\r\n",
        "tags": [],
        "keyFeatures": [],
        "actionWords": [],
        "codeExample": "Example & Detail:\r\n Creating a private virtual interface using the CLI:\r\naws directconnect create-private-virtual-interface --connection-id dxcon-01234567 \\\r\n  --new-private-virtual-interface '{\"virtualInterfaceName\": \"MyVIF\", \"vlan\": 101, \"asn\": 65000, \"amazonAddress\": \"175.45.176.1\", \"customerAddress\": \"175.45.176.2\"}'\r\n\r"
    },
    {
        "id": 37,
        "topic": "aws",
        "question": "What is AWS Storage Gateway?\r",
        "answer": " AWS Storage Gateway is a hybrid cloud storage service that gives you on-premises access to virtually unlimited cloud storage. It seamlessly integrates on-premises environments with AWS storage services such as S3 and Glacier.\r\n Key details include:\r\nGateway Types: Supports file, volume, and tape gateways.\r\nCaching: Frequently accessed data is cached locally for performance.\r\nIntegration: Enables backup and archival of on-premises data to the cloud.\r\n",
        "tags": [],
        "keyFeatures": [],
        "actionWords": [],
        "codeExample": "Example & Detail:\r\n Creating a file gateway using the CLI:\r\naws storagegateway create-gateway --gateway-name MyGateway --gateway-type FILE_S3 --region us-east-1\r\n\r"
    },
    {
        "id": 38,
        "topic": "aws",
        "question": " What is AWS Glue?\r\n",
        "answer": "AWS Glue is a fully managed extract, transform, and load (ETL) service that makes it easy to prepare and load data for analytics. It automates data discovery, schema inference, and job scheduling, enabling rapid data processing.\r\nDetails include:\r\nData Catalog: Centralized metadata repository to store table definitions.\r\nJob Scheduler: Automates the ETL process on a defined schedule.\r\nServerless: No need to manage infrastructure; Glue scales automatically.",
        "tags": [],
        "keyFeatures": [],
        "actionWords": [],
        "codeExample": " Example & Detail:\r\n A Python script in a Glue job:\r\nimport sys\r\nfrom awsglue.transforms import *\r\nfrom awsglue.utils import getResolvedOptions\r\nfrom pyspark.context import SparkContext\r\nfrom awsglue.context import GlueContext\r\n\r\nargs = getResolvedOptions(sys.argv, ['JOB_NAME'])\r\nsc = SparkContext()\r\nglueContext = GlueContext(sc)\r\ndyf = glueContext.create_dynamic_frame.from_catalog(database=\"mydb\", table_name=\"mytable\")\r\ndyf.printSchema()\r\n\r"
    },
    {
        "id": 39,
        "topic": "aws",
        "question": "What is AWS Athena?\r",
        "answer": "AWS Athena is an interactive query service that makes it easy to analyze data in Amazon S3 using standard SQL. It is serverless, so there is no infrastructure to manage, and you pay only for the queries you run.\r\nKey details:\r\nSQL Interface: Uses Presto for distributed SQL querying.\r\nIntegration: Directly integrates with S3, supporting multiple data formats (CSV, JSON, Parquet).\r\nCost Efficiency: Billed based on the amount of data scanned per query.\r\n",
        "tags": [],
        "keyFeatures": [],
        "actionWords": [],
        "codeExample": " Example & Detail:\r\n Starting a query execution using the CLI:\r\naws athena start-query-execution --query-string \"SELECT * FROM my_table LIMIT 10;\" \\\r\n  --result-configuration OutputLocation=s3://my-query-results/\r\n\r"
    },
    {
        "id": 40,
        "topic": "aws",
        "question": "What is AWS EMR?\r",
        "answer": " AWS EMR (Elastic MapReduce) is a cloud big data platform for processing massive amounts of data using open source tools such as Apache Hadoop, Spark, HBase, and Presto.\n \n\nKey points:\nScalability: Easily scale clusters to handle large workloads.\nCost: Pay only for the compute time you use.\nIntegration: Supports data stored in S3, DynamoDB, and HDFS for processing.\n",
        "tags": [],
        "keyFeatures": [],
        "actionWords": [],
        "codeExample": "Example & Detail:\n Creating an EMR cluster using the CLI:\naws emr create-cluster --name \"Test Cluster\" \\\n  --release-label emr-5.30.0 \\\n  --applications Name=Hadoop Name=Spark \\\n  --instance-type m5.xlarge --instance-count 3 \\\n  --use-default-roles"
    },
    {
        "id": 41,
        "topic": "aws",
        "question": "What is AWS Data Pipeline?",
        "answer": " AWS Data Pipeline is a web service that helps you reliably process and move data between different AWS compute and storage services as well as on-premises data sources at specified intervals.\r\n Details include:\r\nScheduling: Set up pipelines to run at regular intervals.\r\nFault Tolerance: Automatically retries failed tasks or cascades failures according to configuration.\r\nIntegration: Can connect various AWS services and even on-premises data sources",
        "tags": [],
        "keyFeatures": [],
        "actionWords": [],
        "codeExample": "Example & Detail:\r\n A basic JSON definition for a pipeline:\r\n{\r\n  \"pipelineId\": \"df-0123456789ABCDEF\",\r\n  \"name\": \"MyDataPipeline\",\r\n  \"pipelineObjects\": [\r\n    {\r\n      \"id\": \"Default\",\r\n      \"name\": \"Default\",\r\n      \"fields\": [\r\n        {\"key\": \"failureAndRerunMode\", \"stringValue\": \"CASCADE\"}\r\n      ]\r\n    }\r\n  ]\r\n}\r\n\r"
    },
    {
        "id": 42,
        "topic": "aws",
        "question": "What is AWS AppSync?\r",
        "answer": "AWS AppSync is a managed service that makes it easy to develop GraphQL APIs by handling the heavy lifting of securely connecting to data sources like DynamoDB, Lambda, or any HTTP data source.\r\n Key points:\r\nReal-Time Data: Supports subscriptions for real-time updates.\r\nOffline Support: Provides built-in caching and offline capabilities for mobile and web apps.\r\nData Sources: Easily connect to multiple data sources and perform complex data aggregation.\r\n",
        "tags": [],
        "keyFeatures": [],
        "actionWords": [],
        "codeExample": "Example & Detail:\r\n A simple GraphQL schema for AppSync:\r\ntype Query {\r\n  getBook(id: ID!): Book\r\n}\r\n\r\ntype Book {\r\n  id: ID!\r\n  title: String\r\n  author: String\r\n}\r\n\r"
    },
    {
        "id": 43,
        "topic": "aws",
        "question": "What is AWS IoT Core?\r",
        "answer": " AWS IoT Core enables secure, bi-directional communication between IoT devices and the AWS cloud. It supports device management, message brokering, and rules for processing device data.\r\n Additional details:\r\nSecurity: Utilizes mutual authentication and encryption for secure communication.\r\nRules Engine: Filter, transform, and route messages to other AWS services.\r\nDevice Shadows: Maintain a virtual representation of each device’s state.\r\n",
        "tags": [],
        "keyFeatures": [],
        "actionWords": [],
        "codeExample": "Example & Detail:\r\n A Python snippet using the AWS IoT Device SDK:\r\nimport AWSIoTPythonSDK.MQTTLib as AWSIoTPyMQTT\r\n\r\nmyMQTTClient = AWSIoTPyMQTT.AWSIoTMQTTClient(\"myClientID\")\r\nmyMQTTClient.configureEndpoint(\"your-endpoint.iot.us-east-1.amazonaws.com\", 8883)\r\nmyMQTTClient.connect()\r\nmyMQTTClient.publish(\"topic/test\", \"Hello, IoT!\", 1)\r\n\r"
    },
    {
        "id": 44,
        "topic": "aws",
        "question": "What is AWS Greengrass?",
        "answer": " AWS Greengrass extends AWS to edge devices so they can act locally on the data they generate while still using the cloud for management, analytics, and durable storage.\n\n\nKey points:\nLocal Execution: Enables devices to run AWS Lambda functions locally.\nData Synchronization: Syncs data between the edge and the cloud.\nSecurity: Manages device authentication and secure communication.\n",
        "tags": [],
        "keyFeatures": [],
        "actionWords": [],
        "codeExample": " Example & Detail:\n A JSON snippet defining a Greengrass group:\n{\n  \"GroupName\": \"MyGreengrassGroup\",\n  \"CoreDefinitionVersion\": {\n    \"Cores\": [\n      {\n        \"Id\": \"Core1\",\n        \"CertificateArn\": \"arn:aws:iam::123456789012:server-certificate/CoreCert\"\n      }\n    ]\n  }\n}"
    },
    {
        "id": 45,
        "topic": "aws",
        "question": "What is AWS Neptune?",
        "answer": " AWS Neptune is a fully managed graph database service optimized for storing and querying highly connected data. It supports both the property graph model (with Apache TinkerPop Gremlin) and the RDF model (with SPARQL).\r\n \r\n\r\nDetails include:\r\nGraph Models: Suitable for social networks, recommendation engines, and fraud detection.\r\nPerformance: Optimized for low-latency graph queries.\r\nManaged Service: Automatically handles backups, patching, and scaling.\r\n",
        "tags": [],
        "keyFeatures": [],
        "actionWords": [],
        "codeExample": "Example & Detail:\r\n Connecting using Gremlin in Java:\r\nCluster cluster = Cluster.build()\r\n    .addContactPoint(\"neptune-endpoint\")\r\n    .port(8182)\r\n    .create();\r\nClient client = cluster.connect();\r\nclient.submit(\"g.V().count()\");"
    },
    {
        "id": 46,
        "topic": "aws",
        "question": "What is AWS ElastiCache?",
        "answer": "AWS ElastiCache is a fully managed in-memory data store and cache service that supports Redis and Memcached. It is used to improve the performance of web applications by reducing database load.\r\nKey details:\r\nCaching Strategies: Improves application performance by caching frequently accessed data.\r\nScalability: Easily scale out by adding nodes to the cluster.\r\nManagement: Provides automatic software patching and failure detection.\r\n",
        "tags": [],
        "keyFeatures": [],
        "actionWords": [],
        "codeExample": " Example & Detail:\r\n Creating a Redis cluster using the CLI:\r\naws elasticache create-cache-cluster --cache-cluster-id my-redis-cluster \\\r\n  --engine redis --cache-node-type cache.t2.micro --num-cache-nodes 1\r\n\r"
    },
    {
        "id": 47,
        "topic": "aws",
        "question": "What is AWS WAF?\r",
        "answer": " AWS WAF (Web Application Firewall) protects your web applications by filtering and monitoring HTTP and HTTPS requests. It helps protect against common web exploits and vulnerabilities such as SQL injection and cross-site scripting (XSS).\r\n \r\n\r\nDetails include:\r\nCustom Rules: Define rules to block, allow, or count web requests based on IP addresses, HTTP headers, URI strings, etc.\r\nIntegration: Works with CloudFront, ALB, and API Gateway to provide edge protection.\r\nMonitoring: Provides real-time metrics and logs for analysis.\r\n",
        "tags": [],
        "keyFeatures": [],
        "actionWords": [],
        "codeExample": "Example & Detail:\r\n Creating a simple web ACL using the CLI:\r\naws waf create-web-acl --name my-web-acl --metric-name myWebACL --default-action Type=ALLOW"
    },
    {
        "id": 48,
        "topic": "aws",
        "question": "What is AWS Shield?\r",
        "answer": " AWS Shield is a managed Distributed Denial of Service (DDoS) protection service that safeguards applications running on AWS. There are two tiers: Standard (automatically available) and Advanced (providing additional detection and mitigation against more sophisticated attacks).\r\n Example & Detail:\r\n Standard AWS Shield is enabled by default on AWS resources. For Shield Advanced, you configure protection groups via the AWS Console or API. Key points include:\r\nDetection: Monitors and detects abnormal traffic patterns.\r\nMitigation: Automatically applies safeguards to mitigate DDoS attacks.\r\nReporting: Provides detailed reports and integration with CloudWatch for real-time monitoring.\r",
        "tags": [],
        "keyFeatures": [],
        "actionWords": [],
        "codeExample": ""
    },
    {
        "id": 49,
        "topic": "aws",
        "question": "What is AWS Outposts?\r",
        "answer": " AWS Outposts brings native AWS services, infrastructure, and operating models to virtually any data center, co-location space, or on-premises facility. It is designed for workloads that require low latency or local data processing.\r\n Example & Detail:\r\n Deployment and management of Outposts are handled via the AWS Console and APIs once the hardware is installed on your premises. Key details include:\r\nConsistency: Run the same AWS services on-premises as in the cloud.\r\nIntegration: Seamlessly integrates with AWS management and monitoring tools.\r\nUse Cases: Ideal for industries with strict latency, data residency, or regulatory requirements.\r",
        "tags": [],
        "keyFeatures": [],
        "actionWords": [],
        "codeExample": ""
    },
    {
        "id": 50,
        "topic": "aws",
        "question": "What is AWS Lambda@Edge?\r\n",
        "answer": " AWS Lambda@Edge extends AWS Lambda to AWS CloudFront edge locations, allowing you to run code closer to your users. This enables dynamic content customization, real-time image transformation, and more, while reducing latency.\n \n\nKey details:\nEdge Locations: Run your functions at AWS locations around the world, reducing response times.\nIntegration: Works with CloudFront to intercept and modify requests and responses.\nUse Cases: Content personalization, A/B testing, and URL rewrites.",
        "tags": [],
        "keyFeatures": [],
        "actionWords": [],
        "codeExample": "Example & Detail:\n A simple Node.js function for CloudFront:\nexports.handler = (event, context, callback) => {\n  const request = event.Records[0].cf.request;\n  // Modify request as needed, for example, add a custom header\n  request.headers['x-custom-header'] = [{ key: 'X-Custom-Header', value: 'MyValue' }];\n  callback(null, request);\n};"
    },
    {
        "id": 51,
        "topic": "aws",
        "question": "What is AWS CodeCommit?",
        "answer": " AWS CodeCommit is a fully managed source control service that hosts secure Git-based repositories. It offers high availability and scalability for managing code repositories.\r\n \r\n\r\nKey details include:\r\nSecurity: Data is encrypted at rest and in transit.\r\nIntegration: Works with other AWS services like CodeBuild and CodePipeline for end-to-end CI/CD.\r\nScalability: Automatically scales to accommodate growing codebases and teams.",
        "tags": [],
        "keyFeatures": [],
        "actionWords": [],
        "codeExample": "Example & Detail:\r\n Cloning a CodeCommit repository:\r\ngit clone https://git-codecommit.us-east-1.amazonaws.com/v1/repos/MyDemoRepo"
    },
    {
        "id": 52,
        "topic": "aws",
        "question": "What is AWS Batch?\n",
        "answer": " AWS Batch enables developers, scientists, and engineers to easily and efficiently run hundreds of thousands of batch computing jobs. It dynamically provisions the optimal quantity and type of compute resources based on the volume and specific resource requirements of the batch jobs submitted.\r\nKey details include:\r\nJob Queues: Organize and prioritize batch jobs.\r\nCompute Environments: Automatically manage the underlying compute resources.\r\nScaling: Supports large-scale, parallel batch processing.\r\n",
        "tags": [],
        "keyFeatures": [],
        "actionWords": [],
        "codeExample": " Example & Detail:\r\n Registering a container-based job definition using the CLI:\r\naws batch register-job-definition --job-definition-name my-job \\\r\n  --type container \\\r\n  --container-properties '{\"image\": \"my-docker-image\", \"vcpus\": 1, \"memory\": 512}'\r\n\r"
    },
    {
        "id": 53,
        "topic": "aws",
        "question": " What is AWS Cloud9?\n",
        "answer": "AWS Cloud9 is a cloud-based integrated development environment (IDE) that allows you to write, run, and debug your code with just a browser. It comes prepackaged with essential tools and supports multiple programming languages.\r\n\r\n\r\nKey points include:\r\nCollaboration: Share your development environment with your team.\r\nPreconfigured: Comes with essential tools (git, debuggers) already installed.\r\nAccessibility: Accessible from anywhere without local setup.\r\n",
        "tags": [],
        "keyFeatures": [],
        "actionWords": [],
        "codeExample": " Example & Detail:\r\n Creating a Cloud9 environment using the CLI:\r\naws cloud9 create-environment-ec2 --name MyCloud9Env --instance-type t2.micro"
    },
    {
        "id": 54,
        "topic": "aws",
        "question": "What is AWS Backup?\r\n",
        "answer": " AWS Backup is a centralized, fully managed service that makes it easy to back up data across AWS services. It helps automate and consolidate backup tasks, ensuring that your data is secure and compliant.\r\n \r\n\r\nKey details include:\r\nAutomation: Schedule backups without manual intervention.\r\nPolicy-Based: Apply backup policies uniformly across AWS services.\r\nCompliance: Helps meet regulatory compliance requirements.\r\n",
        "tags": [],
        "keyFeatures": [],
        "actionWords": [],
        "codeExample": "Example & Detail:\r\n Creating a backup plan using the CLI:\r\naws backup create-backup-plan --backup-plan '{\r\n  \"BackupPlanName\": \"MyBackupPlan\",\r\n  \"Rules\": [\r\n    {\r\n      \"RuleName\": \"DailyBackup\",\r\n      \"TargetBackupVaultName\": \"Default\",\r\n      \"ScheduleExpression\": \"cron(0 12 * * ? *)\",\r\n      \"StartWindowMinutes\": 60,\r\n      \"CompletionWindowMinutes\": 120\r\n    }\r\n  ]\r\n}'"
    },
    {
        "id": 55,
        "topic": "aws",
        "question": "What is AWS Cost Explorer?\r\n",
        "answer": " AWS Cost Explorer is a tool that helps you visualize, understand, and manage your AWS costs and usage over time. It provides detailed insights and trends, enabling you to optimize your spending.\r\nKey points include:\r\nVisualization: Interactive charts and graphs to analyze spending.\r\nForecasting: Predict future costs based on historical usage.\r\nReporting: Customizable reports to track spending and optimize resources.\r\n",
        "tags": [],
        "keyFeatures": [],
        "actionWords": [],
        "codeExample": " Example & Detail:\r\n Retrieving cost data for a specific period using the CLI:\r\naws ce get-cost-and-usage --time-period Start=2025-01-01,End=2025-01-31 \\\r\n  --granularity MONTHLY --metrics \"BlendedCost\"\r\n\r"
    }
]