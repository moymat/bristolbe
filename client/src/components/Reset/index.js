import './style.scss';
import { Link } from 'react-router-dom';
import { TextField, Button } from '@mui/material';

export default function Register() {
    const specialCharacter = "<";
    return(
        <div className="reset-rightpage">
            <h1 className="reset-title">Reset password</h1>
            <p className="reset-instructions">Your new password must be different from previously used passwords</p>
            <form className="reset-form">
                <p>New password</p>
                <TextField 
                    type="password" 
                    name="new-password" 
                    placeholder="Password" 
                    size="small"
                />
                <p>Confirm password</p>
                <TextField 
                    type="password" 
                    name="confirm-password" 
                    placeholder="Password" 
                    size="small"
                />
                <Button
                type="submit"
                className="reset-submit"> 
                   Set new password
                </Button>
            </form>
                <p className="reset-create"> 
                    <Link to="/"> {specialCharacter} Back to login</Link>
                </p>
        </div>
    )
}