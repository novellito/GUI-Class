import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import Close from 'material-ui/svg-icons/navigation/close';
import Person from 'material-ui/svg-icons/social/person';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import AddFriends from './AddFriends/AddFriends';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Search from 'material-ui/svg-icons/action/search';
import FriendPreview from '../FriendPreview/FriendPreview';

import './Friends.css';

class Friends extends Component {
  constructor() {
    super();
    this.state = {
      addingAFriend: false,
      deletingAFriend: false,
      viewingUser: false,
      userLookupID: '',
      friends: []
    };
  }

  addingFriend = () => {
    this.setState({ addingAFriend: !this.state.addingAFriend });
  };

  // toggles the delete icon for the friends list
  toggleDeletingFriend = () => {
    this.setState({
      deletingAFriend: !this.state.deletingAFriend,
      addingAFriend: false
    });
  };

  // Method to update the database when a friend has been deleted
  // Also visually updates the user's friends list
  deleteFriend(friendId, id) {
    let dataID = null;
    friendId ? (dataID = friendId) : (dataID = id);
    const data = {
      userID: this.props.userID,
      id: dataID
    };

    this.setState({ friends: this.state.friends.filter(el => el.id !== id) });

    fetch(`/deleteAFriend/${this.props.userID}`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers({ 'Content-Type': 'application/json' })
    })
      .then(res => res.json())
      .then(res => console.log(res));
  }

  // Visually adds a friend to the user's friends list
  addToList = f => {
    this.setState({ friend: this.state.friends.push(f) }, () => {
      fetch(`/friendsList/${this.props.userID}`)
        .then(res => res.json())
        .then(friends =>
          this.setState({ friends }, () =>
            console.log('Friends received..', friends)
          )
        );
    });
  };

  //Method to store the information of the user being previewed
  lookupUser = id => {
    this.setState({ viewingUser: !this.state.viewingUser, userLookupID: id });
  };

  // Load the current users friends list
  componentDidMount() {
    fetch(`/friendsList/${this.props.userID}`)
      .then(res => res.json())
      .then(friends =>
        this.setState({ friends }, () =>
          console.log('Friends received..', friends)
        )
      );
  }

  render(props) {
    let addingFriend = null;
    if (this.state.addingAFriend) {
      addingFriend = (
        <AddFriends onFriendAdded={this.addToList} userID={this.props.userID} />
      );
    }

    return (
      <Drawer
        containerClassName="friends-drawer"
        openSecondary={true}
        open={this.props.active}
      >
        <div className="list">
          {addingFriend}
          <List>
            <Subheader>Friends</Subheader>
            {this.state.friends.map(friend => (
              <ListItem
                key={friend.id}
                primaryText={
                  <span>
                    {friend.fname} {friend.lname}
                  </span>
                }
                leftIcon={<Person />}
                rightIconButton={
                  <IconButton
                    iconStyle={{ cursor: 'pointer' }}
                    tooltip={
                      this.state.deletingAFriend
                        ? 'Remove Friend'
                        : 'View Profile'
                    }
                    tooltipPosition="top-left"
                  >
                    {this.state.deletingAFriend ? (
                      <Close
                        onClick={() =>
                          this.deleteFriend(friend.friend_id, friend.id)
                        }
                      />
                    ) : (
                      <Search
                        onClick={() => this.lookupUser(friend.friend_id)}
                      />
                    )}
                  </IconButton>
                }
              />
            ))}
          </List>
        </div>

        {this.state.viewingUser ? (
          <FriendPreview
            lookUpID={this.state.userLookupID}
            onClose={this.lookupUser}
          />
        ) : (
          ''
        )}

        <Divider />
        <div className="friend-options">
          <RaisedButton
            onClick={this.toggleDeletingFriend}
            backgroundColor="#FF1744"
            className="del-btn"
          >
            <i className="material-icons del">delete</i>
            <span>/</span>
            <i className="material-icons ser">search</i>
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
