import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createUser } from '../actions';


import "../style/New.css";
import "../style/App.css";

class New extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    // const username = this.state.username;

    this.props.createUser(event.target.querySelector('.form__input').value)
    this.props.history.push('/')
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
            />
          <input className="btn btn-primary form__submit" type="submit"/>
        </form>
        <div>
          <Link className="btn btn-success btn-bottom" to="/">Return to /users</Link>
        </div>
      </div>
    )
  }

}

function mapStateToProps(state) {
  return { users: state.users }
}

export default connect(mapStateToProps, { createUser })(New);
