import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUsers } from '../actions'
import axios from 'axios';

import Users from './Users';
import Show from './Show';
import New from './New';
import Edit from './Edit'
import Header from './Header';

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
    return (
      <div className="App">
        <Header />
        <BrowserRouter>
          <div className="route-container">
            <Route
              exact path="/"
              render={() => <Redirect to="/users" />}
            />
            <Switch>
              <Route
                exact path="/users"
                component={Users}
              />
              <Route
                exact path="/users/new"
                component={New}
                />
              />
              <Route
                path="/users/:id/edit"
                component={Edit}
              />
              <Route
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
  return { users: state.users }
}

export default connect(mapStateToProps, { fetchUsers })(App);
