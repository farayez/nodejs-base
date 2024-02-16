# Sample Node.js application

This repository is a sample Node.js application for Docker's documentation.

Created using guidelines from https://docs.docker.com/language/nodejs/

# Essential commands
- Build image and start application
    ```
    docker compose up --build
    ```
- Detatched mode
    ```
    docker compose up -d --build
    ```
- Enter container terminal
    ```
    docker compose exec server sh
    ```
- Enter container terminal as root user
    ```
    docker compose exec -u root server sh
    ```
- Stop and remove containers
    ```
    docker compose down
    ```
- Run tests
    ```
    docker compose run server npm run test
    ```
- Build new image using test stage and run tests
    ```
    docker build -t nodejs-base-server --progress=plain --no-cache --target test .
    ```
- Docker CLI access
    ```
    docker login -u farayez
    dckr_pat_JnryyvcbHA-Y3Gd2dBWhdULUnvc
    ```

## Local Kubernetes deployment
- deploy to local kubernetes
    ```
    kubectl apply -f docker-node-kubernetes.yaml
    ```
- List deployments
    ```
    kubectl get deployments
    ```
- List services
    ```
    kubectl get services
    ```
- Tear down application
    ```
    kubectl delete -f docker-node-kubernetes.yaml
    ```