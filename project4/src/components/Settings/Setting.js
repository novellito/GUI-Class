import React, { Component } from "react";
import "./Setting.css";
import { Redirect } from "react-router-dom";
import Settings from "material-ui/svg-icons/action/settings";
import IconButton from "material-ui/IconButton";
import Toggle from "material-ui/Toggle";
import DatePicker from "material-ui/DatePicker";
import RaisedButton from "material-ui/RaisedButton";

class Setting extends Component {
  state = {
    showSettings: false,
    out: false,
    dobError: "",
    value: ""
  };

  toggleSettings = () => {
    this.setState({ showSettings: !this.state.showSettings });
  };

  logout = () => {
    this.setState({ out: true });
  };

  updateDOB(dob) {
    dob.preventDefault();
    let newDOB = this.refs.updatedob.refs.input.props.value;
    if (newDOB === "") {
      this.setState({ dobError: "Date must be selected" });
    } else {
      let userID = this.props.userID;

      let d = {
        dob: newDOB
      };

      fetch(`/updateDOB/${userID}`, {
        method: "POST",
        headers: new Headers({ "Content-Type": "application/json" }),
        body: JSON.stringify(d)
      })
        .then(res => res.json())
        .then(res => this.props.updateDOB(res));

      // this.refs.updatedob.refs.input.getInputNode().value = "";
      this.setState({ value: "" });
    }
  }

  handleError() {
    this.setState({ dobError: "" });
  }

  handleDatechange(event, date) {
    this.setState({ value: date });
  }

  render() {
    var redirect = null;
    const styles = {
      block: {
        maxWidth: 100
      },
      toggle: {
        marginBottom: 0
      },
      largeIcon: {
        width: 60,
        height: 60
      },
      large: {
        width: 100,
        height: 100,
        padding: 30
      },
      dobButton: {
        width: 20,
        height: 20
      }
    };

        if(this.state.out == true){
            redirect = <Redirect to={"/"}></Redirect>;
        }
        return (
           
            <div className="settingsSection">
                {!this.state.showSettings ? '':
                <div className="toggles">
                    <Toggle onToggle={this.props.toggleFriends} style={styles.toggle} toggled={this.props.friends?true:false} label="Show Friends"/>
                    <Toggle onToggle={this.props.togglePosts} toggled={this.props.posts?true:false}  style={styles.toggle} label="Show Posts" defaultToggled={true}/>
                    <Toggle onToggle={this.props.toggleStatus} toggled={this.props.status?true:false} style={styles.toggle} label="Show Status"/>
                    <Toggle onToggle={this.props.toggleDOB} toggled={this.props.dob?true:false} style={styles.toggle} label="Show DOB"/>
                    <DatePicker hintText="Update DOB" value={this.state.value} errorText={this.state.dobError} style={{margin: "0"}} textFieldStyle={{width: '135px'}} ref="updatedob" onClick={this.handleError.bind(this)} onChange={this.handleDatechange.bind(this)} />
                    <RaisedButton label="Update" primary={true} style={styles.dobButton} onClick={this.updateDOB.bind(this)} />
                    <div className="LogoutButtonDiv"><RaisedButton label="Logout" onClick={this.logout} id="LogoutButton" secondary={true} /></div>
                    {redirect}
           
                    
                </div>
                }
                <div className="settingsWrapper">
                    <IconButton onClick={this.toggleSettings} iconStyle={styles.largeIcon} style={styles.large} className="gearIcon" disableTouchRipple={true} >
                        <Settings />
                    </IconButton>
                </div>
            </div>
        );
    }
}

export default Setting;
