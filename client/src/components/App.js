import React, { Component } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { fetchUsers } from "../actions";

import Users from "./Users/Users";
import Show from "./Users/Show";
import New from "./Users/New";
import Edit from "./Users/Edit";
import Header from "./Misc/Header";
import Register from "./Credential/Register";
import Login from "./Credential/Login";
import PrivateRoute from "./Misc/PrivateRoute";

import "../style/App.css";

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchUsers();
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div className="route-container">
            <Header />
            <Route exact path="/" render={() => <Redirect to="/users" />} />
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/users" component={Users} />
              <PrivateRoute
                exact path="/credential/:id/users/new"
                authed={this.props.auth.loggedIn}
                component={New} />
              />
              <PrivateRoute path="/users/:id/edit" component={Edit} />
              <PrivateRoute
                authed={this.props.auth.loggedIn}
                path="/users/:id"
                component={Show}
              />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { users: state.users, auth: state.auth };
}

export default connect(mapStateToProps, { fetchUsers })(App);
