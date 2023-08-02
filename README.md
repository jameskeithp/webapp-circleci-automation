#Web App Deployment with CircleCI and DigitalOcean Kubernetes

This repository contains the necessary configuration files and instructions to set up an automated CI/CD pipeline using CircleCI for deployingyour web app to DigitalOcean Kubernetes.

Prerequisites

Before getting started, make sure you have the following prerequisites:
    • GitHub account
    • CircleCI account
    • DigitalOcean account

Step 1: Prepare your Web App Repository
    1. Set up your web application code repository on GitHub or any other version control platform of your choice. Make sure your repository c       ontains all the necessary code and configuration files to deploy your web app on Kubernetes.
    2. Organize your repository with the following structure (you can adjust it based on your app's structure):

/
|-- .circleci/
|   |-- config.yml
|
|-- deployment.yaml
|-- service.yaml
|-- ...
|-- your-app-code/
|-- ...
|-- Dockerfile
|-- ...
|-- other files and directories
|-- ...

In this structure, the .circleci directory will contain the CircleCI configuration file, and the Kubernetes deployment and service YAML files will be at the root level of the repository. Adjust the paths accordingly if your files are located in different directories.

Step 2: Configure CircleCI Environment Variables
    1. Sign in to your CircleCI account and link your GitHub repository.
    2. Go to your CircleCI project settings for the specific repository.
    3. In the "Environment Variables" section, add the following environment variables:
        ◦ DOCKER_REGISTRY_USERNAME: Set this to your Docker Hub (or any other container registry) username.
        ◦ DOCKER_REGISTRY_PASSWORD: Set this to your Docker Hub (or any other container registry) password.
        ◦ KUBECONFIG: Set this to the kubeconfig file content with the necessary credentials to access your DigitalOcean Kubernetes cluster.                        You can retrieve the kubeconfig content by running cat ~/.kube/config on your local machine.

Step 3: Create the CircleCI Configuration File
    1. In your local development environment, navigate to your web app repository.
    2. Create a .circleci directory in the root of your repository if it doesn't already exist.
    3. Inside the .circleci directory, create a config.yml file. This file will define your CI/CD pipeline.
    4. Open the config.yml file and add the following content:

version: 2.1

jobs:

  build:
    docker:
      - image: cimg/node:14.15.0
    steps:
      - checkout
      - setup_remote_docker
      - run:
          name: Build Docker image
          command: |
            docker build -t node-app .
            docker login -u $DOCKER_HUB_USERNAME -p $DOCKER_HUB_PASSWORD
            docker push node-app:latest

  deploy:
    docker:
      - image: cimg/base:stable
    steps:
      - checkout
      - run:
          name: Deploy to DigitalOcean Kubernetes
          command: |
            echo "$KUBE_CONFIG" | base64 --decode > kubeconfig.yaml
            kubectl --kubeconfig kubeconfig.yaml apply -f deployment.yaml
            kubectl --kubeconfig kubeconfig.yaml apply -f service.yaml

workflows:
  version: 2
  build-and-deploy:
    jobs:
      - build
      - deploy:
          requires:
            - build

Step 4: Commit and Push Your Changes
    1. Save the config.yml file.
    2. In your terminal, commit the .circleci directory and the config.yml file to your local Git repository:
       

       git add .circleci/config.yml
       git commit -m "Add CircleCI configuration file"
    3. Push the changes to your remote GitHub repository:
       
       git push origin master

Step 5: Trigger the CircleCI Pipeline
    1. In your CircleCI account, navigate to the project associated with your GitHub repository.
    2. You should see that CircleCI has automatically detected the configuration file (.circleci/config.yml) in your repository. CircleCI will       trigger the pipeline automatically when you push changes to the master branch.
    3. Verify that the pipeline is running without errors and observe the build and deployment process.

Conclusion

Congratulations! You have successfully set up an automated CI/CD pipeline using CircleCI to deploy your web app to DigitalOcean Kubernetes. CircleCI will automatically handle building, testing, and deploying your web app whenever changes are pushed to the master branch.

Feel free to customize the configuration file and workflow to suit your specific requirements and make your CI/CD pipeline even more robust.

That's it! The above README.md file provides comprehensive instructions for setting up your CI/CD pipeline using CircleCI and DigitalOcean Kubernetes. It includes details on preparing your repository, configuring CircleCI environment variables, creating the CircleCI configuration file, committing and pushing changes, and triggering the CircleCI pipeline. Make sure to replace placeholders like your-web-app and your-kube-context-name with actual values specific to your application and environment.

Feel free to customize the README.md file further by adding information about your application, deployment strategies, and any other relevant details that your team or collaborators might find useful.

