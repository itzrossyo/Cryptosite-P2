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

let outputElement = document.getElementById('output');

function getResponse(input) {  //chatbot logic
    if (input.toLowerCase().includes('hello')) {
        return 'Hello! How can I assist you today?<br><br>commands:<br>crypto<br>buy<br>sell<br>get started<br>wallet<br>invest<br>contact<br>';
    } else if (input.toLowerCase().includes('crypto')) {
        return 'Cryptocurrency, or crypto for short, is a digital or virtual form of currency that uses cryptography for security.';
    } else if (input.toLowerCase().includes('buy')) {
        return 'To buy cryptocurrency,';
    } else if (input.toLowerCase().includes('sell')) {
        return 'To sell cryptocurrency, you can follow these steps:\n1. Sign in to your cryptocurrency exchange account.\n2. Navigate to the Sell or Trade section of the platform.';
    } else if (input.toLowerCase().includes('get started')) {
        return 'To get started with cryptocurrency, you can follow these steps:';
    } else if (input.toLowerCase().includes('wallet')) {
        return 'A cryptocurrency wallet is a software program or a physical device that allows you to securely store';
    } else if (input.toLowerCase().includes('invest')) {
        return 'Investing in cryptocurrency involves purchasing digital assets with the expectation of generating a return over time.';
    } else if (input.toLowerCase().includes('contact')) {
        return 'here you go please follow this link  <a href="https://forms.gle/qTvT6yM6XJJAu1kL6" target="_blank" class="link">contact us</a> ';
    } else {
        return `'I'm sorry, I didn't understand your message.<br><br>commands:<br>crypto<br>buy<br>sell<br>get started<br>wallet<br>invest<br>contact<br>'`;
    }

}





