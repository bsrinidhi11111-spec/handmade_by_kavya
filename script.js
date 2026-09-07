/* =========================================
   HANDMADE BY KAVYA
   MAIN JAVASCRIPT
========================================= */


/* ---------- CART ---------- */

function getCart() {
  return JSON.parse(localStorage.getItem("kavyaCart")) || [];
}


function saveCart(cart) {
  localStorage.setItem("kavyaCart", JSON.stringify(cart));
  updateCartCount();
}


function updateCartCount() {

  const cart = getCart();

  const totalItems = cart.reduce(
    (total, item) => total + Number(item.quantity || 1),
    0
  );

  const cartCount = document.getElementById("cartCount");

  if (cartCount) {
    cartCount.textContent = totalItems;
  }
}


/* ---------- ADD TO CART ---------- */

function addToCart(product) {

  const cart = getCart();

  const existingProduct = cart.find(
    item => item.id === product.id
  );

  if (existingProduct) {

    existingProduct.quantity =
      Number(existingProduct.quantity || 1) + 1;

  } else {

    cart.push({
      id: product.id,
      name: product.name,
      price: Number(product.price),
      image: product.image,
      quantity: 1
    });

  }

  saveCart(cart);

  alert("Product added to cart 🛍️");
}


/* ---------- REMOVE FROM CART ---------- */

function removeFromCart(productId) {

  let cart = getCart();

  cart = cart.filter(
    item => item.id !== productId
  );

  saveCart(cart);
}


/* ---------- CHANGE QUANTITY ---------- */

function changeQuantity(productId, change) {

  const cart = getCart();

  const product = cart.find(
    item => item.id === productId
  );

  if (!product) return;

  product.quantity =
    Number(product.quantity || 1) + change;

  if (product.quantity <= 0) {
    removeFromCart(productId);
    return;
  }

  saveCart(cart);
}


/* ---------- CART TOTAL ---------- */

function getCartTotal() {

  const cart = getCart();

  return cart.reduce(
    (total, item) =>
      total +
      Number(item.price) *
      Number(item.quantity || 1),
    0
  );
}


/* ---------- ORDER ID ---------- */

function generateOrderId() {

  const number =
    Math.floor(100000 + Math.random() * 900000);

  return "HK" + number;
}


/* ---------- SAVE ORDER ---------- */

function saveOrder(order) {

  const orders =
    JSON.parse(localStorage.getItem("kavyaOrders")) || [];

  orders.push(order);

  localStorage.setItem(
    "kavyaOrders",
    JSON.stringify(orders)
  );
}


/* ---------- GET ORDERS ---------- */

function getOrders() {

  return JSON.parse(
    localStorage.getItem("kavyaOrders")
  ) || [];
}


/* ---------- UPDATE ORDER STATUS ---------- */

function updateOrderStatus(orderId, status) {

  const orders = getOrders();

  const order = orders.find(
    item => item.orderId === orderId
  );

  if (!order) return;

  order.status = status;

  localStorage.setItem(
    "kavyaOrders",
    JSON.stringify(orders)
  );
}


/* ---------- PAGE LOAD ---------- */

document.addEventListener(
  "DOMContentLoaded",
  function () {

    updateCartCount();

  }
);
