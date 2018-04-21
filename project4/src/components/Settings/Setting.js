import React, {Component} from 'react';
import './Setting.css'
import Settings from 'material-ui/svg-icons/action/settings';
import IconButton from 'material-ui/IconButton';
import Toggle from 'material-ui/Toggle';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';

class Setting extends Component {

    state = {
        showSettings:false
    }

    toggleSettings = () => {
        this.setState({showSettings:!this.state.showSettings})
    }

    updateDOB(dob) {
        dob.preventDefault();
        let userID = this.props.userID;

        let d = {
            dob: this.refs.updatedob.refs.input.props.value
        };
        
        fetch(`/updateDOB/${userID}`, {
            method: 'POST',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify(d)
        }).then(res => res.json()).then(res => this.props.updateDOB(res))

        // this.refs.updatedob.refs.input.props.value = "";
    }

    render() {
        const styles = {
            block: {
                maxWidth: 100
            },
            toggle: {
                marginBottom: 0
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
        return (
           
            <div className="settingsSection">
                {!this.state.showSettings ? '':
                <div>
                    <div className="updateDOB">
                        <DatePicker hintText="Update DOB" textFieldStyle={{width: '135px'}} ref="updatedob" />
                        <RaisedButton label="Update" secondary={true} onClick={this.updateDOB.bind(this)} />
                    </div>
                    <div className="toggles">
                        <Toggle onToggle={this.props.toggleFriends} style={styles.toggle} toggled={this.props.friends?true:false} label="Show Friends"/>
                        <Toggle onToggle={this.props.togglePosts} toggled={this.props.posts?true:false}  style={styles.toggle} label="Show Posts" defaultToggled={true}/>
                        <Toggle onToggle={this.props.toggleStatus} toggled={this.props.status?true:false} style={styles.toggle} label="Show Status"/>
                        <Toggle onToggle={this.props.toggleDOB} toggled={this.props.dob?true:false} style={styles.toggle} label="Show DOB"/>
                    </div>
                </div>
                }
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