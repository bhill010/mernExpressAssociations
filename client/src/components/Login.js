import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../actions';


class Login extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.logout = this.logout.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    var username = event.target.querySelector('.form__username').value;
    var password = event.target.querySelector('.form__password').value;

    this.props.login(username, password);
    // var body = { username: "Test6", password: "Testing" }
    // axios.post('/api/login', body)
    //   .then((response) => {
    //     console.log("Login Success!");
    //   })
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
  return { auth: state.username }
}

export default connect(mapStateToProps, { login })(Login);
