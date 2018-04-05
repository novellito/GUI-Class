import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (

      <div className="window">
        <div className="window-content">
          <div className="pane-group">
            <div className="pane-sm sidebar">

              <nav className="nav-group">
                <h5 className="nav-group-title">Favorites</h5>
                <a className="nav-group-item active">
                  <span className="icon icon-home"></span>
                  connors
                </a>
                <span className="nav-group-item">
                  <span className="icon icon-download"></span>
                  Downloads
                </span>
                <span className="nav-group-item">
                  <span className="icon icon-folder"></span>
                  Documents
                </span>
                <span className="nav-group-item">
                  <span className="icon icon-signal"></span>
                  AirPlay
                </span>
                <span className="nav-group-item">
                  <span className="icon icon-print"></span>
                  Applications
                </span>
                <span className="nav-group-item">
                  <span className="icon icon-cloud"></span>
                  Desktop
                </span>
              </nav>

            </div>
            <div className="pane">

            <h1>Hello</h1>
            
            </div>
          </div>
        </div>
      </div>

    );
  }
}

export default App;
