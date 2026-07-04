const MENU_ITEMS = [
  { id: 1, name: 'Paneer Butter Masala', emoji: '🍛', desc: 'Creamy tomato gravy with soft paneer', price: 249, popular: true },
  { id: 2, name: 'Hyderabadi Biryani', emoji: '🍚', desc: 'Aromatic basmati rice with spiced chicken', price: 299, popular: true },
  { id: 3, name: 'Farmhouse Pizza', emoji: '🍕', desc: 'Loaded with fresh veggies & cheese', price: 349, popular: true },
  { id: 4, name: 'Classic Burger', emoji: '🍔', desc: 'Juicy patty with special sauce & fries', price: 199, popular: false },
  { id: 5, name: 'South Indian Meals', emoji: '🥘', desc: 'Full meals with sambar, rasam & curd', price: 179, popular: true },
  { id: 6, name: 'Masala Dosa', emoji: '🫓', desc: 'Crispy dosa with potato filling', price: 129, popular: false },
  { id: 7, name: 'Chicken Tikka', emoji: '🍗', desc: 'Tandoor-grilled marinated chicken', price: 279, popular: false },
  { id: 8, name: 'Gulab Jamun', emoji: '🍮', desc: 'Warm milk dumplings in sugar syrup', price: 99, popular: false },
];

let cart = {};

const menuGrid = document.getElementById('menu-grid');
const cartPanel = document.getElementById('cart-panel');
const cartItems = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartTotal = document.getElementById('cart-total');

MENU_ITEMS.forEach((item) => {
  const card = document.createElement('article');
  card.className = 'glass glass-card menu-item reveal';
  card.innerHTML = `
    ${item.popular ? '<span class="popular-badge">Popular</span>' : ''}
    <div class="menu-item-image">${item.emoji}</div>
    <div class="menu-item-body">
      <h4>${item.name}</h4>
      <p>${item.desc}</p>
      <div class="menu-item-footer">
        <span class="menu-price">₹${item.price}</span>
        <button class="btn btn-primary menu-add" data-id="${item.id}">Add +</button>
      </div>
    </div>
  `;
  menuGrid.appendChild(card);
});

function updateCart() {
  const ids = Object.keys(cart);
  let total = 0;
  let count = 0;

  if (ids.length === 0) {
    cartItems.innerHTML = '<p style="color: var(--text-muted); text-align: center; padding: 2rem 0;">Your cart is empty</p>';
  } else {
    cartItems.innerHTML = '';
    ids.forEach((id) => {
      const item = MENU_ITEMS.find((m) => m.id === parseInt(id));
      const qty = cart[id];
      total += item.price * qty;
      count += qty;
      const el = document.createElement('div');
      el.className = 'cart-item';
      el.innerHTML = `
        <span>${item.emoji} ${item.name}</span>
        <div class="cart-item-controls">
          <button data-action="minus" data-id="${id}">−</button>
          <span>${qty}</span>
          <button data-action="plus" data-id="${id}">+</button>
        </div>
      `;
      cartItems.appendChild(el);
    });
  }

  cartCount.textContent = count;
  cartTotal.textContent = `₹${total}`;
}

document.getElementById('menu-grid').addEventListener('click', (e) => {
  const btn = e.target.closest('.menu-add');
  if (!btn) return;
  const id = btn.dataset.id;
  cart[id] = (cart[id] || 0) + 1;
  updateCart();
  showToast(`Added ${MENU_ITEMS.find((m) => m.id === parseInt(id)).name} to cart!`);
  cartPanel.classList.add('open');
});

cartItems.addEventListener('click', (e) => {
  const btn = e.target.closest('button');
  if (!btn) return;
  const id = btn.dataset.id;
  if (btn.dataset.action === 'plus') {
    cart[id]++;
  } else if (btn.dataset.action === 'minus') {
    cart[id]--;
    if (cart[id] <= 0) delete cart[id];
  }
  updateCart();
});

document.getElementById('cart-toggle').addEventListener('click', () => cartPanel.classList.add('open'));
document.getElementById('cart-close').addEventListener('click', () => cartPanel.classList.remove('open'));

function getOrderSummary() {
  const ids = Object.keys(cart);
  if (ids.length === 0) return null;
  let total = 0;
  const lines = ids.map((id) => {
    const item = MENU_ITEMS.find((m) => m.id === parseInt(id));
    const qty = cart[id];
    total += item.price * qty;
    return `${item.name} x${qty} — ₹${item.price * qty}`;
  });
  return { lines, total };
}

document.getElementById('place-order').addEventListener('click', () => {
  const order = getOrderSummary();
  if (!order) {
    showToast('Your cart is empty. Add items first!');
    return;
  }
  showToast(`✅ Order placed! Total: ₹${order.total}. Delivery in 30-45 min. Order ID: FH-${Math.floor(1000 + Math.random() * 9000)}`);
  cart = {};
  updateCart();
  cartPanel.classList.remove('open');
});

function orderWhatsApp() {
  const order = getOrderSummary();
  if (!order) {
    openWhatsApp('Hello FoodHub Restaurant, I want to place a food order.');
    return;
  }
  const msg = `Hello FoodHub Restaurant, I want to order:\n\n${order.lines.join('\n')}\n\nTotal: ₹${order.total}`;
  openWhatsApp(msg);
}

document.getElementById('wa-order').addEventListener('click', orderWhatsApp);
document.getElementById('wa-order-cart').addEventListener('click', orderWhatsApp);
document.getElementById('hero-wa').addEventListener('click', (e) => { e.preventDefault(); orderWhatsApp(); });
document.getElementById('float-wa').addEventListener('click', (e) => { e.preventDefault(); orderWhatsApp(); });

const resDate = document.getElementById('res-date');
const today = new Date().toISOString().split('T')[0];
resDate.min = today;
resDate.value = today;

document.getElementById('reservation-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('res-name').value;
  const date = document.getElementById('res-date').value;
  const time = document.getElementById('res-time').value;
  const guests = document.getElementById('res-guests').value;
  showToast(`✅ Table reserved for ${name} on ${date} at ${time} (${guests} guests). Ref: TB-${Math.floor(1000 + Math.random() * 9000)}`);
  e.target.reset();
  resDate.value = today;
});

document.querySelectorAll('.gallery-item').forEach((item) => {
  item.addEventListener('click', () => showToast('🍽️ Delicious food prepared fresh daily at FoodHub!'));
});

updateCart();
