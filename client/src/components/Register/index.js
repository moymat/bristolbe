import './style.scss';
import { Link } from 'react-router-dom';
import { TextField, Button, Checkbox, FormControlLabel } from '@mui/material';

export default function Register() {
    return(
        <div className="reg-rightpage">
            <h1 className="reg-title">Adventure starts here</h1>
            <p>Make your app management easy and fun!</p>
            <form className="reg-form">
                <p>Username</p>
                <TextField 
                    type="text" 
                    name="username" 
                    placeholder="Username" 
                    size="small"
                />
                <p>Email</p>
                <TextField 
                    type="email" 
                    name="email" 
                    placeholder="E-mail" 
                    className="reg-email"
                    size="small"
                />
                    <div>
                        <p>Password</p>
                    </div>
                <TextField
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="reg-password" 
                    size="small"
                />
                <FormControlLabel 
                control={<Checkbox />}
                label={
                    <div>
                        <span> I agree to </span>
                        <Link to="#" >Privacy policy & terms</Link>
                    </div>
                }
                />
                <Button
                type="submit"
                className="reg-submit"> 
                    Sign in 
                </Button>
            </form>
                <p className="reg-create">
                    Already hava an account? 
                    <Link to="/">Sign in instead</Link>
                </p>
        </div>
    )
}