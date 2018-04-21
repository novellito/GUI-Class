import React, {Component} from 'react';
import './Setting.css'
import {Redirect} from 'react-router-dom';
import Settings from 'material-ui/svg-icons/action/settings';
import IconButton from 'material-ui/IconButton';
import Toggle from 'material-ui/Toggle';
import RaisedButton from 'material-ui/RaisedButton';

class Setting extends Component {

    state = {
        showSettings:false,
        out:false,
    }

    toggleSettings = () => {
        this.setState({showSettings:!this.state.showSettings})
    }

    logout = () =>{
        this.setState({out:true});
    }

    render() {
        var redirect = null;
        const styles = {
            block: {
                maxWidth: 100
            },
            toggle: {
                marginBottom: 5
            },
              largeIcon: {
                width: 60,
                height: 60,
            },
            large: {
                width: 120,
                height: 120,
                padding: 30,
              }
        }

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
                    <RaisedButton label="Logout" onClick={this.logout} />
                    {redirect}
                </div>}
                <div className="settingsWrapper">
                    <IconButton onClick={this.toggleSettings} iconStyle={styles.largeIcon} style={styles.large} className="gearIcon">
                        <Settings />
                    </IconButton>
                </div>
            </div>
        );
    }
}

export default Setting;