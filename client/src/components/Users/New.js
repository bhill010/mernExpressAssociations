import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createUser, fetchUsers } from "../../actions";

import "../../style/New.css";
import "../../style/App.css";

class New extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();

    var full_url = document.URL;
    var url_array = full_url.split("/");
    var last_segment = url_array[url_array.length - 3];

    var ownerID = this.props.auth.user._id;

    this.props.createUser(
      event.target.querySelector(".form__input").value,
      last_segment,
      ownerID
    );
    this.props.fetchUsers();
    setTimeout(() => {
      this.props.history.push("/users");
    }, 1000);
  }

  render() {
    return (
      <div className="center_container">
        <h3>CREATE New User</h3>
        <form className="form" onSubmit={this.onSubmit}>
          <input
            className="form-control form__input right_margin"
            type="text"
            name="username"
            placeholder="Name of new user"
          />
          <input className="btn btn-primary form__submit" type="submit" />
        </form>
        <div>
          <Link className="btn btn-success btn-bottom top_margin" to="/">
            Return to /users
          </Link>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { users: state.users, auth: state.auth };
}

export default connect(mapStateToProps, {
  createUser,
  fetchUsers
})(New);
