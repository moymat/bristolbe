import './style.scss';
import { Link } from 'react-router-dom';
import { TextField, Button, Checkbox, FormControlLabel } from '@mui/material';

export default function Login() {
    return(
        <div className="log-rightpage">
            <h1 className="log-title">Welcome to Bristol!</h1>
            <p>Please sign-in to your account</p>
            <form className="log-form">
                <p>Email</p>
                <TextField 
                    type="email" 
                    name="email" 
                    placeholder="toto@example.com" 
                    className="log-email"
                    size="small"
                />
                    <div className="log-text">
                        <p>Password</p>
                        <Link to="/forgot-password" className="log-forgot">Forgot password ?</Link>
                    </div>
                <TextField
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="log-password" 
                    size="small"
                />
                <FormControlLabel 
                control={<Checkbox />}
                label="Remember me"
                />
                <Button
                type="submit"
                className="log-submit"> 
                    Sign in 
                </Button>
            </form>
                <p className="log-create">
                    New on our platform ? 
                        <Link to="/register">Create an account</Link>
                </p>
        </div>      
    )
}