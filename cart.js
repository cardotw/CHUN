// 加入購物車
function addToCart(productName, price) {
  const item = {
    name: productName,
    price: price,
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
}

// 顯示購物車內容（在 cart.html 會觸發）
function displayCart() {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const cartContainer = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  if (!cartContainer || !cartTotal) return; // 如果不是在購物車頁面，直接跳出

  cartContainer.innerHTML = "";
  let total = 0;

  cartItems.forEach((item, index) => {
    const div = document.createElement("div");
    const itemTotal = item.price * item.quantity;

    div.innerHTML = `
      <p>${item.name} - 單價 $${item.price} x ${item.quantity} = $${itemTotal}</p>
      <button onclick="removeFromCart(${index})">移除</button>
    `;
    cartContainer.appendChild(div);
    total += itemTotal;
  });

  cartTotal.textContent = `🧾 總金額：$${total}`;
}

// 從購物車移除商品
function removeFromCart(index) {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  cartItems.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cartItems));
  displayCart();
}

// 結帳按鈕
function checkout() {
  alert("感謝您的購買！");
  localStorage.removeItem("cart");
  displayCart();
}

// 如果在購物車頁面，自動載入購物車內容
window.addEventListener("DOMContentLoaded", displayCart);
