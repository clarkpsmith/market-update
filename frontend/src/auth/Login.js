import React, { useState } from "react";
import "../common/SearchForm.css";
import Alert from "../helpers/Alert";
import { useHistory } from "react-router-dom";
import ChaseLoading from "../chaseloading/ChaseLoading";
import { Button, Form, FormGroup } from "reactstrap";
import "./Login.css";

const Login = ({ login }) => {
  const initialData = {
    username: "",
    password: "",
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
    let result = await login(formData);

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
    <div className="Login">
      <div className="Login-block">
        <h3 className="Login-title">Log In</h3>
        <Form className="Login-form" onSubmit={handleSubmit}>
          <FormGroup>
            <label htmlFor="username">Username</label>
            <br />
            <input
              className="Login-input"
              type="text"
              name="username"
              id="username"
              value={FormData.username}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <label htmlFor="password">Password</label>
            <br />
            <input
              className="Login-input"
              type="password"
              name="password"
              id="password"
              value={FormData.password}
              onChange={handleChange}
              required
            />
            <br />
          </FormGroup>
          {formErrors ? <Alert type="danger" messages={formErrors} /> : null}
          <Button size="md" className="Login-btn">
            Submit
          </Button>
          <br />
          <br />
        </Form>
      </div>
    </div>
  );
};
export default Login;
