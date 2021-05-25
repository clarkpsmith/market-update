import React, { useEffect, useState } from "react";
import "./SearchBlock.css";
import SearchForm from "../common/SearchForm";
import YahooFinanceApi from "../api/YahooFinanceApi";
import Stockinfo from "../stockinfo/Stockinfo";
import ChaseLoading from "../chaseloading/ChaseLoading";
import { SEARCH_TICKER_DATA } from "../actions/types";
import { useDispatch, useSelector } from "react-redux";

const SearchBlock = () => {
  const dispatch = useDispatch();
  const tickerData = useSelector((store) => store.searchTickerData);
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState("");

  useEffect(() => {
    dispatch({ type: SEARCH_TICKER_DATA, tickerData: null });
  }, [dispatch]);
  async function search(ticker) {
    dispatch({ type: SEARCH_TICKER_DATA, tickerData: null });
    setNoResults(null);
    setLoading(true);
    let timer;

    function timeOut() {
      timer = setTimeout(() => {
        setNoResults("Search Timed Out, Try Again");
        setLoading(false);
        return;
      }, 5000);
    }
    timeOut();
    const response = await YahooFinanceApi.searchTicker(ticker);
    setLoading(false);

    if (response.length === 0) {
      setNoResults("No Results Found");
    } else {
      dispatch({ type: SEARCH_TICKER_DATA, tickerData: response[0] });
    }
    clearTimeout(timer);
  }

  return (
    <section className="SearchBlock">
      <div className="SearchBlock-card">
        <div className="SearchBlock-search">
          <SearchForm search={search} />
        </div>
        <div className="results">
          {loading ? (
            <div>
              <ChaseLoading />
              <br />
              <br />
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="SearchBlock-no-results">
          {noResults ? noResults : ""}
        </div>
        {tickerData ? <Stockinfo ticker={tickerData} /> : ""}
      </div>
    </section>
  );
};

export default SearchBlock;
