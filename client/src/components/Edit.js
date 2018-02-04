import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { updateUser, fetchUsers } from "../actions";
import { connect } from "react-redux";

import "../style/Edit.css";
import "../style/App.css";

class Edit extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    var full_url = document.URL;
    var url_array = full_url.split("/");
    var last_segment = url_array[url_array.length - 2];
  }

  onSubmit(event) {
    event.preventDefault();
    var full_url = document.URL;
    var url_array = full_url.split("/");
    var last_segment = url_array[url_array.length - 2];

    this.props.updateUser(
      last_segment,
      event.target.querySelector(".form__input").value
    );
    this.props.fetchUsers();
    this.props.history.push("/");
  }

  render() {
    return (
      <div className="form__container">
        <form className="form" onSubmit={this.onSubmit}>
          <input
            className="form-control form__input"
            type="text"
            name="username"
            placeholder="name"
          />
          <input className="btn btn-primary form__submit" type="submit" />
        </form>
        <div>
          <Link className="btn btn-success btn-bottom" to="/">
            Return to /users
          </Link>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { users: state.users };
}

export default connect(mapStateToProps, { updateUser, fetchUsers })(Edit);
