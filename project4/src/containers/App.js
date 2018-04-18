import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Dashboard from "./Dashboard/Dashboard";
import Register from "./Register/Register";

class App extends Component {
  render() {
    return (
      <div>
        <Register />
      </div>
    );
  }
}

export default App;
