import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import './LoginForm.css'
import logo from './facebook.png';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';



class Login extends Component {
    
    state = {
        username:'',
        password:'',
        userID:'',
        validLogin:false
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

    login = () => {
        fetch(`/login/${this.state.username}/${this.state.password}`
        ).then(res => res.json()).then(res=>{
            this.setState({userID:res[0].id,validLogin:true})
            console.log(this.state.userID)
        });
    }
    render(props) {
        var redirect = null;
        if(this.state.validLogin == true){
            redirect = <Redirect to={"/dashboard/"+this.state.userID}></Redirect>;
        }
        return (

           
            <div>
                <img src={logo} alt="facebook icon" className="LoginLogoImageCenter"/>
                <p className = "Login-Title">FaceBookLite</p>
    
                Username:<br/>
                <TextField value={this.state.username} onChange={(e)=>this.handleUsername(e.target.value)} type="text" className = "Login-Username" name="username"/>
                <br/>
                Password:<br/>
                <TextField value={this.state.password} onChange={(e) =>this.handlePassword(e.target.value)} type="password" className="Login-Password" name="password"/>
                <br/><br/>
                    
                
                <RaisedButton onClick ={this.login} >login</RaisedButton>
                {redirect}
                

            </div>
            



        );
    }
}

export default Login;