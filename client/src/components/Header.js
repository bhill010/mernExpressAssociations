import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions';

import '../style/Header.css';

class Header extends Component  {
  constructor(props){
    super(props);

    this.logout = this.logout.bind(this);
  }

  logout(event) {
    event.preventDefault();
    this.props.logout(redirectPath => {
      this.props.history.push(redirectPath)
    });
    // axios.get('/api/logout')
    //   .then(response => {
    //     console.log("logged out successfully");
    //   })
  }

  render() {
    if(!this.props.auth.loggedIn) {
      return (
        <nav className="header">
          <span className="">/users</span>
          <span className="">RESTful Routes</span>
          <span className="">Github</span>
          <Link className="btn btn-info" to="/api/register">REGISTER</Link>
          <Link className="btn btn-info" to="/api/login">LOGIN</Link>
        </nav>
      )
    } else {
      return (
        <nav className="header">
          <span className="">/users</span>
          <span className="">RESTful Routes</span>
          <span className="">Github</span>
          <button
            className="btn btn-info btn-flex"
            onClick={this.logout}>Logout</button>
        </nav>
      )
    }

  }
}

function mapStateToProps(state) {
  return { auth: state.auth }
}

export default withRouter(connect(mapStateToProps, { logout })(Header));
