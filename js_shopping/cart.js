// const containerElement = document.querySelector('.container');
const searchElement = document.querySelector('.search');
const itemsElement = document.querySelector('.items');
const cartElement = document.querySelector('.cart');
const next = document.querySelector('.next');
const prev = document.querySelector('.prev');
const price = document.querySelector('.price');

// Initializes variables
var title
let items= {items:[]};
let cart= {cart:[]};
    page = 1, 
    limit = 10;

// Main template to load API
let template = `
  {{#each items}}
    <div class="row">
      <div class="col">
        <div class="card" style="width: 20rem;">
          <img class="card-img-top" src="{{image}}" alt="Card image cap">
            <div class="card-block">
              <h4 class="card-title">{{title}}</h4>
              <p class="card-text">Price: &#36;{{price}}</p>
              <a href="#" data-name="{{title}}" data-price="{{price}}" class="add-to-cart"></a>
              <button class="btn btn-primary" onclick="addToCart({{ @index }})">Add to cart</button>
            </div>
          </div>
      </div>
    </div>
  {{/each}}
`;
// Renders the first template (API)
function render(context) {
  let compiled = Handlebars.compile(template);
  itemsElement.innerHTML = compiled(context);
}

// Add to cart template
let template2 = `
  {{#each cart}}
    <div class="row">
      <div class="col">
        <div class="card" style="width: 20rem;">
        <h1>The Cart</h1>
          <img class="card-img-top" src="{{image}}" alt="Card image cap">
            <div class="card-block">
            <h4 class="card-title">{{title}}</h4>
            <p class="card-text">Price: &#36;{{price}}</p>
            <a href="#" data-name="{{title}}" data-price="{{price}}" class="add-to-cart"></a>
            <button class="btn btn-secondary" onclick="Remove({{ @index }})">Remove</button>
            </div>
          </div>
      </div>
    </div>
  {{/each}}
`; 
// Renders the second template (add to cart)
function render2(context) {
  let compiled2 = Handlebars.compile(template2);
  cartElement.innerHTML = compiled2(context);
}

// Search Function
function searchHandler(event) {
  let val = searchElement.value;
 
  // Filtering the searched items 
  let filteredItems = items.items.filter(function (items) {
    return items.title.toLowerCase().includes(val.toLowerCase());})
  let dataCopy = {
    items: filteredItems
  };
  render(dataCopy);
}

// Populates items on page
function getItems() {
  $.ajax({
    url: 'http://5ceb36a60c871100140bf873.mockapi.io/v1/item?',
    method: 'GET',
    data: {
      p: page,
      l: limit,
    },
    success: function(data) {
      console.log(data);
    },
    }).done(function (resp) {
    items = {items : resp}
    render(items);
    });
}

// Changes page and populates new items
next.addEventListener('click', () => {
  page ++;
  getItems();
});

getItems();

// Add to cart 
function addToCart(index) {
cart.cart.splice(0,0, items.items[index])
calculate ();   
}

// Remove from cart
function Remove(index) {
cart.cart.splice(index, 1);
calculate ();
}

// Check out alert
function checkout(){
  alert("Thank you for shopping, come again soon!");
  cart.cart = [];
  calculate();
}

// Calculate total
function calculate () {
  var sum = 0;
  var i; 
    for (i=0;i<cart.cart.length;i++){
    sum += Number(cart.cart[i].price);
    }
  price.innerHTML = "$"+sum;
  render2(cart);
  }

searchElement.addEventListener('input', searchHandler);