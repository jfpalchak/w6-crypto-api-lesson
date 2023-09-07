export default class CryptoService {
  // GET current Top (10) coins
  static getCoins() {

    // return a newly constructed Promise
    return new Promise(function(resolve, reject) {
      // Initialize a new XHR object
      let request = new XMLHttpRequest();
      const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1";

      // Attach Event Listener to our XHR to later handle the API response
      request.addEventListener("loadend", function() {
        const response = JSON.parse(this.responseText);
        if (this.status === 200) { // if status is OK, our promise is FULFILLED
          resolve(response);
        } else { // otherwise, our promise is REJECTED
          reject(response);
        }
      });

      // Open and send our request
      request.open("GET", url, true);
      request.send();
    });

  }

  // GET data for specific coin
  static getCoinInfo(coin) {

    return new Promise(function(resolve, reject) { 
      let request = new XMLHttpRequest();
      const url = `https://api.coingecko.com/api/v3/coins/${coin}`;

      request.addEventListener("loadend", function() {
        const response = JSON.parse(this.responseText);
        if (this.status === 200) {
          resolve(response);
        } else {
          reject(this);
        }
      });

      request.open("GET", url, true);
      request.send();
    });
  }
}