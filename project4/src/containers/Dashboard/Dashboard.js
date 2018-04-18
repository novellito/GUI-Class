import React, {Component} from 'react';
import Drawer from 'material-ui/Drawer';
import './Dashboard.css'
import Friends from '../../components/Friends/Friends'
import Setting from '../../components/Settings/Setting'
class Dashboard extends Component {

    state = {
        friendsActive: false,
        user_id: this.props.match.params.id,
        userInfo:''

    };

    toggleFriendsList = () => {
        this.setState({
            friendsActive: !this.state.friendsActive
        });


        fetch(`/toggleFriendPreview/${this.props.match.params.id}`, {
            method:'PUT',
            body:JSON.stringify({status:!this.state.friendsActive}),
            headers: new Headers({'Content-Type':'application/json'})
           
        }).then(res => res.json()).then(res=>console.log(res))
    };

    // method to fetch the current users information so that it can be used later
    componentWillMount() {
        fetch(`/userInfo/${this.props.match.params.id}`)
        .then(res => res.json())
        .then(userInfo => {
            this.setState({ userInfo }, () =>{

                if(this.state.userInfo[0].toggle_friends === '1') { // show friends list on load
                    this.setState({friendsActive:true});
                }

                console.log("user info...", userInfo[0])
                console.log(this.state.userInfo[0].toggleFriends)
            }
            )}
        );

        
    }

    render() {

        let name = null;
        let age = null;
        let dob = null;
        let toggle_friends = null;
        let toggle_posts = null;
        let toggle_dob = null;
        let toggle_status = null;
        if(this.state.userInfo!=='') {
             name = this.state.userInfo[0].fname + " " + this.state.userInfo[0].lname ;
             age = this.state.userInfo[0].age;
             dob = this.state.userInfo[0].DOB;
        }
        return (
            <div className="window">
                <div className="window-content">
                    <div className="pane-group">
                        <div className="">
                            <Drawer id="userDrawer" className="pane-mini sidebar user-detail" open={true}>
                                <div className="user-details">
                                    <i className="material-icons face">face</i>
                                    <p className="username">{name}</p>
                                    <p className="dob">{dob}</p>
                                    <p className="age">{age}</p>
                                </div>
                                    <Setting 
                                    friends={this.state.friendsActive}
                                    dob = {toggle_dob}
                                    posts = {toggle_posts}
                                    status = {toggle_status}
                                    toggleFriends={this.toggleFriendsList}/>
                            </Drawer>
                            <Friends userID={this.state.user_id} active={this.state.friendsActive}/>
                        </div>
                       
                    </div>
                </div>

            </div>
        );
    }
}

export default Dashboard;