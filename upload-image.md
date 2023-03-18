To upload the Docker image to Docker Hub, you need to follow these steps:

Log in to Docker Hub using the docker login command in the terminal.
Tag the Docker image with your Docker Hub username and the name of your repository using the docker tag command. The syntax is:
php
Copy code
docker tag <image-id> <dockerhub-username>/<repository-name>:<tag>
For example:
bash
Copy code
docker tag football-app:latest yourusername/football-app:latest
Push the Docker image to Docker Hub using the docker push command. The syntax is:
php
Copy code
docker push <dockerhub-username>/<repository-name>:<tag>
For example:
bash
Copy code
docker push yourusername/football-app:latest
Once the Docker image is uploaded, you can access it on Docker Hub.
Note: You need to create a repository on Docker Hub with the same name as your repository in step 2. Also, make sure that your Docker Hub account has the necessary permissions to push images to the repository.