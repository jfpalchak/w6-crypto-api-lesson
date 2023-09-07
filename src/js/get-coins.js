import CryptoService from './crypto-service.js';
import {displayCoinInfo, displayTopCoins, displayError, displayCoinError} from '../index.js';

// handle calling CoinGecko API endpoint for market's top coins (set to 10)
export async function getCoins() {
  // Utilizing ASYNC & AWAIT
  const response = await CryptoService.getCoins();
  if (response[0]) {
    displayTopCoins(response);
  } else {
    displayError(response);
  }

}

// handle calling CoinGecko API endpoint for a specific coin
export async function getCoinInfo(coin) {

  const response = await CryptoService.getCoinInfo(coin);
  if (response.id) {
    displayCoinInfo(response);
  } else {
    displayCoinError(response);
  }
}