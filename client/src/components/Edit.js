import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { updateUser } from '../actions';

import "../style/Edit.css";
import "../style/App.css";

class Edit extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    var full_url = document.URL;
    var url_array = full_url.split('/');
    var last_segment = url_array[url_array.length-2];

    this.props.updateUser(last_segment);

    axios.get(`/users/${last_segment}`)
          .then((response) => {
            let username = response.data.username;

            this.setState({ username: username });
          })
  }

  onChange = (event) => {
    const state = this.state;
    state[event.target.name] = event.target.value;
    this.setState(state)
  }

  onSubmit(event) {
    event.preventDefault();
    var full_url = document.URL;
    var url_array = full_url.split('/');
    var last_segment = url_array[url_array.length-2];

    const username = this.state.username;
    console.log("new username", username);

    axios.put(`/users/${last_segment}`, { username })
          .then((response) => {
            console.log(response);
            this.props.fetchUsers();
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

export default connect(mapStateToProps, { updateUser })(Edit);
