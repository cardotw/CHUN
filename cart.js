// 加入購物車（加入圖片網址欄位）
function addToCart(productName, price, imageUrl) {
  const item = {
    name: productName,
    price: price,
    image: imageUrl,
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
  alert("已加入購物車！");
  updateCartCount();
}

// 顯示購物車內容（for cart.html）
function displayCart() {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const cartContainer = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  if (!cartContainer || !cartTotal) return;

  cartContainer.innerHTML = "";
  let total = 0;

  cartItems.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;

    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}" style="width: 80px; height: 80px; object-fit: cover; margin-right: 10px;">
      <div>
        <p><strong>${item.name}</strong></p>
        <p>$${item.price} x ${item.quantity} = $${itemTotal}</p>
        <button onclick="removeFromCart(${index})">移除</button>
      </div>
    `;
    cartContainer.appendChild(div);
    total += itemTotal;
  });

  cartTotal.textContent = `🧾 總金額：$${total}`;
}

// 移除購物車商品
function removeFromCart(index) {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  cartItems.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cartItems));
  displayCart();
  updateCartCount();
}

// 結帳
function checkout() {
  alert("感謝您的購買！");
  localStorage.removeItem("cart");
  displayCart();
  updateCartCount();
}

// 更新右上角數字
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartCount = document.getElementById("cart-count");
  if (cartCount) cartCount.textContent = count;
}

// 初始載入更新購物車數量與內容
window.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  displayCart();
});
