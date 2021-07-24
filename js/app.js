'use strict';

let orders = [];
function Order(customerName, foodType) {
    this.customerName = customerName;
    this.foodType = foodType;
    this.price = [];

    orders.push(this);
}

// geting Random price function
Order.prototype.getPrice = function () {
    this.price.push(Math.floor(Math.random() * 101));
}

// setting Items to local storage
function settingItems() {
    let data = JSON.stringify(orders);
    localStorage.setItem('Order', data);
}

// getting Items from Local storage
function gettingItems() {
    let stringifyOrders = localStorage.getItem('Order');
    let normalOrders = JSON.parse(stringifyOrders);

    let newOrder;
    if (normalOrders !== null) {
        for (let i = 0; i < normalOrders.length; i++) {
            newOrder = new Order(normalOrders[i].customerName, normalOrders[i].foodType);
            newOrder.getPrice();
        }
        newOrder.renderOrders();
    }
}

// Rendereing Orders on the table
let table = document.getElementById('myTable');
Order.prototype.renderOrders = function () {
    // table.innerHTML = '';
    while(table.rows.length>1){
        table.deleteRow(1);
    }
    for (let i = 0; i < orders.length; i++) {
        let trElement = document.createElement('tr');
        table.appendChild(trElement);
        let tdElement = document.createElement('td');
        trElement.appendChild(tdElement);
        let imgEl = document.createElement('img');
        tdElement.appendChild(imgEl);
        if (orders[i].foodType === 'shawarma') {
            imgEl.setAttribute('src', 'Images/shawarma.jpg');
        } else if (orders[i].foodType === 'burger') {
            imgEl.setAttribute('src', 'Images/burger.jpg');
        } else if (orders[i].foodType === 'pizza') {
            imgEl.setAttribute('src', 'Images/pizza.jpg');
        }
        // 
        let tdElement2 = document.createElement('td');
        trElement.appendChild(tdElement2);
        let pEl1 = document.createElement('p');
        tdElement2.appendChild(pEl1);
        pEl1.textContent = `Customer Name : ${orders[i].customerName}`;
        // 
        let pEl2 = document.createElement('p');
        tdElement2.appendChild(pEl2);
        pEl2.textContent = `Food Type : ${orders[i].foodType}`;
        //
        let pEl3 = document.createElement('p');
        tdElement2.appendChild(pEl3);
        pEl3.textContent = `Food Price : ${orders[i].price}`;
    }
}

// Adding event listner to the form
let myForm = document.getElementById('myForm');
myForm.addEventListener('submit', handleSubmit);
function handleSubmit(event) {
    event.preventDefault();
    let customerName = event.target.customerName.value;
    let foodType = event.target.foodType.value;

    let newOrder = new Order(customerName, foodType);
    newOrder.getPrice();
    settingItems();
    console.log(orders);
    newOrder.renderOrders();
}

gettingItems();