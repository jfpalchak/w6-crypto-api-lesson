import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CryptoService from './js/crypto-service.js';

// BUSINESS LOGIC

async function getCoins() {
  // Utilizing ASYNC & AWAIT
  const response = await CryptoService.getCoins();
  if (response[0]) {
    displayTopCoins(response);
  } else {
    displayError(response);
  }

}

// UI LOGIC
// Display the API response for the top ten crypto coins
function displayTopCoins(topTen) {
  const topTenDiv = document.querySelector('#top-ten-display');
  const ol = document.createElement('ol');

  topTen.forEach(function(coinObject) {
    let coin = coinObject.name;
    let currentPrice = coinObject["current_price"];
    let string = `${coin}, currently listed at ${currentPrice}`;

    let li = document.createElement('li');
    li.append(string);
    ol.append(li);
  });

  topTenDiv.append(ol);

}

function displayError(error) {
  const topTenDiv = document.querySelector('#top-ten-display');
  topTenDiv.innerText = `Whoops! ${error}`;
}


function handleEverything() {

  getCoins();
  
}

window.addEventListener("load", handleEverything);