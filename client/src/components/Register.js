import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { register } from '../actions';


class Register extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    var username = event.target.querySelector('.form__username').value;
    var password = event.target.querySelector('.form__password').value;

    this.props.register(username, password);
    // var body = { username: "Test6", password: "Testing" }
    // axios.post('/api/register', body)
    //   .then((response) => {
    //     console.log("Success!");
    //   })

  }

  // register(event) {
  //   event.preventDefault();
  //   var body = { username: "Test6", password: "Testing" }
  //   axios.post('/api/register', body)
  //     .then((response) => {
  //       console.log("Success!");
  //     })
  // }

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
        <Link className="btn btn-success" to="/users">Back to /users</Link>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { auth: state.username }
}

export default connect(mapStateToProps, { register })(Register);
