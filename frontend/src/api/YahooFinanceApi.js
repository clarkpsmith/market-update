import axios from "axios";
import { yahooFinanceApiKey } from "../apiKey";
const BASE_URL = "https://apidojo-yahoo-finance-v1.p.rapidapi.com";

class YahooFinanceApi {
  static async request(endpoint, method = "get") {
    const url = `${BASE_URL}/${endpoint}`;
    const headers = {
      "x-rapidapi-key": yahooFinanceApiKey,
      "x-rapidapi-host": `apidojo-yahoo-finance-v1.p.rapidapi.com`,
    };

    try {
      return await axios.get(url, { headers });
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response;
      throw Array.isArray(message) ? message : [message];
    }
  }

  static async searchTicker(ticker) {
    const response = await this.request(
      `market/v2/get-quotes?region=us&symbols=${ticker}`
    );
    return response.data.quoteResponse.result;
  }
  static async getChart(ticker, range = "2y", interval = "1d") {
    const response = await this.request(
      `market/get-charts?region=us&symbol=${ticker}&interval=${interval}&range=${range}`
    );

    const symbol = response.data.chart.result[0].meta.symbol;
    const { indicators, timestamp } = response.data.chart.result[0];
    const quotesArray = indicators.quote[0].close;

    function combineArrays(timestampArr, priceArr) {
      const combinedArray = [];
      for (let i = 0; i < timestampArr.length; i++) {
        combinedArray.push([timestampArr[i] * 1000, priceArr[i]]);
      }
      return combinedArray;
    }
    const data = combineArrays(timestamp, quotesArray);

    const result = {
      data,
      name: symbol,
      range,
    };

    return result;
  }
  static async getStockNews(symbol) {
    const headers = {
      "x-rapidapi-key": yahooFinanceApiKey,
      "x-rapidapi-host": `yahoo-finance15.p.rapidapi.com`,
    };

    const response = await axios.get(
      `https://yahoo-finance15.p.rapidapi.com/api/yahoo/ne/news/${symbol}`,
      { headers }
    );

    return response.data.item;
  }

  static async getStockNewsSummary() {
    const headers = {
      "x-rapidapi-key": yahooFinanceApiKey,
      "x-rapidapi-host": `yahoo-finance15.p.rapidapi.com`,
    };

    const response = await axios.get(
      `https://yahoo-finance15.p.rapidapi.com/api/yahoo/ne/news`,
      { headers }
    );

    return response.data;
  }

  static async getMarketSummary() {
    const res = await this.request(`market/v2/get-summary`);

    return res.data.marketSummaryAndSparkResponse.result;
  }
}

export default YahooFinanceApi;
