import React from "react";
import { render } from "@testing-library/react";
import Search from "./Search";
import { Provider } from "react-redux";

import configureMockStore from "redux-mock-store";
const mockStore = configureMockStore();

const store = mockStore({
  currentUser: {
    firstName: "test",
    lastName: "user",
    email: "testuser@gmail.com",
    username: "testuser",
    watchlist: ["AAPL"],
  },
});
it("renders without crashing", () => {
  render(
    <Provider store={store}>
      <Search />
    </Provider>
  );
});

it("matches snapshot", () => {
  const { asFragment } = render(
    <Provider store={store}>
      <Search />
    </Provider>
  );
  expect(asFragment()).toMatchSnapshot();
});
