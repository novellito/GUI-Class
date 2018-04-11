import React, {Component} from 'react';
import {Route,Switch} from 'react-router-dom';
import './App.css';
import Register from './Register/Register';
import Landing from '../components/Landing/Landing';
import Login from '../components/Login/Login';

class App extends Component {

  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Landing}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/register" component={Register}/>
        </Switch>
      </div>
    );
  }
}

export default App;
