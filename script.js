let names = ['Pizza Salami', 'Pizza Schinken', 'Pizza Popeye','Pizza Pirat',];
let descriptions = ['mit Tomatensauce, Gouda und Salami','mit Tomatensauce, Gouda und Schinken','mit Tomatensauce, Gouda, Spinat, Zwiebeln und Hirtenkäse','mit Tomatensauce, Gouda, Schinken und frischen Pilzen'];
let prices = [11.00, 11.00, 12.50, 11.50,];

let basketName = [];
let basketPrice = [];
let basketAmount = [];


function renderDishes() {
    let content  = document.getElementById('dishContent');
    content.innerHTML = '';
    for (let i=0; i < names.length; i++) {
        content.innerHTML  += templateDishes(i);
    }
}

/* --- Basket --- */
function addToBasket(i) { // includes sucht im array basketName nach names[i], wird i nicht gefunden wird else ausgeführt
    if (basketName.includes(names[i])) { // includes gibt TRUE order FALSE aus
        let x = basketName.indexOf(names[i]) //indexOf sucht in basketName nach names[i] und gibt den WERT heraus
        basketAmount[x]++;
    } else {
        basketName.push(names[i]);
        basketPrice.push(prices[i]);
        basketAmount.push(1);
    }
    renderBasket();
}

function addSameToBasket(i) {
    basketAmount[i]++;
    renderBasket();
}

function deleteSameFromBasket(i) {
    if (basketAmount[i] == 1) {
        basketPrice.splice(i,1);
        basketAmount.splice(i,1);
        basketName.splice(i,1);
    } else {
        basketAmount[i]--;
    }
    renderBasket();
}

function calculationBasket() {
    let calculation = document.getElementById('calculation');
    let sum = 0;
    for (let i=0; i < basketName.length; i++) {
        sum += basketPrice[i] * basketAmount[i];
    }
    calculation.innerHTML = templateCalculation(sum);
}

function renderBasket() {
    let emptyBasket = document.getElementById('emptyBasket');
    let filledBasket = document.getElementById('filledBasket');
    let calculation = document.getElementById('calculation');
    filledBasket.innerHTML = '';
    for (let i = 0; i < basketName.length; i++) {
        filledBasket.innerHTML += templateFilledBasket(i);
        calculationBasket(i);
    }
    if (basketName.length < 1) {
        emptyBasket.classList.remove('dnone');
        calculation.innerHTML = '';
    } else {
        emptyBasket.classList.add('dnone');
    }
}

window.onscroll = function() {
    let mainRight = document.getElementById('mainRight');
    if(window.scrollY > 0) {
        mainRight.style = 'top: 0';
    } else {
        mainRight.style = 'top: 100';
    }
}

/* --- Toogle-Button Basket-Responsiv --- */
function toggle() {
    document.getElementById("mainRight").classList.toggle(`active`);
}

/* --- Templates --- */
function templateDishes(i) {
    let name = names[i];
    let description = descriptions[i];
    let price = prices[i].toFixed(2).replace('.',',');
    return `
    <div class="order-container">
        <div class="order-container-column">
            <span><b>${name}.</b></span>
            <span>${description}</span>
            <div><b>${price} €</b></div>
        </div>
        <img onclick="addToBasket(${i})" class="main-info-button" src="img/plus-8-64.jpg" alt="Add">
    </div>
    `;
}

function templateFilledBasket(i) {
    let name = basketName[i];
    let price = basketPrice[i];
    let amount = basketAmount[i];
    let priceWithAmount = (price * amount).toFixed(2).replace('.',',');
    return `
    <div class="basket-container">
        <div class="basket-order-conatiner">
            <span><b>${amount} ${name}</b></span>
            <span>${priceWithAmount} €</span>
        </div>
        <div class="basket-button-conatiner">
            <img onclick="deleteSameFromBasket(${i})" class="main-info-button" src="img/minus-64.jpg" alt="Delete">
            <img onclick="addSameToBasket(${i})" class="main-info-button" src="img/plus-8-64.jpg" alt="Add">
        </div>
    </div>
    `;
}

function templateCalculation(sum) {
    let subtotal = sum.toFixed(2).replace('.',',');
    let total = (sum + 2.50).toFixed(2).replace('.',',');
    return `
    <div  class="calculation-basket">
        <div class="calculation-container">
            <span>Zwischensumme</span>
            <span>Lieferkosten</span>
            <span><b>Gesamt</b></span>
        </div>
        <div class="calculation-container">
            <div>${subtotal} €</div>
            <div>2,50 €</div>
            <div><b>${total} €</b></div>
        </div>
    </div>
    <button class="order-button">Bezahlen</button>
    `;
}