# MERN Fullstack Template

[MERN Fullstack Template](https://mern-express-associations.herokuapp.com/users)

This project is a simple Fullstack app that incorporates React.js/Redux and Node.js.
The app is very simple -- after registering and logging in, you can create, read, update,
and delete users. CRUD functionality is executed while adhering to RESTful routing conventions.

## Implementation Details

### Authorization

The Passport.js library is used to handle authentication. The Local strategy
is used to receive a username and password for verification. The authentication
also creates permissions, where users can only edit content that they have created
themselves.

### CRUD

Node.js, Express, and MongoDB power the backend. The Mongoose library is used
as an ORM to assist with handling updating data in Mongo, whereas Express provides useful
utility functions for server handling within the Node.js environment.

### Model Structure

There are two models -- Credential and Users. Whenever someone registers, a new
Credential is created. A Credential is the parent model to Users, which form the basis
of the data displayed in the CRUD functionality.

Credential Model
```javascript
let credentialSchema = new mongoose.Schema({
  username: String,
  password: String,
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ]
});
```

Users Model
```javascript
let userSchema = new mongoose.Schema({
  username: String,
  owner: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  }
});
```

### Create React App + Node.js

The frontend of this project was deployed using the Create React App module provided
by Facebook. Because Create React App is built with its own frontend server, a proxy was used
in the client-side package.json to route requests to the server.

### Other Key Technologies Used

- Redux Persist: Library to help redux store maintain state after page refresh
- Redux Thunk: Library to assist with asynchronous actions communicating with reducers
- Axios: Library for making asynchronous requests to backend API

Thank you for reading!
