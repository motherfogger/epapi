# epapi
expressJS + postgres + api setup


### tech includes
expressJS 
<br>
postgreSQL [node-postgres](https://node-postgres.com/)
<br>
[jwt](https://github.com/auth0/node-jsonwebtoken)
<br>
REST API (json)


## Running in development

Clone the repo or setup your way to epapi-stack

   ```bash
    git clone https://github.com/motherfogger/epapi.git
   ```
---

Install
    ```bash
    cd epapi
    npm install
    ```

Setup .env file (copy from .env.sample) and Run

```bash
npm run dev
```

---

Run database seed (optional if starting development to have dummy users)

```bash
npm run seed
```

---

## Running in production

```bash
npm start
```

Runs on localhost:3000 by default but can be configured using the `PORT` environment variable.


---


## Running tests

```bash
npm test

# Watch repo
npm run test:watch
```

### Linting

```bash
npm run lint
npm run lint:fix
```