export default class CryptoService {
  // GET current Top (10) coins
  static async getCoins() {

    try {
      const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1";
      const response = await fetch(url);
      const jsonResponse = await response.json();
  
      if (!response.ok) {
        const errorMessage = `${response.status} ${response.statusText}: ${response.error}.`;
        throw new Error(errorMessage);
      }
  
      return jsonResponse;

    } catch (error) {
      return error;
    }
  }

  // GET data for specific coin
  static async getCoinInfo(coin) {
    
    try {
    
      const url = `https://api.coingecko.com/api/v3/coins/${coin}`;
      const response = await fetch(url);
      const jsonResponse = await response.json();

      if (!response.ok) {
        const errorMessage = `${response.status} ${response.statusText}: ${response.error}.`;
        throw new Error(errorMessage);
      }

      return jsonResponse;
    } catch (error) {
      return error;
    }
  }

}