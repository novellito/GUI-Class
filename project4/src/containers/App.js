import React, {Component} from 'react';
import {Route,Switch} from 'react-router-dom';
import './App.css';
import Register from './Register/Register';
import Dashboard from './Dashboard/Dashboard';
import Landing from '../components/Landing/Landing';
import LoginForm from '../components/Login/LoginForm';

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Landing}/>
          <Route exact path="/LoginForm" component={LoginForm}/>
          <Route exact path="/register" component={Register}/>
          <Route path="/dashboard/:id" component={Dashboard}/>
        </Switch>
      </div>
    );
  }
}

export default App;
