// 加入購物車（含圖片）
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
  updateCartCount();
  alert("已加入購物車！");
}

// 更新右上角數量
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartCount = document.getElementById("cart-count");
  if (cartCount) cartCount.textContent = count;
}

// 渲染購物車內容（側邊欄用）
function renderCartItems() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartList = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const emptyText = document.getElementById("empty-cart-text");

  cartList.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    emptyText.style.display = "block";
    if (cartTotal) cartTotal.textContent = "🧾 總金額：$0";
    return;
  }

  emptyText.style.display = "none";

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const li = document.createElement("li");
    li.classList.add("cart-item");
    li.innerHTML = `
      <div style="display: flex; align-items: center; margin-bottom: 10px;">
        <img src="${item.image}" alt="${item.name}" style="width: 80px; height: 80px; object-fit: cover; margin-right: 10px;">
        <div>
          <p><strong>${item.name}</strong></p>
          <p>
            <button onclick="decreaseQuantity(${index})">－</button>
            <span style="margin: 0 8px;">${item.quantity}</span>
            <button onclick="increaseQuantity(${index})">＋</button>
          </p>
          <p>$${item.price} x ${item.quantity} = $${itemTotal}</p>
          <button style="background-color: crimson; color: white; border: none; padding: 4px 10px; border-radius: 4px; cursor: pointer;" onclick="removeFromCart(${index})">移除</button>
        </div>
      </div>
    `;
    cartList.appendChild(li);
  });

  if (cartTotal) cartTotal.textContent = `🧾 總金額：$${total}`;
}

// 增加數量
function increaseQuantity(index) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart[index].quantity += 1;
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCartItems();
  updateCartCount();
}

// 減少數量（最少為 1）
function decreaseQuantity(index) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart[index].quantity > 1) {
    cart[index].quantity -= 1;
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCartItems();
    updateCartCount();
  }
}

// 移除商品
function removeFromCart(index) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCartItems();
  updateCartCount();
}

// 結帳
function checkout() {
  alert("感謝您的購買！");
  localStorage.removeItem("cart");
  renderCartItems();
  updateCartCount();
}

// 初始執行
window.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  renderCartItems();
});
