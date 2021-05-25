import React, { useState } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import YahooFinanceApi from "../api/YahooFinanceApi";
import "./dark-unica.css";

const Chart = ({ chartData }) => {
  const [chartInfo, setChartInfo] = useState({ "2y": chartData });
  const [clicked, setClicked] = useState(false);
  const [range, setRange] = useState("2y");

  const options = {
    title: {
      text: "",
      style: {
        color: "white",
        font: 'bold 16px "Trebuchet MS", Verdana, sans-serif',
      },
    },
    tooltip: {
      style: {
        color: "white",
      },
    },
    rangeSelector: {
      allButtonsEnabled: true,

      inputPosition: {
        color: "white",
      },
      buttons: [
        {
          type: "day",
          count: 1,
          text: "Day",
          events: {
            click: async function () {
              if (!clicked) {
                setClicked(true);
                if (chartInfo["1d"]) {
                  setRange("1d");
                } else {
                  const res = await YahooFinanceApi.getChart(
                    chartInfo["2y"].name,
                    "1d",
                    "5m"
                  );
                  setChartInfo(() => ({ ...chartInfo, "1d": res }));
                  setRange("1d");
                }
                setClicked(false);
              }
            },
          },
        },
        {
          type: "day",
          count: 5,
          text: "5d",
          events: {
            click: async function () {
              if (!clicked) {
                setClicked(true);
                if (chartInfo["5d"]) {
                  setRange("5d");
                } else {
                  const res = await YahooFinanceApi.getChart(
                    chartInfo["2y"].name,
                    "5d",
                    "15m"
                  );
                  setChartInfo(() => ({ ...chartInfo, "5d": res }));
                  setRange("5d");
                }
                setClicked(false);
              }
            },
          },
        },
        {
          type: "month",
          count: 1,
          text: "1m",
          events: {
            click: async function () {
              if (!clicked) {
                setClicked(true);
                if (chartInfo["1mo"]) {
                  setRange("1mo");
                } else {
                  const res = await YahooFinanceApi.getChart(
                    chartInfo["2y"].name,
                    "1mo",
                    "15m"
                  );
                  setChartInfo(() => ({ ...chartInfo, "1mo": res }));
                  setRange("1mo");
                }
                setClicked(false);
              }
            },
          },
        },
        {
          type: "month",
          count: 3,
          text: "3m",
          events: {
            click: async function () {
              setRange("2y");
            },
          },
        },
        {
          type: "month",
          count: 6,
          text: "6m",
          events: {
            click: async function () {
              setRange("2y");
            },
          },
        },
        {
          type: "ytd",
          text: "YTD",
          events: {
            click: async function () {
              setRange("2y");
            },
          },
        },
        {
          type: "year",
          count: 1,
          text: "1y",
          events: {
            click: async function () {
              setRange("2y");
            },
          },
        },
        {
          type: "2y",
          text: "2y",
          events: {
            click: async function () {
              setRange("2y");
            },
          },
        },
        {
          type: "5y",
          text: "5y",
          events: {
            click: async function () {
              if (!clicked) {
                setClicked(true);
                if (chartInfo["5y"]) {
                  setRange("5y");
                } else {
                  const res = await YahooFinanceApi.getChart(
                    chartInfo["2y"].name,
                    "5y",
                    "1d"
                  );
                  setChartInfo(() => ({ ...chartInfo, "5y": res }));
                  setRange("5y");
                }
                setClicked(false);
              }
            },
          },
        },
        {
          type: "max",
          text: "Max",
          events: {
            click: async function () {
              if (!clicked) {
                setClicked(true);
                if (chartInfo["max"]) {
                  setRange("max");
                } else {
                  const res = await YahooFinanceApi.getChart(
                    chartInfo["2y"].name,
                    "max",
                    "1mo"
                  );

                  setChartInfo(() => ({ ...chartInfo, max: res }));
                  setRange("max");
                }
                setClicked(false);
              }
            },
          },
        },
      ],
    },
    series: [
      {
        name: chartInfo["2y"].name,
        data: chartInfo[range].data,
      },
    ],
  };

  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={"stockChart"}
        options={options}
      />
    </div>
  );
};

export default Chart;
