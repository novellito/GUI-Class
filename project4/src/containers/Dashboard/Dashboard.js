import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import './Dashboard.css';
import Friends from '../../components/Friends/Friends';
import Posts from '../../components/Posts/Posts';

import Setting from '../../components/Settings/Setting';
class Dashboard extends Component {
  state = {
    friendsActive: false,
    postsActive: false,
    statusActive: false,
    dobActive: false,
    user_id: this.props.match.params.id,
    userInfo: '',
    statusErrorText: ''
  };

  toggleFriendsList = () => {
    this.setState({
      friendsActive: !this.state.friendsActive
    });
    fetch(`/toggleFriendPreview/${this.props.match.params.id}`, {
      method: 'PUT',
      body: JSON.stringify({ status: !this.state.friendsActive }),
      headers: new Headers({ 'Content-Type': 'application/json' })
    })
      .then(res => res.json())
      .then(res => console.log(res));
  };
  togglePosts = () => {
    this.setState({
      postsActive: !this.state.postsActive
    });
    fetch(`/togglePosts/${this.props.match.params.id}`, {
      method: 'PUT',
      body: JSON.stringify({ status: !this.state.postsActive }),
      headers: new Headers({ 'Content-Type': 'application/json' })
    })
      .then(res => res.json())
      .then(res => console.log(res));
  };
  toggleStatus = () => {
    this.setState({
      statusActive: !this.state.statusActive
    });
    fetch(`/status/${this.props.match.params.id}`, {
      method: 'PUT',
      body: JSON.stringify({ status: !this.state.statusActive }),
      headers: new Headers({ 'Content-Type': 'application/json' })
    })
      .then(res => res.json())
      .then(res => console.log(res));
  };
  toggleDOB = () => {
    this.setState({
      dobActive: !this.state.dobActive
    });
    fetch(`/dob/${this.props.match.params.id}`, {
      method: 'PUT',
      body: JSON.stringify({ status: !this.state.dobActive }),
      headers: new Headers({ 'Content-Type': 'application/json' })
    })
      .then(res => res.json())
      .then(res => console.log(res));
  };

  // method to fetch the current users information so that it can be used later
  componentWillMount() {
    fetch(`/userInfo/${this.props.match.params.id}`)
      .then(res => res.json())
      .then(userInfo => {
        this.setState({ userInfo }, () => {
          if (this.state.userInfo[0].toggle_friends === '1') {
            // show friends list on load
            this.setState({ friendsActive: true });
          }
          if (this.state.userInfo[0].toggle_posts === '1') {
            // show friends list on load
            this.setState({ postsActive: true });
          }
          if (this.state.userInfo[0].toggle_status === '1') {
            // show friends list on load
            this.setState({ statusActive: true });
          }
          if (this.state.userInfo[0].toggle_dob === '1') {
            // show friends list on load
            this.setState({ dobActive: true });
          }
          console.log('user info...', userInfo[0]);
        });
      });
  }

  updateStatus(status) {
    status.preventDefault();
    if (this.refs.statusText.getValue() === '') {
      this.setState({ statusErrorText: 'Please enter text' });
    } else {
      let s = {
        status: this.refs.statusText.getValue()
      };
      let userID = this.state.user_id;

      fetch(`/updateStatus/${userID}`, {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(s)
      })
        .then(res => res.json())
        .then(res => console.log(res));

      this.refs.statusText.getInputNode().value = '';

      // Another get request to see updated status of user
      fetch(`/userInfo/${this.props.match.params.id}`)
        .then(res => res.json())
        .then(userInfo => {
          this.setState({ userInfo }, () =>
            console.log('user info...', userInfo[0])
          );
        });
    }
  }

  updateDOB() {
    fetch(`/userInfo/${this.props.match.params.id}`)
    .then(res => res.json())
    .then(userInfo => {
        this.setState({ userInfo }, () => console.log("user info...", userInfo[0]))}
    );
  }

  render() {
    let name = null;
    let age = null;
    let dob = null;
    let status = null;
    if (this.state.userInfo !== '') {
      name = this.state.userInfo[0].fname + ' ' + this.state.userInfo[0].lname;
      age = this.state.userInfo[0].age;
      dob = this.state.userInfo[0].DOB;
      status = this.state.userInfo[0].status;
    }
    return (
      <div className="window">
        <div className="window-content">
          <div className="pane-group">
            <Drawer className="pane-mini sidebar" open={true}>
              <div className="user-details">
                <i className="material-icons face" id="face-icon">face</i>
                <p className="username">{name}</p>
                {this.state.dobActive ? <p className="dob">DOB: {dob}</p> : ''}
                <p className="age">Age: {age}</p>
                {this.state.statusActive ? (
                  <p className="status">Status: {status}</p>
                ) : (
                  ''
                )}
              </div>
              <Setting
                userID={this.state.user_id}
                style={{ backgroundColor: '#e9ebee' }}
                friends={this.state.friendsActive}
                dob={this.state.dobActive}
                updateDOB={this.updateDOB.bind(this)}
                posts={this.state.postsActive}
                status={this.state.statusActive}
                togglePosts={this.togglePosts}
                toggleDOB={this.toggleDOB}
                toggleStatus={this.toggleStatus}
                toggleFriends={this.toggleFriendsList}
              />
            </Drawer>
            {this.state.statusActive ? (
              <div
                className={
                  this.state.friendsActive === true
                    ? 'openStatusUpdate'
                    : 'closeStatusUpdate'
                }
              >
                <h4>Update Your Status</h4>
                <TextField
                  className="statusText"
                  hintText="Update Status"
                  errorText={this.state.statusErrorText}
                  ref="statusText"
                />
                <RaisedButton
                  label="Update"
                  secondary={true}
                  onClick={this.updateStatus.bind(this)}
                />
              </div>
            ) : (
              ''
            )}

            {this.state.postsActive ? (
              <div
                className={
                  this.state.friendsActive === true
                    ? 'openListPosts'
                    : 'closeListPosts'
                }
              >
                <Posts userID={this.state.user_id} />
              </div>
            ) : (
              ''
            )}

            <Friends
              userID={this.state.user_id}
              active={this.state.friendsActive}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
