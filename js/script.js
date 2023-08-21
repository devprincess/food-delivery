//create the food items with indexes
//create the cart object
//updating the cart object
//Capture modal opening and open manually so we can remove the cart items from storage...

var cartObj = {};
let items = [
    ['rice 2.jpg', 'Sweet Fried Rice', 'Nigerian', '500'],
    ['okro soup.jpg', 'Okra Soup','Nigerian', '600']
]
let foodItems = document.querySelector('.food-items');
let cartItems = document.querySelector('.cart-items');
items.forEach((item, index) => {
    let pic = item[0], name = item[1], cate = item[2], pric = item[3];
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
                            <span class="input-group-text">${cartNum}.</span>
                            <span class="input-group-text">${foodName}</span>
                            <span class="input-group-text cart-list-price">&#8358;<span>${foodPric}</span></span>
                            <input type="number" class="form-control" onchange="updateCart()" value="${foodQty}">
                        </div>`;
    cartItems.appendChild(cartItem);
    foodItems.querySelectorAll('div.p-3')[index].querySelector('a').setAttribute('onclick', null);
    foodItems.querySelectorAll('div.p-3')[index].querySelector('a').innerHTML='In Basket';
    foodItems.querySelectorAll('div.p-3')[index].querySelector('a').classList.add('stactic');
    updateCart();
    //cart object is going to look this way...
    //foodname,price,qty
}

function updateCart(){
    let allCartItems = cartItems.querySelectorAll('li.nav-item');
    let totalPrice = 0;
    allCartItems.forEach((cartItem, index) => {
        if(index !== 0){
            let qty = cartItem.querySelector('input').value, price = cartItem.querySelector('.cart-list-price > span').innerHTML;
            totalPrice += (qty * price);
        }
    });
    document.querySelector('.total-price-span').innerHTML = totalPrice;
    let cartCount = cartItems.querySelectorAll('li').length-1;
    document.querySelectorAll('.cart-label').forEach((label)=>{
        label.innerHTML = cartCount;
    });
}

function openSuccess(){
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