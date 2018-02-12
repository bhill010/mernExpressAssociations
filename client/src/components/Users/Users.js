import React, { Component } from "react";
import { Link } from "react-router-dom";
import _ from "lodash";
import { fetchUsers, deleteUser } from "../../actions";
import { connect } from "react-redux";
import axios from "axios";

import "../../style/Users.css";
import "../../style/App.css";

class Users extends Component {
  constructor(props) {
    super(props);

    this.deleteIndexReturn = this.deleteIndexReturn.bind(this);
    this.isIdValid = this.isIdValid.bind(this);
  }

  deleteIndexReturn(user, id, credentialID) {
    return event => {
      event.preventDefault();
      this.props.deleteUser(user._id, credentialID);
      setTimeout(() => {
        this.props.fetchUsers();
        this.props.history.push("/users");
      }, 500);
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      let credentialID = this.props.auth.user._id;
    }
  }

  isIdValid(user, userOwnerID, ownerID) {
    if (userOwnerID == ownerID) {
      return (
        <div className="users__button-container">
          <div className="auth__button">
            <Link className="btn btn-info btn-flex" to={`/users/${user._id}`}>
              SHOW
            </Link>
          </div>
          <div className="auth__button">
            <button
              className="btn btn-danger btn-flex"
              onClick={this.deleteIndexReturn(user, userOwnerID, ownerID)}
            >
              DELETE
            </button>
          </div>
        </div>
      );
    }
  }

  render() {
    if (!this.props.users || !this.props.users.users) {
      return <div>Loading</div>;
    }

    if (!this.props.auth.loggedIn) {
      let filteredUsers = this.props.users.users.filter(x => x);
      return (
        <div className="users-container">
          <h1 className="users-header">Users</h1>
          <ul className="list-group users-list-group">
            {_.map(filteredUsers, (user, idx) => {
              return (
                <div className="list-group-item-container" key={idx}>
                  <li className="list-group-item users__list-item user__number">
                    User {idx}
                  </li>
                  <li className="list-group-item users__list-item">
                    {user.username}
                  </li>
                </div>
              );
            })}
          </ul>
        </div>
      );
    } else {
      let credentialID = this.props.auth.user._id;
      let filteredUsers = this.props.users.users.filter(x => x);

      return (
        <div className="users-container">
          <h1 className="users-header">Users</h1>
          <ul className="list-group users-list-group">
            {_.map(filteredUsers, (user, idx) => {
              return (
                <div className="list-group-item-container" key={idx}>
                  <li className="list-group-item users__list-item user__number">
                    User {idx}
                  </li>
                  <li className="list-group-item users__list-item">
                    {user.username}
                  </li>
                  {this.isIdValid(
                    user,
                    user.owner.id,
                    this.props.auth.user._id
                  )}
                </div>
              );
            })}
          </ul>
          <div className="auth__button">
            <Link
              className="btn btn-success btn-bottom create-button"
              to={`/credential/${credentialID}/users/new`}
            >
              CREATE
            </Link>
          </div>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    users: state.users,
    auth: state.auth
  };
}

export default connect(mapStateToProps, { fetchUsers, deleteUser })(Users);
