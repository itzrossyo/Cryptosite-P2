const apiEndpoint = 'https://api.coinlore.net/api/tickers/';
let data = [];
let totalPurchases = {};
let amountToBuy = 0; // Global variable for amount to buy
const signUp = document.getElementById('signup-btn');

const form = document.querySelector('#coinForm')
const signupH1 = document.querySelector('#signuph1')




async function cryptoList() {
    const response = await fetch(apiEndpoint);
    const data = await response.json();
    return data.data;
}

function populateSelectOptions(data) {
    const selectElement = document.getElementById('coinSelection');
    selectElement.innerHTML = '';

    data.forEach((crypto) => {
        const option = document.createElement('option');
        option.value = crypto.id;
        option.textContent = crypto.symbol;
        selectElement.appendChild(option);
    });
}

function updateTotalCost() {
    amountToBuy = parseFloat(document.getElementById("buyAmount").value); // Update global variable
    const selectedCryptoId = document.getElementById("coinSelection").value;
    const selectedCrypto = data.find(crypto => crypto.id === selectedCryptoId);

    if (selectedCrypto) {
        const costPerCoin = parseFloat(selectedCrypto.price_usd);
        const totalCost = amountToBuy * costPerCoin;
        document.getElementById("totalCost").textContent = `$${totalCost.toFixed(2)}`;
    }
}

function updateSellPrice() {
    const amountToSell = parseFloat(document.getElementById("sellAmount").value);
    const selectedCryptoId = document.getElementById("coinSelection").value;
    const selectedCrypto = data.find(crypto => crypto.id === selectedCryptoId);

    if (selectedCrypto) {
        const cryptoSymbol = selectedCrypto.symbol;

        if (totalPurchases[cryptoSymbol]) {
            const costPerCoin = parseFloat(selectedCrypto.price_usd);
            const totalCost = amountToSell * costPerCoin;

            if (totalPurchases[cryptoSymbol] >= amountToSell) {
                document.getElementById("sellPrice").textContent = `$${totalCost.toFixed(2)}`;
            } else {
                document.getElementById("sellPrice").textContent = "Insufficient balance in the wallet.";
            }
        } else {
            document.getElementById("sellPrice").textContent = "You have no purchases for this cryptocurrency.";
        }
    } else {
        document.getElementById("sellPrice").textContent = "Please select a cryptocurrency.";
    }
}

function updateWalletText() {
    const walletText = Object.entries(totalPurchases).map(([symbol, amount]) => `${amount} ${symbol}`).join(', ');
    const wallet = document.querySelector('#wallet');
    wallet.textContent = `You have bought ${walletText}.`;
}

async function initialize() {
    data = await cryptoList();
    populateSelectOptions(data);
    updateSellPrice(); // Set initial sell price
}

initialize();

function clearForm() {
    document.getElementById("coinForm").reset();
    document.getElementById("totalCost").textContent = 0;
    document.getElementById("sellPrice").textContent = 0;
}



document.getElementById("buyAmount").addEventListener("input", updateTotalCost); // Add input event listener for buyAmount

document.querySelectorAll('input[name="action"]').forEach(function (radio) {
    radio.addEventListener("change", function () {
        const buyAmountInput = document.getElementById("buyAmount");
        const sellAmountInput = document.getElementById("sellAmount");

        if (this.value === "buy") {
            buyAmountInput.removeAttribute("disabled");
            sellAmountInput.setAttribute("disabled", "disabled");
            updateTotalCost(); // Update the total cost when switching to the buy action
            buyAmountInput.value = "0"; // Clear the "amount to buy" input when switching to buy action
        } else {
            sellAmountInput.removeAttribute("disabled");
            buyAmountInput.setAttribute("disabled", "disabled");
            updateSellPrice(); // Update the sell price when switching to the sell action
            sellAmountInput.value = "0"; // Clear the "amount to sell" input when switching to sell action
        }
    });
});

const confirm = document.querySelector('#confirm');

confirm.addEventListener('click', function () {
    const amountToBuy = parseFloat(document.getElementById("buyAmount").value);
    const amountToSell = parseFloat(document.getElementById("sellAmount").value);
    const selectedCryptoId = document.getElementById("coinSelection").value;
    const selectedCrypto = data.find(crypto => crypto.id === selectedCryptoId);

    if (document.querySelector('input[name="action"]:checked').value === "buy") {
        if (selectedCrypto) {
            const cryptoSymbol = selectedCrypto.symbol;

            if (totalPurchases[cryptoSymbol]) {
                totalPurchases[cryptoSymbol] += amountToBuy; // Add the purchased amount to the existing purchase
            } else {
                totalPurchases[cryptoSymbol] = amountToBuy; // Initialize the purchase for a new coin
            }

            // Generate the wallet text based on the cumulative purchases for each coin
            const walletText = Object.entries(totalPurchases).map(([symbol, amount]) => `${amount} ${symbol}`).join(', ');
            wallet.textContent = `You have bought ${walletText}.`;

            // Update the sell price after buying coins
            updateSellPrice();
        } else {
            wallet.textContent = "Please select a cryptocurrency before confirming.";
        }
    } else {
        if (selectedCrypto) {
            const cryptoSymbol = selectedCrypto.symbol;

            if (totalPurchases[cryptoSymbol]) {
                if (totalPurchases[cryptoSymbol] >= amountToSell) {
                    totalPurchases[cryptoSymbol] -= amountToSell; // Deduct the sold amount from totalPurchases
                    const walletText = Object.entries(totalPurchases).map(([symbol, amount]) => `${amount} ${symbol}`).join(', ');

                    wallet.textContent = `You have bought ${walletText}.`;
                    updateSellPrice(); // Update the sell price after selling coins
                } else {
                    wallet.textContent = "Insufficient balance in the wallet.";
                }
            } else {
                wallet.textContent = "You have no purchases for this cryptocurrency.";
            }
        } else {
            wallet.textContent = "Please select a cryptocurrency.";
        }
    }
});
