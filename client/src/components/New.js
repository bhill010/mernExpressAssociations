import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import "../style/New.css";
import "../style/App.css";

class New extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: ""
    }
  }

  onChange = (event) => {
    const state = this.state;
    state[event.target.name] = event.target.value;
    this.setState(state)
  }

  onSubmit(event) {
    event.preventDefault();
    const username = this.state.username;

    axios.post('/users', { username })
          .then((response) => {
            this.props.postState(response)
          })
          .then(() => {
            this.props.history.push('/')
          })
  }
  render() {
    return (
      <div className="form__container">
        <form className="form" onSubmit={this.onSubmit}>
          <input
            className="form-control form__input"
            type="text"
            name="username"
            placeholder="name"
            value={this.state.username}
            onChange={this.onChange}/>
          <input className="btn btn-primary form__submit" type="submit"/>
        </form>
        <div>
          <Link className="btn btn-success btn-bottom" to="/">Return to /users</Link>
        </div>
      </div>
    )
  }

}

export default New;
