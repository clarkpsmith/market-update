import React from "react";
import { render, waitForElementToBeRemoved } from "@testing-library/react";
import Watchlist from "./Watchlist";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { tslaData } from "../testValues";
const mockStore = configureMockStore();

const store = mockStore({
  currentUser: {
    firstName: "test",
    lastName: "user",
    email: "testuser@gmail.com",
    username: "testuser",
    watchlist: ["tsla"],
  },
  watchlistData: [tslaData.data.quoteResponse.result[0]],
  searchTickerData: null,
});

it("renders without crashing", () => {
  render(
    <Provider store={store}>
      <Watchlist />
    </Provider>
  );
});

it("matches snapshot", async () => {
  const { asFragment, queryByTestId } = render(
    <Provider store={store}>
      <Watchlist />
    </Provider>
  );
  await waitForElementToBeRemoved(() => queryByTestId("Watchlist"));

  expect(asFragment()).toMatchSnapshot();
});
