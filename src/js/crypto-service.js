export default class CryptoService {
  // GET current Top (10) coins
  static getCoins() {
    const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1";
    return fetch(url)
      .then(function(response) {
        if (!response.ok) { // if fetch does not return 200 ok, throw error
          const errorMessage = `${response.status} ${response.statusText}: ${response.error}.`;
          throw new Error(errorMessage);
        } 
        return response.json(); // otherwise return our JSON data
      })
      .catch(function(error) {
        return error;
      });
  }

  // GET data for specific coin
  static async getCoinInfo(coin) {
    const url = `https://api.coingecko.com/api/v3/coins/${coin}`;
    return fetch(url)
      .then(function(response) {
        if (!response.ok) { // if fetch does not return 200 ok, throw error
          const errorMessage = `${response.status} ${response.statusText}: ${response.error}.`;
          throw new Error(errorMessage);
        }
        return response.json(); // otherwise, send our JSON data
      })
      .catch(function(error) {
        return error;
      });

  }
}