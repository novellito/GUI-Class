import React, {Component} from 'react';
import Drawer from 'material-ui/Drawer';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import './Dashboard.css'
import Friends from '../../components/Friends/Friends'
import Posts from '../../components/Posts/Posts'

class Dashboard extends Component {

    state = {
        active: false,
        user_id: this.props.match.params.id,
        userInfo:'',
        statusErrorText: ''
    };

    handleToggle = () => {
        this.setState({
            active: !this.state.active
        });
    };

    // method to fetch the current users information so that it can be used later
    componentWillMount() {
        fetch(`/userInfo/${this.props.match.params.id}`)
        .then(res => res.json())
        .then(userInfo => {
            this.setState({ userInfo }, () => console.log("user info...", userInfo[0]))}
        );
    }

    updateStatus(status) {
        status.preventDefault();
        if(this.refs.statusText.getValue() === '') {
            this.setState({statusErrorText: 'Please enter text'});
        }
        else {
            let s = {
                status: this.refs.statusText.getValue()
            }
            let userID = this.state.user_id;

            fetch(`/updateStatus/${userID}`, {
                method: 'POST',
                headers: new Headers({ 'Content-Type': 'application/json' }),
                body: JSON.stringify(s)
            }).then(res => res.json()).then(res => console.log(res))

            this.refs.statusText.getInputNode().value = "";

            // Another get request to see updated status of user
            fetch(`/userInfo/${this.props.match.params.id}`)
            .then(res => res.json())
            .then(userInfo => {
                this.setState({ userInfo }, () => console.log("user info...", userInfo[0]))}
            );
        }
    }

    render() {
        let name = null;
        let age = null;
        let dob = null;
        let status = null;
        if(this.state.userInfo!=='') {
             name = this.state.userInfo[0].fname + " " + this.state.userInfo[0].lname ;
             age = this.state.userInfo[0].age;
             dob = this.state.userInfo[0].DOB;
             status = this.state.userInfo[0].status;
        }

        return (
            <div className="window">
                <div className="window-content">
                    <div className="pane-group">
                        <Drawer className="pane-mini sidebar user-detail" open={true}>
                            <div className="user-details">
                                <i className="material-icons face">face</i>
                                <p className="username">{name}</p>
                                <p className="dob">{dob}</p>
                                <p className="age">Age: {age}</p>
                                <p className="status">Status: {status}</p>
                            </div>
                            <button onClick={this.handleToggle}>
                                test
                            </button>
                        </Drawer>

                        <div className={this.state.active === true ? "openStatusUpdate" : "closeStatusUpdate"}>
                            <h4>Update Your Status</h4>
                            <TextField 
                                className="statusText" 
                                hintText="Update Status"
                                errorText={this.state.statusErrorText}
                                ref="statusText"
                            />
                            <RaisedButton label="Update" secondary={true} onClick={this.updateStatus.bind(this)}/>
                        </div>

                        <div className={this.state.active === true ? "openListPosts" : "closeListPosts"}>
                            <Posts userID={this.state.user_id}/>
                        </div>

                        <Friends userID={this.state.user_id} active={this.state.active}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;