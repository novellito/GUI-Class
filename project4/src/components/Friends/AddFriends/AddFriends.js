import React, {Component} from 'react';
import {List, ListItem} from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import Person from 'material-ui/svg-icons/social/person';

class AddFriends extends Component {

    state = {
        friends: []
    }  

    addFriend(id) {
        console.log(id);
        // console.log(e);
        // this.setState({friends:null})
        this.setState({friends:this.state.friends.filter(el=>el.friend_id!==id)})
        console.log(this.state.friends);

        // const data = {
        //     userID:this.props.userID,
        //     id
        // }
        // fetch(`/addAFriend/${this.props.userID}`, {
        //     method:'POST',
        //     body:JSON.stringify(data),
        //     headers: new Headers({'Content-Type':'application/json'})
           
        // }).then(res => res.json()).then(res=>console.log(res))
    }

    componentDidMount() {
        fetch(`/friends/${this.props.userID}`)
            .then(res => res.json())
            .then(friends => this.setState({ friends }, () => console.log("Friends received..", friends)));
    }

    render() {

        return (
                <List>
                    <Subheader>Add A Friend</Subheader>

                    {this.state.friends!==null?this.state.friends.map(friend =>
                    <ListItem key={friend.friend_id}
                        primaryText={<span>{friend.fname} {friend.lname}</span>}
                        leftIcon={< Person />}
                        rightIconButton={
                        <IconButton
                        onClick={()=> this.addFriend(friend.friend_id)}
                        iconStyle={{cursor:"pointer"}}
                            tooltip="Add Friend"
                            tooltipPosition="top-left">
                            <i className="material-icons ">add</i>
                        </IconButton>}/>
                    ):''}
                </List> 
        );
    };
}

export default AddFriends;