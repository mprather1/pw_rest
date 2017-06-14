## Purple Wave Project

### Synopsis

    REST API - GET, POST, PUT and DELETE
    
    Example database entry:
    
      {
        attribute: <integer>,
        created_at: <timestamp> # created automatically,
        id: <integer> # primary key - created automatically,
        name: <string
      }

### Installation

    git clone https://github.com/mprather1/pw_rest
    
### Usage

    ./install
    
    # note production environment does not exist yet - setting NODE_ENV to production will cause errors
    
    # to start server
    
    NODE_ENV=development PORT=<port> TZ='America/Chicago' DB_USER=<user> DB_HOST=<host> DB_NAME=<database> DB_PASSWORD=<password> npm start
    
    # to run tests
    
    PORT=<port> TZ='America/Chicago' DB_USER=<user> DB_HOST=<host> DB_NAME=<database> DB_PASSWORD=<password> npm test
    
    # note TZ does not always work but it is there anyway
    
#### Routes

Note: use curl, httpie or postman - examples here are given using httpie

#### GET /api/models

    http http://<host>:<port>/api/models
    
#### GET /api/models/:id

    http http://<host>:<port>/api/models/<id>

#### POST /api/models

    http -f POST http://<host>:<port>/api/models name=<string> attribute=<integer>
    
#### PUT /api/models/:id
  
    http PUT http://<host>:<port>/api/models/<id> name=<string> attribute=<integer>
    
#### DELETE /api/models/:id

    http DELETE http://<host>:<port>/api/models/<id>