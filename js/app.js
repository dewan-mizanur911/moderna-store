// Load products from data.json 
const loadProducts = () => {
  document.getElementById('product-input').value = '';
  // const url = `https://fakestoreapi.com/products`;
  const url = '../data.json';
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    // creating stars
    const p = document.createElement('p');
    const rating = Math.round(product.rating.rate);

    for (let i = 0; i < rating; i++){
      p.innerHTML += `<i class="fas fa-star text-danger"></i>`;
    }

    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    const singleProduct = document.createElement('div');
    singleProduct.classList.add('single-product', 'border', 'border-2', 'rounded', 'border-info')
    singleProduct.innerHTML = `
      <div>
    <img class="product-image" src=${image}></img>
      </div>
      <h3>${product.title}</h3>
      <p>Category: ${product.category}</p>
      <h2>Price: $ ${product.price}</h2>
      <p><small class="fw-bold">Rating: ${product.rating.rate}/Reviews: ${product.rating.count}</small></p>

      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-primary fs-bold">Add to cart</button>

      <button onclick="showDetails(${product.price}, ${product.rating.rate})" type="button" class="btn fw-bold btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Details
      </button>
      `;
    singleProduct.prepend(p);
    div.appendChild(singleProduct);
    document.getElementById("all-products").appendChild(div);
  }
};

// Show specific item details 
const showDetails = (price, rating) => {
  const modal = document.getElementById('modal');
  modal.innerHTML = `
    <h2><i>Product Details</i></h2>
    <hr>
    <h3 class="text-success">Price : $ ${price}</h3>
    <p class="text-dark fw-bold">Rating : ${rating}</p>
  `;
}

// Global count initialized and update
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
};

// input value
const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value.toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
    updateTotal();
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};
updateTotal();

// Buy now button function
const onBuy = () => {
  document.getElementById("modal").textContent = "";
  document.getElementById('modal').innerHTML = `
    <h3 class="text-danger">Please Buy Something!</h3>
  `;
  if (parseInt(document.getElementById('total-Products').innerText) != 0) {
        document.getElementById("modal").innerHTML = `
    <h3 class="text-success">Items Purchased!</h3>;
  `; 
  }
  // Global count update
  count = 0;
      setInnerText("total-Products", 0);
      setInnerText("price", 0);
      setInnerText("delivery-charge", 20);
      setInnerText("total-tax", 0);
    setInnerText("total", 20);
}

loadProducts();