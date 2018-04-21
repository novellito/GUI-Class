import React, {Component} from "react";
import {Redirect, Link} from "react-router-dom";
import RaisedButton from 'material-ui/RaisedButton';

class Login extends Component {

  state = {
    validLogin: false
  };

  login = () => {
    // TODO: check for valid credentials using fetch() here.
    this.setState({validLogin: true});
  }

  render() {

    let redirect = null;

    // Redirect the user to the dashboard if their login credentials are correct
    if (this.state.validLogin) {
      redirect = <Redirect test="hello" to={"/LoginForm/"}></Redirect>
    }

    return (
      <div>
        <h1>Login</h1>

        <Link to="/">
          <RaisedButton className="land-btns" label="Home" primary={true}/>
        </Link>

        <RaisedButton
          onClick={this.login}
          className="land-btns"
          label="Login"
          primary={true}/> 

          {redirect}
      </div>
    );
  };
};

export default Login;
