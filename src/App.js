import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';


import 'bootstrap/dist/css/bootstrap.min.css';
import store from './store';
import Navbar from './components/common/Navbar';
import Homepage from './components/common/Homepage';
import Login from './components/Authentication/Login';
import Register from './components/Authentication/Register';
import setAuthToken from './setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authentication';
import Commands from './components/CheatSheet/Commands';


if(localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = '/login'
  }
}
class App extends Component {
  render() {
    return (
      <Provider store = { store }>
        <Router>
            <div>
              <Navbar />
                <div className="container">
                  <Route exact path="/register" component={ Register } />
                  <Route exact path="/login" component={ Login } />
                </div>
                <Route exact path="/dashboard" component={ Homepage } />
                <Route exact path="/cat/:id" component={ Commands } />
                
            </div>
          </Router>
        </Provider>
    );
  }
}

export default App;