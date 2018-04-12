import React, {Component} from 'react';
import Drawer from 'material-ui/Drawer';
import Close from 'material-ui/svg-icons/navigation/close';
import Person from 'material-ui/svg-icons/social/person';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import AddFriends from './AddFriends/AddFriends';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Search from 'material-ui/svg-icons/action/search';


import './Friends.css';


class Friends extends Component {
    constructor() {
        super();
        this.state = {
            addingAFriend:false,
            deletingAFriend:false,
            friends: []
            
        }    
    }

    addingFriend = () => {
        this.setState({addingAFriend:!this.state.addingAFriend});
    }
    deletingFriend = () => {
        this.setState({deletingAFriend:!this.state.addingAFriend});
    }

    componentDidMount() {
        fetch(`/friendsList/${this.props.userID}`)
            .then(res => res.json())
            .then(friends => this.setState({ friends }, () => console.log("Friends received..", friends)));
    }
    render(props) {

        let addingFriend = null;
        if(this.state.addingAFriend) {
            addingFriend = <AddFriends userID={this.props.userID}/>
        }
        return (

            <Drawer openSecondary={true} open={this.props.active}>
            <div className="list">

            {addingFriend}
                <List>
                    <Subheader>Friends</Subheader>
                    {this.state.friends.map(friend =>
                    <ListItem key={friend.id}
                        primaryText={<span>{friend.fname} {friend.lname}</span>}
                        leftIcon={< Person />}
                        rightIconButton={
                        <IconButton
                        iconStyle={{cursor:"pointer"}}
                            tooltip={this.state.deletingAFriend?  "Remove Friend" : "View Profile"}
                            tooltipPosition="top-left">
                            {this.state.deletingAFriend?  <Close/> : <Search/>}
                           
                        </IconButton>}/>
                    )}
                </List>
            </div>

            <Divider/>

            <div className="friend-options">
                <RaisedButton onClick={this.deletingFriend} backgroundColor="#FF1744" className="del-btn" >
                    <i className="material-icons del">delete</i>
                </RaisedButton>

                <RaisedButton onClick={this.addingFriend} backgroundColor="#00E676">
                    <i className="material-icons add">add</i>
                </RaisedButton>
            </div>
        </Drawer>



        );
    }
}

export default Friends;