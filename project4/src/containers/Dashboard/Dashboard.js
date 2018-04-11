import React, {Component} from 'react';
import Drawer from 'material-ui/Drawer';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import './Dashboard.css'
import Friends from '../../components/Friends/Friends'

class Dashboard extends Component {

    state = {
        active: false
    };

    handleToggle = () => {
        this.setState({
            active: !this.state.active
        });
    };

    close = () => {
        console.log('closing');
    }

    render() {

        return (
            <div className="window">
                <div className="window-content">
                    <div className="pane-group">
                            <Drawer className="pane-mini sidebar user-detail" open={true}>
                                <div className="user-details">
                                    <i className="material-icons face">face</i>
                                    <p className="username">Bob Smith</p>
                                    <p className="age">21</p>
                                </div>
                                <button onClick={this.handleToggle}>
                                    test</button>
                            </Drawer>
                            
                            <div className="status">
                                <TextField className="statusText" hintText="Update Status"/>
                                <RaisedButton label="Primary" primary={true} />
                            </div>
                            
                            <div className="addPost">
                                <textarea></textarea>
                            </div>

                            
                            <Friends active={this.state.active}/>
                    </div>
                </div>

            </div>
        );
    }
}

export default Dashboard;