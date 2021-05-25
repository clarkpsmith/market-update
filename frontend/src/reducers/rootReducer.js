import {
  REMOVE_TICKER,
  ADD_TICKER,
  UPDATE_CURR_USER,
  LOG_OUT,
  SIGN_UP,
  UPDATE_PROFILE,
  REFRESH_TICKER,
  SET_WATCHLIST_DATA,
  SEARCH_TICKER_DATA,
} from "../actions/types";

const DEFAULT_STATE = {
  currentUser: {},
  watchlistData: [],
  searchTickerData: null,
};

function rootReducer(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case REMOVE_TICKER:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          watchlist: state.currentUser.watchlist.filter(
            (t) => t !== action.ticker.symbol
          ),
        },
        watchlistData: state.watchlistData.filter(
          (t) => t.symbol !== action.ticker.symbol
        ),
      };
    case SEARCH_TICKER_DATA:
      return {
        ...state,
        searchTickerData: action.tickerData,
      };

    case ADD_TICKER:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          watchlist: [...state.currentUser.watchlist, action.ticker.symbol],
        },
        watchlistData: [...state.watchlistData, action.ticker],
      };

    case UPDATE_CURR_USER:
      return {
        ...state,
        currentUser: { ...action.currentUser },
      };

    case UPDATE_PROFILE:
      return {
        ...state,
        currentUser: { ...action.currentUser },
      };

    case LOG_OUT:
      return {
        ...state,
        currentUser: {},
        watchlistData: [],
      };

    case SIGN_UP:
      return {
        ...state,
        currentUser: { ...action.currentUser },
      };

    case SET_WATCHLIST_DATA:
      return {
        ...state,
        watchlistData: [...action.watchlistData],
      };

    case REFRESH_TICKER:
      return {
        ...state,
        watchlistData: [
          ...state.watchlistData.map((t) => {
            if (t.symbol === action.ticker.symbol) return action.ticker;
            else return t;
          }),
        ],
      };
    default:
      return state;
  }
}
export default rootReducer;
