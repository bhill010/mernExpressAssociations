import React, { Component } from "react";
import { Link } from "react-router-dom";
import _ from "lodash";
import { fetchUsers, deleteUser, fetchCredentialUsers } from "../../actions";
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

  componentWillReceiveProps(nextProps){
     if(nextProps.value !== this.props.value) {
       let credentialID = this.props.auth.user._id;
       this.props.fetchCredentialUsers(credentialID);
     }
    }

  // componentDidMount() {
  //   console.log("users component mounting");
  //   let credentialID = this.props.auth.user._id;
  //   console.log("credentialID", this.props.auth);
  //   this.props.fetchCredentialUsers(credentialID);
  // }

  // componentWillMount() {
  //   let credentialID = this.props.auth.user._id;
  //   this.props.fetchCredentialUsers(credentialID);
  // }
  //
  // componentWillReceiveProps(props) {
  //   this.setState({ credential: this.props.credential})
  // }

  isIdValid(user, userOwnerID, ownerID) {
    // console.log("IS ID VALID TRIGGERED");
    // console.log("ownerIDArray length", ownerIDArray.length);
    console.log("userOwnerID", userOwnerID);
    console.log("ownerID", ownerID);
    if (userOwnerID == ownerID) {


    // if (ownerIDArray.indexOf(userID) !== -1) {

      // console.log("ID FOUND");
      return (
        <div className="users__button-container">
          <div className="auth__button">
            <Link
              className="btn btn-info btn-flex"
              to={`/users/${user._id}`}
            >
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
      )
    }
    // console.log("userID: ", userID);
    // console.log("ownerIDArray: ", ownerIDArray);
    // console.log("auth props: ", this.props.auth);
    // console.log("NOT FOUND");
  }

  render() {
    console.log("rerender triggered");
    if (!this.props.users || !this.props.users.users) {
      return <div>Loading</div>;
    }
    // console.log("auth state: ", this.props.auth);
    // console.log("users state: ", this.props.users);
    // console.log("persist state: ", this.props.persist);

    if (!this.props.auth.loggedIn) {
      let filteredUsers = this.props.users.users.filter(x => x);
      console.log("filteredUsers", filteredUsers);
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
        // if (!this.props.auth.user._id) {
        //   return <div>Loading...</div>
        // }

      // console.log("/Users about to fetch credential users...");
      let credentialID = this.props.auth.user._id;
      // console.log("credentialID", credentialID);
      // this.props.fetchCredentialUsers(credentialID);

      console.log("auth props", this.props.auth);
      // this.props.fetchCredentialUsers(credentialID);
      // setTimeout(() => {
      // }, 5000);
      console.log("credential state: ", this.props.credential.ownedUsers);
      console.log("this.props.users", this.props.users);
      let filteredUsers = this.props.users.users.filter(x => x);
      console.log("filteredUsers", filteredUsers);


      return (
          <div className="users-container">
            <h1 className="users-header">Users</h1>
            <ul className="list-group users-list-group">
              {_.map(filteredUsers, (user, idx) => {
                // console.log("mapping is happening");
                console.log("filtered user: ", user);
                return (
                  <div className="list-group-item-container" key={idx}>
                    <li className="list-group-item users__list-item user__number">
                      User {idx}
                    </li>
                    <li className="list-group-item users__list-item">
                      {user.username}
                    </li>
                    {this.isIdValid(user, user.owner.id, this.props.auth.user._id)}

                  </div>
                );
              })}
            </ul>
            <div className="auth__button">
              <Link className="btn btn-success btn-bottom create-button" to={`/credential/${credentialID}/users/new`}>
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
    credential: state.credential
   };
}

export default connect(mapStateToProps, { fetchUsers, deleteUser, fetchCredentialUsers })(Users);
