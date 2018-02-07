import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchCredentialUsers } from "../../actions";

import _ from "lodash";

class CredentialShow extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let credentialID = this.props.auth.user._id;
    this.props.fetchCredentialUsers(credentialID);
  }

  render() {
    if (!this.props.credential || !this.props.credential.ownedUsers) {
      return <div>Loading</div>;
    }
    console.log("owned users: ", this.props.credential);
    let filteredUsers = this.props.credential.ownedUsers.filter(x => x);
    return (
      <div>
        Dashboard
        <ul className="list-group">
          {_.map(filteredUsers, (user, idx) => {
            return (
              <div key={idx}>{user.username}</div>
            );
          })}
        </ul>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return { auth: state.auth, credential: state.credential };
}

export default connect(mapStateToProps, { fetchCredentialUsers })(
  CredentialShow
);
