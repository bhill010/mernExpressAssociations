import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
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

    this.postPerson = this.postPerson.bind(this);
    this.fetchUsers = this.fetchUsers.bind(this);
    this.deletePerson = this.deletePerson.bind(this);
  }
  state = { users: [] }

  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers() {
    axios.get('/users')
      .then((response) => {
        let users = response.data;
        let usersArray = [];
        users.forEach(user => {
          usersArray.push(user);
        });
        this.setState({ users: usersArray })
      });
  }

  postPerson(response) {
    let newUser = response.data;
    let currentUsers = this.state.users;
    currentUsers.push(newUser);

    this.setState({ users: currentUsers })
  }

  deletePerson(id) {
    axios.delete(`/users/${id}`)
      .then((response) => {
        console.log("Deleted user:", response);
        this.fetchUsers();
      })
  }

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
                render={(props) => <Users {...props}
                                    users={this.state.users}
                                    deletePerson={this.deletePerson}
                                  />}
              />
              <Route
                exact path="/users/new"
                render={(props) => <New {...props} postState={this.postPerson}/>}
              />
              <Route
                path="/users/:id/edit"
                render={(props) => <Edit {...props} fetchUsers={this.fetchUsers}/>}
              />
              <Route
                path="/users/:id"
                render={(props) => <Show {...props} deletePerson={this.deletePerson}/>}
              />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
