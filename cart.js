<script>
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
</script>
