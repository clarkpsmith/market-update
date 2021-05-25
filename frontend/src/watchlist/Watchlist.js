import React, { useEffect, useState } from "react";
import Item from "./Item";
import "./Watchlist.css";
import YahooFinanceApi from "../api/YahooFinanceApi";
import SearchBlock from "../searchBlock/SearchBlock";
import { useSelector, useDispatch } from "react-redux";
import ChaseLoading from "../chaseloading/ChaseLoading";

const Watchlist = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const watchlist = useSelector((store) => store.currentUser.watchlist);
  const watchlistData = useSelector((store) => store.watchlistData);

  let watchlistString;
  if (watchlist) watchlistString = watchlist.join(",");

  useEffect(() => {
    async function getStocks(tickers) {
      const res = await YahooFinanceApi.searchTicker(tickers);

      dispatch({ type: "SET_WATCHLIST_DATA", watchlistData: res });

      setLoading(false);
    }
    if (watchlist.length > 0) {
      getStocks(watchlistString);
    } else setLoading(false);
  }, []);

  if (loading) {
    return (
      <div data-testid="Watchlist" className="Watchlist">
        <ChaseLoading />
      </div>
    );
  }

  const watchlistsArray =
    watchlistData.map((ticker) => (
      <Item key={ticker.symbol} ticker={ticker} />
    )) || "No Stocks in Watchlist";

  return (
    <div className="Watchlist">
      <div>
        <SearchBlock />
        <h3 className="Watchlist-title">Your Watchlist</h3>
      </div>
      <div className="Watchlist-stocks">
        {watchlistsArray.length > 0 ? (
          watchlistsArray
        ) : (
          <div className="Watchlist-empty">No Stocks in Watchlist</div>
        )}
      </div>
    </div>
  );
};

export default Watchlist;
