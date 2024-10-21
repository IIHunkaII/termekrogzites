const backendurl = "https://retoolapi.dev/trkcXY/data";

document.addEventListener("DOMContentLoaded", function () {
    fetchAndDisplayData();
});

function fetchAndDisplayData() {
    fetch(backendurl)
        .then((response) => response.json())
        .then((data) => insertData(data))
}

document.querySelector('form').addEventListener("submit", function (event) {
   
    event.preventDefault(); // submitra nyomva ne frissuljon az oldal hogy le tudjuk kezelni a beerkezett adatokat 
    if (this.checkValidity() == true) {
        submitForm();
    }
});

function submitForm() {
    let name = document.getElementById("name").value;
    let price = document.getElementById("price").value;
    let amount = document.getElementById("amount").value;
    let kg = document.getElementById("kg");

    
     if (name === '' || price == '' || amount== '') {
        console.log('Empty field(s)!');
        return;
    }


    let fruit = {
        name: name,
        price: parseFloat(price),
        amount: parseInt(amount),
        unit: kg && kg.checked ? "kg" : "pcs"
    };

    console.log('Fruit to add:', fruit);

    let myHeader = new Headers({
        "Content-Type": "application/json"
    });

    fetch(backendurl, {
        method: "POST",
        headers: myHeader,
        body: JSON.stringify(fruit)
    })
    .then(response => response.json())
    .then(newData => {
        console.log('Added Data:', newData);
        fetchAndDisplayData();
        clearForm();
    })
    .catch(error => console.error('Error adding data:', error));
}

function insertData(data) {
    if (!data || !Array.isArray(data)) {
        console.error('Expected an array but got:', data);
        return;
    }
   
    let htmlcontent = '';
    data.forEach(item => {
        htmlcontent += `
        <tr>
            <th>${item.id}</th>
            <td>${item.name}</td>
            <td>${item.price}</td>
            <td>${item.amount}</td>
            <td>${item.unit}</td>
        </tr>
       `;
    });
   
    document.getElementById("rowsDiv").innerHTML = htmlcontent;
    
}

function clearForm() {
    document.getElementById("name").value = '';
    document.getElementById("price").value = '2';
    document.getElementById("amount").value = '1';
    document.getElementById("pcs").checked = true;
}
