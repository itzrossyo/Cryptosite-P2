const apiEndpoint = 'https://api.coinlore.net/api/tickers/';

async function cryptoList() { //call api for grabbing all cyrpto
    const response = await fetch(apiEndpoint);
    const data = await response.json();

   
    let table = document.createElement('table'); // Create a table element
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

    let tableContainer = document.querySelector('#table'); //display data to table
    tableContainer.innerHTML = ''; 
    tableContainer.appendChild(table);
}

cryptoList();