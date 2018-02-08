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

  render() {
    if (!this.props.credential || !this.props.credential.ownedUsers) {
      return <div>Loading</div>;
    }
    console.log("owned users: ", this.props.credential);
    let filteredUsers = this.props.credential.ownedUsers.filter(x => x);
    return (
      <div className="dashboard-container">
        <h1 className="component-header">
          Dashboard
        </h1>
        <h3>Your list of created users:</h3>
        <ul className="list-group list-group-dashboard">
          {_.map(filteredUsers, (user, idx) => {
            return (
              <li className="list-group-item list-group-item-dashboard" key={idx}>{user.username}</li>
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
  return { auth: state.auth, credential: state.credential };
}

export default connect(mapStateToProps, { fetchCredentialUsers, fetchUsers })(
  CredentialShow
);
