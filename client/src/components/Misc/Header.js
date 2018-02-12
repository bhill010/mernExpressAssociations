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
          <div className="header__first">
            <span className="">
              <a
                className="btn btn-primary header__button"
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/bhill010/mernExpressAssociations"
              >
                Github
              </a>
            </span>
          </div>
          <div className="header__second">
            <Link className="btn btn-info header__button" to="/register">
              REGISTER
            </Link>
            <Link className="btn btn-info header__button" to="/login">
              LOGIN
            </Link>
          </div>
        </nav>
      );
    } else {
      let credentialID = this.props.auth.user._id;
      return (
        <nav className="header">
          <div className="header__first">
            <span className="">
              <a
                className="btn btn-primary header__button"
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/bhill010/mernExpressAssociations"
              >
                Github
              </a>
            </span>
          </div>
          <div className="header__second">
            <Link
              className="btn btn-info header__button"
              to={`/credential/${credentialID}`}
            >
              DASHBOARD
            </Link>
            <button
              className="btn btn-warning header__button"
              onClick={this.logout}
            >
              LOGOUT
            </button>
          </div>
        </nav>
      );
    }
  }
}

function mapStateToProps(state) {
  return { auth: state.auth };
}

export default withRouter(connect(mapStateToProps, { logout })(Header));
