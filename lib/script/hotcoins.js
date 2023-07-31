const apiEndpoint = 'https://api.coinlore.net/api/tickers/';

async function updatePrices() { // Fetch the data and update the prices for hot coins
  const response = await fetch(apiEndpoint);
  const data = await response.json();

  const btc = data.data.find(crypto => crypto.symbol === 'BTC');
  document.querySelector('#btcPrice').textContent = `$${btc.price_usd}`;

  const doge = data.data.find(crypto => crypto.symbol === 'DOGE');
  document.querySelector('#dogePrice').textContent = `$${doge.price_usd}`;

  const eth = data.data.find(crypto => crypto.symbol === 'ETH');
  document.querySelector('#ethPrice').textContent = `$${eth.price_usd}`;
}

updatePrices();