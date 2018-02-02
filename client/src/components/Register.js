import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


class Register extends Component {
  constructor(props) {
    super(props);

    this.register = this.register.bind(this);
  }

  register(event) {
    event.preventDefault();
    var body = { username: "Test6", password: "Testing" }
    axios.post('/api/register', body)
      .then((response) => {
        console.log("Success!");
      })
  }

  render() {
    return (
      <div>
        <button
          className="btn btn-info btn-flex"
          onClick={this.register}>Test Register</button>
        <Link className="btn btn-success" to="/users">Back to /users</Link>
      </div>
    )
  }
}

export default Register;
