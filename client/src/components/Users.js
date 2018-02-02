import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { fetchUsers, deleteUser } from '../actions';
import { connect } from 'react-redux';
import axios from 'axios';


import '../style/Users.css';

class Users extends Component {

  render() {
    return (
      <div>
        <h1 className="users-header">Users</h1>
        <ul className="list-group">
          { _.map(this.props.users, (user, idx) => {
            console.log(user);
            return (
              <div className="list-group-item-container" key={idx}>
                <li className="list-group-item users__list-item user__number">User {idx}</li>
                <li className="list-group-item users__list-item">{user.username}</li>
                <div>
                  <Link className="btn btn-info btn-flex" to={`/users/${user._id}`}>SHOW</Link>
                </div>
                <div>
                  <button className="btn btn-danger btn-flex" onClick={(e) => { e.preventDefault(); this.props.deleteUser(user._id); this.props.fetchUsers(); this.props.history.push('/') } }>
                    DELETE
                  </button>
                </div>
              </div>
            )
          })}
        </ul>
        <div>
          <Link className="btn btn-success btn-bottom" to="/users/new">CREATE</Link>
          <Link className="btn btn-success btn-bottom" to="/users/register">REGISTER</Link>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { users: state.users }
}

export default connect(mapStateToProps, { fetchUsers, deleteUser })(Users);
