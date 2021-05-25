import React, { useState, useContext } from "react";
import "../common/SearchForm.css";
import UserContext from "../common/UserContext";
import Alert from "../helpers/Alert";
import { Button, Form, FormGroup } from "reactstrap";
import "./SignUp.css";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import ChaseLoading from "../chaseloading/ChaseLoading";

const Profile = () => {
  const { updateProfile } = useContext(UserContext);
  const currentUser = useSelector((store) => store.currentUser);
  const [formErrors, setFormErrors] = useState(null);
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  function handleDelete() {
    history.push("/delete");
  }
  const initialData = {
    username: currentUser.username,
    password: "",
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    email: currentUser.email,
  };
  const [formData, setFormData] = useState(() => initialData);

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((data) => ({ ...data, [name]: value }));
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setLoading(true);
    const response = await updateProfile(formData);
    if (response.success) {
      history.push("/watchlist");
    } else {
      setFormErrors(response.err);
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
        <h2 className="SignUp-title">User Profile</h2>
        <Form className="SignUp-form" onSubmit={handleSubmit}>
          <FormGroup>
            <label htmlFor="username">Username</label>
            <br />
            <div>{formData.username}</div>
          </FormGroup>

          <FormGroup>
            <label htmlFor="firstName">First Name</label>
            <br />
            <input
              className="SignUp-input"
              type="text"
              name="firstName"
              id="firstName"
              placeholder={formData.firstName}
              value={FormData.firstName}
              onChange={handleChange}
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
              placeholder={formData.lastName}
              value={FormData.lastName}
              onChange={handleChange}
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
              placeholder={formData.email}
              value={FormData.email}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="password">Confirm password to make changes: </label>
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
          {formErrors ? <Alert type="danger" messages={formErrors} /> : null}
          <Button size="md" text-align="center" className="SignUp-btn">
            Save Changes
          </Button>
          <br />
          <br />
        </Form>
        <div className="delete-profile">
          <br />
          <br />
          <Button color="danger" onClick={handleDelete}>
            Delete Profile
          </Button>
        </div>
      </div>
    </div>
  );
};
export default Profile;
