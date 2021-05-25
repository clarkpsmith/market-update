import {
  ERROR,
  ADD_TICKER,
  REMOVE_TICKER,
  UPDATE_CURR_USER,
  REFRESH_TICKER,
} from "./types";
import MarketUpdateApi from "../api/MarketUpdateApi";
import YahooFinanceApi from "../api/YahooFinanceApi";
import { jwt } from "jsonwebtoken";

export function addTickerToList(username, ticker) {
  return async function (dispatch) {
    try {
      await MarketUpdateApi.addTickerToWatchlist(username, ticker.symbol);

      return dispatch(addTicker(ticker));
    } catch (e) {
      dispatch(gotError());
    }
  };
}

export function refreshTicker(ticker) {
  return async function (dispatch) {
    try {
      const res = await YahooFinanceApi.searchTicker(ticker);

      return dispatch(updateTickerData(res[0]));
    } catch (e) {
      dispatch(gotError());
    }
  };
}

export function removeTickerFromList(username, ticker) {
  return async function (dispatch) {
    try {
      await MarketUpdateApi.removeFromWatchlist(username, ticker.symbol);

      return dispatch(removeTicker(ticker));
    } catch (e) {
      dispatch(gotError());
    }
  };
}
export function updateCurrUser(currentToken) {
  return async function (dispatch) {
    try {
      if (currentToken) {
        const { username } = jwt.decode(currentToken);
        const res2 = await MarketUpdateApi.getCurrentUserData(username);
        return updatedCurrentUser(res2);
      }
    } catch (e) {
      dispatch(gotError());
    }
  };
}

function addTicker(ticker) {
  return { type: ADD_TICKER, ticker };
}
function removeTicker(ticker) {
  return { type: REMOVE_TICKER, ticker };
}

function updatedCurrentUser(currentUser) {
  return { type: UPDATE_CURR_USER, currentUser };
}
function updateTickerData(ticker) {
  return { type: REFRESH_TICKER, ticker };
}

function gotError() {
  return { type: ERROR };
}
