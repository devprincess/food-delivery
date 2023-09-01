document.querySelector('a.btn.btn-primary.mt-3').style.opacity = 0.5;
var searchString = "", searchCategory = 0, categoryRef = {0: 'all', 1: 'Nigerian', 2: 'Italian', 3: 'Chinese', 4: 'American', 5: 'Canadian'}, sliderMin = 1000, sliderMax = 10000;
var cartObj = {};
let foodItems = document.querySelector('.food-items');
let cartItems = document.querySelector('.cart-items');
items.forEach((item, index) => {
    let pic = item[2], name = item[1], cate = item[0], pric = item[3];
    var foodItem = document.createElement('div');
    foodItem.className = 'col-sm-6 col-md-4 col-lg-3 p-3';
    foodItem.innerHTML = `<div class="card text-center shadow-sm">
                            <img src="images/${pic}" class="card-img-top" alt="${name}">
                            <div class="card-body">
                            <h5 class="card-title text-center text-success">${name}</h5>
                            <div class="mb-2 d-flex justify-content-between align-items-center">
                                <span class="span-category">${cate}</span>
                                <a href="javascript:void(0);" onclick="addItem(${index})" class="btn btn-primary cart-add-btn">Add to Basket</a>
                                <span class="rounded-5 btn-price">&#8358;<span>${pric}</span></span>
                            </div>
                            </div>
                        </div>`; 
    foodItems.appendChild(foodItem);
});

function addItem(index){
    let foodQty = 1, foodName = foodItems.querySelectorAll('div.p-3')[index].querySelector('.card-title').innerHTML,
    foodPric = foodItems.querySelectorAll('div.p-3')[index].querySelector('.rounded-5 > span').innerHTML;
    let cartNum = cartItems.querySelectorAll('li').length;
    let cartItem = document.createElement('li');
    cartItem.className = "nav-item";
    cartItem.innerHTML = `<div class="input-group mb-3">
                            <span class="input-group-text __no-select">${cartNum}.</span>
                            <span class="input-group-text __no-select">${foodName}</span>
                            <span class="input-group-text cart-list-price __no-select">&#8358;<span>${foodPric}</span></span>
                            <input type="number" class="form-control" onchange="updateCart()" value="${foodQty}">
                            <button class="btn btn-outline-secondary" data="${index}" onclick="deleteItem(${cartNum})">X</button>
                        </div>`;
    cartItems.appendChild(cartItem);
    foodItems.querySelectorAll('div.p-3')[index].querySelector('a').setAttribute('onclick', null);
    foodItems.querySelectorAll('div.p-3')[index].querySelector('a').innerHTML='In Basket';
    foodItems.querySelectorAll('div.p-3')[index].querySelector('a').classList.add('stactic');
    updateCart();
}

function updateCart(){
    let checkoutBtn = document.querySelector('a.btn.btn-primary.mt-3');
    let allCartItems = cartItems.querySelectorAll('li.nav-item');
    let totalPrice = 0;
    allCartItems.forEach((cartItem, index) => {
        if(index !== 0){
            let qty = cartItem.querySelector('input').value, price = cartItem.querySelector('.cart-list-price > span').innerHTML;
            totalPrice += (qty * price);
        }
    });
    if(totalPrice == 0){
        checkoutBtn.setAttribute('onclick', null);
        checkoutBtn.style.opacity = 0.5;
        document.querySelector('.total-price-span').innerHTML = totalPrice;
    }else{
        checkoutBtn.setAttribute('onclick', 'openpayment();');
        checkoutBtn.style.opacity = 1;
        document.querySelector('.total-price-span').innerHTML = totalPrice;
        let cartCount = cartItems.querySelectorAll('li').length-1;
        document.querySelectorAll('.cart-label').forEach((label)=>{
            label.innerHTML = cartCount;
        });
    }
}

function openpayment(){ 
    let tprice = document.querySelector('.total-price-span').innerHTML;
    document.querySelector(".price-tag").innerHTML= tprice;
    document.querySelector(".label-2 span").innerHTML= tprice;
    document.querySelector(".div-modal").classList.add("unsee");
    document.querySelector(".div-form").classList.remove("unsee");
    cartItems.innerHTML = `<li class="nav-item"> 
        <h1 class="pe-3 mb-3">Cart</h1>
    </li>`;
    document.querySelector('.total-price-span').innerHTML = 0;
    let modal = new bootstrap.Modal(document.querySelector('#successPage'), {});
    let wotowoto = document.getElementById("offcanvasCart");
    let ogbolor = bootstrap.Offcanvas.getInstance(wotowoto);
    ogbolor.hide();
    modal.show();
}

function openSuccess(){
    event.preventDefault();
    document.querySelector(".div-modal").classList.remove("unsee");
    document.querySelector(".div-form").classList.add("unsee");
}

function doCollate(){
    let strMatches = 0;
    document.querySelectorAll('.search-matches')[0].classList.add('unsee');
    document.querySelectorAll('.search-matches')[1].classList.add('unsee');
    let searchItems = document.querySelectorAll('.row.food-items > div');
    searchItems.forEach((searchItem) => {
        let isSearch = sortBySearch(searchString, searchItem);
        let isCategory = sortByCategory(searchCategory, searchItem);
        let isInRange = sortByPrice(sliderMin, sliderMax, searchItem);
        if(isSearch && isCategory && isInRange){
            searchItem.classList.remove('unsee');
            strMatches++;  
        }else searchItem.classList.add('unsee'); false;
        //searchItem.classList.remove('unsee'); true //strMatches++;  searchItem.classList.remove('unsee');
        //searchItem.classList.add('unsee'); false;
   });
    if(searchString != "" || sliderMin != 1000 || sliderMax != 10000){
        let pluralize = (strMatches == 1)?'':'es';
        document.querySelectorAll('.search-matches')[0].classList.remove('unsee');
        document.querySelectorAll('.search-matches')[1].classList.remove('unsee');
        document.querySelectorAll('.search-matches')[0].innerHTML = strMatches+' Match'+pluralize+' Found';
        document.querySelectorAll('.search-matches')[1].innerHTML = strMatches+' Match'+pluralize+' Found';
    }
}

function doCategory(qCategory){
    searchCategory = qCategory;
    document.querySelectorAll('.navbar-nav > li.nav-item').forEach(liItem => liItem.classList.remove('active'));
    document.querySelectorAll('.navbar-nav > li.nav-item')[qCategory+3].classList.add('active');
    doCollate();
}

function doSearch(qString){
    searchString = qString;
    document.querySelectorAll('input[type="search"]').forEach(searchInput => searchInput.value = qString);
    doCollate();
}

function sortBySearch(qString, searchItem){
    if(qString == "") return true;
    else {
        let textItem = searchItem.querySelector('h5.card-title').innerHTML;
        if(textItem.toLowerCase().search(qString) == -1) return false;
        else return true;
    }
}

function sortByCategory(qCategory, searchItem){
    if(qCategory == 0) return true;
    else{
        let textItem = searchItem.querySelector('.span-category').innerHTML;
        if(textItem == categoryRef[qCategory]) return true;
        else return false;
    }
}

function sortByPrice(lowerLim, upperLim, searchItem){ 
    let textItem = searchItem.querySelector('.btn-price > span').innerHTML; 
    if(Number(textItem) >= lowerLim && Number(textItem) <= upperLim) return true;
    else return false;
}

var slider = document.getElementById('slider');
noUiSlider.create(slider, {
    start: [1000, 10000],
    connect: true,
    step: 500,
    margin: 500,
    behaviour: 'tap-drag',
    tooltips: true,
    format: wNumb({
        decimals: 0,
        prefix: '&#8358;'
    }),
    range: {
        'min': 1000,
        'max': 10000
    },
});

slider.noUiSlider.on('update', function (values, handle) {
    sliderMin = values[0].replace('&#8358;', '');
    sliderMax = values[1].replace('&#8358;', '');
    doCollate();
});



const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl));



function toggleCVV(){document.querySelector(".cvv-container").classList.toggle("unsee");}


//first function 

function deleteItem(cartNum){ 
    let index = cartItems.querySelectorAll('li.nav-item')[cartNum].querySelector('button').getAttribute("data");
    cartItems.querySelectorAll('li.nav-item')[cartNum].remove();
    foodItems.querySelectorAll('div.p-3')[index].querySelector('a').setAttribute('onclick', `addItem(${index})`);
    foodItems.querySelectorAll('div.p-3')[index].querySelector('a').innerHTML='Add to Basket';
    foodItems.querySelectorAll('div.p-3')[index].querySelector('a').classList.remove('stactic');
    cartReNumber();
    updateCart();
}

//secound fuction

function cartReNumber(){
    let allCartItems = cartItems.querySelectorAll('li.nav-item');
    allCartItems.forEach((cartItem, index) => {
        if(index !== 0){
            let serialNum = cartItem.querySelector('span.input-group-text:nth-child(1)'), removeBtn = cartItem.querySelector('button');
            serialNum.innerHTML = index+".";
            removeBtn.setAttribute('onclick', `deleteItem(${index})`);
        }
    });
}




//============================
//YOUR TASKSKSSKSKSKSSKSK
//=============================
/* Optimize the website... 
    1. add functionalities like deleting the whole cart, 
    2. deleting a particular item from cart (You don't expect me to buy everything I touch)
    3. Add a new container to the thank you page (success page), so that when I click on check out, it will ask for payment method, next take my payment details like card number blahblahblah, before showing the success screen.
    You can do all of these inside that same modal, just hide and show the particular content using javascript when the user presses buttons, so it is easy
    Thank you.
*/
//============================
//YOUR TASKSKSSKSKSKSSKSK
//=============================