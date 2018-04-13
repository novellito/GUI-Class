import React, {Component} from 'react';
import {List, ListItem} from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import Person from 'material-ui/svg-icons/social/person';

class AddFriends extends Component {

    state = {
        friends: []
    }  

    // Removes the newly added friend from the "Add a friend" list
    // Also save the added friend to the database
    addFriend(id,f) {
        this.setState({friends:this.state.friends.filter(el=>el.id!==id)}, ()=> {
            this.props.onFriendAdded(f)
        })
        
        const data = {
            userID:this.props.userID,
            id
        }
        fetch(`/addAFriend/${this.props.userID}`, {
            method:'POST',
            body:JSON.stringify(data),
            headers: new Headers({'Content-Type':'application/json'})
           
        }).then(res => res.json()).then(res=>console.log(res))
    }

    // Loads a list of all the users that are currently not friends with the current user
    componentDidMount() {
        fetch(`/friends/${this.props.userID}`)
            .then(res => res.json())
            .then(friends => {
                this.setState({ friends:friends.filter(friend=> friend!==null) }, () => console.log("Friends left..", friends))}
            );
    }

    render() {

        return (
                <List>
                    <Subheader>Add A Friend</Subheader>

                    {this.state.friends.length===0 ? <ListItem primaryText={<span>No friends to add!</span>}/>:''}

                    {this.state.friends!==null?this.state.friends.map(friend =>
                    <ListItem key={friend.id}
                        primaryText={<span>{friend.fname} {friend.lname}</span>}
                        leftIcon={< Person />}
                        rightIconButton={
                        <IconButton
                        onClick={()=> this.addFriend(friend.id,friend)}
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