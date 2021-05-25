import React from "react";
import { render } from "@testing-library/react";
import SearchBlock from "./SearchBlock";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../reducers/rootReducer";
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

it("renders without crashing", () => {
  render(
    <Provider store={store}>
      <SearchBlock />
    </Provider>
  );
});

it("matches snapshot", () => {
  const { asFragment } = render(
    <Provider store={store}>
      <SearchBlock />
    </Provider>
  );
  expect(asFragment()).toMatchSnapshot();
});
