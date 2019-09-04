const Mock = require("mockjs");
const delay = require("mocker-api/utils/delay");

const proxy = {
  // Priority processing.
  // apiMocker(app, path, option)
  // This is the option parameter setting for apiMocker
  _proxy: {
    changeHost: true,
    // modify the http-proxy options
    httpProxy: {
      options: {
        ignorePath: true
      },
      listeners: {
        proxyReq: function(proxyReq, req, res, options) {
          console.log("proxyReq");
        }
      }
    }
  },
  "GET /part3": (req, res) => {
    return res.json(
      Mock.mock({
        "data|10": [
          {
            "expense|1-100": 50,
            "category|1": ["Retail", "Gas", "Dining"]
          }
        ]
      })
    );
  }
};

module.exports = delay(proxy, 0);
