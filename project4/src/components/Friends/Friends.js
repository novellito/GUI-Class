import React, {Component} from 'react';
import Drawer from 'material-ui/Drawer';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Close from 'material-ui/svg-icons/navigation/close';
import Person from 'material-ui/svg-icons/social/person';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import './Friends.css';


class Friends extends Component {
    render(props) {
        return (

            <Drawer openSecondary={true} open={this.props.active}>
            <List>
                <Subheader>Friends</Subheader>
                <ListItem
                    primaryText="Brendan Lim"
                    leftIcon={< Person />}
                    rightIconButton={
                    <IconButton
                    iconStyle={{cursor:"pointer"}}
                        tooltip="Remove Friend"
                        tooltipPosition="top-left">
                        <Close/>
                    </IconButton>}/>
                <ListItem
                    primaryText="Brendan Lim"
                    leftIcon={< Person />}
                    rightIconButton={
                        <IconButton
                        iconStyle={{cursor:"pointer"}}
                        tooltip="Remove Friend"
                        tooltipPosition="top-left">
                        <Close/>
                    </IconButton>}/>
                
                <ListItem
                    primaryText="Brendan Lim"
                    leftIcon={< Person />}
                    rightIconButton={
                        <IconButton
                        iconStyle={{cursor:"pointer"}}
                        tooltip="Remove Friend"
                        tooltipPosition="top-left">
                        <Close/>
                    </IconButton>}/>
             
            </List>

            <Divider/>

            <div className="friend-options">
                <RaisedButton backgroundColor="#FF1744" className="del-btn" >
                    <i className="material-icons del">delete</i>
                </RaisedButton>

                <RaisedButton backgroundColor="#00E676">
                    <i className="material-icons add">add</i>
                </RaisedButton>
            </div>
        </Drawer>



        );
    }
}

export default Friends;