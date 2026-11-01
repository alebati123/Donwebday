// ============================================================================
// LA CANTINA DE DON BRASA — PLATAFORMA INTEGRAL DE BODEGÓN CON IA
// Carta Interactiva • Conserje IA • Audio/Texto WhatsApp • Mapa de Mesas • POS
// ============================================================================

const BUSINESS_INFO = {
  name: 'La Cantina de Don Brasa — Bodegón & Pizzería',
  address: 'Av. Pellegrini 1540, Rosario',
  deliveryFee: 1800,
  freeDeliveryMin: 35000,
  takeawayDiscount: 0.10
};

const INITIAL_CATALOG = [
  {
    id: 'p1',
    name: 'Muzzarella al Molde de Masa Madre',
    category: 'Pizzas',
    price: 11500,
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=640&q=80',
    inStock: true,
    tags: ['popular', 'veggie'],
    description: 'Fermentación de 48 hs, salsa de tomates perita mendocinos, 450g de muzzarella, orégano de traslasierra y aceitunas verdes (8 porciones).'
  },
  {
    id: 'p2',
    name: 'Napolitana Especial al Horno de Barro',
    category: 'Pizzas',
    price: 13200,
    image: 'https://images.unsplash.com/photo-1595854341625-f33ee10dbf94?auto=format&fit=crop&w=640&q=80',
    inStock: true,
    tags: ['popular', 'veggie'],
    description: 'Rodajas de tomate redondo fresco, provenzal de ajo asado y perejil, abundante muzzarella y lluvia de reggianito rallado.'
  },
  {
    id: 'p3',
    name: 'Fugazzeta Rellena de la Cantina',
    category: 'Pizzas',
    price: 15400,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=640&q=80',
    inStock: true,
    tags: ['veggie', 'popular'],
    description: 'Doble masa rellena con 500g de muzzarella y provolone, coronada con cebolla blanca y morada pluma gratinada a leña.'
  },
  {
    id: 'p4',
    name: 'Rúcula Salvaje, Jamón Crudo & Parmesano',
    category: 'Pizzas',
    price: 15800,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=640&q=80',
    inStock: true,
    tags: [],
    description: 'Base crocante a la piedra, muzzarella fundida, rúcula recién cortada, fetas de jamón crudo estacionado 12 meses y oliva.'
  },
  {
    id: 'p5',
    name: 'Pizza Muzzarella SIN TACC (Cocina Aislada)',
    category: 'Pizzas',
    price: 13900,
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=640&q=80',
    inStock: true,
    tags: ['sintacc', 'veggie'],
    description: 'Elaborada en horno exclusivo libre de gluten con harinas certificadas, salsa casera y muzzarella seleccionada.'
  },
  {
    id: 'e1',
    name: 'Empanada de Carne Cortada a Cuchillo',
    category: 'Empanadas',
    price: 1900,
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=640&q=80',
    inStock: true,
    tags: ['popular'],
    description: 'Roast beef braseado lento, cebolla de verdeo, huevo de campo y comino suave, dorada al horno de barro.'
  },
  {
    id: 'e2',
    name: 'Empanada de Jamón Natural y Queso',
    category: 'Empanadas',
    price: 1800,
    image: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=640&q=80',
    inStock: true,
    tags: [],
    description: 'Jamón cocido horneado en cubos y corazón rebosante de muzzarella derretida.'
  },
  {
    id: 'e3',
    name: 'Empanada de Humita Norteña (Veggie)',
    category: 'Empanadas',
    price: 1850,
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=640&q=80',
    inStock: true,
    tags: ['veggie'],
    description: 'Choclo amarillo cremoso, zapallo cabutia, albahaca fresca y dados de queso cremoso.'
  },
  {
    id: 'e4',
    name: 'Empanada Caprese & Albahaca (Veggie)',
    category: 'Empanadas',
    price: 1850,
    image: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=640&q=80',
    inStock: true,
    tags: ['veggie'],
    description: 'Tomates asados al quebracho, muzzarella hilada, hojas de albahaca y toque de pimienta negra.'
  },
  {
    id: 'b1',
    name: 'Milanesa Napolitana XXL de Bodegón (2 a 3 pers.)',
    category: 'Bodegón',
    price: 22500,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=640&q=80',
    inStock: true,
    tags: ['popular'],
    description: 'Nalga tiernizada panada a mano con salsa fileto, jamón, muzzarella gratinada y bandeja de papas fritas bastón.'
  },
  {
    id: 'b2',
    name: 'Sorrentinos de Calabaza Asada & Ciboulette',
    category: 'Bodegón',
    price: 11800,
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=640&q=80',
    inStock: true,
    tags: ['veggie'],
    description: 'Pasta amasada en casa rellena de cabutia al horno y muzzarella, con salsa rosa o manteca de salvia.'
  },
  {
    id: 'b3',
    name: 'Fainá Crocante al Molde de Cobre',
    category: 'Bodegón',
    price: 2400,
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=640&q=80',
    inStock: true,
    tags: ['sintacc', 'veggie'],
    description: 'Pura harina de garbanzos, aceite de oliva virgen y pimienta recién molida.'
  },
  {
    id: 'd1',
    name: 'Gaseosa Línea Coca-Cola 1.5L',
    category: 'Bebidas y Postres',
    price: 4200,
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=640&q=80',
    inStock: true,
    tags: ['sintacc', 'veggie'],
    description: 'Botella familiar de 1.5 litros (Original o Sin Azúcar) bien helada.'
  },
  {
    id: 'd2',
    name: 'Jarra de Limonada con Menta y Jengibre (1L)',
    category: 'Bebidas y Postres',
    price: 4500,
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=640&q=80',
    inStock: true,
    tags: ['sintacc', 'veggie', 'popular'],
    description: 'Exprimida en el momento con limones de estación, almíbar suave, jengibre y menta fresca.'
  },
  {
    id: 'd3',
    name: 'Vermut Rosso de la Casa con Soda & Rodaja Naranja',
    category: 'Bebidas y Postres',
    price: 5400,
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=640&q=80',
    inStock: true,
    tags: ['veggie', 'popular'],
    description: 'Macerado botánico tradicional servido con golpe de sifón y naranja deshidratada.'
  },
  {
    id: 'd4',
    name: 'Flan Casero de 12 Yemas Mixto',
    category: 'Bebidas y Postres',
    price: 4900,
    image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=640&q=80',
    inStock: true,
    tags: ['sintacc', 'veggie'],
    description: 'Receta histórica de la abuela con dulce de leche repostero y crema chantilly batida.'
  }
];

let catalog = JSON.parse(JSON.stringify(INITIAL_CATALOG));
let currentCategory = 'all';
let cart = [];
let deliveryType = 'delivery';
let chatHistory = [];
let suggestedCombosStore = {};
let activeOrderId = 'DB-1041';
let selectedTableId = 'T4';

// Mapa de Mesas en Vivo del Bodegón
let restaurantTables = [
  { id: 'T1', number: 1, zone: 'Salón Histórico (Pellegrini)', capacity: 2, status: 'free', guest: '' },
  { id: 'T2', number: 2, zone: 'Salón Histórico (Pellegrini)', capacity: 4, status: 'occupied', guest: 'Familia Benítez (21:00)' },
  { id: 'T3', number: 3, zone: 'Salón Histórico (Pellegrini)', capacity: 4, status: 'free', guest: '' },
  { id: 'T4', number: 4, zone: 'Salón Histórico (Pellegrini)', capacity: 6, status: 'free', guest: '' },
  { id: 'T5', number: 5, zone: 'Patio de Parra & Guirnaldas', capacity: 4, status: 'free', guest: '' },
  { id: 'T6', number: 6, zone: 'Patio de Parra & Guirnaldas', capacity: 4, status: 'occupied', guest: 'Camila & Amigos (22:00)' },
  { id: 'T7', number: 7, zone: 'Patio de Parra & Guirnaldas', capacity: 6, status: 'free', guest: '' },
  { id: 'T8', number: 8, zone: 'Patio de Parra & Guirnaldas', capacity: 8, status: 'free', guest: '' },
  { id: 'T9', number: 9, zone: 'Barra de Vermut & Picadas', capacity: 2, status: 'free', guest: '' },
  { id: 'T10', number: 10, zone: 'Barra de Vermut & Picadas', capacity: 2, status: 'free', guest: '' }
];

// Comandas iniciales en cocina
let orders = [
  {
    id: 'DB-1041',
    customerName: 'Sofía Pellegrini',
    address: '9 de Julio 1420 Piso 2 A',
    deliveryType: 'delivery',
    paymentMethod: 'Transferencia',
    source: '📲 IA (WhatsApp Audio)',
    status: 'new',
    time: '20:42 hs',
    total: 29100,
    items: [
      { name: 'Muzzarella al Molde de Masa Madre', quantity: 1, notes: 'Bien dorada' },
      { name: 'Empanada de Carne Cortada a Cuchillo', quantity: 6, notes: '' },
      { name: 'Gaseosa Línea Coca-Cola 1.5L', quantity: 1, notes: '' }
    ]
  },
  {
    id: 'DB-1040',
    customerName: 'Tomás Ríos',
    address: 'Retiro en mostrador (Av. Pellegrini 1540)',
    deliveryType: 'takeaway',
    paymentMethod: 'Efectivo (-10%)',
    source: '💬 IA (Combo Presupuesto)',
    status: 'cooking',
    time: '20:31 hs',
    total: 36450,
    items: [
      { name: 'Milanesa Napolitana XXL de Bodegón', quantity: 1, notes: 'Papas bien crocantes' },
      { name: 'Napolitana Especial al Horno de Barro', quantity: 1, notes: '' },
      { name: 'Jarra de Limonada con Menta y Jengibre (1L)', quantity: 1, notes: '' }
    ]
  },
  {
    id: 'DB-1039',
    customerName: 'Valentina Moretti',
    address: 'Bv. Oroño 620 PB',
    deliveryType: 'delivery',
    paymentMethod: 'Mercado Pago',
    source: '💬 IA (Menú Sin TACC)',
    status: 'ready',
    time: '20:18 hs',
    total: 29050,
    items: [
      { name: 'Pizza Muzzarella SIN TACC (Cocina Aislada)', quantity: 1, notes: 'Utensilios sellados' },
      { name: 'Empanada de Humita Norteña (Veggie)', quantity: 4, notes: '' },
      { name: 'Flan Casero de 12 Yemas Mixto', quantity: 1, notes: '' }
    ]
  }
];

let reservations = [
  {
    id: 'RES-201',
    tableId: 'T2',
    name: 'Familia Benítez',
    people: 4,
    time: '21:00 hs',
    area: 'Salón Histórico (Pellegrini)',
    notes: '1 silla para bebé • Tomada por Don Vito IA'
  },
  {
    id: 'RES-202',
    tableId: 'T6',
    name: 'Camila & Amigos',
    people: 4,
    time: '22:00 hs',
    area: 'Patio de Parra & Guirnaldas',
    notes: 'Opciones Veggie y Sin TACC consultadas con IA'
  }
];

// ============================================================================
// INICIALIZACIÓN
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {
  renderCatalog();
  renderCart();
  renderTablesFloorplan();
  renderOrderTracker();
  renderAdminDashboard();
  initWelcomeChat();
  checkServerAiStatus();
});

// ============================================================================
// NAVEGACIÓN MULTI-PANTALLA (DESKTOP & MOBILE APP)
// ============================================================================
function navigateApp(screenName) {
  document.querySelectorAll('.app-screen').forEach((s) => s.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach((b) => b.classList.remove('active'));
  document.querySelectorAll('.mnav-btn').forEach((b) => b.classList.remove('active'));

  const screenEl = document.getElementById(`screen-${screenName}`);
  const navEl = document.getElementById(`nav-${screenName}`);
  const mnavEl = document.getElementById(`mnav-${screenName}`);

  if (screenEl) screenEl.classList.add('active');
  if (navEl) navEl.classList.add('active');
  if (mnavEl) mnavEl.classList.add('active');

  if (screenName === 'tables') renderTablesFloorplan();
  if (screenName === 'tracker') renderOrderTracker();
  if (screenName === 'admin') renderAdminDashboard();

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function switchRightTab(tabName) {
  document.querySelectorAll('.dock-panel').forEach((p) => p.classList.remove('active'));
  document.querySelectorAll('.dock-tab').forEach((t) => t.classList.remove('active'));

  const panel = document.getElementById(`rpanel-${tabName}`);
  const tab = document.getElementById(`rtab-${tabName}`);
  if (panel) panel.classList.add('active');
  if (tab) tab.classList.add('active');
}

function openMobileAssistant() {
  navigateApp('menu');
  switchRightTab('chat');
  const dock = document.getElementById('side-dock');
  if (dock) dock.scrollIntoView({ behavior: 'smooth' });
}

function openMobileCartOrFocus() {
  navigateApp('menu');
  switchRightTab('cart');
  const dock = document.getElementById('side-dock');
  if (dock) dock.scrollIntoView({ behavior: 'smooth' });
}

// ============================================================================
// CARTA FOTOGRÁFICA Y MODAL DE PERSONALIZACIÓN DE PLATO
// ============================================================================
function selectCategory(cat) {
  currentCategory = cat;
  document.querySelectorAll('.cat-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.getAttribute('onclick').includes(`'${cat}'`));
  });
  renderCatalog();
}

function renderCatalog() {
  const grid = document.getElementById('catalog-grid');
  const query = (document.getElementById('catalog-search')?.value || '').toLowerCase().trim();
  const onlySinTacc = document.getElementById('filter-sintacc')?.checked;
  const onlyVeggie = document.getElementById('filter-veggie')?.checked;

  const filtered = catalog.filter((item) => {
    const matchesCat = currentCategory === 'all' || item.category === currentCategory;
    const matchesSinTacc = !onlySinTacc || item.tags.includes('sintacc');
    const matchesVeggie = !onlyVeggie || item.tags.includes('veggie');
    const matchesSearch =
      !query ||
      item.name.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query);

    return matchesCat && matchesSinTacc && matchesVeggie && matchesSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; padding: 32px; text-align: center; background: #fff; border-radius: 12px; border: 1px dashed #c2b59e;">
        <p style="font-weight:700; margin-bottom:6px;">No encontramos platos con esos filtros combinados.</p>
        <p class="sub-copy">Preguntale a <strong>Don Vito (Conserje IA)</strong> en el mostrador derecho para que te arme una sugerencia a medida.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered
    .map((item) => {
      const floatingTags = [];
      if (!item.inStock) {
        floatingTags.push(`<span class="dish-tag soldout">AGOTADO EN COCINA</span>`);
      } else {
        if (item.tags.includes('popular')) floatingTags.push(`<span class="dish-tag popular">🔥 Clásico</span>`);
        if (item.tags.includes('sintacc')) floatingTags.push(`<span class="dish-tag sintacc">🌾 Sin TACC</span>`);
        if (item.tags.includes('veggie')) floatingTags.push(`<span class="dish-tag veggie">🌿 Veggie</span>`);
      }

      return `
        <article class="dish-card ${!item.inStock ? 'sold-out' : ''}">
          <div>
            <div class="dish-photo-wrap" onclick="openDishModal('${item.id}')">
              <img src="${item.image}" alt="${item.name}" loading="lazy" />
              <div class="dish-floating-tags">${floatingTags.join('')}</div>
            </div>
            <div class="dish-body" onclick="openDishModal('${item.id}')">
              <span class="dish-cat-label">${item.category}</span>
              <h3 class="dish-title">${item.name}</h3>
              <p class="dish-desc">${item.description}</p>
            </div>
          </div>
          <div class="dish-footer">
            <span class="dish-price">$${item.price.toLocaleString('es-AR')}</span>
            <div class="dish-actions">
              <button class="btn-customize" onclick="openDishModal('${item.id}')" title="Personalizar punto de cocción o notas">
                Opciones
              </button>
              <button
                class="btn-add-dish"
                ${!item.inStock ? 'disabled' : ''}
                onclick="addToCart('${item.id}', 1, '')"
              >
                ${item.inStock ? '+ Sumar' : 'Agotado'}
              </button>
            </div>
          </div>
        </article>
      `;
    })
    .join('');
}

function openDishModal(dishId) {
  const dish = catalog.find((p) => p.id === dishId);
  if (!dish) return;

  const modal = document.getElementById('dish-modal');
  const body = document.getElementById('dish-modal-body');

  body.innerHTML = `
    <img src="${dish.image}" alt="${dish.name}" style="width:100%; height:200px; object-fit:cover; border-radius:10px; margin-bottom:12px;" />
    <span class="eyebrow-tag">${dish.category}</span>
    <h3 style="font-family:var(--font-serif); font-size:1.35rem; color:var(--green-bodegon); margin-bottom:6px;">${dish.name}</h3>
    <p class="sub-copy" style="margin-bottom:14px;">${dish.description}</p>

    <div class="form-group" style="margin-bottom:10px;">
      <label>Punto de Cocción / Preparación en Horno de Barro</label>
      <select id="modal-dish-doneness">
        <option value="Punto clásico de la casa">Punto clásico de la casa</option>
        <option value="Piso bien crocante al barro">Piso bien crocante al barro</option>
        <option value="Bien dorada / gratinada">Bien dorada / gratinada</option>
        <option value="Cortada en 12 porciones chicas">Cortada en 12 porciones chicas (Picada)</option>
      </select>
    </div>

    <div class="form-group" style="margin-bottom:12px;">
      <label>Aclaraciones para el Maestro Pizzero / Cocina</label>
      <input type="text" id="modal-dish-notes" placeholder="Ej: Sin aceitunas, poco ajo, mitad sin orégano..." />
    </div>

    <div style="display:flex; justify-content:space-between; align-items:center; padding-top:10px; border-top:1px dashed var(--border-warm);">
      <strong style="font-family:var(--font-mono); font-size:1.25rem; color:var(--green-bodegon);">$${dish.price.toLocaleString('es-AR')}</strong>
      <button
        class="btn-terracotta"
        ${!dish.inStock ? 'disabled' : ''}
        onclick="confirmDishModalAdd('${dish.id}')"
      >
        ${dish.inStock ? '🛒 Agregar a mi Comanda' : 'Plato Agotado Hoy'}
      </button>
    </div>
  `;

  modal.classList.remove('hidden');
}

function closeDishModal() {
  document.getElementById('dish-modal').classList.add('hidden');
}

function confirmDishModalAdd(dishId) {
  const doneness = document.getElementById('modal-dish-doneness')?.value || '';
  const extraNotes = document.getElementById('modal-dish-notes')?.value.trim() || '';
  const combinedNotes = [doneness !== 'Punto clásico de la casa' ? doneness : '', extraNotes].filter(Boolean).join(' • ');
  addToCart(dishId, 1, combinedNotes);
  closeDishModal();
}

// ============================================================================
// COMANDA TÉRMICA (CARRITO) Y UPSELLING GASTRONÓMICO
// ============================================================================
function addToCart(productId, qty = 1, notes = '') {
  const product = catalog.find((p) => p.id === productId);
  if (!product || !product.inStock) return false;

  const existing = cart.find((c) => c.id === productId && (c.notes || '') === (notes || ''));
  if (existing) {
    existing.quantity += qty;
  } else {
    cart.push({ id: product.id, quantity: qty, notes: notes || '' });
  }
  renderCart();
  return true;
}

function changeCartQty(index, delta) {
  if (!cart[index]) return;
  cart[index].quantity += delta;
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }
  renderCart();
}

function setDeliveryType(type) {
  deliveryType = type;
  document.getElementById('deliv-btn-delivery').classList.toggle('active', type === 'delivery');
  document.getElementById('deliv-btn-takeaway').classList.toggle('active', type === 'takeaway');
  document.getElementById('address-field-row').style.display = type === 'delivery' ? 'block' : 'none';
  renderCart();
}

function calculateCartTotals() {
  let subtotal = 0;
  let totalItems = 0;
  cart.forEach((entry) => {
    const prod = catalog.find((p) => p.id === entry.id);
    if (prod) {
      subtotal += prod.price * entry.quantity;
      totalItems += entry.quantity;
    }
  });

  let discount = 0;
  let shipping = 0;

  if (subtotal > 0) {
    if (deliveryType === 'takeaway') {
      discount = Math.round(subtotal * BUSINESS_INFO.takeawayDiscount);
    } else {
      shipping = subtotal >= BUSINESS_INFO.freeDeliveryMin ? 0 : BUSINESS_INFO.deliveryFee;
    }
  }

  const finalTotal = Math.max(0, subtotal - discount + shipping);
  return { subtotal, discount, shipping, finalTotal, totalItems };
}

function renderCart() {
  const listEl = document.getElementById('cart-items-list');
  const badgeEl = document.getElementById('cart-count-badge');
  const dockCountEl = document.getElementById('dock-cart-count');
  const headerTotalEl = document.getElementById('header-cart-total');
  const breakdownEl = document.getElementById('totals-breakdown');
  const upsellBox = document.getElementById('ai-upsell-box');

  const { subtotal, discount, shipping, finalTotal, totalItems } = calculateCartTotals();
  badgeEl.textContent = totalItems;
  if (dockCountEl) dockCountEl.textContent = totalItems;
  if (headerTotalEl) headerTotalEl.textContent = `$${finalTotal.toLocaleString('es-AR')}`;

  if (cart.length === 0) {
    listEl.innerHTML = `
      <div style="text-align:center; padding: 20px 10px; color: var(--ink-muted); font-size:0.82rem;">
        Todavía no sumaste platos a la comanda.<br/>
        Elegí de la carta o pedile a <strong>Don Vito IA</strong> que te arme el pedido.
      </div>
    `;
    upsellBox.classList.add('hidden');
  } else {
    listEl.innerHTML = cart
      .map((entry, idx) => {
        const prod = catalog.find((p) => p.id === entry.id);
        if (!prod) return '';
        return `
          <div class="cart-item-row">
            <div class="cart-item-info">
              <strong>${entry.quantity}x ${prod.name}</strong>
              <small>$${(prod.price * entry.quantity).toLocaleString('es-AR')} ${entry.notes ? `• (${entry.notes})` : ''}</small>
            </div>
            <div class="cart-qty-controls">
              <button class="qty-btn" onclick="changeCartQty(${idx}, -1)">−</button>
              <button class="qty-btn" onclick="changeCartQty(${idx}, 1)">+</button>
            </div>
          </div>
        `;
      })
      .join('');

    const hasPizza = cart.some((c) => c.id.startsWith('p'));
    const hasFaina = cart.some((c) => c.id === 'b3');
    const hasDrink = cart.some((c) => c.id.startsWith('d'));

    if (hasPizza && !hasFaina && catalog.find((p) => p.id === 'b3')?.inStock) {
      upsellBox.classList.remove('hidden');
      upsellBox.innerHTML = `
        <div>✨ <strong>Sugerencia del Horno:</strong> ¿Marchamos una porción de <em>Fainá al Molde de Cobre</em> por $2.400?</div>
        <button class="btn-add-dish" onclick="addToCart('b3', 1, 'A caballo')">+ Sumar</button>
      `;
    } else if (!hasDrink && catalog.find((p) => p.id === 'd3')?.inStock) {
      upsellBox.classList.remove('hidden');
      upsellBox.innerHTML = `
        <div>✨ <strong>Maridaje Cantina:</strong> ¿Agregamos un <em>Vermut Rosso de la Casa</em> bien frío por $5.400?</div>
        <button class="btn-add-dish" onclick="addToCart('d3', 1, '')">+ Sumar</button>
      `;
    } else {
      upsellBox.classList.add('hidden');
    }
  }

  breakdownEl.innerHTML = `
    <div class="total-line">
      <span>SUBTOTAL (${totalItems} ítems)</span>
      <span>$${subtotal.toLocaleString('es-AR')}</span>
    </div>
    ${
      deliveryType === 'takeaway'
        ? `<div class="total-line" style="color: var(--green-ok);">
            <span>BONIF. RETIRO MOSTRADOR (10%)</span>
            <span>-$${discount.toLocaleString('es-AR')}</span>
          </div>`
        : `<div class="total-line">
            <span>ENVÍO CADETERÍA ${subtotal >= BUSINESS_INFO.freeDeliveryMin ? '(BONIFICADO)' : ''}</span>
            <span>${shipping === 0 && subtotal > 0 ? '$0' : '$' + shipping.toLocaleString('es-AR')}</span>
          </div>`
    }
    <div class="total-line final">
      <span>TOTAL COMANDA</span>
      <span>$${finalTotal.toLocaleString('es-AR')}</span>
    </div>
  `;
}

// ============================================================================
// PLANO INTERACTIVO DE MESAS Y RESERVAS DEL SALÓN
// ============================================================================
function renderTablesFloorplan() {
  const container = document.getElementById('floor-zones-grid');
  const freeBadge = document.getElementById('tables-free-badge');
  const pubResList = document.getElementById('public-reservations-list');

  const freeCount = restaurantTables.filter((t) => t.status === 'free').length;
  if (freeBadge) freeBadge.textContent = `${freeCount} libres`;

  const zones = [...new Set(restaurantTables.map((t) => t.zone))];
  container.innerHTML = zones
    .map((zoneName) => {
      const zoneTables = restaurantTables.filter((t) => t.zone === zoneName);
      return `
        <div class="zone-box">
          <div class="zone-title">
            <span>📍 ${zoneName}</span>
            <small style="font-family:var(--font-mono); font-size:0.75rem;">${
              zoneTables.filter((t) => t.status === 'free').length
            } disponibles</small>
          </div>
          <div class="tables-grid-zone">
            ${zoneTables
              .map((t) => {
                const isSelected = t.id === selectedTableId && t.status === 'free';
                const cls = isSelected ? 'selected' : t.status;
                return `
                  <div class="table-node ${cls}" onclick="selectFloorTable('${t.id}')">
                    <strong>MESA #${t.number}</strong>
                    <small>${t.capacity} cubiertos</small>
                    <div style="font-size:0.68rem; margin-top:3px; font-weight:700;">
                      ${t.status === 'occupied' ? `🔒 ${t.guest}` : isSelected ? '✓ Seleccionada' : '🟢 Libre'}
                    </div>
                  </div>
                `;
              })
              .join('')}
          </div>
        </div>
      `;
    })
    .join('');

  if (pubResList) {
    pubResList.innerHTML = reservations
      .slice(0, 4)
      .map(
        (r) => `
        <div class="stock-row">
          <div>
            <strong>🪑 ${r.time} — ${r.name} (${r.people} pers.)</strong>
            <div style="font-size:0.74rem; color:var(--ink-muted);">${r.area} • ${r.notes}</div>
          </div>
          <span class="order-source-badge">Confirmada</span>
        </div>
      `
      )
      .join('');
  }
}

function selectFloorTable(tableId) {
  const t = restaurantTables.find((x) => x.id === tableId);
  if (!t || t.status === 'occupied') return;
  selectedTableId = t.id;
  const input = document.getElementById('res-table-selected');
  if (input) {
    input.value = `Mesa #${t.number} — ${t.zone} (Hasta ${t.capacity} pers.)`;
  }
  const peopleSelect = document.getElementById('res-people');
  if (peopleSelect) peopleSelect.value = String(Math.min(t.capacity, 8));
  renderTablesFloorplan();
}

function handleManualReservationSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('res-name').value.trim();
  const people = Number(document.getElementById('res-people').value) || 4;
  const time = document.getElementById('res-time').value;
  const notes = document.getElementById('res-notes').value.trim() || 'Reserva desde Plano Interactivo Web';

  const tableObj = restaurantTables.find((t) => t.id === selectedTableId && t.status === 'free') ||
                   restaurantTables.find((t) => t.status === 'free');

  registerNewReservation({
    name,
    people,
    time,
    area: tableObj ? `${tableObj.zone} (Mesa #${tableObj.number})` : 'Salón Principal',
    notes,
    tableId: tableObj ? tableObj.id : null
  });

  document.getElementById('res-name').value = '';
  document.getElementById('res-notes').value = '';
  alert(`¡Mesa confirmada para ${name} hoy a las ${time}! Ya quedó bloqueada en el plano del local.`);
}

function registerNewReservation(resObj) {
  let targetTable = null;
  if (resObj.tableId) {
    targetTable = restaurantTables.find((t) => t.id === resObj.tableId && t.status === 'free');
  }
  if (!targetTable) {
    targetTable = restaurantTables.find((t) => t.status === 'free' && t.capacity >= (Number(resObj.people) || 2)) ||
                  restaurantTables.find((t) => t.status === 'free');
  }

  if (targetTable) {
    targetTable.status = 'occupied';
    targetTable.guest = `${resObj.name || 'Reserva IA'} (${resObj.time || '21:30'})`;
    const nextFree = restaurantTables.find((t) => t.status === 'free');
    if (nextFree) selectedTableId = nextFree.id;
  }

  const newRes = {
    id: `RES-${203 + reservations.length}`,
    tableId: targetTable ? targetTable.id : 'T1',
    name: resObj.name || 'Cliente Web IA',
    people: Number(resObj.people) || 4,
    time: resObj.time || '21:30 hs',
    area: targetTable ? `${targetTable.zone} (Mesa #${targetTable.number})` : resObj.area || 'Patio de Parra',
    notes: resObj.notes || 'Asignada automáticamente por Don Vito IA'
  };

  reservations.unshift(newRes);
  renderTablesFloorplan();
  renderAdminDashboard();
}

// ============================================================================
// CONSERJE IA ("DON VITO") + CONEXIÓN OPENAI
// ============================================================================
function initWelcomeChat() {
  chatHistory = [];
  const box = document.getElementById('chat-messages');
  box.innerHTML = '';
  appendAssistantMessage({
    reply:
      '¡Buenas noches! Soy **Don Vito**, el conserje digital de **La Cantina de Don Brasa**.\n\n' +
      'Estoy conectado en vivo con el horno de barro y el plano del salón:\n' +
      '• 🍕 Decime **cuántos son y qué presupuesto tienen** para armarte la mesa ideal.\n' +
      '• 🛵 Dictame tu pedido con dirección y te lo cargo directo en la comanda.\n' +
      '• 🪑 Pedime **mesa en el Patio o Salón** y te la reservo en el plano al instante.'
  });
}

function formatMarkdownText(text) {
  return String(text || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br/>');
}

function appendUserMessage(text) {
  const box = document.getElementById('chat-messages');
  const div = document.createElement('div');
  div.className = 'msg-bubble user';
  div.innerHTML = formatMarkdownText(text);
  box.appendChild(div);
  box.scrollTop = box.scrollHeight;
}

function appendAssistantMessage(aiData, providerLabel = 'Don Vito • Conserje IA') {
  const box = document.getElementById('chat-messages');
  const div = document.createElement('div');
  div.className = 'msg-bubble assistant';

  let innerHtml = `
    <div class="msg-header">${providerLabel}</div>
    <div>${formatMarkdownText(aiData.reply)}</div>
  `;

  if (Array.isArray(aiData.autoCartAdd) && aiData.autoCartAdd.length > 0) {
    const addedNames = [];
    aiData.autoCartAdd.forEach((item) => {
      const prod = catalog.find((p) => p.id === item.id);
      if (prod && prod.inStock) {
        addToCart(prod.id, Number(item.quantity) || 1, '');
        addedNames.push(`${item.quantity || 1}x ${prod.name}`);
      }
    });
    if (addedNames.length > 0) {
      innerHtml += `
        <div class="auto-added-pill">
          ✅ Marchado a tu comanda: ${addedNames.join(', ')}
        </div>
      `;
    }
  }

  if (aiData.extractedOrder) {
    applyExtractedCustomerData(aiData.extractedOrder);
  }

  if (aiData.reservation && aiData.reservation.detected) {
    registerNewReservation(aiData.reservation);
    innerHtml += `
      <div class="auto-added-pill">
        🪑 Mesa reservada en el plano: ${aiData.reservation.people || 4} cubiertos hoy a las ${
      aiData.reservation.time || '21:30'
    } hs
      </div>
    `;
  }

  if (Array.isArray(aiData.suggestedItems) && aiData.suggestedItems.length > 0) {
    const validItems = aiData.suggestedItems
      .map((s) => {
        const prod = catalog.find((p) => p.id === s.id && p.inStock);
        return prod ? { ...prod, quantity: Number(s.quantity) || 1 } : null;
      })
      .filter(Boolean);

    if (validItems.length > 0) {
      const comboId = 'combo_' + Date.now() + '_' + Math.floor(Math.random() * 1000);
      suggestedCombosStore[comboId] = validItems.map((v) => ({ id: v.id, quantity: v.quantity }));

      const comboTotal = validItems.reduce((acc, v) => acc + v.price * v.quantity, 0);
      const rowsHtml = validItems
        .map(
          (v) => `
          <div class="ai-combo-item">
            <span><strong>${v.quantity}x</strong> ${v.name}</span>
            <strong style="font-family:var(--font-mono);">$${(v.price * v.quantity).toLocaleString('es-AR')}</strong>
          </div>
        `
        )
        .join('');

      innerHtml += `
        <div class="ai-combo-card">
          <h4>🍽️ Sugerencia del Mozo (Total: $${comboTotal.toLocaleString('es-AR')})</h4>
          ${rowsHtml}
          <button class="btn-apply-combo" onclick="applySuggestedCombo('${comboId}')">
            + Cargar toda esta selección a mi Comanda ($${comboTotal.toLocaleString('es-AR')})
          </button>
        </div>
      `;
    }
  }

  div.innerHTML = innerHtml;
  box.appendChild(div);
  box.scrollTop = box.scrollHeight;
}

function applySuggestedCombo(comboId) {
  const items = suggestedCombosStore[comboId];
  if (!items) return;
  items.forEach((it) => addToCart(it.id, it.quantity, 'Combo sugerido IA'));
  switchRightTab('cart');
}

function applyExtractedCustomerData(ext) {
  if (!ext) return;
  if (ext.customerName) document.getElementById('cust-name').value = ext.customerName;
  if (ext.address) document.getElementById('cust-address').value = ext.address;
  if (ext.paymentMethod) {
    const sel = document.getElementById('cust-payment');
    const norm = ext.paymentMethod.toLowerCase();
    if (norm.includes('efectivo')) sel.value = 'Efectivo';
    else if (norm.includes('mercado')) sel.value = 'Mercado Pago';
    else if (norm.includes('tarjeta')) sel.value = 'Tarjeta';
    else if (norm.includes('transf')) sel.value = 'Transferencia';
  }
  if (ext.deliveryType === 'takeaway' || ext.deliveryType === 'delivery') {
    setDeliveryType(ext.deliveryType);
  }
  if (ext.notes) document.getElementById('cust-notes').value = ext.notes;
}

function triggerQuickPrompt(promptText) {
  navigateApp('menu');
  switchRightTab('chat');
  const input = document.getElementById('chat-input');
  input.value = promptText;
  sendChatMessage(promptText);
  input.value = '';
}

async function handleChatSubmit(e) {
  e.preventDefault();
  const input = document.getElementById('chat-input');
  const text = input.value.trim();
  if (!text) return;
  input.value = '';
  await sendChatMessage(text);
}

async function sendChatMessage(userText, mode = 'chat') {
  if (mode === 'chat') {
    appendUserMessage(userText);
  }
  chatHistory.push({ role: 'user', content: userText });

  const box = document.getElementById('chat-messages');
  const loadingDiv = document.createElement('div');
  loadingDiv.className = 'msg-bubble assistant';
  loadingDiv.innerHTML = `<div class="msg-header">Don Vito • Conserje IA</div><div>🔥 <em>Consultando stock en cocina y armando respuesta...</em></div>`;
  if (mode === 'chat') {
    box.appendChild(loadingDiv);
    box.scrollTop = box.scrollHeight;
  }

  const clientApiKey = sessionStorage.getItem('OPENAI_API_KEY') || localStorage.getItem('OPENAI_API_KEY') || '';
  const selectedModel = sessionStorage.getItem('OPENAI_MODEL') || 'gpt-4o-mini';

  let aiResult = null;
  let usedProvider = 'Don Vito • OpenAI GPT';

  try {
    const resp = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: chatHistory,
        catalog,
        businessInfo: BUSINESS_INFO,
        mode,
        clientApiKey
      })
    });

    if (resp.ok) {
      const json = await resp.json();
      if (json.ok && json.data) {
        aiResult = json.data;
        usedProvider = `Don Vito • OpenAI (${json.model || selectedModel})`;
      }
    }
  } catch {
    // Fallback si no hay backend activo
  }

  if (!aiResult && clientApiKey && clientApiKey.startsWith('sk-')) {
    try {
      const directResp = await callOpenAiDirectlyFromBrowser(chatHistory, clientApiKey, selectedModel, mode);
      if (directResp) {
        aiResult = directResp;
        usedProvider = `Don Vito • OpenAI (${selectedModel})`;
      }
    } catch {
      // Fallback al motor local
    }
  }

  if (!aiResult) {
    aiResult = localSmartEngine(userText, mode);
    usedProvider = 'Don Vito • Conserje IA';
  }

  if (mode === 'chat' && loadingDiv.parentNode) {
    loadingDiv.remove();
  }

  chatHistory.push({ role: 'assistant', content: aiResult.reply });

  if (mode === 'chat') {
    appendAssistantMessage(aiResult, usedProvider);
  }

  return aiResult;
}

async function callOpenAiDirectlyFromBrowser(messages, apiKey, model, mode) {
  const catalogSummary = catalog
    .map(
      (i) =>
        `- ID: "${i.id}" | ${i.name} | $${i.price} | ${i.inStock ? 'DISPONIBLE' : 'AGOTADO'} | Tags: ${i.tags.join(',')}`
    )
    .join('\n');

  const sys = `Eres Don Vito, el mozo y conserje experto de La Cantina de Don Brasa (Rosario). Catálogo:\n${catalogSummary}\nResponde SIEMPRE en JSON con claves: reply (string), suggestedItems (array de {id, quantity}), autoCartAdd (array de {id, quantity}), extractedOrder ({customerName, address, paymentMethod, deliveryType, notes}), reservation ({detected, name, people, time, area, notes}). Modo: ${mode}.`;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: model || 'gpt-4o-mini',
      temperature: 0.3,
      response_format: { type: 'json_object' },
      messages: [{ role: 'system', content: sys }, ...messages.slice(-8)]
    })
  });
  if (!response.ok) return null;
  const data = await response.json();
  return JSON.parse(data.choices[0].message.content);
}

// ============================================================================
// MOTOR NLU LOCAL RESILIENTE
// ============================================================================
function localSmartEngine(rawText) {
  const text = rawText.toLowerCase();
  const result = {
    reply: '',
    suggestedItems: [],
    autoCartAdd: [],
    extractedOrder: {},
    reservation: { detected: false }
  };

  // Extraer dirección, nombre, modalidad y pago
  const addressMatch = rawText.match(
    /(?:a\s+|en\s+|direcci[oó]n[:\s]+)?((?:bv\.?\s*oro[ñn]o|pellegrini|rioja|cordoba|c[oó]rdoba|santa\s+fe|san\s+mart[ií]n|mitre|sarmiento|entre\s+r[ií]os|corrientes|9\s+de\s+julio|3\s+de\s+febrero|mendoza|san\s+juan|urquiza|italia|espa[ñn]a|dorrego|moreno|balcarce|ov\.?\s*lagos|francia|callao|pichincha)\s+\d{2,5}(?:\s*piso\s*\w+)?(?:\s*dto\s*\w+|\s*[a-z])?)/i
  );
  if (addressMatch) {
    result.extractedOrder.address = addressMatch[1].trim();
    result.extractedOrder.deliveryType = 'delivery';
  }
  if (text.includes('retiro') || text.includes('mostrador') || text.includes('paso a buscar') || text.includes('take away')) {
    result.extractedOrder.deliveryType = 'takeaway';
  }
  const nameMatch = rawText.match(/(?:a\s+nombre\s+de|soy|me\s+llamo)\s+([A-ZÁÉÍÓÚÑa-záéíóúñ]+(?:\s+[A-ZÁÉÍÓÚÑa-záéíóúñ]+)?)/i);
  if (nameMatch) {
    result.extractedOrder.customerName = nameMatch[1].trim();
  }
  if (text.includes('transferencia')) result.extractedOrder.paymentMethod = 'Transferencia';
  else if (text.includes('efectivo')) result.extractedOrder.paymentMethod = 'Efectivo';
  else if (text.includes('mercado pago') || text.includes('mercadopago')) result.extractedOrder.paymentMethod = 'Mercado Pago';

  // Reserva de mesa
  if (text.includes('reserv') || (text.includes('mesa') && (text.includes('personas') || text.includes('patio') || text.includes('21') || text.includes('22')))) {
    const peopleMatch = text.match(/(\d+)\s*(?:personas|amigos|cubiertos)/);
    const timeMatch = text.match(/(\d{1,2}(?::\d{2})?)\s*(?:hs|horas)?/);
    const area = text.includes('patio') ? 'Patio de Parra & Guirnaldas' : 'Salón Histórico (Pellegrini)';
    const rName = result.extractedOrder.customerName || 'Cliente Cantina';
    const people = peopleMatch ? Number(peopleMatch[1]) : 4;
    const time = timeMatch ? (timeMatch[1].includes(':') ? timeMatch[1] : `${timeMatch[1]}:00`) : '21:30';

    result.reservation = {
      detected: true,
      name: rName,
      people,
      time,
      area,
      notes: 'Confirmada por Don Vito IA en plano de salón'
    };
    result.reply =
      `¡Hecho, **${rName}**! 🪑 Ya te asigné y bloqueé una mesa libre en el plano para hoy:\n\n` +
      `• **Comensales:** ${people} cubiertos\n` +
      `• **Turno:** ${time} hs\n` +
      `• **Sector:** ${area}\n\n` +
      `Podés ver tu mesa marcada como ocupada ahora mismo en la pestaña **🪑 Salón & Mesas**.`;
    return result;
  }

  // Armado de combo por presupuesto / grupo
  if (
    text.includes('presupuesto') ||
    text.includes('gastar') ||
    text.includes('combo') ||
    text.includes('arm') ||
    (text.includes('somos') && (text.includes('amigos') || text.includes('personas')))
  ) {
    const budgetMatch = rawText.replace(/\./g, '').match(/\$?\s*(\d{4,6})/);
    const budget = budgetMatch ? Number(budgetMatch[1]) : 35000;
    const hasVeggie = text.includes('veggie') || text.includes('vegetarian');
    const hasCeliac = text.includes('celiac') || text.includes('celíac') || text.includes('sin tacc');

    const combo = [];
    let runningTotal = 0;

    const tryAdd = (id, qty) => {
      const prod = catalog.find((p) => p.id === id && p.inStock);
      if (prod && runningTotal + prod.price * qty <= budget) {
        combo.push({ id: prod.id, quantity: qty, name: prod.name, price: prod.price });
        runningTotal += prod.price * qty;
      }
    };

    if (hasCeliac) tryAdd('p5', 1);
    if (hasVeggie) {
      tryAdd('p2', 1) || tryAdd('p1', 1);
      tryAdd('e3', 2);
      tryAdd('e4', 2);
    } else {
      tryAdd('p1', 1);
      tryAdd('e1', 4);
      tryAdd('e2', 2);
    }
    tryAdd('d2', 1) || tryAdd('d1', 1);
    tryAdd('b3', 1);

    result.suggestedItems = combo.map((c) => ({ id: c.id, quantity: c.quantity }));
    const listStr = combo.map((c) => `• **${c.quantity}x ${c.name}** ($${(c.price * c.quantity).toLocaleString('es-AR')})`).join('\n');

    result.reply =
      `Para cuidar tu presupuesto de **$${budget.toLocaleString('es-AR')}**, armé esta mesa bien abundante con lo que está saliendo ahora del horno de barro:\n\n` +
      `${listStr}\n\n` +
      `💰 **Total: $${runningTotal.toLocaleString('es-AR')}** (Te sobran $${(budget - runningTotal).toLocaleString('es-AR')}).\n` +
      `Tocá el botón terracota acá abajo para marchar todo junto a tu comanda:`;
    return result;
  }

  // Detección de platos pedidos directamente
  const wordNums = { una: 1, un: 1, uno: 1, dos: 2, tres: 3, cuatro: 4, cinco: 5, seis: 6, media: 6, docena: 12 };
  const matcherRules = [
    { id: 'p5', regex: /(\d+|una|un|dos|tres)?\s*(?:pizzas?\s*)?(?:muzza(?:rella)?\s+)?sin\s+tacc/i },
    { id: 'p2', regex: /(\d+|una|un|dos|tres)?\s*(?:pizzas?\s*)?napolitanas?/i },
    { id: 'p3', regex: /(\d+|una|un|dos|tres)?\s*(?:pizzas?\s*)?fugazzetas?(?:\s+rellenas?)?/i },
    { id: 'p4', regex: /(\d+|una|un|dos|tres)?\s*(?:pizzas?\s*)?(?:r[uú]cula|crudo)/i },
    { id: 'p1', regex: /(\d+|una|un|dos|tres)?\s*(?:pizzas?\s*(?:de\s*)?)?muzza(?:rellas?)?/i },
    { id: 'e1', regex: /(\d+|una|un|dos|tres|cuatro|cinco|seis|media\s+docena|docena)?\s*(?:empanadas?\s*(?:de\s*)?)?carne(?:\s+cortada)?(?:\s+a\s+cuchillo)?/i },
    { id: 'e2', regex: /(\d+|una|un|dos|tres|cuatro|cinco|seis|media\s+docena)?\s*(?:empanadas?\s*(?:de\s*)?)?(?:jam[oó]n\s+y\s+queso|jyq)/i },
    { id: 'e3', regex: /(\d+|una|un|dos|tres|cuatro|cinco|seis)?\s*(?:empanadas?\s*(?:de\s*)?)?humita/i },
    { id: 'e4', regex: /(\d+|una|un|dos|tres|cuatro|cinco|seis)?\s*(?:empanadas?\s*(?:de\s*)?)?caprese/i },
    { id: 'b1', regex: /(\d+|una|un|dos)?\s*milanesas?(?:\s+napolitanas?)?/i },
    { id: 'b2', regex: /(\d+|una|un|dos)?\s*sorrentinos?/i },
    { id: 'b3', regex: /(\d+|una|un|dos)?\s*fain[aá]/i },
    { id: 'd1', regex: /(\d+|una|un|dos)?\s*(?:coca(?:\s*cola)?|gaseosas?)/i },
    { id: 'd2', regex: /(\d+|una|un|dos)?\s*limonadas?/i },
    { id: 'd3', regex: /(\d+|una|un|dos)?\s*(?:vermut|verm[uú]th)/i },
    { id: 'd4', regex: /(\d+|una|un|dos)?\s*flan(?:es)?/i }
  ];

  const outOfStockRequested = [];
  matcherRules.forEach((rule) => {
    const m = rawText.match(rule.regex);
    if (m) {
      let qty = 1;
      if (m[1]) {
        const token = m[1].toLowerCase().trim();
        if (token.includes('media')) qty = 6;
        else if (token.includes('docena')) qty = 12;
        else qty = Number(token) || wordNums[token] || 1;
      }
      const prod = catalog.find((p) => p.id === rule.id);
      if (prod) {
        if (prod.inStock) {
          result.autoCartAdd.push({ id: prod.id, quantity: qty });
        } else {
          outOfStockRequested.push(prod);
        }
      }
    }
  });

  if (result.autoCartAdd.length > 0 || outOfStockRequested.length > 0) {
    let msgParts = [];
    if (result.autoCartAdd.length > 0) {
      const summary = result.autoCartAdd
        .map((it) => {
          const p = catalog.find((x) => x.id === it.id);
          return `• **${it.quantity}x ${p.name}** ($${(p.price * it.quantity).toLocaleString('es-AR')})`;
        })
        .join('\n');
      msgParts.push(`¡Oído cocina! Ya anoté en tu comanda:\n\n${summary}`);
    }

    if (outOfStockRequested.length > 0) {
      const names = outOfStockRequested.map((p) => `**${p.name}**`).join(', ');
      const alt = catalog.find((p) => p.inStock && p.category === outOfStockRequested[0].category);
      msgParts.push(
        `⚠️ **Aviso de la Cocina en Vivo:** Recién se nos terminó la última tanda de ${names}. ${
          alt ? `Te recomiendo reemplazarla por **${alt.name}** ($${alt.price.toLocaleString('es-AR')}) que está saliendo ahora mismo.` : ''
        }`
      );
      if (alt) result.suggestedItems.push({ id: alt.id, quantity: 1 });
    }

    if (result.extractedOrder.address) {
      msgParts.push(`📍 **Dirección anotada:** ${result.extractedOrder.address}`);
    }
    msgParts.push(`Revisá el ticket en la pestaña **🧾 Comanda** para marcharlo al horno.`);
    result.reply = msgParts.join('\n\n');
    return result;
  }

  // Consultas dietarias Sin TACC / Veggie
  if (text.includes('tacc') || text.includes('celiac') || text.includes('celíac') || text.includes('veggie') || text.includes('vegetarian')) {
    const sintacc = catalog.filter((p) => p.inStock && p.tags.includes('sintacc'));
    const veggie = catalog.filter((p) => p.inStock && p.tags.includes('veggie'));
    result.suggestedItems = [
      ...(sintacc[0] ? [{ id: sintacc[0].id, quantity: 1 }] : []),
      ...(veggie[2] ? [{ id: veggie[2].id, quantity: 2 }] : [])
    ];
    result.reply =
      `En **La Cantina de Don Brasa** tenemos sector aislado para celíacos y opciones vegetarianas al barro:\n\n` +
      `🌾 **Opciones Sin TACC disponibles ahora:**\n` +
      sintacc.map((p) => `• **${p.name}** ($${p.price.toLocaleString('es-AR')})`).join('\n') +
      `\n\n🌿 **Opciones Vegetarianas:**\n` +
      veggie.slice(0, 5).map((p) => `• **${p.name}** ($${p.price.toLocaleString('es-AR')})`).join('\n');
    return result;
  }

  // Respuesta general con sugerencia de la casa
  result.suggestedItems = [
    { id: 'p3', quantity: 1 },
    { id: 'e1', quantity: 4 },
    { id: 'd3', quantity: 1 }
  ];
  result.reply =
    `¡Adelante! Podés pedirme que te arme un combo según tu presupuesto, dictarme tu pedido con dirección o reservar mesa en el patio.\n\n` +
    `Te dejo acá abajo la **Selección Favorita de los Habitués de Pellegrini** por si querés marcharla con 1 clic:`;
  return result;
}

// ============================================================================
// INTERPRETADOR DE WHATSAPP & SIMULADOR DE AUDIO
// ============================================================================
const WA_SAMPLES = {
  1: 'Hola buenas noches! Soy Martín Gómez, mandame por favor 1 pizza napolitana al barro, 6 empanadas de carne cortada a cuchillo, 2 de jamon y queso y una coca de litro y medio a Bv. Oroño 840 Piso 3 B. Pago por transferencia.',
  2: 'Hola maestro! Somos varios acá en Rioja 1850, mandanos 1 milanesa napolitana XXL de bodegón, 1 pizza de muzzarella al molde y 1 jarra de limonada. A nombre de Lucía, pagamos con Mercado Pago.',
  3: 'Buenas! Soy Federico, paso a retirar por el mostrador en 20 minutos: preparame 1 pizza muzzarella sin TACC, 4 empanadas de humita y 1 porción de fainá. Pago en efectivo.'
};

function loadWhatsAppSample(num) {
  document.getElementById('wa-raw-input').value = WA_SAMPLES[num] || '';
}

function simulateVoiceTranscription() {
  const voiceTranscript =
    '🎙️ [Audio transcripto por IA]: "Hola chicos de Don Brasa, habla Ramiro! Mándenme a San Martín 1120 piso 4 B una fugazzeta rellena, cuatro empanadas de carne cortada a cuchillo y un vermut con soda. Les transfiero al alias ahora mismo, gracias!"';
  document.getElementById('wa-raw-input').value = voiceTranscript;
  processWhatsAppText();
}

async function processWhatsAppText() {
  const raw = document.getElementById('wa-raw-input').value.trim();
  const resBox = document.getElementById('wa-parse-result');
  const btn = document.getElementById('btn-parse-wa');

  if (!raw) {
    resBox.classList.remove('hidden');
    resBox.innerHTML = '⚠️ Seleccioná un mensaje de prueba, el audio de arriba o pegá un texto primero.';
    return;
  }

  btn.disabled = true;
  btn.textContent = '⏳ Interpretando audio/mensaje con IA...';

  cart = [];
  const aiData = await sendChatMessage(raw, 'whatsapp_parser');

  if (Array.isArray(aiData.autoCartAdd)) {
    aiData.autoCartAdd.forEach((item) => addToCart(item.id, Number(item.quantity) || 1, 'Desde WhatsApp IA'));
  }
  if (aiData.extractedOrder) {
    applyExtractedCustomerData(aiData.extractedOrder);
  }

  btn.disabled = false;
  btn.textContent = '⚡ Extraer Platos y Armar Comanda con IA';

  const { finalTotal, totalItems } = calculateCartTotals();
  resBox.classList.remove('hidden');
  resBox.innerHTML = `
    <div style="color:var(--green-ok); font-weight:800; margin-bottom:6px;">
      ✅ ¡Mensaje convertido en Comanda Térmica sin errores!
    </div>
    <div>• <strong>Platos detectados:</strong> ${totalItems} unidades</div>
    <div>• <strong>Cliente:</strong> ${document.getElementById('cust-name').value || 'Ramiro'}</div>
    <div>• <strong>Entrega:</strong> ${
      deliveryType === 'takeaway'
        ? 'Retiro en mostrador (-10%)'
        : document.getElementById('cust-address').value || 'Envío a domicilio'
    }</div>
    <div style="font-family:var(--font-mono); font-weight:700; margin-top:4px;">TOTAL: $${finalTotal.toLocaleString('es-AR')}</div>
    <button class="btn-terracotta btn-block" style="margin-top:10px;" onclick="switchRightTab('cart')">
      🧾 Ver Ticket Listo para Marchar (${totalItems})
    </button>
  `;
}

// ============================================================================
// MARCHAR PEDIDO A COCINA Y SEGUIMIENTO EN VIVO (TRACKER)
// ============================================================================
function submitFinalOrder() {
  if (cart.length === 0) {
    alert('Sumá al menos un plato a la comanda antes de marchar a cocina.');
    return;
  }

  const name = document.getElementById('cust-name').value.trim() || 'Cliente Web';
  const address =
    deliveryType === 'takeaway'
      ? 'Retiro en mostrador (Av. Pellegrini 1540)'
      : document.getElementById('cust-address').value.trim() || 'Centro, Rosario';
  const payment = document.getElementById('cust-payment').value;
  const generalNotes = document.getElementById('cust-notes').value.trim();
  const { finalTotal } = calculateCartTotals();

  const orderItems = cart
    .map((entry) => {
      const p = catalog.find((x) => x.id === entry.id);
      return p
        ? {
            name: p.name,
            quantity: entry.quantity,
            price: p.price,
            notes: entry.notes || generalNotes || ''
          }
        : null;
    })
    .filter(Boolean);

  const nowStr = new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' }) + ' hs';
  const newOrder = {
    id: `DB-${1042 + orders.length}`,
    customerName: name,
    address,
    deliveryType,
    paymentMethod: payment,
    source: '🧾 Web + Conserje IA',
    status: 'new',
    time: nowStr,
    total: finalTotal,
    items: orderItems
  };

  orders.unshift(newOrder);
  activeOrderId = newOrder.id;
  cart = [];
  renderCart();
  renderAdminDashboard();

  const pill = document.getElementById('active-order-pill');
  if (pill) {
    pill.classList.remove('hidden');
    pill.textContent = `#${newOrder.id}`;
  }

  navigateApp('tracker');
}

function renderOrderTracker() {
  const wrap = document.getElementById('tracker-wrapper');
  if (!wrap) return;

  const currentOrd = orders.find((o) => o.id === activeOrderId) || orders[0];
  if (!currentOrd) {
    wrap.innerHTML = `<p>No hay comandas activas en este momento.</p>`;
    return;
  }

  const step1Class = currentOrd.status === 'new' ? 'current' : 'done';
  const step2Class = currentOrd.status === 'cooking' ? 'current' : currentOrd.status === 'ready' ? 'done' : '';
  const step3Class = currentOrd.status === 'ready' ? 'current done' : '';

  wrap.innerHTML = `
    <div class="tracker-card">
      <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:12px;">
        <div>
          <span class="eyebrow-tag">SEGUIMIENTO DE COMANDA EN TIEMPO REAL</span>
          <h2 style="font-family:var(--font-serif); color:var(--green-bodegon);">Comanda #${currentOrd.id} — ${currentOrd.customerName}</h2>
          <p class="sub-copy">📍 ${currentOrd.address} • Ingresó a las ${currentOrd.time}</p>
        </div>
        <span class="order-source-badge" style="font-size:0.8rem; padding:6px 10px;">${currentOrd.source}</span>
      </div>

      <div class="tracker-steps">
        <div class="t-step ${step1Class}">
          <strong style="display:block; font-size:0.95rem;">1. Recibida por IA</strong>
          <small class="sub-copy">Comanda validada y cobrada sin demoras</small>
        </div>
        <div class="t-step ${step2Class}">
          <strong style="display:block; font-size:0.95rem;">2. En Horno de Barro (430°C)</strong>
          <small class="sub-copy">Maestro pizzero preparando tu pedido</small>
        </div>
        <div class="t-step ${step3Class}">
          <strong style="display:block; font-size:0.95rem;">3. En Camino / Lista</strong>
          <small class="sub-copy">Despachada desde Av. Pellegrini 1540</small>
        </div>
      </div>

      <div class="thermal-ticket" style="margin-bottom:18px;">
        <div style="font-family:var(--font-mono); font-size:0.84rem;">
          ${currentOrd.items
            .map(
              (i) =>
                `<div style="display:flex; justify-content:space-between; padding:4px 0; border-bottom:1px dotted #ccc;">
                  <span>${i.quantity}x ${i.name} ${i.notes ? `(${i.notes})` : ''}</span>
                </div>`
            )
            .join('')}
          <div style="display:flex; justify-content:space-between; padding-top:8px; font-weight:700; color:var(--terracotta);">
            <span>TOTAL PAGADO (${currentOrd.paymentMethod})</span>
            <span>$${currentOrd.total.toLocaleString('es-AR')}</span>
          </div>
        </div>
      </div>

      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
        <span class="sub-copy" style="font-size:0.82rem;">💡 Podés cambiar el estado de esta comanda desde la vista <strong>👨‍🍳 Comandera Cocina</strong> y ver cómo se actualiza en vivo.</span>
        <button class="btn-outline-dark" onclick="navigateApp('admin')">
          👨‍🍳 Ir a Comandera de Cocina →
        </button>
      </div>
    </div>
  `;
}

// ============================================================================
// COMANDERA DE COCINA POS & GESTIÓN DE STOCK EN VIVO
// ============================================================================
function renderAdminDashboard() {
  document.getElementById('admin-orders-badge').textContent = orders.length;
  document.getElementById('kpi-orders-count').textContent = orders.length;

  const totalRev = orders.reduce((acc, o) => acc + (o.total || 0), 0);
  document.getElementById('kpi-revenue').textContent = '$' + totalRev.toLocaleString('es-AR');

  const minsSaved = orders.length * 8 + reservations.length * 5;
  const hrs = Math.floor(minsSaved / 60);
  const remMins = minsSaved % 60;
  document.getElementById('kpi-time-saved').textContent = hrs > 0 ? `${hrs}h ${remMins}m` : `${remMins} min`;
  document.getElementById('kpi-reservations-count').textContent = reservations.length;

  const cols = { new: [], cooking: [], ready: [] };
  orders.forEach((o) => {
    if (cols[o.status]) cols[o.status].push(o);
  });

  document.getElementById('count-new').textContent = cols.new.length;
  document.getElementById('count-cooking').textContent = cols.cooking.length;
  document.getElementById('count-ready').textContent = cols.ready.length;

  const renderOrderCard = (o) => {
    let nextLabel = '';
    if (o.status === 'new') nextLabel = '🔥 Meter al Horno de Barro →';
    else if (o.status === 'cooking') nextLabel = '🛵 Despachar Cadete / Mostrador →';

    return `
      <div class="order-card">
        <div class="order-card-top">
          <span class="order-id">#${o.id} • ${o.customerName}</span>
          <span class="order-source-badge">${o.source}</span>
        </div>
        <div style="font-size:0.75rem; color:var(--ink-muted);">📍 ${o.address} (${o.time})</div>
        <ul class="order-items-ul">
          ${o.items
            .map(
              (it) =>
                `<li>• <strong>${it.quantity}x</strong> ${it.name} ${
                  it.notes ? `<em style="color:var(--terracotta);">[${it.notes}]</em>` : ''
                }</li>`
            )
            .join('')}
        </ul>
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <span style="font-size:0.74rem; color:var(--ink-muted);">💳 ${o.paymentMethod}</span>
          <strong style="font-family:var(--font-mono); color:var(--green-bodegon);">$${o.total.toLocaleString('es-AR')}</strong>
        </div>
        ${
          nextLabel
            ? `<button class="btn-advance-order" onclick="advanceOrderStatus('${o.id}')">${nextLabel}</button>`
            : ''
        }
      </div>
    `;
  };

  document.getElementById('kanban-new').innerHTML = cols.new.map(renderOrderCard).join('');
  document.getElementById('kanban-cooking').innerHTML = cols.cooking.map(renderOrderCard).join('');
  document.getElementById('kanban-ready').innerHTML = cols.ready.map(renderOrderCard).join('');

  const stockEl = document.getElementById('admin-stock-list');
  stockEl.innerHTML = catalog
    .map(
      (item) => `
      <div class="stock-row">
        <div class="stock-dish-cell">
          <img src="${item.image}" alt="${item.name}" class="stock-thumb" loading="lazy" />
          <div>
            <strong>${item.name}</strong>
            <div style="font-family:var(--font-mono); font-size:0.74rem; color:var(--ink-muted);">$${item.price.toLocaleString('es-AR')}</div>
          </div>
        </div>
        <button
          class="btn-toggle-stock ${item.inStock ? 'in-stock' : 'out-stock'}"
          onclick="toggleProductStock('${item.id}')"
        >
          ${item.inStock ? '🟢 En Stock (Click p/ Agotar)' : '🔴 AGOTADO (Click p/ Reponer)'}
        </button>
      </div>
    `
    )
    .join('');

  const resEl = document.getElementById('admin-reservations-list');
  resEl.innerHTML = reservations
    .map(
      (r) => `
      <div class="stock-row">
        <div>
          <strong>🪑 ${r.time} — ${r.name} (${r.people} cubiertos)</strong>
          <div style="font-size:0.75rem; color:var(--ink-muted);">${r.area} • ${r.notes}</div>
        </div>
        <span class="order-source-badge">Confirmada</span>
      </div>
    `
    )
    .join('');
}

function advanceOrderStatus(orderId) {
  const ord = orders.find((o) => o.id === orderId);
  if (!ord) return;
  if (ord.status === 'new') ord.status = 'cooking';
  else if (ord.status === 'cooking') ord.status = 'ready';
  renderAdminDashboard();
  renderOrderTracker();
}

function toggleProductStock(productId) {
  const prod = catalog.find((p) => p.id === productId);
  if (!prod) return;
  prod.inStock = !prod.inStock;
  renderCatalog();
  renderAdminDashboard();
}

function simulateIncomingWhatsAppOrder() {
  const names = ['Agustina Peralta', 'Nicolás Cabrera', 'Julieta Mansilla', 'Ramiro Ledesma'];
  const addresses = ['San Martín 1120 4° B', 'Mendoza 2340 PB', 'Urquiza 1780 Piso 7', '3 de Febrero 950'];
  const idx = orders.length % names.length;

  const simOrder = {
    id: `DB-${1042 + orders.length}`,
    customerName: names[idx],
    address: addresses[idx],
    deliveryType: 'delivery',
    paymentMethod: 'Mercado Pago',
    source: '📲 IA (Simulación En Vivo)',
    status: 'new',
    time: new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' }) + ' hs',
    total: 27400,
    items: [
      { name: 'Rúcula Salvaje, Jamón Crudo & Parmesano', quantity: 1, notes: 'Oliva aparte' },
      { name: 'Empanada de Carne Cortada a Cuchillo', quantity: 4, notes: '' },
      { name: 'Vermut Rosso de la Casa con Soda', quantity: 1, notes: '' }
    ]
  };
  orders.unshift(simOrder);
  activeOrderId = simOrder.id;
  renderAdminDashboard();
  renderOrderTracker();
}

// ============================================================================
// CONFIGURACIÓN DE OPENAI API KEY
// ============================================================================
async function checkServerAiStatus() {
  const dot = document.getElementById('ai-status-dot');
  const txt = document.getElementById('ai-status-text');
  const localKey = sessionStorage.getItem('OPENAI_API_KEY') || localStorage.getItem('OPENAI_API_KEY');

  try {
    const res = await fetch('/api/chat');
    if (res.ok) {
      const data = await res.json();
      if (data.hasServerApiKey || localKey) {
        dot.classList.remove('hybrid');
        txt.textContent = `OpenAI (${data.model || 'gpt-4o-mini'})`;
        return;
      }
    }
  } catch {
    // Modo local / estático
  }

  if (localKey) {
    dot.classList.remove('hybrid');
    txt.textContent = 'OpenAI Activo';
  } else {
    dot.classList.add('hybrid');
    txt.textContent = 'Configurar Key IA';
  }
}

function openApiKeyModal() {
  const current = sessionStorage.getItem('OPENAI_API_KEY') || '';
  document.getElementById('modal-apikey-input').value = current;
  document.getElementById('apikey-status-msg').textContent = '';
  document.getElementById('apikey-modal').classList.remove('hidden');
}

function closeApiKeyModal() {
  document.getElementById('apikey-modal').classList.add('hidden');
}

async function saveApiKeyConfig() {
  const key = document.getElementById('modal-apikey-input').value.trim();
  const model = document.getElementById('modal-model-select').value;
  const msg = document.getElementById('apikey-status-msg');

  if (key) {
    sessionStorage.setItem('OPENAI_API_KEY', key);
    localStorage.setItem('OPENAI_API_KEY', key);
  } else {
    sessionStorage.removeItem('OPENAI_API_KEY');
    localStorage.removeItem('OPENAI_API_KEY');
  }
  sessionStorage.setItem('OPENAI_MODEL', model);

  try {
    await fetch('/api/config-key', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ apiKey: key, model })
    });
  } catch {
    // Guardado en sesión local
  }

  await checkServerAiStatus();
  msg.style.color = 'var(--green-ok)';
  msg.style.fontWeight = '700';
  msg.textContent = '✅ Clave activada correctamente (protegida fuera de GitHub).';
  setTimeout(() => closeApiKeyModal(), 900);
}
