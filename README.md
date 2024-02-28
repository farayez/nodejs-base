# Sample Node.js application

This is a [NodeJS](https://nodejs.org/dist/latest-v21.x/docs/api/) + [Express](https://expressjs.com/en/4x/api.html) codebase integrated with enterprise-level features, allowing for quick setup and development.

## Features
- Containerized Development Environment using [Docker Compose](https://docs.docker.com/compose/)
- Authentication using [Auth0](https://auth0.com/)
- Database integration using [Sequelize v6](https://sequelize.org/docs/v6/)
- Unit Tests using [Jest v29.7](https://jestjs.io/docs/getting-started)
- E2E Tests using [Supertest](https://www.npmjs.com/package/supertest)

## Disclaimers

This repository uses Javascript with [ECMAScript](https://nodejs.org/api/esm.html) syntax. No transpilation is done, which means some statements will vary greately from their CommonJS counterparts.

**This project is still under development, and I appreciate your understanding of any potential imperfections.**

## Dependencies

- Required applications
    - [Docker Desktop](https://www.docker.com/products/docker-desktop/)
    - [Docker Compose](https://docs.docker.com/compose/)
- Good to have applications
    - IDE [VS Code](https://code.visualstudio.com/)

## Setup
- [Clone](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository)/[Fork](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo)/[Duplicate](https://docs.github.com/en/repositories/creating-and-managing-repositories/duplicating-a-repository) this repository
- Go inside the repo directory
- Start the container.
    ```bash
    docker compose up --build server
    ```
- The demo webpage will be available on http://localhost:3001/
- The demo api endpoints will be available at http://localhost:3001/api

## Development

### Enter a running container

**Note**: If the container is not running, start it following [Build images and start the ecosystem](#build-images-and-start-the-ecosystem).

- For `server` container
    ```bash
    docker compose exec server sh
    ```

### After any `package.json` update

After a `package.json` update the `package-lock.json` will not update automatically. In order to update the lock file you need to enter the container and run `npm install`.

- [Enter a running container](#enter-a-running-container)
- Install dependencies
    ```bash
    npm install
    ```

### After any `.env` update

After a `.env` file update the config will not be refreshed in the running app automatically. In order to use the updated config you need restart the container.

- Stop container
- Start container
    ```bash
    docker compose up --build server api
    ```

## Running Migrations
- [Enter a running container](#enter-a-running-container)
- `npm run migrate`

## Testing

### Run Jest tests for server
- [Enter a running container](#enter-a-running-container)
- Run tests
    ```bash
    npm run test
    ```

## Author

- [Araf Farayez](https://github.com/farayez)

## References and Contributions
- https://github.com/sahat/hackathon-starter
- https://docs.docker.com/language/nodejs/

## License

This project is licensed under the MIT license. See the [LICENSE](./LICENSE) file for more info.

# Essential commands

## Docker Compose
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
