import "./style.scss";
import { Link } from "react-router-dom";
import { TextField, Button, Checkbox, FormControlLabel,FormHelperText } from "@mui/material";
import { useState } from "react";
import axios from "axios";

const emailValidator = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

const passwordValidator = new RegExp(/^(?=.*[A-Za-zÀ-ÖØ-öø-ÿ])(?=.*\d).{8,30}$/);

export default function Register() {
  const [input, setInput] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    numberErrorMessage: "",
    upperErrorMessage: "",
    lowerErrorMessage: "",
    moreErrorMessage: "",
  });
  const [passwordError, setPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  

  const handleChange = (event) => {
    const { name, value } = event.target;

    let oneUpperCaseError = '';
    let oneLowerCaseError = '';
    let oneNumberError = '';
    let moreThanError = '';
        
    
    if(name === 'password' && passwordValidator.test(value)){
        oneUpperCaseError = 'Une majuscule'
        oneLowerCaseError = 'Une minuscule'
        oneNumberError = 'Un nombre'
        moreThanError = 'Plus de 8 caractères'
    }

    setInput({
      ...input,
      [name]: value,
      numberErrorMessage: oneNumberError,
      upperErrorMessage: oneUpperCaseError,
      lowerErrorMessage: oneLowerCaseError,
      moreErrorMessage: moreThanError,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = input;

    if(!emailValidator.test(email)) {
        setEmailError(true)
    }

    if(!passwordValidator.test(password)) {
        setPasswordError(true)
    }
    console.log(input.lastName, input.firstName);
  };


  return (
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
        />
        <p>Last name</p>
        <TextField
          type="text"
          name="lastName"
          placeholder="doe"
          size="small"
          onChange={handleChange}
          value={input.lastName}
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
        />
        {emailError && <p className="reg__error-message">Your Email is invalid</p>}
        <p>Password</p>
        <TextField
          type="password"
          name="password"
          placeholder="Password"
          className="reg-password"
          size="small"
          onChange={handleChange}
          value={input.password}
        />
        {passwordError && <p className="reg__error-message">Your password is invalid</p>}
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
      <p className="reg-create">
        Already hava an account?
        <Link to="/">Sign in instead</Link>
      </p>
    </div>
  );
}
