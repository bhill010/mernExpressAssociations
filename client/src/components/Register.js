import React, { Component } from 'react';
import axios from 'axios';


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
      <button onClick={this.register}>Test Regiser</button>
    )
  }
}

export default Register;
