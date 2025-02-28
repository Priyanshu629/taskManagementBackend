# Task Management Backend

==========================
## Tech stack used

- Node.js with TypeScript
- Express.js for the server
- MongoDB for database
- Mongoose for MongoDB ORM



## How to run the project
### 1. Clone The Repo

`git clone "https://github.com/Priyanshu629/taskManagementBackend"`

### 2 . Install dependencies

 `npm install`

### 3 . Run the project

`npm run dev`

## Live APIs Link 🔗 : https://taskmanagementbackend-0b1r.onrender.com/api/tasks
### Add "/:id" further for specific Apis

## APIs

### 1. Create Task
### http://localhost:3000/api/tasks
### Method: POST
### Request Body: title , description , deadline and priority 
### Response: success (200)

### 2. Get Tasks
### http://localhost:3000/api/tasks
### Method: GET

### Response: Tasks array object

### 3. Get individual Task
### http://localhost:3000/api/tasks/:id
### Method: GET

### Request: Task Id 
### Response: Task array object 

### 4. Update a task title , description , deadline or priority
### http://localhost:3000/api/tasks/:id
### Method: PUT

### Request: Task Id 
### Response: success(200) with updated task


### 5. Update category of task (To Do , In Progress , Done)
### http://localhost:3000/api/tasks/:id
### Method: PATCH
### Request: Task Id , category
### Response: success(200) with updated category

### 6. Delete a task
### http://localhost:3000/api/tasks/:id
### Method: DELETE
### Request: Task Id
### Response: success(200) 

### 6. Get live streams data
### http://localhost:3000/api/tasks/streaming
### Method: GET
### Response: success(200) with data


