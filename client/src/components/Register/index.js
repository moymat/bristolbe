import "./style.scss";
import { Link } from "react-router-dom";
import { usePasswordValidation } from "../hooks/usePasswordValidation";
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";
import InputLayout from "../InputLayout";


const emailValidator = new RegExp(
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

const passwordValidator = new RegExp(
  /^(?=.*[A-Za-zÀ-ÖØ-öø-ÿ])(?=.*\d).{8,30}$/
);

export default function Register() {
  const [input, setInput] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    confirmPassword: "",
  });
  
  const [validLength, hasNumber, upperCase, lowerCase, match] = usePasswordValidation({
      firstPassword: input.password,
      secondPassword: input.confirmPassword,
  });
  const [passwordError, setPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [touch, setTouch] = useState(false);
  const [fullName, setFullName] = useState(false);

  const handleChange = (event) => {

    const { name, value } = event.target;
    
    switch (name) {
      case "firstName":
        setFullName(false)
        break;
      case "lastName":
        setFullName(false);
        break;
      case "email": 
        setEmailError(false);
        break;
      case "password": 
        setPasswordError(false);
      break;
      default: break;  
    }
    if(name === "confirmPassword" && value === input.password) {
        setConfirmPassword(false)
    }else {
        setConfirmPassword(true)
    }
    setInput({
      ...input,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { email, password, confirmPassword, firstName, lastName } = input;

    if(!lastName || !firstName ) {
      setFullName(true);
    }

    if (!emailValidator.test(email)) {
      setEmailError(true);
    }

    if (!passwordValidator.test(password)) {
      setPasswordError(true);
    }
    
    if(password !== confirmPassword){
        setConfirmPassword(true);
    }
    if(!confirmPassword){
        setConfirmPassword(true);
    }
  };
  const handleTouch = () => {
      setTouch(true);
  }

  return (
    <InputLayout>
      <div className="reg-rightpage">
        <h1 className="reg-title">Adventure starts here 🚀</h1>
        <p>Make your app management easy and fun!</p>
        <form className="reg-form" onSubmit={handleSubmit}>
          <p>First name</p>
          <TextField
            type="text"
            name="firstName"
            placeholder="john"
            size="small"
            onChange={handleChange}
            value={input.firstName}
            helperText={fullName ? 'Your first name is required' : ""}
            error={fullName}
          />
          <p>Last name</p>
          <TextField
              
            type="text"
            name="lastName"
            placeholder="doe"
            size="small"
            onChange={handleChange}
            value={input.lastName}
            helperText={fullName ? 'Your last name is required' : ""}
            error={fullName}
          />
          <p>Email</p>
          <TextField
            type="email"
            name="email"
            placeholder="toto@example.com"
            className="reg-email"
            size="small"
            onChange={handleChange}
            value={input.email}
            helperText={emailError ? 'Your Email is invalid' : ""}
            error={emailError}
          />
          <p>Password</p>
          <TextField
            type="password"
            name="password"
            placeholder="Password"
            className="reg-password"
            size="small"
            onChange={handleChange}
            value={input.password}
            onClick={handleTouch}
            helperText={passwordError ? 'Your password is invalid' : ""}
            error={passwordError}
          />
          <p>Confirm Password</p>
          <TextField
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="reg-password"
            size="small"
            onChange={handleChange}
            value={input.confirmPassword}
            helperText={confirmPassword ? 'Your confirm password is invalid' : ""}
            error={confirmPassword}
          />
          {touch ?  
          <div>
                <ul className="reg-list">
                    <li className= {`${validLength ? "reg--one-li" : ''}`}>
                    8 characters (max.30)
                    </li>
                    <li className= {`${upperCase ? "reg--one-li" : ''}`}>
                      1 capital letter
                    </li>
                    <li className= {`${lowerCase ? "reg--one-li" : ''}`}>
                      1 lower letter 
                    </li>
                    <li className= {`${hasNumber ? "reg--one-li" : ''}`}>
                      1 digit 
                    </li>
                    <li className= {`${match ? "reg--one-li" : ''}`}>Match</li>
                </ul>
            </div>
            :
            <div></div> }
            
          <FormControlLabel
            control={<Checkbox />}
            label={
              <div>
                <span> I agree to </span>
                <Link to="#">Privacy policy & terms</Link>
              </div>
            }
          />
          <Button
            type="submit"
            variant="contained"
            className="reg-submit"
            onSubmit={handleSubmit}
          >
            Sign up
          </Button>
        </form>
        <p className="reg-sign">
          Already hava an account?
          <Link to="/">Sign in instead</Link>
        </p>
      </div>
    </InputLayout>
  );
}
