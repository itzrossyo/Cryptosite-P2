const apiEndpoint = 'https://api.coinlore.net/api/tickers/';

async function cryptoList() {
    try {
        const response = await fetch(apiEndpoint);
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        const data = await response.json();

        if (!data || !data.data || !Array.isArray(data.data)) {
            throw new Error('Invalid API response data.');
        }

        let table = document.createElement('table');
        data.data.forEach(item => {
            let row = table.insertRow();
            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);
            let cell3 = row.insertCell(2);
            let cell4 = row.insertCell(3);
            cell1.textContent = item.name;
            cell2.textContent = item.price_usd;
            cell3.textContent = item.percent_change_24h;
            cell4.textContent = item.rank;
        });

        let tableContainer = document.querySelector('#table');
        tableContainer.innerHTML = '';
        tableContainer.appendChild(table);
    } catch (error) {
    }
}

cryptoList();
