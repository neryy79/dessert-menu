// Número internacional sin + ni espacios. Se conserva la configuración existente.
const whatsappNumber = '';

const products = [
  {
    id: 'brownie',
    name: 'Brownie clásico',
    tags: ['chocolate'],
    categories: ['individuales', 'horneados'],
    terms: 'brownie cacao nuez',
    badge: 'Más pedido',
    image: 'photo-1606313564200-e75d5e30476c',
    alt: 'Porción de brownie de chocolate con textura húmeda',
    description: 'Corteza delicada y corazón denso de chocolate que se deshace al primer mordisco.',
    ingredients: 'chocolate, cacao, manteca, huevo y harina',
    sizes: [['Porción individual', 15000], ['Caja de 8', 95000]]
  },
  {
    name: 'Torta de chocolate',
    tags: ['chocolate'],
    categories: ['tartas', 'eventos'],
    terms: 'torta pastel tarta cacao ganache',
    badge: 'Para compartir',
    image: 'photo-1578985545062-69928b1d9587',
    alt: 'Torta de chocolate en capas con cobertura de ganache',
    description: 'Bizcochuelo húmedo en capas, ganache brillante y un final intenso.',
    ingredients: 'cacao, harina, huevos, crema y chocolate',
    sizes: [['8 porciones', 180000], ['12 porciones', 250000]]
  },
  {
    name: 'Cupcakes frutales',
    tags: ['frutas'],
    categories: ['individuales', 'eventos'],
    terms: 'cupcake magdalena frutilla fresa arandano frutos rojos',
    badge: 'Un toque frutal',
    image: 'photo-1486427944299-d1955d23e34d',
    alt: 'Cupcakes decorados con crema y frutos rojos',
    description: 'Bizcochito aireado, crema suave y un toque ácido de frutos rojos.',
    ingredients: 'harina, huevo, manteca, crema, frutilla y arándanos',
    sizes: [['1 unidad', 12000], ['Caja de 6', 68000]]
  },
  {
    id: 'rollo',
    name: 'Rollo de canela',
    tags: [],
    categories: ['individuales', 'horneados'],
    terms: 'rollo cinnamon canela glaseado',
    badge: 'Horneado del día',
    image: 'photo-1509440159596-0249088772ff',
    alt: 'Rollos dorados recién salidos del horno',
    description: 'Masa tierna y tibia con canela aromática y delicado glaseado.',
    ingredients: 'harina, canela, azúcar, leche, manteca y glaseado',
    sizes: [['1 unidad', 14000], ['Caja de 6', 78000]]
  },
  {
    name: 'Tarta de frutas',
    tags: ['frutas'],
    categories: ['tartas', 'eventos'],
    terms: 'tarta torta pastel fruta frutilla fresa durazno',
    badge: 'Fruta de temporada',
    image: 'photo-1464349095431-e9a21285b5f3',
    alt: 'Tarta artesanal cubierta de frutas frescas',
    description: 'Base crocante, crema delicada y fruta fresca de estación en cada porción.',
    ingredients: 'masa sablé, crema pastelera, frutilla y durazno',
    sizes: [['8 porciones', 165000], ['12 porciones', 230000]]
  },
  {
    name: 'Napolitana choco',
    tags: ['chocolate'],
    categories: ['individuales', 'horneados'],
    terms: 'napolitana napolitano chocolate hojaldre',
    badge: 'Capas crujientes',
    image: 'photo-1555507036-ab1f4038808a',
    alt: 'Napolitana de hojaldre con chocolate',
    description: 'Hojaldre dorado y crujiente con un centro suave de chocolate.',
    ingredients: 'harina, manteca, chocolate, leche y azúcar',
    sizes: [['1 unidad', 11000], ['Caja de 6', 60000]]
  },
  {
    name: 'Cupcake vegano de frutos rojos',
    tags: ['frutas', 'vegano'],
    categories: ['individuales', 'eventos'],
    terms: 'cupcake vegano vegetal magdalena frutilla frambuesa',
    badge: 'Opción vegana',
    image: 'photo-1486427944299-d1955d23e34d',
    alt: 'Cupcake decorado con frutos rojos',
    description: 'Bizcochito cítrico y esponjoso con crema vegetal y fruta fresca.',
    ingredients: 'harina, bebida vegetal, aceite, crema vegetal y frutos rojos',
    sizes: [['1 unidad', 13000], ['Caja de 6', 74000]]
  }
];

const cart = [];
const grid = document.querySelector('#grid');
const searchInput = document.querySelector('#search');
const resultsLabel = document.querySelector('#results');
const cartDialog = document.querySelector('#cart-dialog');
const cartList = document.querySelector('#cart-list');
const cartCount = document.querySelector('#cart-count');
const cartTotal = document.querySelector('#cart-total');
const cartDescription = document.querySelector('#cart-description');
const checkoutButton = document.querySelector('#checkout');
const clearCartButton = document.querySelector('#clear-cart');
let activeFilter = 'all';
let activeCategory = 'all';

function formatPrice(amount) {
  return `Gs. ${amount.toLocaleString('es-PY')}`;
}

function imageUrl(id, width = 700, height = 500) {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&h=${height}&q=82&fm=webp`;
}

function renderProducts() {
  const whatsappIcon = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M20 11.5a7.5 7.5 0 0 1-11.1 6.6L4 19l.9-4.6A7.5 7.5 0 1 1 20 11.5Z" stroke="currentColor" stroke-width="1.6"/><path d="M9 9c.7 2.1 2 3.3 4.1 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>';

  products.forEach((product) => {
    const card = document.createElement('article');
    card.className = 'card';
    if (product.id) card.id = `producto-${product.id}`;
    card.dataset.name = product.name;
    card.dataset.tags = product.tags.join(' ');
    card.dataset.categories = product.categories.join(' ');
    card.dataset.terms = product.terms;
    card.dataset.similar = product.name;
    card.innerHTML = `
      <div class="card-image">
        <img src="${imageUrl(product.image)}" alt="${product.alt}" loading="lazy">
        <span class="badge">${product.badge}</span>
      </div>
      <div class="card-body">
        <div class="product-top">
          <h3>${product.name}</h3>
          <span class="price">${formatPrice(product.sizes[0][1])}</span>
        </div>
        <p class="desc">${product.description}</p>
        <p class="ingredients"><strong>Ingredientes:</strong> ${product.ingredients}.</p>
        <div class="controls">
          <label>
            <span class="sr-only">Presentación de ${product.name}</span>
            <select aria-label="Presentación de ${product.name}">
              ${product.sizes.map(([label, price]) => `<option data-price="${price}">${label} · ${formatPrice(price)}</option>`).join('')}
            </select>
          </label>
          <div class="qty">
            <button type="button" data-step="-1" aria-label="Restar ${product.name}">−</button>
            <input type="number" min="1" max="99" value="1" aria-label="Cantidad de ${product.name}">
            <button type="button" data-step="1" aria-label="Sumar ${product.name}">+</button>
          </div>
        </div>
        <button class="order" type="button">${whatsappIcon}Agregar al carrito</button>
      </div>`;
    grid.append(card);
  });
}

function normalize(text) {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
}

function editDistance(first, second) {
  const row = Array.from({ length: second.length + 1 }, (_, index) => index);
  for (let i = 1; i <= first.length; i += 1) {
    let previous = row[0];
    row[0] = i;
    for (let j = 1; j <= second.length; j += 1) {
      const oldValue = row[j];
      row[j] = Math.min(row[j] + 1, row[j - 1] + 1, previous + (first[i - 1] === second[j - 1] ? 0 : 1));
      previous = oldValue;
    }
  }
  return row[second.length];
}

function matchingSuggestions(query) {
  return [...document.querySelectorAll('.card')]
    .map((card) => {
      const words = card.dataset.terms.split(' ').map(normalize);
      const score = Math.min(editDistance(query, normalize(card.dataset.name)), ...words.map((word) => editDistance(query, word)));
      return { card, score };
    })
    .filter(({ score }) => query.length > 1 && score <= Math.max(2, Math.ceil(query.length * 0.38)))
    .sort((first, second) => first.score - second.score)
    .slice(0, 3)
    .map(({ card }) => card);
}

function updateCatalog() {
  const query = normalize(searchInput.value);
  const cards = [...document.querySelectorAll('.card')];
  let visibleCount = 0;

  cards.forEach((card) => {
    const searchableText = normalize(`${card.dataset.name} ${card.dataset.terms}`);
    const matchesQuery = !query || searchableText.includes(query);
    const matchesFilter = activeFilter === 'all' || card.dataset.tags.split(' ').includes(activeFilter);
    const matchesCategory = activeCategory === 'all' || card.dataset.categories.split(' ').includes(activeCategory);
    card.hidden = !(matchesQuery && matchesFilter && matchesCategory);
    if (!card.hidden) visibleCount += 1;
  });

  grid.querySelector('.empty')?.remove();
  if (visibleCount) {
    resultsLabel.textContent = `${visibleCount} ${visibleCount === 1 ? 'postre' : 'postres'} para descubrir`;
    return;
  }

  resultsLabel.textContent = 'No encontramos coincidencias';
  const emptyState = document.createElement('div');
  emptyState.className = 'empty';
  emptyState.innerHTML = '<strong>No encontramos ese postre</strong>Prueba otro nombre o explora opciones similares.';
  const suggestions = matchingSuggestions(query);
  if (suggestions.length) {
    const suggestionList = document.createElement('div');
    suggestionList.className = 'similar';
    suggestions.forEach((card) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = card.dataset.similar;
      button.addEventListener('click', () => {
        searchInput.value = card.dataset.similar.split(' ')[0];
        activeFilter = 'all';
        activeCategory = 'all';
        document.querySelectorAll('.filter').forEach((filter) => filter.setAttribute('aria-pressed', String(filter.dataset.filter === 'all')));
        document.querySelectorAll('.category').forEach((category) => category.setAttribute('aria-pressed', String(category.dataset.category === 'all')));
        updateCatalog();
      });
      suggestionList.append(button);
    });
    emptyState.append(suggestionList);
  }
  grid.append(emptyState);
}

function showToast(message) {
  const toast = document.querySelector('#toast');
  toast.textContent = message;
  toast.classList.add('show');
  window.setTimeout(() => toast.classList.remove('show'), 2400);
}

function addToCart(card) {
  const productName = card.dataset.name;
  const selection = card.querySelector('select').selectedOptions[0];
  const quantity = Math.max(1, Math.min(99, Number(card.querySelector('input[type="number"]').value) || 1));
  const key = `${productName}|${selection.textContent}`;
  const existingItem = cart.find((item) => item.key === key);

  if (existingItem) existingItem.quantity = Math.min(99, existingItem.quantity + quantity);
  else cart.push({ key, name: productName, variant: selection.textContent.trim(), price: Number(selection.dataset.price), quantity });

  renderCart();
  showToast(`${quantity} ${quantity === 1 ? 'unidad agregada' : 'unidades agregadas'} al carrito`);
}

function renderCart() {
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  cartCount.textContent = itemCount;
  document.querySelector('#open-cart').setAttribute('aria-label', `Abrir carrito de compras, ${itemCount} ${itemCount === 1 ? 'producto' : 'productos'}`);
  cartTotal.textContent = formatPrice(total);
  cartDescription.textContent = itemCount ? `${itemCount} ${itemCount === 1 ? 'unidad' : 'unidades'} en tu pedido.` : 'Tu carrito está vacío por ahora.';
  checkoutButton.disabled = cart.length === 0;
  clearCartButton.disabled = cart.length === 0;

  if (!cart.length) {
    cartList.innerHTML = '<div class="cart-empty"><strong>Tu carrito está vacío</strong>Agrega postres del catálogo para armar tu pedido.</div>';
    return;
  }

  cartList.innerHTML = cart.map((item, index) => `
    <article class="cart-row">
      <div>
        <div class="cart-product-name">${item.name}</div>
        <div class="cart-variant">${item.variant} · ${formatPrice(item.price)} c/u</div>
        <div class="cart-row-controls">
          <button type="button" data-cart-action="decrease" data-index="${index}" aria-label="Restar ${item.name}">−</button>
          <span aria-label="Cantidad">${item.quantity}</span>
          <button type="button" data-cart-action="increase" data-index="${index}" aria-label="Sumar ${item.name}">+</button>
          <button class="remove-item" type="button" data-cart-action="remove" data-index="${index}" aria-label="Quitar ${item.name}">Quitar</button>
        </div>
      </div>
      <div class="cart-line-total">${formatPrice(item.price * item.quantity)}</div>
    </article>`).join('');
}

function updateCartItem(index, action) {
  const item = cart[index];
  if (!item) return;
  if (action === 'increase') item.quantity = Math.min(99, item.quantity + 1);
  if (action === 'decrease') item.quantity = Math.max(1, item.quantity - 1);
  if (action === 'remove') cart.splice(index, 1);
  renderCart();
}

function checkout() {
  if (!cart.length) return;
  const orderLines = cart.map((item) => `• ${item.quantity} × ${item.name} (${item.variant}) — ${formatPrice(item.price * item.quantity)}`);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const message = `Hola, quiero hacer este pedido:\n${orderLines.join('\n')}\n\nTotal: ${formatPrice(total)}`;
  window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
}

renderProducts();
renderCart();
updateCatalog();

searchInput.addEventListener('input', updateCatalog);
document.querySelectorAll('.filter').forEach((button) => button.addEventListener('click', () => {
  activeFilter = button.dataset.filter;
  document.querySelectorAll('.filter').forEach((filter) => filter.setAttribute('aria-pressed', String(filter === button)));
  updateCatalog();
}));
document.querySelectorAll('.category').forEach((button) => button.addEventListener('click', () => {
  activeCategory = button.dataset.category;
  document.querySelectorAll('.category').forEach((category) => category.setAttribute('aria-pressed', String(category === button)));
  updateCatalog();
}));
document.querySelectorAll('.card').forEach((card) => {
  const selection = card.querySelector('select');
  const priceLabel = card.querySelector('.price');
  selection.addEventListener('change', () => { priceLabel.textContent = formatPrice(Number(selection.selectedOptions[0].dataset.price)); });
  card.querySelectorAll('[data-step]').forEach((button) => button.addEventListener('click', () => {
    const quantity = card.querySelector('input[type="number"]');
    quantity.value = Math.max(1, Math.min(99, Number(quantity.value || 1) + Number(button.dataset.step)));
  }));
  card.querySelector('.order').addEventListener('click', () => addToCart(card));
});

cartList.addEventListener('click', (event) => {
  const button = event.target.closest('[data-cart-action]');
  if (button) updateCartItem(Number(button.dataset.index), button.dataset.cartAction);
});
document.querySelector('#open-cart').addEventListener('click', () => cartDialog.showModal());
document.querySelector('#close-cart').addEventListener('click', () => cartDialog.close());
document.querySelector('#clear-cart').addEventListener('click', () => { cart.splice(0); renderCart(); });
checkoutButton.addEventListener('click', checkout);
cartDialog.addEventListener('click', (event) => { if (event.target === cartDialog) cartDialog.close(); });
document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && cartDialog.open) cartDialog.close(); });

document.querySelectorAll('.wa-link').forEach((link) => link.addEventListener('click', (event) => {
  if (whatsappNumber) return;
  event.preventDefault();
  const message = new URL(link.href).searchParams.get('text') || 'Hola, quiero consultar por los postres.';
  window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
}));

const menuToggle = document.querySelector('.toggle');
const navigation = document.querySelector('.links');
menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') !== 'true';
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación');
  navigation.classList.toggle('open', isOpen);
});
navigation.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  navigation.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Abrir menú de navegación');
}));
document.querySelector('#year').textContent = new Date().getFullYear();
