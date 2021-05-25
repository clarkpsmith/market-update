import React from "react";
import { render } from "@testing-library/react";
import SignUp from "./SignUp";

it("renders without crashing", () => {
  render(<SignUp />);
});

it("matches snapshot", () => {
  const { asFragment } = render(<SignUp />);
  expect(asFragment()).toMatchSnapshot();
});
