import React, {Component} from 'react';
import {Redirect, Link} from "react-router-dom";
import './LoginForm.css'
import logo from './facebook.png';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';



class Login extends Component {
    
    state = {
        username:'',
        password:'',
        userID:'',
        errorText:'',
        validLogin:false
    }

    handleLogin = (e) => {
        e.preventDefault();
        console.log(this.state.username);
        console.log(this.state.password);
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
            this.checkValidLogin(res),
            console.log(this.state.userID)
        });
    }
    checkValidLogin(res){
        
        try{
            this.setState({validLogin:true, userID:res[0].id});
            
        }catch(Exception){
            this.setState({errorText:"Wrong Username/Password"});
        }
        

    }
    render(props) {
        var redirect = null;
        if(this.state.validLogin == true){
            redirect = <Redirect to={"/dashboard/"+this.state.userID}></Redirect>;
        }
        return (

           
            <div id="LoginForm">
                <img src={logo} alt="facebook icon" className="LoginLogoImageCenter"/>
                <p className = "Login-Title">FaceBookLite</p>
                <TextField value={this.state.username} onChange={(e)=>this.handleUsername(e.target.value)} type="text" className = "Login-Field" name="username" floatingLabelText="Username" errorText={this.state.errorText}/>
                <br/>
                <TextField value={this.state.password} onChange={(e) =>this.handlePassword(e.target.value)} type="password" className="Login-Field" name="password" floatingLabelText="Password" errorText={this.state.errorText}/>
                <br/><br/>
                    
                <div id="Buttons">
                <RaisedButton onClick ={this.login} className="LandingButtons" backgroundColor="#32CD32">Login</RaisedButton>
                <Link to="/">
                <RaisedButton onClick ={this.login} className="LandingButtons" backgroundColor="#C0C0C0">Back</RaisedButton>
                </Link>
                </div>
                {redirect}
                

            </div>
            



        );
    }
}

export default Login;