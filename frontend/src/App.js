import "./App.css";
import React, { useState, useEffect } from "react";
import Navbar from "./navbar/Navbar";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import Search from "./search/Search";
import MarketUpdateApi from "./api/MarketUpdateApi";
import Watchlist from "./watchlist/Watchlist";
import { useDispatch, useSelector } from "react-redux";
import Login from "./auth/Login";
import SignUp from "./auth/SignUp";
import Profile from "./auth/Profile";
import ProtectedRoute from "./helpers/ProtectedRoute";
import NewsSummary from "./news/NewsSummary";
import { UPDATE_PROFILE, LOG_OUT, UPDATE_CURR_USER } from "./actions/types";
import UserContext from "./common/UserContext";
import jwt from "jsonwebtoken";
import MktSummary from "./mktSummary/MktSummary";
import Delete from "./delete/Delete";
import ChaseLoading from "./chaseloading/ChaseLoading";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const currentUser = useSelector((store) => store.currentUser);

  const [currentToken, setCurrentToken] = useState(
    getTokenFromLocalStorage() || null
  );

  const history = useHistory();

  useEffect(() => {
    async function loadUser() {
      MarketUpdateApi.token = currentToken;
      await updateCurrentUser(currentToken);

      setIsLoading(false);
    }

    loadUser();
  }, [currentToken]);

  async function updateCurrentUser(currentToken) {
    try {
      if (currentToken) {
        const { username } = jwt.decode(currentToken);
        const res2 = await MarketUpdateApi.getCurrentUserData(username);
        dispatch({ type: UPDATE_CURR_USER, currentUser: res2 });
        return { success: true };
      }
    } catch (err) {
      console.error("Update current user failed", err);
      return { success: false, err };
    }
  }

  function addTokenToLocalStorage(token) {
    localStorage.setItem("token", token);
  }
  function getTokenFromLocalStorage() {
    const res = localStorage.getItem("token");

    return res;
  }

  async function login({ username, password }) {
    try {
      const token = await MarketUpdateApi.getToken(username, password);
      setCurrentToken(() => token);
      addTokenToLocalStorage(token);
      const res = await updateCurrentUser(token);
      return res;
    } catch (err) {
      return { success: false, err };
    }
  }

  async function logOut() {
    await MarketUpdateApi.clearToken();

    dispatch({ type: LOG_OUT });
    setCurrentToken(null);
    localStorage.clear();
    history.push("/");
  }

  async function signUp(formData) {
    try {
      const res = await MarketUpdateApi.registerUser(formData);
      setCurrentToken(res);
      addTokenToLocalStorage(res);
      const res2 = updateCurrentUser(res);
      return res2;
    } catch (err) {
      console.error("Sign Up Failed", err);
      return { success: false, err };
    }
  }

  async function updateProfile(formData) {
    try {
      const res = await MarketUpdateApi.updateProfile(formData);
      dispatch({ type: UPDATE_PROFILE, currentUser: res.user });
      return { success: true };
    } catch (err) {
      console.error("Update Profile Failed", err);
      return { success: false, err };
    }
  }

  async function apply(username, id) {
    const res = await MarketUpdateApi.apply(username, id);

    return res;
  }

  if (isLoading) {
    return <ChaseLoading />;
  }
  return (
    <div className="App">
      <UserContext.Provider
        value={{ currentUser, apply, updateCurrentUser, logOut, updateProfile }}
      >
        <Navbar logOut={logOut} />

        <main>
          <Switch>
            <Route exact path="/">
              <MktSummary />
            </Route>
            <Route exact path="/news">
              <NewsSummary numberOfArticles="20" />
            </Route>
            <Route exact path="/watchlist">
              {<ProtectedRoute Component={Watchlist} />}
            </Route>
            <Route exact path="/login">
              <Login login={login} />
            </Route>
            <Route exact path="/search">
              <Search />
            </Route>
            <Route exact path="/signup">
              <SignUp signUp={signUp} />
            </Route>
            <Route exact path="/profile">
              <ProtectedRoute Component={Profile} />
            </Route>
            <Route exact path="/delete">
              <ProtectedRoute Component={Delete} />
            </Route>
            <Redirect to="/"></Redirect>
          </Switch>
        </main>
      </UserContext.Provider>
    </div>
  );
}

export default App;
