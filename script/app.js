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

async function cryptoList() {
  try {
    const response = await fetch('https://api.coinlore.net/api/tickers/');
    const data = await response.json();

    // Create a table element
    let table = document.createElement('table');

    data.data.forEach(item => {
      let row = table.insertRow();
      let cell1 = row.insertCell(0);
      let cell2 = row.insertCell(1);
      let cell3 = row.insertCell(2);
      cell1.textContent = item.name;
      cell2.textContent = item.price_usd;
      cell3.textContent = item.percent_change_24h;
    });

    // Append the table to a specific element with id "table-container"
    let tableContainer = document.getElementById('table');
    tableContainer.innerHTML = ''; // Clear any existing content
    tableContainer.appendChild(table);
  } catch (error) {
    console.error('Error:', error);
  }
}

cryptoList();



// open and close menu for mobile


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

//open and close chat bot

const botImg = document.querySelector(".bot-img");
const botChatBox = document.querySelector(".bot-chatbot");

botImg.addEventListener("click", function() {
  botChatBox.style.display = "block";
});

document.addEventListener("click", function(e) {
  if (!botImg.contains(e.target) && !botChatBox.contains(e.target)) {
    botChatBox.style.display = "none";
  }
});

//start of chat bot 

const userInput = document.querySelector(".user-input");
const sendMsg = document.querySelector(".send-btn");
const messageBox = document.querySelector(".message-box");

sendMsg.addEventListener("click", function () {
  const inputText = userInput.value;
  const response = getResponse(inputText);
  messageBox.innerHTML += `<p>You: ${inputText}</p>`;
  messageBox.innerHTML += `<p>GenBot: ${response}</p>`;
  userInput.value = "";
});

// bot logic
function getResponse(input) {
  if (input.toLowerCase().includes("hello")) {
    return "Hello! How can I assist you today?";
  } else if (input.toLowerCase().includes("help")) {
    return "Sure, I'm here to help. What do you need assistance with? Crypto, buy, sell, swap, get started, wallet, invest, security";
  } else if (input.toLowerCase().includes("crypto")) {
    return "Cryptocurrency, or crypto for short, is a digital or virtual form of currency that uses cryptography for security.";
  } else if (input.toLowerCase().includes("buy")) {
    return "To buy cryptocurrency,";
  } else if (input.toLowerCase().includes("sell")) {
    return "To sell cryptocurrency, you can follow these steps:\n1. Sign in to your cryptocurrency exchange account.\n2. Navigate to the 'Sell' or 'Trade' section of the platform.";
  } else if (input.toLowerCase().includes("swap")) {
    return "To swap or exchange cryptocurrencies, ";
  } else if (input.toLowerCase().includes("get started")) {
    return "To get started with cryptocurrency, you can follow these steps:";
  } else if (input.toLowerCase().includes("wallet")) {
    return "A cryptocurrency wallet is a software program or a physical device that allows you to securely store";
  } else if (input.toLowerCase().includes("invest")) {
    return "Investing in cryptocurrency involves purchasing digital assets with the expectation of generating a return over time.";
  } else if (input.toLowerCase().includes("security")) {
    return "Security is crucial when dealing with cryptocurrencies. ";
  } else {
    return "I'm sorry, I didn't understand your message.";
  }
}