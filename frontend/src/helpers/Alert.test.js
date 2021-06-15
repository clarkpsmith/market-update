import React from "react";
import { render } from "@testing-library/react";
import Alert from "./Alert";

const messages = ["Invalid Username/Password"];

it("renders without crashing", () => {
  render(<Alert messages={messages} />);
});

it("matches snapshot", () => {
  const { asFragment } = render(<Alert messages={messages} />);
  expect(asFragment()).toMatchSnapshot();
});
