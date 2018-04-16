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

    addPost(post) {
        post.preventDefault();
        if(this.refs.postText.getValue() === '') {
            this.setState({postErrorText: 'Please enter text'});
        }
        else {
            this.setState({postErrorText: ''});
            this.setState({post: this.state.posts.push(post)});
            let p = {
                post: this.refs.postText.getValue()
            }
            let userID = this.props.userID;

            fetch(`/addPost/${userID}`, {
                method: 'POST',
                headers: new Headers({ 'Content-Type': 'application/json' }),
                body: JSON.stringify(p)
            }).then(res => res.json()).then(res => console.log(res))
        }
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
                    {this.state.posts.map((post, index) =>
                        <ListItem key={post.id}
                            primaryText={<span>{post.post}</span>}
                            leftIcon={<span>{index+1}.</span>}
                            rightIconButton={
                                <IconButton
                                iconStyle={{cursor:"pointer"}}
                                    tooltip="Remove Post"
                                    tooltipPosition="top-left">
                                    <Close/>
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