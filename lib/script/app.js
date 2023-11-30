const botImg = document.querySelector('.bot-img');
const botChatBox = document.querySelector('.bot-chatbot');
const userInput = document.querySelector('.user-input');
const sendMsg = document.querySelector('.send-btn');
const messageBox = document.querySelector('.message-box');


document.addEventListener('DOMContentLoaded', function () { // open and close menu for mobile
    const toggleBtn = document.querySelector('.toggle_btn');
    const dropDownMenu = document.querySelector('.dropdown-menu');

    toggleBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        dropDownMenu.classList.toggle('open');
    });

    document.addEventListener('click', function (e) {
        if (
            !toggleBtn.contains(e.target) &&
            !dropDownMenu.contains(e.target)
        ) {
            dropDownMenu.classList.remove('open');
        }
    });
});
botImg.addEventListener('click', function () { //open chat bot
    botChatBox.style.display = 'block';
});
document.addEventListener('click', function (e) { //close chatbot
    if (!botImg.contains(e.target) && !botChatBox.contains(e.target)) {
        botChatBox.style.display = 'none';
    }
});

function sendMessage() {
    const inputText = userInput.value;
    const response = getResponse(inputText);
    messageBox.innerHTML = '';

    messageBox.innerHTML += `<p>You: ${inputText}</p>`;
    messageBox.innerHTML += `<p>GenBot: ${response}</p>`;
    userInput.value = '';
}

sendMsg.addEventListener('click', sendMessage);

userInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        sendMessage();
    }
});



function getResponse(input) {
    if (input.toLowerCase().includes('hello')) {
        return 'Hello! How can I assist you today?<br><br>commands:<br>crypto<br>buy<br>sell<br>get started<br>wallet<br>invest<br>contact<br>';
    } else if (input.toLowerCase().includes('crypto')) {
        return 'Cryptocurrency, or crypto for short, is a digital or virtual form of currency that uses cryptography for security.';
    } else if (input.toLowerCase().includes('buy')) {
        return 'Buying cryptocurrency involves several steps:<br><br>' +
            '1. Choose a Cryptocurrency Exchange:<br>Select a reputable exchange like <a href="https://www.coinbase.com/" target="_blank" style="color: blue;">Coinbase</a>, <a href="https://www.binance.com/" target="_blank" style="color: blue;">Binance</a>, or <a href="https://www.kraken.com/" target="_blank" style="color: blue;">Kraken</a>.<br>' +
            '2. Create an Account:<br>Sign up, provide necessary information, and enable two-factor authentication (2FA) for added security.<br>' +
            '3. Sell or Trade (Optional):<br>If you decide to sell or trade, use the same exchange platform to place sell orders.';
    } else if (input.toLowerCase().includes('sell')) {
        return 'To sell cryptocurrency, you can follow these steps:<br><br>' +
            '1. Sign in to your cryptocurrency exchange account.<br>' +
            '2. Navigate to the Sell or Trade section of the platform. Choose the cryptocurrency to sell and specify the amount.<br>' +
            '3. Monitor the transaction and check your account balance to ensure the successful completion of the sale.';
    } else if (input.toLowerCase().includes('get started')) {
        return 'To get started with cryptocurrency, follow these steps:<br><br>' +
            '1. Educate Yourself:<br>Learn about different cryptocurrencies, blockchain technology, and market operations.<br>' +
            '2. Choose a Reputable Exchange:<br>Select a reliable platform like <a href="https://www.coinbase.com/" target="_blank" style="color: blue;">Coinbase</a> or <a href="https://www.binance.com/" target="_blank" style="color: blue;">Binance</a>.<br>' +
            '3. Continue Learning:<br>Cryptocurrency is a rapidly evolving space. Stay curious, explore new projects, and adapt to market changes.';
    } else if (input.toLowerCase().includes('wallet')) {
        return 'A cryptocurrency wallet securely stores your digital assets. Types of wallets include:<br><br>' +
            '1. <strong>Software Wallets:</strong> Installable applications for online, desktop, or mobile use.<br>' +
            '2. <strong>Hardware Wallets:</strong> Physical devices like <a href="https://www.ledger.com/" target="_blank" style="color: blue;">Ledger</a> or <a href="https://trezor.io/" target="_blank" style="color: blue;">Trezor</a>.<br>' +
            '3. <strong>Web Wallets:</strong> Provided by exchanges or online services, considered less secure.<br>' +
            'When choosing a wallet, consider factors like security features and ease of use.';
    } else if (input.toLowerCase().includes('invest')) {
        return 'Investing in cryptocurrency involves purchasing digital assets with the expectation of generating a return over time. Tips for cryptocurrency investing:<br><br>' +
            '1. <strong>Educate Yourself:</strong> Understand blockchain technology and your chosen cryptocurrencies.<br>' +
            '2. <strong>Diversify Your Portfolio:</strong> Spread investments across multiple cryptocurrencies.<br>' +
            '3. <strong>Consider Market Trends:</strong> Analyze historical trends, but remember past performance is not indicative of future results.';
    } else if (input.toLowerCase().includes('contact')) {
        return 'Contact us by following this link: <a href="https://forms.gle/qTvT6yM6XJJAu1kL6" target="_blank" style="color: blue;">Contact Us</a>';
    } else {
        return `'I'm sorry, I didn't understand your message.<br><br>commands:<br>crypto<br>buy<br>sell<br>get started<br>wallet<br>invest<br>contact<br>'`;
    }
}







