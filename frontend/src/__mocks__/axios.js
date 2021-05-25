const BASE_URL = "https://apidojo-yahoo-finance-v1.p.rapidapi.com";
import {
  generalNewsData,
  tslaChartData,
  tslaData,
  tslaNews,
  indexData,
  spData,
  spChartData,
} from "../testValues";

export default {
  get: jest.fn().mockImplementation((url) => {
    switch (url) {
      case `${BASE_URL}/market/v2/get-quotes?region=us&symbols=tsla`:
        return Promise.resolve(tslaData);
      case `${BASE_URL}/market/v2/get-quotes?region=us&symbols=TSLA`:
        return Promise.resolve(tslaData);
      case `${BASE_URL}/market/v2/get-quotes?region=us&symbols=^gspc`:
        return Promise.resolve(spData);
      case "https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-quotes?region=us&symbols=^gspc,^dji,^ixic,^rut,^tnx,usdeur=x,gc=f,cl=f,btc-usd":
        return Promise.resolve(indexData);
      case `${BASE_URL}/market/get-charts?region=us&symbol=^GSPC&interval=1d&range=2y`:
        return Promise.resolve(spChartData);
      case `${BASE_URL}/market/get-charts?region=us&symbol=tsla&interval=1d&range=2y`:
        return Promise.resolve(tslaChartData);
      case `${BASE_URL}/market/get-charts?region=us&symbol=TSLA&interval=1d&range=2y`:
        return Promise.resolve(tslaChartData);
      case "https://yahoo-finance15.p.rapidapi.com/api/yahoo/ne/news":
        return Promise.resolve(generalNewsData);
      case "https://yahoo-finance15.p.rapidapi.com/api/yahoo/ne/news/tsla":
        return Promise.resolve(tslaNews);
      case "https://yahoo-finance15.p.rapidapi.com/api/yahoo/ne/news/TSLA":
        return Promise.resolve(tslaNews);
      case "http://localhost:3001/users/testuser":
        return Promise.resolve({
          data: {
            user: {
              username: "testuser",
              firstName: "test",
              lastName: "user",
              email: "testuser@gmail.com",
              isAdmin: false,
              watchlist: ["TSLA"],
            },
          },
        });
      case "http://localhost:3001/users/testuser2":
        return Promise.resolve({
          data: {
            user: {
              username: "testuser2",
              firstName: "firstname",
              lastName: "lastname",
              email: "testuser2@gmail.com",
              isAdmin: false,
              watchlist: [],
            },
          },
        });
      default:
        throw new Error(`UNMATCHED URL: ${url}`);
    }
  }),

  post: jest.fn().mockImplementation((url) => {
    switch (url) {
      case "http://localhost:3001/auth/token":
        return Promise.resolve({
          data: {
            token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTYyMTAyMDU2NH0.BIb3UZznOFTq_MwmahBVAQuTmFAuJVRnp8sWEUyi3I4",
          },
        });
      case "http://localhost:3001/auth/register":
        return Promise.resolve({
          data: {
            token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3R1c2VyMiIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2MjE4NzUzNDh9.VkwYtdA-NQ1OkiJBrhaWEcOnvwvBmfduNXufkgWEXLY",
          },
        });
      default:
        throw new Error(`UNMATCHED URL: ${url}`);
    }
  }),
  patch: jest.fn().mockImplementation((url) => {
    switch (url) {
      case "http://localhost:3001/users/testuser":
        return Promise.resolve({
          data: {
            user: {
              firstName: "firstchanged",
              lastName: "user",
              email: "testuser@gmail.com",
              username: "testuser",
              watchlist: ["tsla"],
              isAdmin: false,
            },
          },
        });

      default:
        throw new Error(`UNMATCHED URL: ${url}`);
    }
  }),
};
