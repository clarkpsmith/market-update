import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import IndexItem from "./IndexItem";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../reducers/rootReducer";
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

const ticker = {
  averageDailyVolume3Month: 102300857,
  beta: 1.203743,
  dividendYield: 0.68,
  epsCurrentYear: 5.2,
  epsForward: 5.34,
  epsTrailingTwelveMonths: 4.449,
  fiftyTwoWeekHigh: 145.09,
  fiftyTwoWeekLow: 75.0525,
  forwardPE: 24.383896,
  fullExchangeName: "NasdaqGS",
  heldPercentInsiders: 0.076,
  longName: "Apple Inc.",
  marketCap: 2172892479488,
  pegRatio: 1.45,
  priceToSales: 6.677481,
  region: "US",
  regularMarketChange: 0.69000244,
  regularMarketDayHigh: 131.2582,
  regularMarketChangePercent: 0.5327381,
  regularMarketDayLow: 129.475,
  regularMarketOpen: 130.85,
  regularMarketPrice: 130.21,
  regularMarketVolume: 78973273,
  shortName: "Apple Inc.",
  symbol: "AAPL",
  trailingPE: 29.267254,
};

it("renders without crashing", () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <IndexItem ticker={ticker} />
      </MemoryRouter>
    </Provider>
  );
});

it("matches snapshot", () => {
  const { asFragment } = render(
    <Provider store={store}>
      <MemoryRouter>
        <IndexItem ticker={ticker} />
      </MemoryRouter>
    </Provider>
  );
  expect(asFragment()).toMatchSnapshot();
});
