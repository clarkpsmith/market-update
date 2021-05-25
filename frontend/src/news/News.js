import React, { useEffect, useState } from "react";
import YahooFinanceApi from "../api/YahooFinanceApi";
import Article from "./Article";
import ChaseLoading from "../chaseloading/ChaseLoading";

const News = ({ ticker }) => {
  const [stockNews, setStockNews] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getNews(ticker) {
      const res = await YahooFinanceApi.getStockNews(ticker);
      setStockNews(() => res);
      setLoading(false);
    }

    getNews(ticker);
  }, []);

  if (loading) {
    return (
      <div className="Watchlist">
        <ChaseLoading />
      </div>
    );
  }

  const articles = [];

  for (let i = 0; i < 5; i++) {
    articles.push(<Article key={stockNews[i].link} data={stockNews[i]} />);
  }

  return <div className="News">{articles}</div>;
};

export default News;
