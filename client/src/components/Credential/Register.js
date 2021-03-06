import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { register, clearLoginErrors, clearAuthErrors } from "../../actions";

import "../../style/App.css";

class Register extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.errorHandler = this.errorHandler.bind(this);
  }

  componentWillUnmount() {
    this.props.clearAuthErrors();
  }

  onSubmit(event) {
    event.preventDefault();
    var username = event.target.querySelector(".form__username").value;
    var password = event.target.querySelector(".form__password").value;

    this.props.register(username, password, redirectPath => {
      this.props.history.push(redirectPath);
    });
  }

  errorHandler() {
    var error = "";
    if (this.props.auth.errorMessage.message) {
      error = this.props.auth.errorMessage.message;
      return error;
    } else if (this.props.auth.errorMessage) {
      error = this.props.auth.errorMessage;
    }

    return error;
  }

  render() {
    return (
      <div className="center_container">
        <h3>Register Page</h3>
        <div>{this.errorHandler()}</div>
        <form className="form" onSubmit={this.onSubmit}>
          <input
            className="form-control form__input form__username right_margin"
            type="text"
            name="username"
            placeholder="name"
          />
          <input
            className="form-control form__input form__password right_margin"
            type="password"
            name="password"
            placeholder="password"
          />
          <input className="btn btn-primary form__submit" type="submit" />
        </form>
        <Link className="btn btn-success top_margin" to="/users">
          Back to /users
        </Link>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth };
}

export default connect(mapStateToProps, { register, clearAuthErrors })(Register);
