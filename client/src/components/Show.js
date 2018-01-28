import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import "../style/Show.css";

class Show extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      id: ""
    }
  }

  componentDidMount() {

    var full_url = document.URL;
    var url_array = full_url.split('/');
    var last_segment = url_array[url_array.length-1];

    axios.get(`/users/${last_segment}`)
         .then(response => {
           let username = response.data.username;
           let id = response.data._id;

           this.setState({ username: username, id: id});
         });
  }

  render() {
    if(this.state.username === "") {
      return <div>Loading...</div>
    }
    return (
      <div>
        <h2>Profile page for: {this.state.username}</h2>
        <p className="input-group-text show-info">User ID: {this.state.id}</p>
        <div className="show-btn-container">
          <div className="show-btn__div">
            <Link className="btn btn-info show-link" to={`/users/${this.state.id}/edit`}>PUT</Link>
          </div>
          <div className="show-btn__div">
            <button className="btn btn-danger show-link" onClick={(e) => { e.preventDefault(); this.props.deletePerson(this.state.id); this.props.history.push('/')}}>
              DELETE
            </button>
          </div>
        </div>
        <div>
          <Link className="btn btn-success btn-bottom" to="/">Return to /users</Link>
        </div>
      </div>
    )
  }

}

export default Show;
