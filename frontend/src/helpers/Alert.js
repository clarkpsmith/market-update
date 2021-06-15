import React from "react";
import "./Alert.css";

const Alert = ({ messages }) => {
  const customMessages = messages.map((err) => {
    if (err === "instance.password does not meet minimum length of 5") {
      const passwordLength = "Password must be at least 5 characters";
      return <div key={passwordLength}>{passwordLength}</div>;
    }
    if (err === "instance.email does not meet minimum length of 6") {
      const emailLength = "Email address is not valid";
      return <div key={emailLength}>{emailLength}</div>;
    }
    if (err === 'instance.email does not conform to the "email" format') {
      const emailFormat = "Email address is not valid";
      return <div key={emailFormat}>{emailFormat}</div>;
    }
    if (err === "instance.firstName does not meet minimum length of 1") {
      const usernameRequired = "First name required";
      return <div key={usernameRequired}>{usernameRequired}</div>;
    }
    if (err === "instance.lastName does not meet minimum length of 1") {
      const usernameRequired = "Last name required";
      return <div key={usernameRequired}>{usernameRequired}</div>;
    } else {
      return <div key={err}>{err}</div>;
    }
  });

  return <div className="Alert-text">{customMessages}</div>;
};

export default Alert;
