import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NavBar from "./NavBar";

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
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    </Provider>
  );
});

it("matches snapshot", () => {
  const { asFragment } = render(
    <Provider store={store}>
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    </Provider>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("displays sign up and log in if theres no current user", () => {
  const store = mockStore({
    currentUser: {},
  });
  const { queryByText } = render(
    <Provider store={store}>
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    </Provider>
  );
  expect(queryByText("Sign Up")).toBeInTheDocument();
  expect(queryByText("Login")).toBeInTheDocument();
});
