# epapi
express + postgres + api setup


### tech includes
expressJS 
postgreSQL (node-postgres)
jwt (session)
api (json)


## Running in development

1. clone the repo or setup your way to epapi-stack

   ```bash
    git clone https://github.com/motherfogger/epapi.git
   ```

2. Install
    ```bash
        cd epapi
        npm install
    ```

3. Setup .env file and Run

```bash
    npm run dev
```






## Running in production

```
npm start
```

Runs on localhost:3000 by default but can be configured using the `PORT` environment variable.

### Running tests

```
npm test

# Watch repo
npm run test:watch
```

### Linting
```
npm run lint

# fix issues
npm run lint:fix
```