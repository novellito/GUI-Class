import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {Link} from 'react-router-dom';

const Register = (props) => {

    return (
        <div>

            <h1>Register</h1>
            <Link to="/"><RaisedButton className="land-btns" label="Home" primary={true}/></Link>
            

        </div>
    );
}

export default Register;