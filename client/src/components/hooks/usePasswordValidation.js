import { useState, useEffect } from "react";

export const usePasswordValidation = ({ firstPassword = "" }) => {
const [validLength, setValidLength] = useState(null);
const [hasNumber, setHasNumber] = useState(null);
const [upperCase, setUpperCase] = useState(null);
const [lowerCase, setLowerCase] = useState(null);

  useEffect(() => {
    setValidLength(firstPassword.length >= 8 ? true : false);
    setUpperCase(firstPassword.toLowerCase() !== firstPassword);
    setLowerCase(firstPassword.toUpperCase() !== firstPassword);
    setHasNumber(/\d/.test(firstPassword));
  }, [firstPassword]);
  
  return [validLength, hasNumber, upperCase, lowerCase];
}

