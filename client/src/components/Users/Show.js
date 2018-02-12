import React, { Component } from "react";
import { Link } from "react-router-dom";
import { fetchUser, deleteUser, fetchUsers } from "../../actions";
import { connect } from "react-redux";

import "../../style/Show.css";
import "../../style/App.css";

class Show extends Component {
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
    this.props.deleteUser(this.props.users.users._id);
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
    if (!this.props.users || !this.props.users.users.username) {
      return <div>Loading</div>;
    }
    let credentialID = this.props.auth.user._id;

    return (
      <div className="center_container">
        <h2>{this.props.users.users.username}'s SHOW Page</h2>
        <p className="input-group-text show-info">
          User ID: {this.props.users.users._id}
        </p>
        <div className="show-btn-container">
          <div className="show-btn__div">
            <Link
              className="btn btn-info show-link"
              to={`/credential/${credentialID}/users/${
                this.props.users.users._id
              }/edit`}
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
          <button className="btn btn-success top_margin" onClick={this.showIndexReturn}>
            Return to /users
          </button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { users: state.users, auth: state.auth };
}

export default connect(mapStateToProps, { fetchUser, fetchUsers, deleteUser })(
  Show
);
