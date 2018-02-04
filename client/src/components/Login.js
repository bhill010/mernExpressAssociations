import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { login, logout } from '../actions';

import axios from 'axios';

class Login extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.logout = this.logout.bind(this);
    this.errorHandler = this.errorHandler.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    var username = event.target.querySelector('.form__username').value;
    var password = event.target.querySelector('.form__password').value;

    this.props.login(username, password, (redirectPath) => {
      this.props.history.push(redirectPath)
    });
    // var body = { username: "Test6", password: "Testing" }
    // axios.post('/api/login', body)
    //   .then((response) => {
    //     console.log("Login Success!");
    //   })
  }

  logout(event) {
    event.preventDefault();
    this.props.logout(redirectPath => {
      this.props.history.push(redirectPath)
    });
    // axios.get('/api/logout')
    //   .then(response => {
    //     console.log("logged out successfully");
    //   })
  }

  errorHandler() {
    var error = "";
    if (this.props.auth.errorMessage) {
      // console.log("there's an error!");
      error = this.props.auth.errorMessage;
    }

    return error;
  }

  render() {
    console.log("auth state: ", this.props.auth);
    // console.log("error handler: ", this.errorHandler());
    return (
      <div>
        <h3>Login Page</h3>
        <div>{this.errorHandler()}</div>
        <form className="form" onSubmit={this.onSubmit}>
          <input
            className="form-control form__input form__username"
            type="text"
            name="username"
            placeholder="name"
            />
          <input
            className="form-control form__input form__password"
            type="text"
            name="password"
            placeholder="password"
            />
          <input className="btn btn-primary form__submit" type="submit"/>
      </form>
        <button
          className="btn btn-info btn-flex"
          onClick={this.logout}>Test Logout</button>
        <Link className="btn btn-success" to="/users">Back to /users</Link>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { auth: state.auth }
}

export default connect(mapStateToProps, { login, logout })(Login);
