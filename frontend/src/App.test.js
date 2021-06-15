import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import configureMockStore from "redux-mock-store";
const mockStore = configureMockStore();
import { tslaData } from "./testValues";
import { Provider } from "react-redux";

const store = mockStore({
  currentUser: {
    firstName: "test",
    lastName: "user",
    email: "testuser@gmail.com",
    username: "testuser",
    watchlist: ["tsla"],
  },
  watchlistData: [tslaData.data.quoteResponse.result[0]],
  searchTickerData: tslaData.data.quoteResponse.result[0],
});

describe("Homepage", () => {
  it("should return landing page data, clicking on an index should expand to show more data and clicking on the index name show then collapse to original item", async () => {
    const { queryByTestId, queryByText } = await render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/"]}>
          <App />
        </MemoryRouter>
      </Provider>
    );
    await waitForElementToBeRemoved(() => queryByTestId("loading"));
    const sP = queryByText("S&P 500");
    expect(sP).toBeInTheDocument();

    fireEvent.click(sP);
    await waitForElementToBeRemoved(() => queryByTestId("loading"));
    expect(queryByText("Open")).toBeInTheDocument();
    expect(screen.getByText(/4,154.57/i)).toBeInTheDocument();
    fireEvent.click(queryByText("S&P 500"));
    expect(queryByText("Open")).not.toBeInTheDocument();
  });

  it("should return news Data, and click on each news piece should expand the element, clicking again should close the element", async () => {
    const { queryByTestId, queryByText } = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/"]}>
          <App />
        </MemoryRouter>
      </Provider>
    );
    await waitForElementToBeRemoved(() => queryByTestId("loading"));
    const news = queryByText(
      "Trade Desk stock tumbles even after 10-for-1 stock split, profit and revenue that beat expectations"
    );
    expect(news).toBeInTheDocument();
    fireEvent.click(news);
    expect(queryByText("MarketWatch")).toBeInTheDocument();
    fireEvent.click(
      queryByText(
        "Trade Desk stock tumbles even after 10-for-1 stock split, profit and revenue that beat expectations"
      )
    );
    expect(queryByText("MarketWatch")).not.toBeInTheDocument();
  });
});

describe("Login", () => {
  it("user login works", async () => {
    const { queryByTestId, queryAllByText, queryByText, getByLabelText } =
      await render(
        <Provider store={store}>
          <MemoryRouter initialEntries={["/login"]}>
            <App />
          </MemoryRouter>
        </Provider>
      );
    expect(queryByText("Submit")).toBeInTheDocument();
    const username = getByLabelText("Username");
    const password = getByLabelText("Password");
    fireEvent.change(username, { target: { value: "testuser" } });
    fireEvent.change(password, {
      target: { value: "password" },
    });
    const submit = queryByText("Submit");
    fireEvent.click(submit);
    await waitForElementToBeRemoved(() => queryByTestId("loading"));
    expect(queryByText("Your Watchlist")).toBeInTheDocument();
    expect(queryAllByText("TSLA")[0]).toBeInTheDocument();
  });
});

describe("Watchlist", () => {
  it("Should show current users watchlist", async () => {
    const { queryByTestId, queryAllByText, queryByText } = await render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/watchlist"]}>
          <App />
        </MemoryRouter>
      </Provider>
    );
    await waitForElementToBeRemoved(() => queryByTestId("loading"));
    expect(queryByText("Your Watchlist")).toBeInTheDocument();
    expect(queryAllByText("TSLA")[0]).toBeInTheDocument();
  });
});

describe("News", () => {
  it("should return news Data, and clicking on each news piece should expand the element, clicking again should close the element", async () => {
    const { queryByTestId, queryByText } = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/news"]}>
          <App />
        </MemoryRouter>
      </Provider>
    );
    await waitForElementToBeRemoved(() => queryByTestId("loading"));
    const news = queryByText(
      "Trade Desk stock tumbles even after 10-for-1 stock split, profit and revenue that beat expectations"
    );
    expect(news).toBeInTheDocument();

    fireEvent.click(news);

    expect(queryByText("MarketWatch")).toBeInTheDocument();
    fireEvent.click(
      queryByText(
        "Trade Desk stock tumbles even after 10-for-1 stock split, profit and revenue that beat expectations"
      )
    );

    expect(queryByText("MarketWatch")).not.toBeInTheDocument();
  });
});

describe("Search", () => {
  it("should render search page and search for stock data, when you click on news, show news, when you click on article show description, when your click article again, close description", async () => {
    const {
      queryByTestId,
      queryByText,
      getByLabelText,
      queryAllByText,
      getByPlaceholderText,
    } = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/search"]}>
          <App />
        </MemoryRouter>
      </Provider>
    );
    await waitForElementToBeRemoved(() => queryByTestId("loading"));
    expect(getByPlaceholderText("Enter ticker symbol...")).toBeInTheDocument();
    const input = getByPlaceholderText("Enter ticker symbol...");
    fireEvent.change(input, { target: { value: "tsla" } });
    const search = queryAllByText("Search")[1];
    fireEvent.click(search);
    await waitForElementToBeRemoved(() => queryByTestId("loading"));
    expect(queryByText("TSLA")).toBeInTheDocument();
    expect(screen.getByText(/636.29/i)).toBeInTheDocument();
    expect(screen.getByText(/Open/i)).toBeInTheDocument();
    const news = queryAllByText("News")[1];
    expect(news).toBeInTheDocument();
    fireEvent.click(news);
    await waitForElementToBeRemoved(() => queryByTestId("loading"));
    const article = queryByText(
      "Is Tesla Inc. (TSLA) Still A Great Investment Choice?"
    );
    expect(article).toBeInTheDocument();
    fireEvent.click(article);
    expect(queryByText("Baron Funds"));
    fireEvent.click(
      queryByText("Is Tesla Inc. (TSLA) Still A Great Investment Choice?")
    );
    expect(queryByText("Baron Funds")).not.toBeInTheDocument();
  });
});

describe("Profile", () => {
  it("should return profile page and updates profile info", async () => {
    const { queryByTestId, queryByText, getByLabelText, getByPlaceholderText } =
      await render(
        <Provider store={store}>
          <MemoryRouter initialEntries={["/profile"]}>
            <App />
          </MemoryRouter>
        </Provider>
      );

    expect(getByPlaceholderText("test")).toBeInTheDocument();
    const firstName = getByPlaceholderText("test");
    fireEvent.change(firstName, { target: { value: "firstchanged" } });
    const password = getByLabelText("Confirm password to make changes:");
    fireEvent.change(password, { target: { value: "password" } });
    const saveChanges = queryByText("Save Changes");
    fireEvent.click(saveChanges);
  });
});

describe("Delete Page", () => {
  it("should render delete page", async () => {
    const {
      queryByTestId,
      queryByText,
      getByLabelText,
      queryAllByText,
      getByPlaceholderText,
    } = await render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/delete"]}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    expect(
      queryByText("Are you sure you want to delete your profile?")
    ).toBeInTheDocument();
  });
});

describe("Signup", () => {
  const store = mockStore({
    currentUser: {
      firstName: "firstname",
      lastName: "lastname",
      email: "testuser2@gmail.com",
      username: "testuser2",
      watchlist: [],
    },
    watchlistData: [],
  });
  it("renders without crashing", () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/signup"]}>
          <App />
        </MemoryRouter>
      </Provider>
    );
  });

  it("user signup works", async () => {
    const { queryByTestId, queryByText, getByLabelText } = await render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/signup"]}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    expect(queryByText("Sign Up")).toBeInTheDocument();
    expect(getByLabelText("First Name")).toBeInTheDocument();
    expect(queryByText("Submit")).toBeInTheDocument();
    const firstName = getByLabelText("First Name");
    const lastName = getByLabelText("Last Name");
    const username = getByLabelText("Username");
    const password = getByLabelText("Password");
    const email = getByLabelText("Email");
    fireEvent.change(username, { target: { value: "testuser2" } });
    fireEvent.change(password, {
      target: { value: "password" },
    });
    fireEvent.change(firstName, { target: { value: "firstname" } });
    fireEvent.change(lastName, { target: { value: "lastname" } });
    fireEvent.change(email, { target: { value: "testuser2@gmail.com" } });
    const submit = queryByText("Submit");
    fireEvent.click(submit);
    await waitForElementToBeRemoved(() => queryByTestId("loading"));
    expect(queryByText("Your Watchlist")).toBeInTheDocument();
  });
});
