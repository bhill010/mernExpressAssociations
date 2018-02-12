import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchCredentialUsers, fetchUsers } from "../../actions";

import _ from "lodash";

import "../../style/App.css";
import "../../style/CredentialShow.css";


class CredentialShow extends Component {
  constructor(props) {
    super(props);

    this.showIndexReturn = this.showIndexReturn.bind(this);
  }

  componentDidMount() {
    let credentialID = this.props.auth.user._id;
    this.props.fetchCredentialUsers(credentialID);
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


    // if (ownerIDArray.indexOf(userID) !== -1) {

      // console.log("ID FOUND");
      return (
        <li
          className="list-group-item list-group-item-dashboard"
          key={user._id}>
          {user.username}
        </li>
      )
    }
    // console.log("userID: ", userID);
    // console.log("ownerIDArray: ", ownerIDArray);
    // console.log("auth props: ", this.props.auth);
    // console.log("NOT FOUND");
  }


  render() {
    if (!this.props.credential || !this.props.credential.ownedUsers) {
      return <div>Loading</div>;
    }
    console.log("owned users: ", this.props.credential);
    // let filteredUsers = this.props.credential.ownedUsers.filter(x => x);
    console.log("this.props.users :", this.props.users);
    // console.log("this.props.auth.username: ", this.props.auth.)
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
                { this.isIdValid(user, user.owner.id, this.props.auth.user._id)}
              </div>
            );
          })}
        </ul>
        <button className="btn btn-success btn-dashboard-users" onClick={this.showIndexReturn}>
          Return to /users
        </button>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return { auth: state.auth, credential: state.credential, users: state.users };
}

export default connect(mapStateToProps, { fetchCredentialUsers, fetchUsers })(
  CredentialShow
);
