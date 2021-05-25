import React from "react";
import "./Alert.css";

const Alert = ({ messages }) => {
  const errorMessages = messages.map((err) => <div key={err}>{err}</div>);

  return <div className="Alert-text">{errorMessages}</div>;
};

export default Alert;
