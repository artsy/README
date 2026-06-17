# Setting up Recommendations jobs for testing

Start with a folder or repo that has all the code *plus* a Dockerfile to help with running on AWS. Look at this [Dockerfile](https://github.com/artsy/entropy/blob/main/entropy/homefeed-artwork-reco/Dockerfile) for inspiration.

## Setting up AWS ECR
- In the [ECR dashboard](https://console.aws.amazon.com/ecr/repositories), you can create a new *private* repository by clicking the "Create repository" button on the top right.
- Use a descriptive name

After it's created, click the "View push commands" button on the top right to see the commands needed to run locally to upload a built docker image to ECR.
The steps are basically:
- get a login password
- build the docker image
- tag the docker image
- push the docker image

After all that, you should have an image with the `latest` image tag in the newly created ECR repository. Click on it and make a note of the "Image URI", we will need it later.

For more documentation, look [here](https://docs.aws.amazon.com/AmazonECR/latest/userguide/repository-create.html).

## Setting up AWS Batch
- Open the AWS Batch console first-run wizard at https://console.aws.amazon.com/batch/home#/wizard
- Set up the environment in step 1
  - Use EC2 for provisioning model
  - Add AMI ID: ami-025311bab82a7d064
  - Allowed instance types: r5a.8xlarge
  - Set 32 vCPUs 
  - Set 240000 memory
  - Make sure you select the right networking VPC ID (use production)
- Set up the job queue in step 2
  - Priorty 1 is the default, change it if needed
  - Select the compute environment that you created in step 1
- Set up the job definition in step 3
  - Set the image name in the container properties to be the `latest` Image URI from the ECR step above
  - Set the command (usually `python main.py`)
  - Select the job queue you created in step 2
  - Execution role should be `artsy-data-infrastructure-iam-core-task-exc-production`
  - Set "Assign public IP" to Enable (optional)
  - Just above Parameters, click on "Additional configuration" to set the envvars under "Environment variables configuration". (`DB_REDSHIFT_NAME`, etc)
- Set up the first job in step 4
  - Set the command, vCpus and Memory to whatever you used in the previous step
- Review in step 5 and you're done!

For more documentation, look [here](https://docs.aws.amazon.com/batch/latest/userguide/Batch_GetStarted.html).

## Setting up AWS EventBridge
In the [EventBridge dashboard](https://console.aws.amazon.com/events/home?region=us-east-1#/rules) you can create a new rule that will schedule job for you
- Click the "Create rule" button on the top right
- You can use the "Schedule" pattern, with either cron or a fixed rate
- Set the target to "Batch job queue"
- Fill in the form with the ARNs
  - Find "Job queue" in Batch. Click on "Job queues" and then click on your new job queue, and find the ARN.
  - Find "Job definition" in Batch. Click on "Job definitions" and then click on your new job definition, and find the ARN.
  - Enter a job name, that will be the name that each new job gets.
  - Create a new role for this specific resource

After all this, you should be able to see new jobs being created in the [ECR dashboard](https://console.aws.amazon.com/batch/home?region=us-east-1#dashboard)! Congrats.
