import React, {Component} from 'react';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import IconButton from 'material-ui/IconButton';
import Close from 'material-ui/svg-icons/navigation/close';
import RaisedButton from 'material-ui/RaisedButton';
import './Posts.css';


class Posts extends Component {
    constructor() {
        super();
        this.state = {
            posts: []
        }    
    }

    componentDidMount() {
        fetch(`/posts/${this.props.userID}`)
            .then(res => res.json())
            .then(posts => this.setState({ posts }, () => console.log("Posts received..", posts)));
    }
    render(props) {
        return (

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
            
        );
    }
}

export default Posts;