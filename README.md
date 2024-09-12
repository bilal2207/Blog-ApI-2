
# Blog App

A RESTful API built with Node.js and Express.js for managing blog users and articles. It uses MongoDB for data storage and JWT for authentication.



## Project Setup
In order to spin up the project, in the root create .env with these three variables, with your own values.

### Set Up Environment Variables
MONGO_URL
JWT_SECRET
PORT

After that run this command

npm install && npm start

## API Endpoint 
User Authentication:

### Register: POST /api/v1/register
Login: POST /api/v1/login
Get Profile: GET /api/v1/get-profile (requires authentication)
Article Management:

Get All Articles: GET /api/v1/articles
Get Article by ID: GET /api/v1/articles/:id
Create Article: POST /api/v1/articles (requires authentication)
Update Article: PUT /api/v1/articles/:id (requires authentication)
Delete Article: DELETE /api/v1/articles/:id (requires authentication)


## Using Postman

### 1. Set Up Authentication
Register a User:

Method: POST
URL: http://localhost:5000/api/v1/register
Body:
json
Copy code
{
  "username": "your-username",
  "email": "your-email",
  "password": "your-password"
}
### Login:

Method: POST
URL: http://localhost:5000/api/v1/login
Body:
json
Copy code
{
  "email": "your-email",
  "password": "your-password"
}
Save the JWT token from the response.
### Get Profile:

Method: GET
URL: http://localhost:5000/api/v1/get-profile
Headers:
plaintext
Copy code
Authorization: Bearer <your-jwt-token>

## 2. Test Article Endpoints

### Get All Articles:

Method: GET
URL: http://localhost:5000/api/v1/articles
Get Article by ID:

Method: GET
URL: http://localhost:5000/api/v1/articles/:id
Create an Article:

Method: POST
URL: http://localhost:5000/api/v1/articles
Headers:
plaintext
Copy code
Authorization: Bearer <your-jwt-token>
Body:
json
Copy code
{
  "title": "Article Title",
  "content": "Article Content"
}
### Update an Article:

Method: PUT
URL: http://localhost:5000/api/v1/articles/:id
Headers:
plaintext
Copy code
Authorization: Bearer <your-jwt-token>
Body:
json
Copy code
{
  "title": "Updated Title",
  "content": "Updated Content"
}
### Delete an Article:

Method: DELETE
URL: http://localhost:5000/api/v1/articles/:id
Headers:
plaintext
Copy code
Authorization: Bearer <your-jwt-token>


## Prerequisites
Node.js and npm installed on your machine
Git installed on your machine
