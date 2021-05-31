import React, { useState } from "react";
import "../common/SearchForm.css";
import { Button, Form, FormGroup } from "reactstrap";
import { useHistory } from "react-router-dom";
import "./SignUp.css";
import Alert from "../helpers/Alert";
import ChaseLoading from "../chaseloading/ChaseLoading";

const SignUp = ({ signUp }) => {
  const initialData = {
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
  };

  const [formData, setFormData] = useState(initialData);
  const [formErrors, setFormErrors] = useState(null);
  const [loading, setLoading] = useState(false);

  const history = useHistory();
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((data) => ({ ...data, [name]: value }));
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setLoading(true);
    let result = await signUp(formData);
    if (result.success) {
      history.push("/watchlist");
    } else {
      setFormErrors(() => result.err);
      setLoading(false);
    }
  };
  if (loading) {
    return (
      <div className="Login">
        <ChaseLoading />
      </div>
    );
  }
  return (
    <div className="SignUp">
      <div className="SignUp-block">
        <h4 className="SignUp-info">
          Want to create a personal watchlist of your favorite stocks?
        </h4>
        <h3 className="SignUp-title">Sign Up</h3>
        <Form className="SignUp-form" onSubmit={handleSubmit}>
          <FormGroup>
            <label htmlFor="username">Username</label>
            <br />
            <input
              className="SignUp-input"
              type="text"
              name="username"
              id="username"
              value={FormData.username}
              onChange={handleChange}
              required
            />
            <br />
          </FormGroup>
          <FormGroup>
            <label htmlFor="password">Password</label>
            <br />
            <input
              className="SignUp-input"
              type="password"
              name="password"
              id="password"
              value={FormData.password}
              onChange={handleChange}
              required
            />
            <br />
          </FormGroup>
          <FormGroup>
            <label htmlFor="firstName">First Name</label>
            <br />
            <input
              className="SignUp-input"
              type="text"
              name="firstName"
              id="firstName"
              value={FormData.firstName}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <label htmlFor="lastName">Last Name</label>
            <br />
            <input
              className="SignUp-input"
              type="text"
              name="lastName"
              id="lastName"
              value={FormData.lastName}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="email">Email</label>
            <br />
            <input
              className="SignUp-input"
              type="text"
              name="email"
              id="email"
              value={FormData.email}
              onChange={handleChange}
              required
            />
          </FormGroup>
          {formErrors ? <Alert type="danger" messages={formErrors} /> : null}
          <Button size="md" className="SignUp-btn">
            Submit
          </Button>
          <br />
          <br />
        </Form>
      </div>
    </div>
  );
};
export default SignUp;
