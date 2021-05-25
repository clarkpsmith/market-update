import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Item from "./Item";
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
  language: "en-US",
  region: "US",
  quoteType: "EQUITY",
  quoteSourceName: "Nasdaq Real Time Price",
  triggerable: true,
  currency: "USD",
  firstTradeDateMilliseconds: 1277818200000,
  priceHint: 2,
  totalCash: 1.71410002e10,
  floatShares: 775105312,
  ebitda: 4551000064,
  shortRatio: 1.5,
  preMarketChange: -6.625,
  preMarketChangePercent: -0.985746,
  preMarketTime: 1620653399,
  targetPriceHigh: 1200.0,
  targetPriceLow: 67.0,
  targetPriceMean: 636.87,
  targetPriceMedian: 700.0,
  preMarketPrice: 665.455,
  heldPercentInsiders: 19.63,
  heldPercentInstitutions: 44.688,
  postMarketChangePercent: -0.8807036,
  postMarketTime: 1620684910,
  postMarketPrice: 623.5,
  postMarketChange: -5.539978,
  regularMarketChange: -43.330017,
  regularMarketChangePercent: -6.4443707,
  regularMarketTime: 1620676803,
  regularMarketPrice: 629.04,
  regularMarketDayHigh: 665.02,
  regularMarketDayRange: "627.6101 - 665.02",
  regularMarketDayLow: 627.6101,
  regularMarketVolume: 30633287,
  sharesShort: 51176090,
  sharesShortPrevMonth: 44732793,
  shortPercentFloat: 6.6,
  regularMarketPreviousClose: 672.37,
  bid: 628.79,
  ask: 624.35,
  bidSize: 10,
  askSize: 10,
  exchange: "NMS",
  market: "us_market",
  messageBoardId: "finmb_27444752",
  fullExchangeName: "NasdaqGS",
  shortName: "Tesla, Inc.",
  longName: "Tesla, Inc.",
  regularMarketOpen: 664.9,
  averageDailyVolume3Month: 35014572,
  averageDailyVolume10Day: 28429566,
  beta: 1.984491,
  fiftyTwoWeekLowChange: 476.37997,
  fiftyTwoWeekLowChangePercent: 3.120529,
  fiftyTwoWeekRange: "152.66 - 900.4",
  fiftyTwoWeekHighChange: -271.36005,
  fiftyTwoWeekHighChangePercent: -0.3013772,
  fiftyTwoWeekLow: 152.66,
  fiftyTwoWeekHigh: 900.4,
  earningsTimestamp: 1619467200,
  earningsTimestampStart: 1626778740,
  earningsTimestampEnd: 1627300800,
  trailingPE: 630.30054,
  pegRatio: 3.66,
  dividendsPerShare: 0.0,
  revenue: 3.594e10,
  priceToSales: 16.860685,
  marketState: "POST",
  epsTrailingTwelveMonths: 0.998,
  epsForward: 6.25,
  epsCurrentYear: 4.53,
  epsNextQuarter: 1.18,
  priceEpsCurrentYear: 138.86092,
  priceEpsNextQuarter: 533.0848,
  sharesOutstanding: 963329984,
  bookValue: 23.901,
  fiftyDayAverage: 688.3441,
  fiftyDayAverageChange: -59.30414,
  fiftyDayAverageChangePercent: -0.08615478,
  twoHundredDayAverage: 665.25146,
  twoHundredDayAverageChange: -36.211487,
  twoHundredDayAverageChangePercent: -0.05443278,
  marketCap: 605973053440,
  forwardPE: 100.64639,
  priceToBook: 26.318563,
  sourceInterval: 15,
  exchangeDataDelayedBy: 0,
  exchangeTimezoneName: "America/New_York",
  exchangeTimezoneShortName: "EDT",
  gmtOffSetMilliseconds: -14400000,
  esgPopulated: false,
  tradeable: false,
  symbol: "AAPL",
};

it("renders without crashing", () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Item ticker={ticker} />
      </MemoryRouter>
    </Provider>
  );
});

it("matches snapshot", async () => {
  const { asFragment, queryByTestId } = await render(
    <Provider store={store}>
      <MemoryRouter>
        <Item ticker={ticker} />
      </MemoryRouter>
    </Provider>
  );

  expect(asFragment()).toMatchSnapshot();
});
