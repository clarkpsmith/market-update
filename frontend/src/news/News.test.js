import React from "react";
import axios from "axios";
import { render, waitForElementToBeRemoved } from "@testing-library/react";
import News from "./News";
import { tslaData } from "../testValues";

it("renders without crashing", () => {
  render(<News ticker="tsla" />);
});

it("matches snapshot", async () => {
  const { asFragment, queryByTestId } = render(<News ticker="tsla" />);
  await waitForElementToBeRemoved(() => queryByTestId("loading"));

  expect(asFragment()).toMatchSnapshot();
});
