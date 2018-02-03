import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


class Login extends Component {
  constructor(props) {
    super(props);

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  login(event) {
    event.preventDefault();
    var body = { username: "Test6", password: "Testing" }
    axios.post('/api/login', body)
      .then((response) => {
        console.log("Login Success!");
      })
  }

  logout(event) {
    event.preventDefault();
    axios.get('/api/logout')
      .then(response => {
        console.log("logged out successfully");
      })
  }

  render() {
    return (
      <div>
        <button
          className="btn btn-info btn-flex"
          onClick={this.login}>Test Login</button>
        <button
          className="btn btn-info btn-flex"
          onClick={this.logout}>Test Logout</button>
        <Link className="btn btn-success" to="/users">Back to /users</Link>
      </div>
    )
  }
}

export default Login;
