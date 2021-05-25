import React from "react";
import { render } from "@testing-library/react";

import Chart from "./Chart";

import YahooFinanceApi from "../api/YahooFinanceApi";
let data = null;
beforeEach(async () => {
  data = await YahooFinanceApi.getChart("tsla");
});

it("renders without crashing", async () => {
  await render(<Chart chartData={data} />);
});

it("matches snapshot", async () => {
  const { asFragment } = await render(<Chart chartData={data} />);
  expect(asFragment()).toMatchSnapshot();
});
