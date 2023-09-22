# Task Management API 

`Description`

A task management API implementation used to manage tasks... using Express, Ejs and MongoDB


## Features
* An endpoint `/create` that add a task
* An endpoint `/ `that shows all tasks 
* An endpoint `/task/:id` that get a particular task 
* An endpoint `/edit/:id` that edit a task
* An endpoint `/delete/:id` that delete a task
  

## Getting Started
    Prerequisites
 * Node.js (Install from https://nodejs.org/)
 * npm (Comes bundled with Node.js)
  
  Installation
  1. Clone the repo to your local machine using git  

2. Navigate into project directory and install dependencies
 ```
   cd task-manager
```
3. Install node modules
  ```
yarn 
   ```
## Usage
```
yarn start to start server using node
yarn start:dev to start server using nodemon
```
* The server will start on port 3000. You can access the API at http://localhost:3000.



## Endpoints
 Create a Task 
 ` POST /create`

 Request 

```
"title": "Create a Task"
"description" : "description of task created"

```

Response 

```
redirect("http://localhost:3000")
```

get all Task 
 ` GET /`

Response 
```
redirect("http://localhost:3000")
```

get all Task 
 ` GET /task/:id`

Response 
```
redirect("http://localhost:3000/task/3627387272273")
```

edit all Task 
 ` POST /edit/:id`

 Request 

```
"title": "Create a Task"
"description" : "description of task created",
"completed": true

```

Response 
```
redirect("http://localhost:3000")
```

delete all Task 
 ` POST /delete/:id`

Response 
```
redirect("http://localhost:3000")
```