import React, {Component} from 'react';
import './Login.css'
import logo from './facebook.png';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';



class Login extends Component {
    
    state = {
        username:'',
        password:''
    }

    handleLogin = (e) => {
        e.preventDefault();
        console.log(this.state.username);
        console.log(this.state.password);

        ///fetch...
    }

    handleUsername = (username) => {
        this.setState({username:username},()=>console.log(this.state.username))
    }

    handlePassword = (password) => {
        this.setState({password:password}, ()=> console.log(this.state.password))
    }

    componentDidMount() {
      
    }
    render(props) {
        return (

           
            <div>
                <img src={logo} alt="facebook icon" className="LoginLogoImageCenter"/>
                <p className = "Login-Title">FaceBookLite</p>
                <form onSubmit={this.handleLogin} className="LoginForm">
                    Username:<br/>
                    <TextField value={this.state.username} onChange={(e)=>this.handleUsername(e.target.value)} type="text" className = "Login-Username" name="username"/>
                    <br/>
                    Password:<br/>
                    <TextField value={this.state.password} onChange={(e) =>this.handlePassword(e.target.value)} type="password" className="Login-Password" name="password"/>
                    <br/><br/>
                    <RaisedButton type="submit" >login</RaisedButton>
                </form>
                

            </div>
            



        );
    }
}

export default Login;