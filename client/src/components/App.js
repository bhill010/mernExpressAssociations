import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUsers } from '../actions'

import Users from './Users';
import Show from './Show';
import New from './New';
import Edit from './Edit'
import Header from './Header';
import Register from './Register';
import Login from './Login';
import PrivateRoute from './PrivateRoute';

import '../style/App.css';

class App extends Component {
  constructor(props) {
    super(props);

    // this.postPerson = this.postPerson.bind(this);
    // this.fetchUsers = this.fetchUsers.bind(this);
    // this.deletePerson = this.deletePerson.bind(this);
  }
  // state = { users: [] }

  componentDidMount() {
    this.props.fetchUsers();
  }

  // postPerson(response) {
  //   let newUser = response.data;
  //   let currentUsers = this.state.users;
  //   currentUsers.push(newUser);
  //
  //   this.setState({ users: currentUsers })
  // }

  // deletePerson(id) {
  //   axios.delete(`/users/${id}`)
  //     .then((response) => {
  //       console.log("Deleted user:", response);
  //       this.fetchUsers();
  //     })
  // }

  render() {
    // console.log("App.js state: ", this.props.auth);
    return (
      <div className="App">
        <BrowserRouter>
          <div className="route-container">
            <Header />
            <Route
              exact path="/"
              render={() => <Redirect to="/users" />}
            />
            <Switch>
              <Route
                exact path="/api/register"
                component={Register}
              />
              <Route
                exact path="/api/login"
                component={Login}
              />
              <Route
                exact path="/users"
                component={Users}
              />
              <PrivateRoute
                exact path="/users/new"
                component={New}
                />
              />
              <PrivateRoute
                path="/users/:id/edit"
                component={Edit}
              />
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
  return { users: state.users, auth: state.auth }
}

export default connect(mapStateToProps, { fetchUsers })(App);
