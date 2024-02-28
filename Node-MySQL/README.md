## HOW IT'S GOING TO WORK

- creating note.

Here's a guide on how you can effectively utilize this API

## 🏁 Installation

## 💻 Running locally

To run the project locally, follow these steps:

1. Install [NPM](https://www.npmjs.com/), [NodeJs](https://www.nodejs.org/), and [Sequalize](https://sequelize.org/) on your machine.
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

- `PORT`: Keep the value unchanged at 5000 to access the Swagger documentation after deployment.
- `DB_NAME`: Specify your database name.
- `DB_USER`: Enter your MySQL database username.
- `DB_PASSWORD`: Provide your MySQL database password.

6. Once you fill in the required environment parameters.

# 📜 Docs START

Main path - (http://localhost:5000): http://localhost:5000

# # AUTHENTICATION

# CREATE

- POST /api/notes/create -> create note
  Request Body:
  {
  "title": "string",
  "content": "text"
  }
  Response:
  {
  "message": "success"
  }

# GET ALL

- GET /api/notes/getall -> Register new user .

  Response:
  {
  "message": "success"
  }

# GET BY ID

- GET /api/notes/getbyid -> Register new user .
  Request params:
  {
  "id": "int",
  }
  Response:
  {
  "message": "success"
  }

# UPDATE
- PUT /api/notes/update/1
  Request Body:{
  "title":"TETS",
  "content":"TETSING "
  }
  Response:
  {
  "message": "success"
  }

# 📜 Docs END
