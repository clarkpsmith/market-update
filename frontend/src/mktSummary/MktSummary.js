import React, { useEffect, useState } from "react";
import YahooFinanceApi from "../api/YahooFinanceApi";
import "./MktSummary.css";
import IndexItem from "./IndexItem";
import NewsSummary from "../news/NewsSummary";
import ChaseLoading from "../chaseloading/ChaseLoading";

const MktSummary = () => {
  const [summaryData, setSummaryData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getSummary() {
      const res = await YahooFinanceApi.searchTicker(
        "^gspc,^dji,^ixic,^rut,^tnx,usdeur=x,gc=f,cl=f,btc-usd"
      );

      //  ``;
      setSummaryData(() => res);
      setLoading(false);
    }
    getSummary();
  }, []);

  if (loading)
    return (
      <div data-testid="MktSummary-load" className="MktSummary-loading">
        <ChaseLoading />
      </div>
    );

  const items = summaryData.map((index) => (
    <IndexItem key={index.shortName} ticker={index} />
  ));

  return (
    <div className="MktSummary">
      <div className="MktSummary-indices">
        <h3 className="MktSummary-index-title">Market Summary</h3>
        {items}
      </div>
      {<NewsSummary numberOfArticles="10" />}
    </div>
  );
};

export default MktSummary;
