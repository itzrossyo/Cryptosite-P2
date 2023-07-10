let btcPrice;
let dogePrice;
let ethPrice;

window.addEventListener('DOMContentLoaded', async () => {
  const response = await fetch('https://api.coinlore.net/api/tickers/');
  const data = await response.json();

  const btc = data.data.find(crypto => crypto.symbol === 'BTC');
  btcPrice = btc.price_usd;

  const doge = data.data.find(crypto => crypto.symbol === 'DOGE');
  dogePrice = doge.price_usd;

  const eth = data.data.find(crypto => crypto.symbol === 'ETH');
  ethPrice = eth.price_usd;

  // Call the updatePrices function after fetching the initial prices
  updatePrices();
});

// Fetch the data and update the prices
async function updatePrices() {
  const response = await fetch('https://api.coinlore.net/api/tickers/');
  const data = await response.json();

  const btc = data.data.find(crypto => crypto.symbol === 'BTC');
  document.getElementById('btcPrice').textContent = `$${btc.price_usd}`;

  const doge = data.data.find(crypto => crypto.symbol === 'DOGE');
  document.getElementById('dogePrice').textContent = `$${doge.price_usd}`;

  const eth = data.data.find(crypto => crypto.symbol === 'ETH');
  document.getElementById('ethPrice').textContent = `$${eth.price_usd}`;
}

// Call the updatePrices function when the DOM is ready
document.addEventListener('DOMContentLoaded', updatePrices);

document.addEventListener("DOMContentLoaded", function () {
  const toggleBtn = document.querySelector(".toggle_btn");
  const dropDownMenu = document.querySelector(".dropdown-menu");

  toggleBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    dropDownMenu.classList.toggle("open");
  });

  document.addEventListener("click", function (e) {
    if (
      !toggleBtn.contains(e.target) &&
      !dropDownMenu.contains(e.target)
    ) {
      dropDownMenu.classList.remove("open");
    }
  });
});
