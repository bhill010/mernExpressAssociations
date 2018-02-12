import React, { Component } from "react";
import { updateUser, fetchUsers } from "../../actions";
import { connect } from "react-redux";

import "../../style/Edit.css";
import "../../style/App.css";

class Edit extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.showIndexReturn = this.showIndexReturn.bind(this);
  }

  showIndexReturn(event) {
    event.preventDefault();
    this.props.fetchUsers();

    setTimeout(() => {
      this.props.history.push("/users");
    }, 1000);
  }

  onSubmit(event) {
    event.preventDefault();
    var full_url = document.URL;
    var url_array = full_url.split("/");
    var credential_id = url_array[url_array.length - 4];
    var user_id = url_array[url_array.length - 2];

    this.props.updateUser(
      user_id,
      credential_id,
      event.target.querySelector(".form__input").value
    );
    this.props.fetchUsers();
    this.props.history.push("/");
  }

  render() {
    return (
      <div className="center_container">
        <h3>Edit Page</h3>
        <form className="form" onSubmit={this.onSubmit}>
          <input
            className="form-control form__input right_margin"
            type="text"
            name="username"
            placeholder="Update user's name"
          />
          <input className="btn btn-primary form__submit" type="submit" />
        </form>
        <div>
          <button className="btn btn-success top_margin" onClick={this.showIndexReturn}>
            RETURN TO /USERS
          </button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { users: state.users };
}

export default connect(mapStateToProps, { updateUser, fetchUsers })(Edit);
