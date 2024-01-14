import { useState, useEffect } from "react";
import PropTypes from "prop-types";

export const usePasswordValidation = ({
  firstPassword = "",
  secondPassword = "",
}) => {
  const [validLength, setValidLength] = useState(null);
  const [hasNumber, setHasNumber] = useState(null);
  const [upperCase, setUpperCase] = useState(null);
  const [lowerCase, setLowerCase] = useState(null);
  const [match, setMatch] = useState(null);

  useEffect(() => {
    setValidLength(firstPassword.length >= 8 ? true : false);
    setUpperCase(firstPassword.toLowerCase() !== firstPassword);
    setLowerCase(firstPassword.toUpperCase() !== firstPassword);
    setHasNumber(/\d/.test(firstPassword));
    setMatch(firstPassword && firstPassword === secondPassword);
  }, [firstPassword, secondPassword]);

  return [validLength, hasNumber, upperCase, lowerCase, match];
};

usePasswordValidation.PropTypes = {
  firstPassword: PropTypes.string,
  secondPassword: PropTypes.string,
};
