import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { fetchUser, deleteUser, fetchUsers } from "../actions";
import { connect } from "react-redux";

import "../style/Show.css";

class Show extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    var full_url = document.URL;
    var url_array = full_url.split("/");
    var last_segment = url_array[url_array.length - 1];

    this.props.fetchUser(last_segment);
    this.showIndexReturn = this.showIndexReturn.bind(this);
    this.deleteIndexReturn = this.deleteIndexReturn.bind(this);
  }

  deleteIndexReturn(event) {
    event.preventDefault();
    this.props.deleteUser(this.props.users._id);
    this.props.fetchUsers();
    this.props.history.push("/users");
  }

  showIndexReturn(event) {
    event.preventDefault();
    this.props.fetchUsers();

    setTimeout(() => {
      this.props.history.push("/users");
    }, 1000);
  }

  render() {
    if (!this.props.users || !this.props.users.username) {
      return <div>Loading</div>;
    }
    return (
      <div>
        <h2>Profile page for: {this.props.users.username}</h2>
        <p className="input-group-text show-info">
          User ID: {this.props.users._id}
        </p>
        <div className="show-btn-container">
          <div className="show-btn__div">
            <Link
              className="btn btn-info show-link"
              to={`/users/${this.props.users._id}/edit`}
            >
              PUT
            </Link>
          </div>
          <div className="show-btn__div">
            <button
              className="btn btn-danger show-link"
              onClick={this.deleteIndexReturn}
            >
              DELETE
            </button>
          </div>
        </div>
        <div>
          <button className="btn btn-success" onClick={this.showIndexReturn}>
            TEST RETURN TO /USERS
          </button>
        </div>
        <div>
          <Link className="btn btn-success btn-bottom" to="/">
            Return to /users
          </Link>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { users: state.users };
}

export default connect(mapStateToProps, { fetchUser, fetchUsers, deleteUser })(
  Show
);
