import React, {Component} from 'react';
import './Login.css'



class Login extends Component {
    constructor() {
        super();
        
    }

    componentDidMount() {
      
    }
    render(props) {
        return (

           
            <div>

                <form action = "Apps" method = "POST" className="LoginForm">
                    Username:<br/>
                    <input type="text" className = "Login-Username" name="username" value=""/>
                    <br/>
                    Password:<br/>
                    <input type="text" className="Login-Password" name="password" value=""/>
                    <br/><br/>
                    <input type="submit" value="submit"/>
                </form>
                

            </div>
            



        );
    }
}

export default Login;