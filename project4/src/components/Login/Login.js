import React from "react";
import { Link } from "react-router-dom";
import RaisedButton from 'material-ui/RaisedButton';

const Login = props => {
  return (
    <div>
      <h1>Login</h1>
      <Link to="/">
        <RaisedButton className="land-btns" label="Home" primary={true} />
      </Link>
    </div>
  );
};

export default Login;
