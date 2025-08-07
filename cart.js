// 加入購物車
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
  renderCartItems();
  alert("已加入購物車！");
}

// 渲染購物車
function renderCartItems() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartList = document.getElementById("cart-items");
  const emptyText = document.getElementById("empty-cart-text");

  cartList.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    emptyText.style.display = "block";
    return;
  }

  emptyText.style.display = "none";

  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div style="display: flex; gap: 10px; margin-bottom: 10px;">
        <img src="${item.image}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 6px;">
        <div style="flex: 1;">
          <strong>${item.name}</strong><br>
          <span>$${item.price} × ${item.quantity} = $${item.price * item.quantity}</span>
          <div style="margin-top: 5px;">
            <button onclick="changeQuantity(${index}, -1)">➖</button>
            <button onclick="changeQuantity(${index}, 1)">➕</button>
            <button onclick="removeFromCart(${index})">🗑️</button>
          </div>
        </div>
      </div>
    `;
    cartList.appendChild(li);
    total += item.price * item.quantity;
  });

  const totalDiv = document.createElement("div");
  totalDiv.innerHTML = `<p><strong>🧾 總金額：$${total}</strong></p>`;
  cartList.appendChild(totalDiv);
}

// 移除商品
function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  renderCartItems();
}

// 增減數量
function changeQuantity(index, delta) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart[index].quantity += delta;
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  renderCartItems();
}

// 更新右上角數字
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartCount = document.getElementById("cart-count");
  if (cartCount) cartCount.textContent = count;
}

// 初始載入
window.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  renderCartItems();
});
