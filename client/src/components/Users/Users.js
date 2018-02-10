import React, { Component } from "react";
import { Link } from "react-router-dom";
import _ from "lodash";
import { fetchUsers, deleteUser, fetchCredentialUsers } from "../../actions";
import { connect } from "react-redux";
import axios from "axios";

import "../../style/Users.css";

class Users extends Component {
  constructor(props) {
    super(props);

    this.deleteIndexReturn = this.deleteIndexReturn.bind(this);
    this.isIdValid = this.isIdValid.bind(this);
  }

  deleteIndexReturn(id, credentialID) {
    return event => {
      event.preventDefault();
      this.props.deleteUser(id, credentialID);
      setTimeout(() => {
        this.props.fetchUsers();
        this.props.history.push("/users");
      }, 500);

    };
  }

  componentWillMount() {
    let credentialID = this.props.auth.user._id;
    this.props.fetchCredentialUsers(credentialID);
  }
  //
  // componentWillReceiveProps(props) {
  //   this.setState({ credential: this.props.credential})
  // }

  isIdValid(userID, ownerIDArray, credentialID) {
    console.log("IS ID VALID TRIGGERED");
    console.log("ownerIDArray length", ownerIDArray.length);
    for(var i = 0; i < ownerIDArray.length; i++) {
      if (userID == ownerIDArray[i]._id) {
        console.log("ID FOUND");
        return (
          <div className="users__button-container">
            <div className="auth__button">
              <Link
                className="btn btn-info btn-flex"
                to={`/users/${userID}`}
              >
                SHOW
              </Link>
            </div>
            <div className="auth__button">
              <button
                className="btn btn-danger btn-flex"
                onClick={this.deleteIndexReturn(userID, credentialID)}
              >
                DELETE
              </button>
            </div>
        </div>
        )
      }
    }
    // console.log("userID: ", userID);
    // console.log("ownerIDArray: ", ownerIDArray);
    console.log("auth props: ", this.props.auth);
    // console.log("NOT FOUND");
  }

  render() {
    if (!this.props.users) {
      return <div>Loading</div>;
    }
    // console.log("auth state: ", this.props.auth);
    // console.log("users state: ", this.props.users);
    // console.log("persist state: ", this.props.persist);

    if (!this.props.auth.loggedIn) {
      return (
        <div>
          <h1 className="users-header">Users</h1>
          <ul className="list-group">
            {_.map(this.props.users, (user, idx) => {
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
        // if (!this.props.auth.user._id) {
        //   return <div>Loading...</div>
        // }

      // console.log("/Users about to fetch credential users...");
      // let credentialID = this.props.auth.user._id;
      // console.log("credentialID", credentialID);
      // this.props.fetchCredentialUsers(credentialID);

      // console.log(this.props.auth);
      let credentialID = this.props.auth.user._id;
      console.log("Hi");
      this.props.fetchCredentialUsers(credentialID);
      setTimeout(() => {
      }, 5000);
      console.log("credential state: ", this.props.credential.ownedUsers);


      return (
          <div>
            <h1 className="users-header">Users</h1>
            <ul className="list-group">
              {_.map(this.props.users, (user, idx) => {
                return (
                  <div className="list-group-item-container" key={idx}>
                    <li className="list-group-item users__list-item user__number">
                      User {idx}
                    </li>
                    <li className="list-group-item users__list-item">
                      {user.username}
                    </li>
                    {this.isIdValid(user._id, this.props.credential.ownedUsers, credentialID)}

                  </div>
                );
              })}
            </ul>
            <div className="auth__button">
              <Link className="btn btn-success btn-bottom" to={`/credential/${credentialID}/users/new`}>
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
    auth: state.auth,
    persist: state.persist,
    credential: state.credential
   };
}

export default connect(mapStateToProps, { fetchUsers, deleteUser, fetchCredentialUsers })(Users);
