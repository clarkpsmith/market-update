import React, { useEffect, useState } from "react";
import YahooFinanceApi from "../api/YahooFinanceApi";
import GeneralNewsArticle from "../mktSummary/GeneralNewsArticle";
import "./NewsSummary.css";
import ChaseLoading from "../chaseloading/ChaseLoading";

const NewsSummary = ({ numberOfArticles }) => {
  const [loading, setLoading] = useState(true);
  const [newsData, setNewsData] = useState(null);

  useEffect(() => {
    async function getSummary() {
      const res2 = await YahooFinanceApi.getStockNewsSummary();
      let newsArray = [];
      for (let i = 0; i < numberOfArticles; i++) {
        newsArray.push(
          <GeneralNewsArticle key={res2[i].link} data={res2[i]} />
        );
      }

      setNewsData(newsArray);
      setLoading(false);
    }
    getSummary();
  }, [numberOfArticles]);

  if (loading)
    return (
      <div className="NewsSummary-loading">
        <ChaseLoading />
      </div>
    );

  return (
    <div className="NewsSummary">
      <h3 className="NewsSummary-title">Market News</h3>
      {newsData}
      <br />
    </div>
  );
};

export default NewsSummary;
