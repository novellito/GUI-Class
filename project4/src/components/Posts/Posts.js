import React, {Component} from 'react';
import {List, ListItem} from 'material-ui/List';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import Close from 'material-ui/svg-icons/navigation/close';
import RaisedButton from 'material-ui/RaisedButton';
import './Posts.css';


class Posts extends Component {
    constructor() {
        super();
        this.state = {
            posts: [],
            postErrorText: ''
        }    
    }

    componentDidMount() {
        fetch(`/posts/${this.props.userID}`)
            .then(res => res.json())
            .then(posts => this.setState({ posts }, () => console.log("Posts received..", posts)));
    }

    // Add a Post
    addPost(post) {
        post.preventDefault();
        if(this.refs.postText.getValue() === '') {
            this.setState({postErrorText: 'Please enter text'});
        }
        else {
            this.setState({postErrorText: ''});
            let p = {
                post: this.refs.postText.getValue()
            }
            let userID = this.props.userID;

            fetch(`/addPost/${userID}`, {
                method: 'POST',
                headers: new Headers({ 'Content-Type': 'application/json' }),
                body: JSON.stringify(p)
            }).then(res => res.json()).then(res => console.log(res))

            this.refs.postText.getInputNode().value = "";

            // Make another get request to update posts in the view 
            fetch(`/posts/${this.props.userID}`)
            .then(res => res.json())
            .then(posts => this.setState({ posts }, () => console.log("Posts received..", posts)));
        }
    }

    // Delete a Post
    deletePost(post_id) {

        let data = {
            p_id: post_id
        }

        fetch(`/deletePost/${post_id}`, {
            method: 'POST',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify(data)
        }).then(res => res.json()).then(res => console.log(res))

        // Make another get request to update posts in the view 
        fetch(`/posts/${this.props.userID}`)
        .then(res => res.json())
        .then(posts => this.setState({ posts }, () => console.log("Posts received..", posts)));
    }

    render(props) {
        return (
            <div>
                <div className="addPost">
                    <h4>Add a Post</h4>
                    <TextField
                        className="post"
                        hintText="Add Post"
                        errorText={this.state.postErrorText}
                        multiLine={true}
                        rows={1}
                        rowsMax={4}
                        ref="postText"
                    />
                    <RaisedButton label="Add" primary={true} onClick={this.addPost.bind(this)}/>
                </div>

                <div className="list">
                    <h3>Your Posts</h3>
                    <List>
                        {this.state.posts.length === 0 ? <ListItem primaryText={<span>No Posts!</span>}/> : ''}
                        {this.state.posts.map((post, index) =>
                            <ListItem key={post.id}
                                className="item"
                                primaryText={<span>{post.post}</span>}
                                leftIcon={<span>{index+1}.</span>}
                                rightIconButton={
                                    <IconButton
                                    iconStyle={{cursor:"pointer"}}
                                        tooltip="Remove Post"
                                        tooltipPosition="top-left">
                                        <Close onClick={()=>this.deletePost(post.id)} />
                                    </IconButton>
                                }
                            />
                        )}
                    </List>
                </div>
            </div>
        );
    }
}

export default Posts;