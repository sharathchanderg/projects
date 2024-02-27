## HOW IT'S GOING TO WORK

- We are endeavoring to develop a unified API in Node.js capable of handling user operations. This API will empower users to construct their own front-end web and mobile applications for tasks such as registration, login, and other CRUD operations.

Here's a guide on how you can effectively utilize this API

## 🏁 Installation

## 💻 Running locally

To run the project locally, follow these steps:

1. Install [NPM](https://www.npmjs.com/), [NodeJs](https://www.nodejs.org/), [MongoDB](https://www.mongodb.com) and [MongoDB Compass (optional)](https://www.mongodb.com/products/compass) on your machine.
2. Clone the project repository.
3. Navigate to the project directory.
4. Create `.env` file in the root folder and copy paste the content of `.env.sample`, and add necessary credentials.
5. Install the packages:

```
npm install
```

6. Run the project:

```
npm run start
```

7. Access the project APIs at the specified endpoints.

### Project APIs

For Environment variables, we have provided some default values in the `ENV` to reduce the burden, but some parameters are mandatory:

- `PORT`: Do not change the value, let it be set to 4500 to view the swagger docs after deployment.
- `MONGODB_URL`: Provide the MongoDB Atlas database URL. An example is prefilled for you, edit/update it to continue.
- `ACCESS_TOKEN_SECRET`: It is advised to change the default value to your own secret value.
- `ACCESS_TOKEN_EXPIRY`: Set to 2 days as default.

6. Once you fill in the required environment parameters.

.

# 📜 Docs START

Main path - (http://localhost:4500): http://localhost:4500

# # AUTHENTICATION

# LOGIN

- POST /api/user/login -> Login user and return access token.
  Request Body:
  {
  "eamil": "string",
  "password": "string"
  }
  Response:
  {
  "accessToken": "string"
  }

# REGISTRATION

- POST /api/user/register -> Register new user .
  Request Body:
  {
  "eamil": "string",
  "name": "string",
  "description": "string"
  "password": "string"
  }
  Response:
  {
  "message": "success"
  }

# # SECURED APIs

1. All routes under this are secured by an Access Token, which should be sent in a header with key 'Authorization' and value 'Bearer
2. All routes under this section are secured by an Access Token, which needs to be sent via a header called 'Authorization'. The format of the Author
3. All routes under this are secured with JWT middleware, so a valid Access Token must be provided in headers for accessing these endpoints.

get all users info (/api/user) -> Need Bearer Token.

> Note that, JWT is used for authentication. So, You need to add `Bearer` + `<Access_token>` on Authorization tab of Postman or request header

## USER PROFILE APIS

# GET PROFILE

- GET /getuser -> Get current logged in user's profile information. Need Bearer Token.

  Response:
  {
  "email":"test@gmail.com",
  "name":"John Doe",
  "description:"I am John Doe.",  
   "_id":"6358f887f9b038f4e1d553e6"
  }

# UPDATE PROFILE

- PUT /updateuser -> Update the current logged in user's profile information. Need Bearer Token.
  Request Body:
  {
  "eamil": "string",
  "name": "string",
  "description": "string"
  }

  Response:
  {
  "message":"User updated successfully"  
   }

# DELETE PROFILE

- DELETE /deleteuser -> Delete the current logged in user account. Need Bearer Token.
  Response:
  {
  "message":"Account deleted successfully"  
   }

# 📜 Docs END
