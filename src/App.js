import React, { Component } from 'react';
import { Provider } from './Context';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Contacts from './components/Contacts/Contacts';
import About from './components/About/About';
import Header from './components/Header/Header';
import NotFound from './components/NotFound/NotFound';
import AddContact from './components/AddContact/AddContact';
import EditContact from './components/EditContact/EditContact';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <Provider>
        <Router>
          <div className="App">
            <Header branding={'Contact Manager'} />
            <div className="container">
              <Switch>
                <Route exact path="/" component={Contacts} />
                <Route exact path="/about" component={About} />
                <Route exact path="/add" component={AddContact} />
                <Route exact path="/edit/:id" component={EditContact} />
                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
