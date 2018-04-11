import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Dashboard from './Dashboard/Dashboard';
import Login from '../components/Login/Login';



class App extends Component {

  render() {
    return (
      <div>
        <Login/>
        <Dashboard/>
      </div>
    );
  }
}

export default App;
