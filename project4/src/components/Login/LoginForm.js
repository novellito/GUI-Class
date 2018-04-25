import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import "./LoginForm.css";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import { Card, CardHeader } from "material-ui/Card";
import Facebook from "../../assets/facebook.png";

class Login extends Component {
  state = {
    connected: true,
    username: "",
    password: "",
    userID: "",
    errorText: "",
    validLogin: false
  };

  handleLogin = e => {
    e.preventDefault();
    console.log(this.state.username);
    console.log(this.state.password);
  };

  handleUsername = username => {
    this.setState({ username: username }, () =>
      console.log(this.state.username)
    );
  };

  handlePassword = password => {
    this.setState({ password: password }, () =>
      console.log(this.state.password)
    );
  };

  componentDidMount() {}

  login = () => {
    fetch(`/login/${this.state.username}/${this.state.password}`)
      .then(res => res.json())
      .then(res => {
        this.checkValidLogin(res);
      })
      .catch(() => {
        if (this.state.username === "" || this.state.password === "") {
          //
        } else {
          this.setState({ connected: false });
        }
      });
  };
  checkValidLogin(res) {
    try {
      this.setState({ validLogin: true, userID: res[0].id });
    } catch (Exception) {
      this.setState({ errorText: "Wrong Username/Password" });
    }
  }
  render(props) {
    var redirect = null;
    let connected = null;
    if (!this.state.connected) {
      connected = (
        <p style={{ color: "red" }}> Currently not connected to database</p>
      );
    }
    if (this.state.validLogin) {
      redirect = <Redirect to={"/dashboard/" + this.state.userID} />;
    }
    return (
      <div id="LoginForm">
        <Card className="main-container">
          <CardHeader title="FaceBookLite" avatar={Facebook} />
          {connected}
          <TextField
            value={this.state.username}
            onChange={e => this.handleUsername(e.target.value)}
            type="text"
            className="Login-Field"
            name="username"
            floatingLabelText="Username"
            errorText={this.state.errorText}
          />
          <br />
          <TextField
            value={this.state.password}
            onChange={e => this.handlePassword(e.target.value)}
            type="password"
            className="Login-Field"
            name="password"
            floatingLabelText="Password"
            errorText={this.state.errorText}
          />
          <br />
          <br />

          <div id="Buttons">
            <Link to="/">
              <RaisedButton
                onClick={this.login}
                className="LandingButtons"
                primary={true}
                label="BACK"
              />
            </Link>
            <RaisedButton
              onClick={this.login}
              className="LandingButtons"
              label="LOGIN"
            />
          </div>
          {redirect}
        </Card>
      </div>
    );
  }
}

export default Login;
