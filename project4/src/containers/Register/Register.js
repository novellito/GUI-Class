import React, { Component } from "react";
import DatePicker from "material-ui/DatePicker";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import Facebook from "../../assets/facebook.png";
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText
} from "material-ui/Card";
import "./Register.css";

class Register extends Component {
  render() {
    const style = {
      margin: 12
    };

    return (
      <div className="page">
        <Card className="main-container">
          <CardHeader title="Sign Up" avatar={Facebook} />
          <form>
            <TextField
              hintText="First Name"
              errorText="This field is required"
            />
            <br />
            <TextField
              hintText="Last Name"
              errorText="This field is required"
            />
            <br />
            <TextField hintText="Age" errorText="This field is required" />
            <br />
            <DatePicker hintText="Date Of Birth" openToYearSelection={true} />
            <br />
            <TextField hintText="Username" errorText="This field is required" />
            <br />
            <TextField hintText="Password" errorText="This field is required" />
            <br />
            <RaisedButton
              className="submit-button"
              label="Default"
              disabled={true}
              style={style}
            />
          </form>
        </Card>
      </div>
    );
  }
}

export default Register;
