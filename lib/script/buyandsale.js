const apiEndpoint = 'https://api.coinlore.net/api/tickers/';
let data = [];
let totalPurchases = {};
let wallet;

document.addEventListener('DOMContentLoaded', function () {
    initialize();
    loginCheck();
});

function loginCheck() {
    const signUpButton = document.querySelector('#signup-btn');
    const form = document.getElementById('coinForm');
    if (signUpButton.textContent === 'Sign Up') {
        form.style.display = 'block';
    } else {
        form.style.display = 'none';
    }
}

async function cryptoList() {
    try {
        const response = await fetch(apiEndpoint);
        const result = await response.json();
        return result.data;
    } catch (error) {
        return [];
    }
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

    updateSellPrice(); // Set initial sell price
}

function updateTotalCost() {
    const amountToBuy = parseFloat(document.getElementById('buyAmount').value); // Local variable for amount to buy
    const selectedCryptoId = document.getElementById('coinSelection').value;
    const selectedCrypto = data.find(crypto => crypto.id === selectedCryptoId);

    if (selectedCrypto) {
        const costPerCoin = parseFloat(selectedCrypto.price_usd);
        const totalCost = amountToBuy * costPerCoin;
        document.getElementById('totalCost').textContent = `$${totalCost.toFixed(2)}`;
    }
}

function updateSellPrice() {
    const amountToSell = parseFloat(document.getElementById('sellAmount').value);
    const selectedCryptoId = document.getElementById('coinSelection').value;
    const selectedCrypto = data.find(crypto => crypto.id === selectedCryptoId);

    if (selectedCrypto) {
        const cryptoSymbol = selectedCrypto.symbol;

        if (totalPurchases[cryptoSymbol]) {
            const costPerCoin = parseFloat(selectedCrypto.price_usd);
            const totalCost = amountToSell * costPerCoin;

            if (totalPurchases[cryptoSymbol] >= amountToSell) {
                document.getElementById('sellPrice').textContent = `$${totalCost.toFixed(2)}`;
            } else {
                document.getElementById('sellPrice').textContent = 'Insufficient balance in the wallet.';
            }
        } else {
            document.getElementById('sellPrice').textContent = 'You have no purchases for this cryptocurrency.';
        }
    } else {
        document.getElementById('sellPrice').textContent = 'Please select a cryptocurrency.';
    }
}

async function initialize() {
    wallet = document.getElementById('wallet');
    data = await cryptoList();
    populateSelectOptions(data);
    loadDataFromLocalStorage(); // Load data from localStorage during initialization
}

function clearForm() {
    document.getElementById('coinForm').reset();
    document.getElementById('totalCost').textContent = '0';
    document.getElementById('sellPrice').textContent = '0';
}

document.getElementById('buyAmount').addEventListener('input', updateTotalCost); // Add input event listener for buyAmount

document.querySelectorAll('input[name="action"]').forEach(function (radio) {
    radio.addEventListener('change', function () {
        const buyAmountInput = document.getElementById('buyAmount');
        const sellAmountInput = document.getElementById('sellAmount');

        if (this.value === 'buy') {
            buyAmountInput.removeAttribute('disabled');
            sellAmountInput.setAttribute('disabled', 'disabled');
            updateTotalCost(); // Update the total cost when switching to the buy action
            buyAmountInput.value = '0'; // Clear the 'amount to buy' input when switching to the buy action
        } else {
            sellAmountInput.removeAttribute('disabled');
            buyAmountInput.setAttribute('disabled', 'disabled');
            updateSellPrice(); // Update the sell price when switching to the sell action
            sellAmountInput.value = '0'; // Clear the 'amount to sell' input when switching to sell action
        }
    });
});

const confirm = document.querySelector('#confirm');

confirm.addEventListener('click', function () {
    const amountToBuy = parseFloat(document.getElementById('buyAmount').value);
    const amountToSell = parseFloat(document.getElementById('sellAmount').value);
    const selectedCryptoId = document.getElementById('coinSelection').value;
    const selectedCrypto = data.find(crypto => crypto.id === selectedCryptoId);

    if (document.querySelector('input[name="action"]:checked').value === 'buy') {
        if (selectedCrypto) {
            const cryptoSymbol = selectedCrypto.symbol;

            if (totalPurchases[cryptoSymbol]) {
                totalPurchases[cryptoSymbol] += amountToBuy; // Add the purchased amount to the existing purchase
            } else {
                totalPurchases[cryptoSymbol] = amountToBuy; // Initialize the purchase for a new coin
            }

            updateWalletText(); // Update the wallet text based on the cumulative purchases for each coin
            updateSellPrice(); // Update the sell price after buying coins
            saveDataToLocalStorage(); // Save data to localStorage after making changes
        } else {
            wallet.textContent = 'Please select a cryptocurrency before confirming.';
        }
    } else {
        if (selectedCrypto) {
            const cryptoSymbol = selectedCrypto.symbol;

            if (totalPurchases[cryptoSymbol]) {
                if (totalPurchases[cryptoSymbol] >= amountToSell) {
                    totalPurchases[cryptoSymbol] -= amountToSell; // Deduct the sold amount from totalPurchases
                    updateWalletText(); // Update the wallet text after selling coins
                    updateSellPrice(); // Update the sell price after selling coins
                    saveDataToLocalStorage(); // Save data to localStorage after making changes
                } else {
                    wallet.textContent = 'Insufficient balance in the wallet.';
                }
            } else {
                wallet.textContent = 'You have no purchases for this cryptocurrency.';
            }
        } else {
            wallet.textContent = 'Please select a cryptocurrency.';
        }
    }
});

function updateWalletText() {
    const walletTable = document.getElementById('walletTable');
    const walletDetails = Object.entries(totalPurchases).map(([symbol, amount]) => {
        const selectedCrypto = data.find(crypto => crypto.symbol === symbol);
        const buyingPrice = parseFloat(selectedCrypto.price_usd);
        const sellingPrice = parseFloat(selectedCrypto.price_usd);
        const profitLoss = (sellingPrice - buyingPrice) * amount;
        return {
            symbol,
            amount,
            buyingPrice,
            sellingPrice,
            profitLoss,
        };
    });
    // Clear the table body first
    const walletTableBody = walletTable.querySelector('tbody');
    walletTableBody.innerHTML = '';
    if (walletDetails.length > 0) {
        walletDetails.forEach(crypto => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${crypto.symbol}</td>
                <td>${crypto.amount}</td>
                <td>$${crypto.buyingPrice.toFixed(2)}</td>
                <td>$${(crypto.sellingPrice * Math.floor(crypto.amount)).toFixed(1)}</td>
                <td>${crypto.profitLoss >= 0 ? '+' : ''}$${crypto.profitLoss.toFixed(2)}</td>
            `;
            walletTableBody.appendChild(row);
        });
    } else {
        // If no purchases, show a single row indicating that
        const row = document.createElement('tr');
        row.innerHTML = '<td colspan="6">No purchases</td>';
        walletTableBody.appendChild(row);
    }
}

// Save the data to localStorage when buying or selling
function saveDataToLocalStorage() {
    localStorage.setItem('totalPurchases', JSON.stringify(totalPurchases));
}

// Load the data from localStorage during initialization
function loadDataFromLocalStorage() {
    const savedData = localStorage.getItem('totalPurchases');
    if (savedData) {
        totalPurchases = JSON.parse(savedData);
        updateWalletText(); // Update the wallet display with saved data
    }
}


