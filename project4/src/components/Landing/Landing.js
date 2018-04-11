import React from 'react';
import './Landing.css';
import RaisedButton from 'material-ui/RaisedButton';
import Route, {Link} from 'react-router-dom';

const Landing = (props) => {

    return (
        <div id="landing">

            <h1>Welcome to FB Lite</h1>
            <div className="buttons">
                <RaisedButton className="land-btns" label="Login"/>

                <Link to="/login">Login</Link>
                {/* <Route path="/login" render={()=>{<h1> Testing </h1>}}> 

                </Route> */}
                <RaisedButton className="land-btns" label="Register" primary={true}/>
            </div>


        </div>
    );
}

export default Landing;