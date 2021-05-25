import React from "react";
import { render, waitForElementToBeRemoved } from "@testing-library/react";

import MktSummary from "./MktSummary";

import { Provider } from "react-redux";

import configureMockStore from "redux-mock-store";
const mockStore = configureMockStore();

const store = mockStore({
  currentUser: {
    firstName: "test",
    lastName: "user",
    email: "testuser@gmail.com",
    username: "testuser",
    watchlist: ["tsla"],
  },
});

it("renders without crashing", async () => {
  await render(
    <Provider store={store}>
      <MktSummary />
    </Provider>
  );
});

it("matches snapshot", async () => {
  const { asFragment, queryByTestId } = await render(
    <Provider store={store}>
      <MktSummary />
    </Provider>
  );
  await waitForElementToBeRemoved(() => queryByTestId("loading"));

  expect(asFragment()).toMatchSnapshot();
});
