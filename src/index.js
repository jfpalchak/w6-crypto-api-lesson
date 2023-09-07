import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
// import CryptoService from './js/crypto-service.js';
import { getCoins, getCoinInfo } from './js/get-coins.js';

// UI LOGIC

// Display the API response for the specified crypto coin
export function displayCoinInfo(coin) {
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
export function displayTopCoins(topTen) {
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
export function displayError(error) {
  const topTenDiv = document.querySelector('#top-ten-display');
  topTenDiv.innerText = `Whoops! ${error}`;
}

// Display API error, if received
export function displayCoinError(error) {
  const coinDiv = document.querySelector('#coin-info-display');
  coinDiv.innerText = `Whoops! ${error}`;
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