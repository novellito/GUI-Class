import React, {Component} from 'react';
import Drawer from 'material-ui/Drawer';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import './Dashboard.css'
import Friends from '../../components/Friends/Friends'
import Posts from '../../components/Posts/Posts'

class Dashboard extends Component {

    state = {
        active: false
    };

    handleToggle = () => {
        this.setState({
            active: !this.state.active
        });
    };

    close = () => {
        console.log('closing');
    }

    addPost(post) {
        post.preventDefault();
        let p = this.refs.postText.getValue();
        var addPostRequest = new Request('http://localhost:5000/addPost', {
            method: 'POST',
            headers: new Headers({ 'Content-Type': 'application/json'}),
            body: JSON.stringify(p)
        });

        fetch(addPostRequest)
            .then(function(resp) {
                resp.json()
                    .then(function(data) {
                        console.log(data)
                    })
            })
    }

    render() {

        return (
            <div className="window">
                <div className="window-content">
                    <div className="pane-group">
                            <Drawer className="pane-mini sidebar user-detail" open={true}>
                                <div className="user-details">
                                    <i className="material-icons face">face</i>
                                    <p className="username">Bob Smith</p>
                                    <p className="age">21</p>
                                </div>
                                <button onClick={this.handleToggle}>
                                    test</button>
                            </Drawer>

                            <div className="status">
                                <TextField className="statusText" hintText="Update Status"/>
                                <RaisedButton label="Primary" primary={true} />
                            </div>

                            <div className="addPost">
                                <h3>Add a Post</h3>
                                {/* <form ref="postForm"> */}
                                    <TextField
                                        className="post"
                                        hintText="Add Post"
                                        multiLine={true}
                                        rows={1}
                                        rowsMax={4}
                                        ref="postText"
                                    />
                                    <RaisedButton label="Primary" primary={true} onClick={this.addPost.bind(this)}/>
                                {/* </form> */}
                            </div>

                            <div className="listPosts">
                                <Posts />
                            </div>

                            <Friends active={this.state.active}/>
                    </div>
                
                </div>

            </div>
        );
    }
}

export default Dashboard;