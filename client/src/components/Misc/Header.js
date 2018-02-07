import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions";

import "../../style/Header.css";

class Header extends Component {
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
  }

  logout(event) {
    event.preventDefault();
    this.props.logout(redirectPath => {
      this.props.history.push(redirectPath);
    });
  }

  render() {
    if (!this.props.auth.loggedIn) {
      return (
        <nav className="header">
          <span className="">/users</span>
          <span className="">RESTful Routes</span>
          <span className="">Github</span>
          <Link className="btn btn-info" to="/register">
            REGISTER
          </Link>
          <Link className="btn btn-info" to="/login">
            LOGIN
          </Link>
        </nav>
      );
    } else {
      let credentialID = this.props.auth.user._id;
      return (
        <nav className="header">
          <span className="">/users</span>
          <span className="">RESTful Routes</span>
          <span className="">Github</span>
          <Link className="btn btn-info" to={`/credential/${credentialID}`}>
            DASHBOARD
          </Link>
          <button className="btn btn-info btn-flex" onClick={this.logout}>
            Logout
          </button>
        </nav>
      );
    }
  }
}

function mapStateToProps(state) {
  return { auth: state.auth };
}

export default withRouter(connect(mapStateToProps, { logout })(Header));
