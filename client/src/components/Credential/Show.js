import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchUsers } from "../../actions";

import _ from "lodash";

import "../../style/App.css";
import "../../style/CredentialShow.css";

class CredentialShow extends Component {
  constructor(props) {
    super(props);

    this.showIndexReturn = this.showIndexReturn.bind(this);
  }

  showIndexReturn(event) {
    event.preventDefault();
    this.props.fetchUsers();

    setTimeout(() => {
      this.props.history.push("/users");
    }, 1000);
  }

  isIdValid(user, userOwnerID, ownerID) {
    if (userOwnerID == ownerID) {
      return (
        <li
          className="list-group-item list-group-item-dashboard"
          key={user._id}
        >
          {user.username}
        </li>
      );
    }
  }

  render() {
    if (!this.props.users) {
      return <div>Loading</div>;
    }

    let filteredUsers = this.props.users.users.filter(x => x);
    return (
      <div className="dashboard-container">
        <h1 className="component-header">
          {this.props.auth.user.username}'s Dashboard
        </h1>
        <h3>Your list of created users:</h3>
        <ul className="list-group list-group-dashboard">
          {_.map(filteredUsers, (user, idx) => {
            return (
              <div key={idx}>
                {this.isIdValid(user, user.owner.id, this.props.auth.user._id)}
              </div>
            );
          })}
        </ul>
        <button
          className="btn btn-success btn-dashboard-users"
          onClick={this.showIndexReturn}
        >
          Return to /users
        </button>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return { auth: state.auth, users: state.users };
}

export default connect(mapStateToProps, { fetchUsers })(CredentialShow);
