import "./style.scss";
import { Link } from "react-router-dom";
import { TextField, Button } from "@mui/material";

export default function Register() {
  const specialCharacter = "<";
  return (
    <div className="forgot-rightpage">
      <h1 className="forgot-title">Forgot password? 🔒</h1>
      <p className="forgot-instructions">
        Enter your email and we'll send you instructions to reset your password
      </p>
      <form className="forgot-form">
        <p>Email</p>
        <TextField
          type="email"
          name="email"
          placeholder="toto@example.com"
          size="small"
        />
        <Button type="submit" variant="contained" className="forgot-submit">
          Send reset link
        </Button>
      </form>
      <p className="forgot-create">
        <Link to="/"> {specialCharacter} Back to login</Link>
      </p>
    </div>
  );
}
