import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';

import './FriendPreview.css';

class FriendPreview extends Component {

    state = {
        open: true,
        lookupInfo:'',
        previewFriendsList:'',
        previewPosts: ''
      };
    
      handleOpen = () => {
        this.setState({open: true});
      };
    
      handleClose = () => {
        this.setState({open: false});
        this.props.onClose();

      };

    componentWillMount() {
        fetch(`/userInfo/${this.props.lookUpID}`)
        .then(res => res.json())
        .then(lookupInfo => {
            this.setState({ lookupInfo }, () => console.log("user info...", lookupInfo[0]))}
        );

        fetch(`/friendsList/${this.props.lookUpID}`)
            .then(res => res.json())
            .then(previewFriendsList => this.setState({ previewFriendsList }, () => console.log("Friends received..", previewFriendsList)));

        fetch(`/posts/${this.props.lookUpID}`)
        .then(res => res.json())
        .then(previewPosts => this.setState({ previewPosts }, () => console.log("Posts received..", previewPosts)));
    }
    
    
    render() {

        let name = null;
        let dob = null;
        let age = null;
        let username = null;
        let status = null;
        if(this.state.lookupInfo!=='') {
             name = this.state.lookupInfo[0].fname + " " + this.state.lookupInfo[0].lname ;
             age = "Age: " + this.state.lookupInfo[0].age;
             username = this.state.lookupInfo[0].username;
            }
        if(this.state.lookupInfo!=='' && this.state.lookupInfo[0].toggle_dob === '1') {
            dob = "DOB: " + this.state.lookupInfo[0].DOB;
        }
        if(this.state.lookupInfo!=='' && this.state.lookupInfo[0].toggle_status === '1') {
            if(this.state.lookupInfo[0].status !== null) {
                status = "Status: " + this.state.lookupInfo[0].status;
            }
        }

        return (
            <div>
                <Dialog
                    style={{textAlign:'center'}}
                    title={name + "'s profile"}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                    autoScrollBodyContent={true}>
                    <i className="material-icons pic">face</i>
                    <h3 className="username">{username}</h3>
                    <p>{age}</p>
                    <p>{dob}</p>
                    <p>{status}</p>
                    <Divider/>
                    {this.state.previewFriendsList!=='' && this.state.lookupInfo!=='' && this.state.lookupInfo[0].toggle_friends!=='0'?
                        <List>
                            <Subheader style={{paddingLeft:'0px', fontSize:'1.3em'}}>Friends</Subheader>
                            {this.state.previewFriendsList.map(friend =>
                            <ListItem innerDivStyle={{padding:'5px 16px'}} key={friend.id}
                                primaryText={<span>{friend.fname} {friend.lname}</span>}
                                />
                            )}
                        </List>:''
                    }
                    <Divider/>
                    {this.state.previewPosts!=='' && this.state.lookupInfo!=='' && this.state.lookupInfo[0].toggle_posts!=='0'?
                        <List>
                            <Subheader style={{paddingLeft:'0px', fontSize:'1.3em'}}>Posts</Subheader>
                            {this.state.previewPosts.map(post =>
                            <ListItem innerDivStyle={{padding:'5px 16px'}} key={post.id}
                                primaryText={<span>{post.post}</span>}
                                />
                            )}
                        </List>:''
                    }
                </Dialog>
            </div>
        );
    };
}

export default FriendPreview;