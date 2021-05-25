import React from "react";
import { render } from "@testing-library/react";
import configureMockStore from "redux-mock-store";
import Profile from "./Profile";
import { tslaData } from "../testValues";
const mockStore = configureMockStore();
import { Provider, useDispatch } from "react-redux";
import UserContext from "../common/UserContext";

const store = mockStore({
  currentUser: {
    firstName: "test",
    lastName: "user",
    email: "testuser@gmail.com",
    username: "testuser",
    watchlist: ["tsla"],
  },
  watchlistData: [tslaData.data.quoteResponse.result[0]],
  searchTickerData: tslaData.data.quoteResponse.result[0],
});

async function updateProfile(formData) {
  const dispatch = useDispatch();
  try {
    const res = await MarketUpdateApi.updateProfile(formData);

    dispatch({ type: UPDATE_PROFILE, currentUser: res.user });
    return { success: true };
  } catch (err) {
    console.error("Update Profile Failed", err);
    return { success: false, err };
  }
}

it("renders without crashing", () => {
  render(
    <Provider store={store}>
      <UserContext.Provider value={{ updateProfile }}>
        <Profile />
      </UserContext.Provider>
    </Provider>
  );
});

it("matches snapshot", () => {
  const { asFragment } = render(
    <Provider store={store}>
      <UserContext.Provider value={{ updateProfile }}>
        <Profile />
      </UserContext.Provider>
    </Provider>
  );
  expect(asFragment()).toMatchSnapshot();
});
