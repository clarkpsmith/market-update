import React from "react";
import { render, waitForElementToBeRemoved } from "@testing-library/react";
import NewsSummary from "./NewsSummary";

it("renders without crashing", () => {
  render(<NewsSummary numberOfArticles={10} />);
});

it("matches snapshot", async () => {
  const { asFragment, queryByTestId } = render(
    <NewsSummary numberOfArticles={10} />
  );
  await waitForElementToBeRemoved(() => queryByTestId("loading"));

  expect(asFragment()).toMatchSnapshot();
});
