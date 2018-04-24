import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import DatePicker from "material-ui/DatePicker";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import Facebook from "../../assets/facebook.png";
import { Card, CardHeader } from "material-ui/Card";
import "./Register.css";
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      connected:true,
      firstName: "",
      lastName: "",
      age: "",
      dob: "",
      userName: "",
      email: "",
      password: "",
      formErrors: {
        firstName: "Required Field",
        lastName: "Required Field",
        age: "Required Field",
        dob: "",
        userName: "Required Field",
        email: "Required Field",
        password: "Required Field"
      },
      fnValid: false,
      lnValid: false,
      ageValid: false,
      dobValid: false,
      unValid: false,
      emailValid: false,
      passwordValid: false,
      formValid: false,
      userId: "",
      validRegister: false
    };
  }
  handleForm = e => {
    let data = {
      fname: this.state.firstName,
      lname: this.state.lastName,
      age: this.state.age,
      DOB: this.state.dob,
      username: this.state.userName,
      password: this.state.password,
      email: this.state.email
    };
    fetch(`/addUser`, {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      body: JSON.stringify(data)
    })
      .then(res => res.json()).catch((e)=> {
        console.log('error')
      })
      .then(res => {
        this.setState({ userId: res.insertId, validRegister: true }, () => {
          console.log(this.state.userId);
        });
      }).catch(()=> {
        this.setState({connected:false});
        console.log('error2')

      });
    e.preventDefault();
  };

  handleUserInput = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  };

  handleDate = (event, date) => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    date = [year, month, day].join("-");

    this.setState({ dob: date }, () => {
      this.validateField("dob", date);
    });
  };

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let fnValid = this.state.fnValid;
    let lnValid = this.state.lnValid;
    let ageValid = this.state.ageValid;
    let dobValid = this.state.dobValid;
    let unValid = this.state.unValid;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;

    switch (fieldName) {
      case "firstName":
        fnValid = value.match(/^[a-z ,.'-]+$/i);
        fieldValidationErrors.firstName = fnValid ? "" : "Invalid Name";
        break;
      case "lastName":
        lnValid = value.match(/^[a-z ,.'-]+$/i);
        fieldValidationErrors.lastName = lnValid ? "" : "Invalid Last Name";
        break;
      case "age":
        ageValid = value.match(/^[1-9]{1}[0-9]{0,2}$/i);
        fieldValidationErrors.age = ageValid ? "" : "Invalid Age";
        break;
      case "dob":
        dobValid = value.match(/^[1-2][0-9][0-9][0-9]-[0-1][0-9]-[0-9][0-9]$/i);
        fieldValidationErrors.dob = dobValid ? "" : "Invalid Date Of Birth";
        break;
      case "userName":
        unValid = value.match(/^[a-z0-9]{2,10}$/i);
        fieldValidationErrors.userName = unValid ? "" : "Invalid Username";
        break;
      case "email":
        emailValid = value.match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i
        );
        fieldValidationErrors.email = emailValid ? "" : "Invalid Email";
        break;
      case "password":
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid
          ? ""
          : "Must Be At Least 6 Characters";
        break;
      default:
        break;
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        fnValid: fnValid,
        lnValid: lnValid,
        ageValid: ageValid,
        dobValid: dobValid,
        unValid: unValid,
        emailValid: emailValid,
        passwordValid: passwordValid
      },
      this.validateForm
    );
  }

  validateForm() {
    this.setState({
      formValid:
        this.state.fnValid &&
        this.state.lnValid &&
        this.state.ageValid &&
        this.state.dobValid &&
        this.state.unValid &&
        this.state.emailValid &&
        this.state.passwordValid
    });
  }

  render() {
    var redirect = null;
    let connected = null;

    if(!this.state.connected) {
        connected =  <p style={{color:"red"}}>Currently not connected to database</p>;
    }

    if (this.state.validRegister)
      redirect = <Redirect to={"/dashboard/" + this.state.userId} />;

    const style = {
      button: {
        margin: 12
      },
      textField: {
        height: 24
      },
      errorStyle: {
        height: 10
      },
      hintStyle: {
        top: 0
      },
      underlineStyle: {
        bottom: 2
      },
      datepicker: {
        lineHeight: 0.4,
        marginTop: -15,
        marginBottom: -10,
        top: 7
      },
      dialogContainerStyle: {
        height: 50
      }
    };

    return (
      <div className="page">
        <Card className="main-container">
          <CardHeader title="Sign Up" avatar={Facebook} />
          {connected}
          <form onSubmit={this.handleForm}>
            <TextField
              hintStyle={style.hintStyle}
              style={style.textField}
              errorStyle={style.errorStyle}
              underlineStyle={style.underlineStyle}
              name="firstName"
              hintText="First Name"
              errorText={this.state.formErrors.firstName}
              onChange={event => this.handleUserInput(event)}
            />
            <br />
            <TextField
              hintStyle={style.hintStyle}
              style={style.textField}
              errorStyle={style.errorStyle}
              underlineStyle={style.underlineStyle}
              name="lastName"
              hintText="Last Name"
              errorText={this.state.formErrors.lastName}
              onChange={event => this.handleUserInput(event)}
            />
            <br />
            <TextField
              hintStyle={style.hintStyle}
              style={style.textField}
              errorStyle={style.errorStyle}
              underlineStyle={style.underlineStyle}
              name="age"
              hintText="Age"
              errorText={this.state.formErrors.age}
              onChange={event => this.handleUserInput(event)}
            />
            <br />
            <DatePicker
              dialogContainerStyle={style.dialogContainerStyle}
              textFieldStyle={style.datepicker}
              name="dob"
              id="dob"
              onChange={this.handleDate}
              hintText="Date Of Birth"
              openToYearSelection={true}
            />
            <br />
            <TextField
              hintStyle={style.hintStyle}
              style={style.textField}
              errorStyle={style.errorStyle}
              underlineStyle={style.underlineStyle}
              name="userName"
              hintText="Username"
              errorText={this.state.formErrors.userName}
              onChange={event => this.handleUserInput(event)}
            />
            <br />
            <TextField
              hintStyle={style.hintStyle}
              style={style.textField}
              errorStyle={style.errorStyle}
              underlineStyle={style.underlineStyle}
              name="email"
              hintText="Email"
              errorText={this.state.formErrors.email}
              onChange={event => this.handleUserInput(event)}
            />
            <br />
            <TextField
              hintStyle={style.hintStyle}
              style={style.textField}
              errorStyle={style.errorStyle}
              underlineStyle={style.underlineStyle}
              name="password"
              hintText="Password"
              type="password"
              errorText={this.state.formErrors.password}
              onChange={event => this.handleUserInput(event)}
            />
            <br />
            <Link to="/">
              <RaisedButton
                className="home-button"
                label="Home"
                disabled={false}
                style={style.button}
                primary={true}
              />
            </Link>
            <RaisedButton
              type="submit"
              className="submit-button"
              label="Sign Up"
              disabled={!this.state.formValid}
              style={style.button}
            />
          </form>
        </Card>
        {redirect}
      </div>
    );
  }
}

export default Register;
