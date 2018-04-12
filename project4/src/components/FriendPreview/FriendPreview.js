import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';

class FriendPreview extends Component {

    state = {
        open: true,
        lookupInfo:''
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
      }
    
    
    render() {

        let name = null;
        let age = null;
        if(this.state.lookupInfo!=='') {
             name = this.state.lookupInfo[0].fname + " " + this.state.lookupInfo[0].lname ;
             age = this.state.lookupInfo[0].age;
        }

        return (
            <div>
                <Dialog
                    title={name + "'s profile"}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                    autoScrollBodyContent={true}>
                    <h2>Age: {age}</h2>
                </Dialog>
            </div>
        );
    };
}

export default FriendPreview;