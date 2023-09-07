import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CryptoService from './js/crypto-service.js';

// BUSINESS LOGIC

// handle calling CoinGecko API endpoint for market's top coins (set to 10)
function getCoins() {

  // Utilizing Promises & XHR
  let promise = CryptoService.getCoins();

  promise.then(function(okTopCoins) { // if Promise is RESOLVED, receive good data
    displayTopCoins(okTopCoins);
  }, function(errorMessage) { // if Promise is REJECTED, receive error data
    displayError(errorMessage);
  });
}

// handle calling CoinGecko API endpoint for a specific coin
function getCoinInfo(coin) {

  let promise = CryptoService.getCoinInfo(coin);
    
  promise.then(function(okCoinInfo) {
    displayCoinInfo(okCoinInfo);
  }, function(errorMessage) {
    displayCoinError(errorMessage, coin);
  });
}

// UI LOGIC

// Display the API response for the specified crypto coin
function displayCoinInfo(coin) {
  const coinDiv = document.querySelector('#coin-info-display');
  const purseDiv = document.querySelector('div#hidden');
  if (purseDiv) {
    purseDiv.removeAttribute('id');
  }

  coinDiv.innerText = null;

  const header = document.createElement('h3');
  const img = document.createElement('img');
  const description = document.createElement('p');

  header.innerHTML = coin.name;
  img.src = coin.image.small;
  img.alt = `${coin.name} icon`;
  description.innerHTML = coin.description.en;

  coinDiv.append(img, header, description);

}

// Display the API response for the top ten crypto coins
function displayTopCoins(topTen) {
  const topTenDiv = document.querySelector('#top-ten-display');
  const table = document.querySelector('table');

  topTen.forEach(function(coinObject) {
    let tRow = document.createElement('tr');

    let td0 = document.createElement('td');
    let td1 = document.createElement('td');
    let td2 = document.createElement('td');
    td1.setAttribute('id', `${coinObject.id}`);

    td0.innerText = coinObject['market_cap_rank'];
    td1.innerText = coinObject.name;
    td1.setAttribute('class', 'bold');
    td2.innerText = `$${coinObject["current_price"]}`;

    tRow.append(td0, td1, td2);
    table.append(tRow);
  });

  topTenDiv.append(table);

}

// Display API error, if received
function displayError(error) {
  const errorMessage = `Whoops! ${error.status} ${error.statusText}`;
  const topTenDiv = document.querySelector('#top-ten-display');
  topTenDiv.innerText = errorMessage;
}

// Display API error, if received
function displayCoinError(error, coin) {
  const errorMessage = `Whoops! We couldn't look up ${coin}: ${error.status} ${error.statusText}`;
  const coinDiv = document.querySelector('#coin-info-display');
  coinDiv.innerText = errorMessage;
}

// handle all UI logic
function handleEverything() {

  // display the market's current top ten coins
  getCoins();

  // Event handler for displaying more details for a specific coin
  document.querySelector('table').addEventListener('click', (e) => {
    const clickTarget = e.target.id;

    if (clickTarget) {
      getCoinInfo(clickTarget);
    }

  });
  
}

window.addEventListener("load", handleEverything);