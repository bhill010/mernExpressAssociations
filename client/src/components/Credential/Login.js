import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { login, logout } from "../../actions";

import axios from "axios";

class Login extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.logout = this.logout.bind(this);
    this.errorHandler = this.errorHandler.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    var username = event.target.querySelector(".form__username").value;
    var password = event.target.querySelector(".form__password").value;

    this.props.login(username, password, redirectPath => {
      this.props.history.push(redirectPath);
    });
  }

  logout(event) {
    event.preventDefault();
    this.props.logout(redirectPath => {
      this.props.history.push(redirectPath);
    });
  }

  errorHandler() {
    var error = "";
    if (this.props.auth.errorMessage.message) {
      error = this.props.auth.errorMessage.message;
    }

    return error;
  }

  render() {
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
          <input className="btn btn-primary form__submit" type="submit" />
        </form>
        <button className="btn btn-info btn-flex" onClick={this.logout}>
          Test Logout
        </button>
        <Link className="btn btn-success" to="/users">
          Back to /users
        </Link>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth };
}

export default connect(mapStateToProps, { login, logout })(Login);