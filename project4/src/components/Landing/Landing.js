import React from "react";
import "./Landing.css";
import RaisedButton from "material-ui/RaisedButton";
import { Link } from "react-router-dom";

const Landing = props => {
  return (
    <div id="landing">
      <h1>Welcome to FB Lite</h1>
      <div className="buttons">
        <Link to="/login">
          <RaisedButton className="land-btns" label="Login" />
        </Link>
  
        <Link to="/register">
          <RaisedButton  className="land-btns" label="Register" primary={true} />
        </Link>
      </div>
    </div>
  );
};

export default Landing;