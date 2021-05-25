import React from "react";
import { render } from "@testing-library/react";
import Login from "./Login";

it("renders without crashing", () => {
  render(<Login />);
});

it("matches snapshot", () => {
  const { asFragment } = render(<Login />);
  expect(asFragment()).toMatchSnapshot();
});
