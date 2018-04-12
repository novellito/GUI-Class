import React, {Component} from 'react';
import Drawer from 'material-ui/Drawer';
import './Dashboard.css'
import Friends from '../../components/Friends/Friends'

class Dashboard extends Component {

    state = {
        active: false,
        user_id: this.props.match.params.id,
        userInfo:''

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

    render() {

        let name = null;
        let age = null;
        if(this.state.userInfo!=='') {
             name = this.state.userInfo[0].fname + " " + this.state.userInfo[0].lname ;
             age = this.state.userInfo[0].age;
        }
        return (
            <div className="window">
                <div className="window-content">
                    <div className="pane-group">
                        <div className="">
                            <Drawer className="pane-mini sidebar user-detail" open={true}>
                                <div className="user-details">
                                    <i className="material-icons face">face</i>
                                    <p className="username">{name}</p>
                                    <p className="age">{age}</p>
                                </div>
                                <button onClick={this.handleToggle}>
                                    test</button>
                            </Drawer>
                            <Friends userID={this.state.user_id} active={this.state.active}/>
                        </div>
                       
                    </div>
                </div>

            </div>
        );
    }
}

export default Dashboard;