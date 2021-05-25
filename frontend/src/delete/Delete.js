import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button } from "reactstrap";
import UserContext from "../common/UserContext";
import MarketUpdateApi from "../api/MarketUpdateApi";
import "./Delete.css";
const Delete = () => {
  const currentUser = useSelector((store) => store.currentUser);
  const { logOut } = useContext(UserContext);
  const history = useHistory();

  async function handleDelete() {
    const res = await MarketUpdateApi.deleteProfile(currentUser.username);
    logOut();
  }

  return (
    <div className="Delete">
      <h3 className="Delete-title">
        Are you sure you want to delete your profile?
      </h3>
      <br />
      <Button color="danger" onClick={handleDelete}>
        Delete Profile
      </Button>
    </div>
  );
};

export default Delete;
