// 加入購物車
function addToCart(productName, price, image) {
  const item = {
    name: productName,
    price: price,
    image: image,
    quantity: 1
  };

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existing = cart.find(p => p.name === productName);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push(item);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  renderCartItems();
  toggleCart();
}

// 更新購物車數量提示
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById("cart-count").textContent = count;
}

// 渲染購物車內容
function renderCartItems() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartItems = document.getElementById("cart-items");
  const totalAmount = document.getElementById("cart-total");
  const emptyText = document.getElementById("empty-cart-text");

  cartItems.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    emptyText.style.display = "block";
    totalAmount.textContent = "🧾 總金額：$0";
    return;
  } else {
    emptyText.style.display = "none";
  }

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const li = document.createElement("li");
    li.className = "cart-item";
    li.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="info">
        <p><strong>${item.name}</strong></p>
        <p>$${item.price} x ${item.quantity} = $${itemTotal}</p>
        <div class="quantity-control">
          <button class="quantity-btn" onclick="changeQuantity(${index}, -1)">-</button>
          <button class="quantity-btn" onclick="changeQuantity(${index}, 1)">+</button>
        </div>
        <button class="remove-btn" onclick="removeFromCart(${index})">移除</button>
      </div>
    `;
    cartItems.appendChild(li);
  });

  totalAmount.textContent = `🧾 總金額：$${total}`;
}

// 修改數量
function changeQuantity(index, delta) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (!cart[index]) return;
  cart[index].quantity += delta;

  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  renderCartItems();
}

// 移除項目
function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  renderCartItems();
}

// 結帳
function checkout() {
  alert("感謝您的購買！");
  localStorage.removeItem("cart");
  updateCartCount();
  renderCartItems();
}

// 初始載入
window.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
});
