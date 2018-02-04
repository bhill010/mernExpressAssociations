import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { fetchUsers, deleteUser } from '../actions';
import { connect } from 'react-redux';
import axios from 'axios';


import '../style/Users.css';

class Users extends Component {
  constructor(props) {
    super(props);

    // this.displayButtons = this.displayButtons.bind(this);
    this.deleteIndexReturn = this.deleteIndexReturn.bind(this);
  }
  // componentDidMount() {
  //   // this.displayButtons();
  // }

  // displayButtons() {
  //   if(!this.props.auth.loggedIn) {
  //     console.log("display button hide triggered");
  //     var list = document.querySelectorAll('.auth__button');
  //     console.log("list: ", list);
  //     for(var i = 0; i < list.length; i++) {
  //       list[i].classList.add("hide");
  //       console.log("list item", list[i]);
  //     }
    // } else {
    //   let list = document.querySelectorAll('.auth__button');
    //   for(var i = 0; i < list.length; i++) {
    //     list[i].classList.remove("hide");
    //   }
  //   }
  // }

  deleteIndexReturn(id) {
    return (event) => {
      event.preventDefault();
      this.props.deleteUser(id);
      this.props.fetchUsers();
      this.props.history.push('/users')
    }
  }

  render() {
    if (!this.props.users) {
      return <div>Loading</div>
    }

    if(!this.props.auth.loggedIn) {
      return (
        <div>
          <h1 className="users-header">Users</h1>
          <ul className="list-group">
            { _.map(this.props.users, (user, idx) => {
              // console.log(user);
              return (
                <div className="list-group-item-container" key={idx}>
                  <li className="list-group-item users__list-item user__number">User {idx}</li>
                  <li className="list-group-item users__list-item">{user.username}</li>
                </div>
              )
            })}
          </ul>
        </div>
      )
    } else {
      return (
        <div>
          <h1 className="users-header">Users</h1>
          <ul className="list-group">
            { _.map(this.props.users, (user, idx) => {
              // console.log(user);
              return (
                <div className="list-group-item-container" key={idx}>
                  <li className="list-group-item users__list-item user__number">User {idx}</li>
                  <li className="list-group-item users__list-item">{user.username}</li>
                  <div className="auth__button">
                    <Link className="btn btn-info btn-flex" to={`/users/${user._id}`}>SHOW</Link>
                  </div>
                  <div className="auth__button">
                    <button className="btn btn-danger btn-flex" onClick={this.deleteIndexReturn(user._id)}>
                      DELETE
                    </button>
                  </div>
                </div>
              )
            })}
          </ul>
          <div className="auth__button">
            <Link className="btn btn-success btn-bottom" to="/users/new">CREATE</Link>
          </div>
        </div>
      )
    }


  }
}

function mapStateToProps(state) {
  return { users: state.users, auth: state.auth }
}

export default connect(mapStateToProps, { fetchUsers, deleteUser })(Users);
