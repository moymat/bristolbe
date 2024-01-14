import { useState } from "react";

export const ErrorMessage = () => {
  const [passwordError, setPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [notUsedAccount, setNotUsedAccount] = useState(false);
  const [emailUsed, setEmailUsed] = useState(false);
  const [confirmError, setConfirmError] = useState(false);
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [touch, setTouch] = useState(false);

  return [
    emailError,
    passwordError,
    notUsedAccount,
    emailUsed,
    confirmError,
    firstNameError,
    lastNameError,
    touch,
    setEmailUsed,
    setConfirmError,
    setFirstNameError,
    setLastNameError,
    setEmailError,
    setPasswordError,
    setNotUsedAccount,
    setTouch,
  ];
};
