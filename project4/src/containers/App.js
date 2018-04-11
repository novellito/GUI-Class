import React, {Component} from 'react';
import {BrowserRouter} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Dashboard from './Dashboard/Dashboard';
import Landing from '../components/Landing/Landing';

class App extends Component {

  render() {
    return (
      <div>
        <BrowserRouter>
        <Landing/>
        </BrowserRouter>

      </div>
    );
  }
}

export default App;
