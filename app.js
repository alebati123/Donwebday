// ============================================================================
// LA CANTINA DE DON BRASA — PLATAFORMA INTEGRAL DE BODEGÓN CON IA
// Carta Interactiva • Mozo Virtual "Don Vito" • Mesas Modulares • Panel Cocina/Admin
// Sincronización en tiempo real entre index.html (Cliente) y admin.html (Cocina/Admin)
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

const INITIAL_TABLES = [
  { id: 'T1', number: 1, zone: 'Salón Histórico (Pellegrini)', capacity: 2, maxFlex: 3, flexNote: '2 a 3 pers. (+cabecera)', status: 'free', guest: '' },
  { id: 'T2', number: 2, zone: 'Salón Histórico (Pellegrini)', capacity: 4, maxFlex: 5, flexNote: '3 a 5 pers. (+cabecera)', status: 'occupied', guest: 'Familia Benítez (21:00)' },
  { id: 'T3', number: 3, zone: 'Salón Histórico (Pellegrini)', capacity: 4, maxFlex: 5, flexNote: '3 a 5 pers. (+cabecera)', status: 'free', guest: '' },
  { id: 'T4', number: 4, zone: 'Salón Histórico (Pellegrini)', capacity: 6, maxFlex: 7, flexNote: '5 a 7 pers. (+cabecera)', status: 'free', guest: '' },
  { id: 'T5', number: 5, zone: 'Patio de Parra & Guirnaldas', capacity: 4, maxFlex: 5, flexNote: '3 a 5 pers. (+cabecera)', status: 'free', guest: '' },
  { id: 'T6', number: 6, zone: 'Patio de Parra & Guirnaldas', capacity: 4, maxFlex: 5, flexNote: '3 a 5 pers. (+cabecera)', status: 'occupied', guest: 'Camila & Amigos (22:00)' },
  { id: 'T7', number: 7, zone: 'Patio de Parra & Guirnaldas', capacity: 6, maxFlex: 7, flexNote: '5 a 7 pers. (+cabecera)', status: 'free', guest: '' },
  { id: 'T8', number: 8, zone: 'Patio de Parra & Guirnaldas', capacity: 8, maxFlex: 12, flexNote: '7 a 12 pers. (Mesas unidas)', status: 'free', guest: '' },
  { id: 'T9', number: 9, zone: 'Barra de Vermut & Picadas', capacity: 2, maxFlex: 2, flexNote: '1 a 2 pers. (Banquetas)', status: 'free', guest: '' },
  { id: 'T10', number: 10, zone: 'Barra de Vermut & Picadas', capacity: 2, maxFlex: 3, flexNote: '2 a 3 pers. (+cabecera)', status: 'free', guest: '' }
];

const INITIAL_ORDERS = [
  {
    id: 'DB-1041',
    customerName: 'Sofía Pellegrini',
    address: '9 de Julio 1420 Piso 2 A',
    deliveryType: 'delivery',
    paymentMethod: 'Transferencia',
    source: '💬 Mozo Virtual',
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
    source: '💬 Recomendación Mozo',
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
    source: '🛒 Carta Web (Sin TACC)',
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

const INITIAL_RESERVATIONS = [
  {
    id: 'RES-201',
    tableId: 'T2',
    name: 'Familia Benítez',
    people: 4,
    time: '21:00 hs',
    area: 'Salón Histórico (Mesa #2)',
    notes: '1 sillita alta para bebé • Confirmada por Don Vito'
  },
  {
    id: 'RES-202',
    tableId: 'T6',
    name: 'Camila & Amigos',
    people: 4,
    time: '22:00 hs',
    area: 'Patio de Parra (Mesa #6)',
    notes: 'Menú Veggie y Sin TACC consultado en el chat'
  }
];

function loadFromStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {
    // Usar valor inicial
  }
  return JSON.parse(JSON.stringify(fallback));
}

let catalog = loadFromStorage('CANTINA_CATALOG_V1', INITIAL_CATALOG);
let restaurantTables = loadFromStorage('CANTINA_TABLES_V1', INITIAL_TABLES);
let orders = loadFromStorage('CANTINA_ORDERS_V1', INITIAL_ORDERS);
let reservations = loadFromStorage('CANTINA_RESERVATIONS_V1', INITIAL_RESERVATIONS);

let currentCategory = 'all';
let cart = [];
let deliveryType = 'delivery';
let chatHistory = [];
let suggestedCombosStore = {};
let activeOrderId = orders[0]?.id || 'DB-1041';
let selectedTableId = 'T3';
let currentMobileSubview = 'catalog';

function persistAllState() {
  try {
    localStorage.setItem('CANTINA_CATALOG_V1', JSON.stringify(catalog));
    localStorage.setItem('CANTINA_TABLES_V1', JSON.stringify(restaurantTables));
    localStorage.setItem('CANTINA_ORDERS_V1', JSON.stringify(orders));
    localStorage.setItem('CANTINA_RESERVATIONS_V1', JSON.stringify(reservations));
  } catch {
    // Ignorar límite local
  }
  pushStateToServer();
}

function persistCatalog() {
  persistAllState();
}

async function pushStateToServer() {
  try {
    await fetch('/api/state', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        catalog,
        orders,
        reservations,
        tables: restaurantTables
      })
    });
  } catch {
    // Funciona aún sin backend mediante localStorage
  }
}

async function pullStateFromServer() {
  try {
    const resp = await fetch('/api/state');
    if (!resp.ok) return;
    const json = await resp.json();
    if (!json.ok || !json.state) return;
    const st = json.state;
    let changed = false;

    if (Array.isArray(st.catalog) && st.catalog.length > 0) {
      if (JSON.stringify(st.catalog) !== JSON.stringify(catalog)) {
        catalog = st.catalog;
        localStorage.setItem('CANTINA_CATALOG_V1', JSON.stringify(catalog));
        changed = true;
      }
    }
    if (Array.isArray(st.orders) && st.orders.length > 0) {
      if (JSON.stringify(st.orders) !== JSON.stringify(orders)) {
        orders = st.orders;
        localStorage.setItem('CANTINA_ORDERS_V1', JSON.stringify(orders));
        changed = true;
      }
    }
    if (Array.isArray(st.reservations) && st.reservations.length > 0) {
      if (JSON.stringify(st.reservations) !== JSON.stringify(reservations)) {
        reservations = st.reservations;
        localStorage.setItem('CANTINA_RESERVATIONS_V1', JSON.stringify(reservations));
        changed = true;
      }
    }
    if (Array.isArray(st.tables) && st.tables.length > 0) {
      if (JSON.stringify(st.tables) !== JSON.stringify(restaurantTables)) {
        restaurantTables = st.tables;
        localStorage.setItem('CANTINA_TABLES_V1', JSON.stringify(restaurantTables));
        changed = true;
      }
    }

    if (changed) {
      refreshAllViews();
    }
  } catch {
    // Ignorar si está offline
  }
}

function refreshAllViews() {
  renderCatalog();
  renderCart();
  renderTablesFloorplan();
  renderOrderTracker();
  renderAdminDashboard();
}

// ============================================================================
// INICIALIZACIÓN Y ADAPTACIÓN RESPONSIVE (CLIENTE + ADMIN)
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {
  refreshAllViews();
  initWelcomeChat();
  syncResponsiveLayout();
  window.addEventListener('resize', syncResponsiveLayout);

  // Sincronización instantánea entre pestañas (index.html <-> admin.html)
  window.addEventListener('storage', (e) => {
    if (
      e.key === 'CANTINA_CATALOG_V1' ||
      e.key === 'CANTINA_ORDERS_V1' ||
      e.key === 'CANTINA_RESERVATIONS_V1' ||
      e.key === 'CANTINA_TABLES_V1'
    ) {
      catalog = loadFromStorage('CANTINA_CATALOG_V1', INITIAL_CATALOG);
      orders = loadFromStorage('CANTINA_ORDERS_V1', INITIAL_ORDERS);
      reservations = loadFromStorage('CANTINA_RESERVATIONS_V1', INITIAL_RESERVATIONS);
      restaurantTables = loadFromStorage('CANTINA_TABLES_V1', INITIAL_TABLES);
      refreshAllViews();
    }
  });

  // Sincronización inicial con el servidor
  pushStateToServer();
  setInterval(pullStateFromServer, 4000);
});

function syncResponsiveLayout() {
  const isMobileOrTablet = window.innerWidth <= 1040;
  const subBar = document.getElementById('mobile-subview-bar');
  const menuScreenActive = document.getElementById('screen-menu')?.classList.contains('active');
  const mainCol = document.getElementById('menu-main-col');
  const sideDock = document.getElementById('side-dock');

  if (subBar) {
    subBar.classList.toggle('show-on-menu', Boolean(isMobileOrTablet && menuScreenActive));
  }

  if (!isMobileOrTablet) {
    if (mainCol) mainCol.style.display = 'block';
    if (sideDock) sideDock.style.display = 'block';
  } else if (menuScreenActive) {
    if (currentMobileSubview === 'catalog') {
      if (mainCol) mainCol.style.display = 'block';
      if (sideDock) sideDock.style.display = 'none';
    } else {
      if (mainCol) mainCol.style.display = 'none';
      if (sideDock) sideDock.style.display = 'block';
    }
  }
}

function setMobileMenuSubview(subview) {
  currentMobileSubview = subview;
  document.querySelectorAll('.msub-btn').forEach((b) => b.classList.remove('active'));
  const activeBtn = document.getElementById(`msub-${subview}`);
  if (activeBtn) activeBtn.classList.add('active');

  if (subview === 'chat' || subview === 'cart') {
    switchRightTab(subview);
  }
  syncResponsiveLayout();
}

function navigateApp(screenName) {
  if (screenName === 'admin' && !document.getElementById('screen-admin')) {
    window.location.href = 'admin.html';
    return;
  }

  document.querySelectorAll('.app-screen').forEach((s) => s.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach((b) => b.classList.remove('active'));
  document.querySelectorAll('.mnav-btn').forEach((b) => b.classList.remove('active'));

  const screenEl = document.getElementById(`screen-${screenName}`);
  const navEl = document.getElementById(`nav-${screenName}`);
  const mnavEl = document.getElementById(`mnav-${screenName}`);

  if (screenEl) screenEl.classList.add('active');
  if (navEl) navEl.classList.add('active');
  if (mnavEl) mnavEl.classList.add('active');

  if (screenName === 'menu' && window.innerWidth <= 1040) {
    setMobileMenuSubview('catalog');
  }
  if (screenName === 'tables') renderTablesFloorplan();
  if (screenName === 'tracker') renderOrderTracker();
  if (screenName === 'admin') renderAdminDashboard();

  syncResponsiveLayout();
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
  if (window.innerWidth <= 1040) {
    setMobileMenuSubview('chat');
  } else {
    switchRightTab('chat');
  }
}

function openMobileCartOrFocus() {
  navigateApp('menu');
  if (window.innerWidth <= 1040) {
    setMobileMenuSubview('cart');
  } else {
    switchRightTab('cart');
  }
}

// ============================================================================
// CARTA FOTOGRÁFICA Y MODAL DE PERSONALIZACIÓN DE PLATO
// ============================================================================
function selectCategory(cat) {
  currentCategory = cat;
  document.querySelectorAll('.cat-btn').forEach((btn) => {
    const onclickAttr = btn.getAttribute('onclick') || '';
    btn.classList.toggle('active', onclickAttr.includes(`'${cat}'`));
  });
  renderCatalog();
}

function renderCatalog() {
  const grid = document.getElementById('catalog-grid');
  if (!grid) return;

  const query = (document.getElementById('catalog-search')?.value || '').toLowerCase().trim();
  const onlySinTacc = document.getElementById('filter-sintacc')?.checked;
  const onlyVeggie = document.getElementById('filter-veggie')?.checked;

  const msubCount = document.getElementById('msub-dishes-count');
  if (msubCount) msubCount.textContent = catalog.length;

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
        <p class="sub-copy">Preguntale a <strong>Don Vito</strong> en el chat para que te recomiende una alternativa.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered
    .map((item) => {
      const floatingTags = [];
      if (!item.inStock) {
        floatingTags.push(`<span class="dish-tag soldout">AGOTADO HOY</span>`);
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
              <button class="btn-customize" onclick="openDishModal('${item.id}')" title="Personalizar cocción o notas">
                Opciones
              </button>
              <button
                class="btn-add-dish"
                ${!item.inStock ? 'disabled' : ''}
                onclick="addToCart('${item.id}', 1, '')"
              >
                ${item.inStock ? '+ Agregar' : 'Agotado'}
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
  if (!modal || !body) return;

  body.innerHTML = `
    <img src="${dish.image}" alt="${dish.name}" style="width:100%; height:190px; object-fit:cover; border-radius:10px; margin-bottom:10px;" />
    <span class="eyebrow-tag">${dish.category}</span>
    <h3 style="font-family:var(--font-serif); font-size:1.3rem; color:var(--green-bodegon); margin-bottom:4px;">${dish.name}</h3>
    <p class="sub-copy" style="margin-bottom:12px;">${dish.description}</p>

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
      <label>Notas para tu pedido</label>
      <input type="text" id="modal-dish-notes" placeholder="Ej: Sin aceitunas, poco ajo, mitad sin orégano..." />
    </div>

    <div style="display:flex; justify-content:space-between; align-items:center; padding-top:10px; border-top:1px dashed var(--border-warm);">
      <strong style="font-family:var(--font-mono); font-size:1.2rem; color:var(--green-bodegon);">$${dish.price.toLocaleString('es-AR')}</strong>
      <button
        class="btn-terracotta"
        ${!dish.inStock ? 'disabled' : ''}
        onclick="confirmDishModalAdd('${dish.id}')"
      >
        ${dish.inStock ? '🛒 Agregar al Carrito' : 'Plato Agotado Hoy'}
      </button>
    </div>
  `;

  modal.classList.remove('hidden');
}

function closeDishModal() {
  document.getElementById('dish-modal')?.classList.add('hidden');
}

function confirmDishModalAdd(dishId) {
  const doneness = document.getElementById('modal-dish-doneness')?.value || '';
  const extraNotes = document.getElementById('modal-dish-notes')?.value.trim() || '';
  const combinedNotes = [doneness !== 'Punto clásico de la casa' ? doneness : '', extraNotes].filter(Boolean).join(' • ');
  addToCart(dishId, 1, combinedNotes);
  closeDishModal();
}

// ============================================================================
// CARRITO DE PEDIDO Y SUGERENCIAS
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
  document.getElementById('deliv-btn-delivery')?.classList.toggle('active', type === 'delivery');
  document.getElementById('deliv-btn-takeaway')?.classList.toggle('active', type === 'takeaway');
  const addrRow = document.getElementById('address-field-row');
  if (addrRow) addrRow.style.display = type === 'delivery' ? 'block' : 'none';
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
  const msubCartEl = document.getElementById('msub-cart-count');
  const headerTotalEl = document.getElementById('header-cart-total');
  const breakdownEl = document.getElementById('totals-breakdown');
  const upsellBox = document.getElementById('ai-upsell-box');

  const { subtotal, discount, shipping, finalTotal, totalItems } = calculateCartTotals();
  if (badgeEl) badgeEl.textContent = totalItems;
  if (dockCountEl) dockCountEl.textContent = totalItems;
  if (msubCartEl) msubCartEl.textContent = totalItems;
  if (headerTotalEl) headerTotalEl.textContent = `$${finalTotal.toLocaleString('es-AR')}`;

  if (!listEl || !breakdownEl) return;

  if (cart.length === 0) {
    listEl.innerHTML = `
      <div style="text-align:center; padding: 20px 10px; color: var(--ink-muted); font-size:0.82rem;">
        Tu carrito está vacío.<br/>
        Elegí platos de la carta o contale a <strong>Don Vito</strong> qué tenés ganas de comer hoy.
      </div>
    `;
    upsellBox?.classList.add('hidden');
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
    const fainaProd = catalog.find((p) => p.id === 'b3');
    const vermutProd = catalog.find((p) => p.id === 'd3');

    if (upsellBox) {
      if (hasPizza && !hasFaina && fainaProd?.inStock) {
        upsellBox.classList.remove('hidden');
        upsellBox.innerHTML = `
          <div>✨ <strong>Para acompañar tu pizza:</strong> ¿Sumamos una porción de <em>${fainaProd.name}</em> por $${fainaProd.price.toLocaleString('es-AR')}?</div>
          <button class="btn-add-dish" onclick="addToCart('b3', 1, 'A caballo')">+ Agregar</button>
        `;
      } else if (!hasDrink && vermutProd?.inStock) {
        upsellBox.classList.remove('hidden');
        upsellBox.innerHTML = `
          <div>✨ <strong>Para tomar:</strong> ¿Agregamos un <em>${vermutProd.name}</em> bien frío por $${vermutProd.price.toLocaleString('es-AR')}?</div>
          <button class="btn-add-dish" onclick="addToCart('d3', 1, '')">+ Agregar</button>
        `;
      } else {
        upsellBox.classList.add('hidden');
      }
    }
  }

  breakdownEl.innerHTML = `
    <div class="total-line">
      <span>SUBTOTAL (${totalItems} productos)</span>
      <span>$${subtotal.toLocaleString('es-AR')}</span>
    </div>
    ${
      deliveryType === 'takeaway'
        ? `<div class="total-line" style="color: var(--green-ok);">
            <span>DESCUENTO RETIRO EN LOCAL (10%)</span>
            <span>-$${discount.toLocaleString('es-AR')}</span>
          </div>`
        : `<div class="total-line">
            <span>ENVÍO A DOMICILIO ${subtotal >= BUSINESS_INFO.freeDeliveryMin ? '(GRATIS)' : ''}</span>
            <span>${shipping === 0 && subtotal > 0 ? '$0' : '$' + shipping.toLocaleString('es-AR')}</span>
          </div>`
    }
    <div class="total-line final">
      <span>TOTAL DEL PEDIDO</span>
      <span>$${finalTotal.toLocaleString('es-AR')}</span>
    </div>
  `;
}

// ============================================================================
// PLANO INTERACTIVO DE MESAS MODULARES (SOLUCIÓN PARA 3, 5, 7 Y GRUPOS GRANDES)
// ============================================================================
function findBestFreeTableForPeople(peopleCount) {
  const count = Number(peopleCount) || 2;
  const freeTables = restaurantTables.filter((t) => t.status === 'free');
  if (freeTables.length === 0) return null;

  // 1. Buscar mesa donde entren cómodos en capacidad estándar (ej: si son 3, priorizar mesa de 4 antes que de 2)
  const exactOrComfortable = freeTables
    .filter((t) => t.capacity >= count)
    .sort((a, b) => a.capacity - b.capacity);

  if (exactOrComfortable.length > 0) {
    return exactOrComfortable[0];
  }

  // 2. Si no hay de capacidad base mayor, buscar mesa donde entren con silla en cabecera o unión (maxFlex >= count)
  const flexMatch = freeTables
    .filter((t) => t.maxFlex >= count)
    .sort((a, b) => a.maxFlex - b.maxFlex);

  if (flexMatch.length > 0) {
    return flexMatch[0];
  }

  // 3. Fallback a la mesa libre más grande disponible
  return freeTables.sort((a, b) => b.maxFlex - a.maxFlex)[0];
}

function getSeatingExplanation(peopleCount, tableObj) {
  const count = Number(peopleCount) || 2;
  if (!tableObj) return 'Armado estándar cómodo';

  if (count === 3) {
    return tableObj.capacity >= 4
      ? `Mesa de ${tableObj.capacity} adaptada cómoda para 3 personas`
      : `Mesa con 3ra silla agregada en cabecera`;
  }
  if (count === 5) {
    return tableObj.capacity >= 6
      ? `Mesa amplia de ${tableObj.capacity} adaptada para 5 personas`
      : `Mesa de 4 + 1 silla cómoda en cabecera (5 pers.)`;
  }
  if (count === 7) {
    return tableObj.capacity >= 8
      ? `Mesa grande de ${tableObj.capacity} adaptada para 7 personas`
      : `Mesa de 6 + 1 silla extra en cabecera (7 pers.)`;
  }
  if (count >= 9) {
    return `Unión de mesas contiguas preparada para ${count} personas`;
  }
  return `Mesa para ${count} personas`;
}

function autoMatchTableForPeopleCount() {
  const people = Number(document.getElementById('res-people')?.value) || 4;
  const setupSelect = document.getElementById('res-seating-setup');

  if (setupSelect) {
    if (people === 3 || people === 5 || people === 7) {
      setupSelect.value = 'Sumar silla extra en cabecera';
    } else if (people >= 9) {
      setupSelect.value = 'Unir mesas contiguas';
    } else {
      setupSelect.value = 'Armado estándar cómodo';
    }
  }

  const bestTable = findBestFreeTableForPeople(people);
  if (bestTable) {
    selectedTableId = bestTable.id;
    const explain = getSeatingExplanation(people, bestTable);
    const input = document.getElementById('res-table-selected');
    if (input) {
      input.value = `Mesa #${bestTable.number} (${bestTable.zone}) — ${explain}`;
    }
  }
  renderTablesFloorplan();
}

function renderTablesFloorplan() {
  const container = document.getElementById('floor-zones-grid');
  const freeBadge = document.getElementById('tables-free-badge');
  const pubResList = document.getElementById('public-reservations-list');

  const freeCount = restaurantTables.filter((t) => t.status === 'free').length;
  if (freeBadge) freeBadge.textContent = `${freeCount} libres`;

  if (!container) return;

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
                    <div style="font-size:0.65rem; opacity:0.88; margin-top:2px;">${t.flexNote}</div>
                    <div style="font-size:0.68rem; margin-top:4px; font-weight:700;">
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

  const peopleSelect = document.getElementById('res-people');
  const currentPeople = Number(peopleSelect?.value) || t.capacity;
  const effectivePeople = currentPeople <= t.maxFlex ? currentPeople : t.capacity;
  if (peopleSelect && currentPeople > t.maxFlex) {
    peopleSelect.value = String(t.capacity);
  }

  const explain = getSeatingExplanation(effectivePeople, t);
  const input = document.getElementById('res-table-selected');
  if (input) {
    input.value = `Mesa #${t.number} (${t.zone}) — ${explain}`;
  }
  renderTablesFloorplan();
}

function handleManualReservationSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('res-name')?.value.trim() || 'Cliente';
  const people = Number(document.getElementById('res-people')?.value) || 4;
  const time = document.getElementById('res-time')?.value || '21:30 hs';
  const setup = document.getElementById('res-seating-setup')?.value || '';
  const extraNotes = document.getElementById('res-notes')?.value.trim() || '';

  let tableObj = restaurantTables.find((t) => t.id === selectedTableId && t.status === 'free');
  if (!tableObj || tableObj.maxFlex < people) {
    tableObj = findBestFreeTableForPeople(people);
  }

  const explain = getSeatingExplanation(people, tableObj);
  const combinedNotes = [explain, setup !== 'Armado estándar cómodo' ? setup : '', extraNotes]
    .filter(Boolean)
    .join(' • ');

  registerNewReservation({
    name,
    people,
    time,
    area: tableObj ? `${tableObj.zone} (Mesa #${tableObj.number})` : 'Salón Principal',
    tableSetup: explain,
    notes: combinedNotes,
    tableId: tableObj ? tableObj.id : null
  });

  if (document.getElementById('res-name')) document.getElementById('res-name').value = '';
  if (document.getElementById('res-notes')) document.getElementById('res-notes').value = '';
  alert(`¡Reserva confirmada para ${name} (${people} personas) hoy a las ${time}!\nArmado: ${explain}.`);
}

function registerNewReservation(resObj) {
  const peopleCount = Number(resObj.people) || 4;
  let targetTable = null;

  if (resObj.tableId) {
    const candidate = restaurantTables.find((t) => t.id === resObj.tableId && t.status === 'free');
    if (candidate && candidate.maxFlex >= peopleCount) {
      targetTable = candidate;
    }
  }

  if (!targetTable) {
    targetTable = findBestFreeTableForPeople(peopleCount);
  }

  const explain = resObj.tableSetup || getSeatingExplanation(peopleCount, targetTable);

  if (targetTable) {
    targetTable.status = 'occupied';
    targetTable.guest = `${resObj.name || 'Reserva'} (${peopleCount}p • ${resObj.time || '21:30'})`;
    const nextFree = findBestFreeTableForPeople(4);
    if (nextFree) selectedTableId = nextFree.id;
  }

  const newRes = {
    id: `RES-${203 + reservations.length}`,
    tableId: targetTable ? targetTable.id : 'T3',
    name: resObj.name || 'Cliente Web',
    people: peopleCount,
    time: resObj.time || '21:30 hs',
    area: targetTable ? `${targetTable.zone} (Mesa #${targetTable.number})` : resObj.area || 'Patio de Parra',
    notes: [explain, resObj.notes].filter(Boolean).join(' • ')
  };

  reservations.unshift(newRes);
  persistAllState();
  renderTablesFloorplan();
  renderAdminDashboard();
}

function toggleTableOccupiedStatus(tableId) {
  const t = restaurantTables.find((x) => x.id === tableId);
  if (!t) return;
  if (t.status === 'occupied') {
    t.status = 'free';
    t.guest = '';
  } else {
    t.status = 'occupied';
    t.guest = 'Ocupada en Salón';
  }
  persistAllState();
  renderTablesFloorplan();
  renderAdminDashboard();
}

// ============================================================================
// CONSERJE GASTRONÓMICO ("DON VITO")
// ============================================================================
function initWelcomeChat() {
  const box = document.getElementById('chat-messages');
  if (!box) return;
  chatHistory = [];
  box.innerHTML = '';
  appendAssistantMessage({
    reply:
      '¡Buenas noches! Soy **Don Vito**, el mozo virtual de **La Cantina de Don Brasa**.\n\n' +
      'Contame cómo te puedo ayudar hoy:\n' +
      '• 🍕 **¿No saben qué pedir?** Decime qué tienen ganas de comer hoy y cuántos son para recomendarte lo más rico del horno de barro.\n' +
      '• 🛒 **Armo tu pedido:** Escribime como quieras los platos y tu dirección y te los cargo directo al carrito.\n' +
      '• 🪑 **Reservo tu mesa:** Si son 2, 3, 5 o un grupo grande, preparamos la mesa con sillas extra o unimos mesas para que estén cómodos.'
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
  if (!box) return;
  const div = document.createElement('div');
  div.className = 'msg-bubble user';
  div.innerHTML = formatMarkdownText(text);
  box.appendChild(div);
  box.scrollTop = box.scrollHeight;
}

function appendAssistantMessage(aiData) {
  const box = document.getElementById('chat-messages');
  if (!box) return;
  const div = document.createElement('div');
  div.className = 'msg-bubble assistant';

  let innerHtml = `
    <div class="msg-header">Don Vito • Mozo de la Cantina</div>
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
          ✅ Agregado a tu carrito: ${addedNames.join(', ')}
        </div>
      `;
    }
  }

  if (aiData.extractedOrder) {
    applyExtractedCustomerData(aiData.extractedOrder);
  }

  if (aiData.reservation && aiData.reservation.detected) {
    registerNewReservation(aiData.reservation);
    const pCount = Number(aiData.reservation.people) || 4;
    const latestRes = reservations[0];
    innerHtml += `
      <div class="auto-added-pill">
        🪑 Reserva confirmada: ${pCount} personas a las ${aiData.reservation.time || '21:30'} hs en ${
      latestRes ? latestRes.area : 'Salón'
    }
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
          <h4>🍽️ Recomendación de Don Vito (Total: $${comboTotal.toLocaleString('es-AR')})</h4>
          ${rowsHtml}
          <button class="btn-apply-combo" onclick="applySuggestedCombo('${comboId}')">
            🛒 Agregar todo al Carrito ($${comboTotal.toLocaleString('es-AR')})
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
  items.forEach((it) => addToCart(it.id, it.quantity, 'Sugerencia de Don Vito'));
  if (window.innerWidth <= 1040) {
    setMobileMenuSubview('cart');
  } else {
    switchRightTab('cart');
  }
}

function applyExtractedCustomerData(ext) {
  if (!ext) return;
  const nameEl = document.getElementById('cust-name');
  const addrEl = document.getElementById('cust-address');
  const sel = document.getElementById('cust-payment');
  const notesEl = document.getElementById('cust-notes');

  if (ext.customerName && nameEl) nameEl.value = ext.customerName;
  if (ext.address && addrEl) addrEl.value = ext.address;
  if (ext.paymentMethod && sel) {
    const norm = ext.paymentMethod.toLowerCase();
    if (norm.includes('efectivo')) sel.value = 'Efectivo';
    else if (norm.includes('mercado')) sel.value = 'Mercado Pago';
    else if (norm.includes('tarjeta')) sel.value = 'Tarjeta';
    else if (norm.includes('transf')) sel.value = 'Transferencia';
  }
  if (ext.deliveryType === 'takeaway' || ext.deliveryType === 'delivery') {
    setDeliveryType(ext.deliveryType);
  }
  if (ext.notes && notesEl) notesEl.value = ext.notes;
}

function triggerQuickPrompt(promptText) {
  navigateApp('menu');
  if (window.innerWidth <= 1040) {
    setMobileMenuSubview('chat');
  } else {
    switchRightTab('chat');
  }
  const input = document.getElementById('chat-input');
  if (input) {
    input.value = promptText;
    sendChatMessage(promptText);
    input.value = '';
  }
}

async function handleChatSubmit(e) {
  e.preventDefault();
  const input = document.getElementById('chat-input');
  if (!input) return;
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
  loadingDiv.innerHTML = `<div class="msg-header">Don Vito • Mozo de la Cantina</div><div>🔥 <em>Consultando la cocina en vivo...</em></div>`;
  if (mode === 'chat' && box) {
    box.appendChild(loadingDiv);
    box.scrollTop = box.scrollHeight;
  }

  const clientApiKey = sessionStorage.getItem('OPENAI_API_KEY') || localStorage.getItem('OPENAI_API_KEY') || '';
  const selectedModel = sessionStorage.getItem('OPENAI_MODEL') || 'gpt-4o-mini';

  let aiResult = null;

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
      }
    } catch {
      // Fallback al motor local
    }
  }

  if (!aiResult) {
    aiResult = localSmartEngine(userText, mode);
  }

  if (mode === 'chat' && loadingDiv.parentNode) {
    loadingDiv.remove();
  }

  chatHistory.push({ role: 'assistant', content: aiResult.reply });

  if (mode === 'chat') {
    appendAssistantMessage(aiResult);
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

  const sys = `Eres Don Vito, el mozo experto de La Cantina de Don Brasa (Rosario). Catálogo:\n${catalogSummary}\nSi reservan para 3, 5 o 7 personas, explica que se les prepara una mesa amplia de 4, 6 u 8 o se agrega silla cómoda en cabecera. Responde SIEMPRE en JSON con claves: reply (string), suggestedItems (array de {id, quantity}), autoCartAdd (array de {id, quantity}), extractedOrder ({customerName, address, paymentMethod, deliveryType, notes}), reservation ({detected, name, people, time, area, tableSetup, notes}). Modo: ${mode}.`;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: model || 'gpt-4o-mini',
      temperature: 0.35,
      response_format: { type: 'json_object' },
      messages: [{ role: 'system', content: sys }, ...messages.slice(-8)]
    })
  });
  if (!response.ok) return null;
  const data = await response.json();
  return JSON.parse(data.choices[0].message.content);
}

// ============================================================================
// MOTOR INTELIGENTE DE RESPALDO (ENFOCADO EN GUSTOS Y MESAS FLEXIBLES)
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

  // Reserva de mesa inteligente: SOLO si el usuario pide explícitamente reservar mesa (no en preguntas de comida)
  const isExplicitReservation =
    text.includes('reserv') ||
    (text.includes('guardame una mesa') || text.includes('anotanos una mesa') || text.includes('quiero una mesa'));

  if (isExplicitReservation) {
    const peopleMatch = text.match(/(\d+)\s*(?:personas|amigos|cubiertos|comensales)/);
    const timeMatch = text.match(/(\d{1,2}(?::\d{2})?)\s*(?:hs|horas)?/);
    const area = text.includes('patio') ? 'Patio de Parra & Guirnaldas' : 'Salón Histórico (Pellegrini)';
    const rName = result.extractedOrder.customerName || 'Cliente Cantina';
    const people = peopleMatch ? Number(peopleMatch[1]) : 3;
    const time = timeMatch ? (timeMatch[1].includes(':') ? timeMatch[1] : `${timeMatch[1]}:00`) : '21:30';

    const matchedTable = findBestFreeTableForPeople(people);
    const setupText = getSeatingExplanation(people, matchedTable);

    result.reservation = {
      detected: true,
      name: rName,
      people,
      time,
      area: matchedTable ? `${matchedTable.zone} (Mesa #${matchedTable.number})` : area,
      tableSetup: setupText,
      notes: 'Confirmada por Don Vito en el plano'
    };

    result.reply =
      `¡Bárbaro, **${rName}**! 🪑 Ya dejé lista tu reserva para hoy:\n\n` +
      `• **Comensales:** ${people} personas\n` +
      `• **Armado de mesa:** ${setupText} (en ${matchedTable ? `Mesa #${matchedTable.number} de ${matchedTable.zone}` : area}) para que estén bien cómodos.\n` +
      `• **Horario:** ${time} hs\n\n` +
      `Podés ver tu mesa asignada ahora mismo en la pestaña **🪑 Salón & Mesas**.`;
    return result;
  }

  // Recomendación según ganas de comer / grupo de amigos
  if (
    text.includes('ganas') ||
    text.includes('recomend') ||
    text.includes('suger') ||
    text.includes('compartir') ||
    (text.includes('somos') && (text.includes('amigos') || text.includes('personas')))
  ) {
    const hasVeggie = text.includes('veggie') || text.includes('vegetarian');
    const hasCeliac = text.includes('celiac') || text.includes('celíac') || text.includes('sin tacc');
    const wantsMilanesa = text.includes('milanesa') || text.includes('bodeg');

    const combo = [];
    const tryAdd = (id, qty) => {
      const prod = catalog.find((p) => p.id === id && p.inStock);
      if (prod) {
        combo.push({ id: prod.id, quantity: qty, name: prod.name, price: prod.price });
        return true;
      }
      return false;
    };

    if (hasCeliac) tryAdd('p5', 1);
    if (wantsMilanesa) {
      tryAdd('b1', 1);
      tryAdd('e1', 3);
    } else if (hasVeggie) {
      tryAdd('p2', 1) || tryAdd('p1', 1);
      tryAdd('e3', 3);
      tryAdd('e4', 3);
    } else {
      tryAdd('p3', 1) || tryAdd('p1', 1);
      tryAdd('e1', 4);
      tryAdd('b3', 1);
    }
    tryAdd('d2', 1) || tryAdd('d3', 1);

    result.suggestedItems = combo.map((c) => ({ id: c.id, quantity: c.quantity }));
    const listStr = combo.map((c) => `• **${c.quantity}x ${c.name}**`).join('\n');

    result.reply =
      `¡Qué lindo plan! Para compartir y probar lo más rico que está saliendo ahora del horno de barro, te sugiero esta selección bien de bodegón:\n\n` +
      `${listStr}\n\n` +
      `Si te tienta, tocá el botón de acá abajo para sumarlo directo a tu **Carrito**:`;
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

  catalog.forEach((item) => {
    if (!matcherRules.some((r) => r.id === item.id)) {
      const keywords = item.name
        .toLowerCase()
        .split(/\s+/)
        .filter((w) => w.length > 3);
      if (keywords.length > 0 && keywords.some((kw) => text.includes(kw))) {
        result.autoCartAdd.push({ id: item.id, quantity: 1 });
      }
    }
  });

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
      msgParts.push(`¡Excelente elección! Ya sumé a tu carrito:\n\n${summary}`);
    }

    if (outOfStockRequested.length > 0) {
      const names = outOfStockRequested.map((p) => `**${p.name}**`).join(', ');
      const alt = catalog.find((p) => p.inStock && p.category === outOfStockRequested[0].category);
      msgParts.push(
        `⚠️ **Aviso de la Cocina:** Recién se nos terminó la última tanda de ${names}. ${
          alt ? `Te recomiendo probar **${alt.name}** ($${alt.price.toLocaleString('es-AR')}) que está saliendo recién horneada.` : ''
        }`
      );
      if (alt) result.suggestedItems.push({ id: alt.id, quantity: 1 });
    }

    if (result.extractedOrder.address) {
      msgParts.push(`📍 **Dirección anotada:** ${result.extractedOrder.address}`);
    }
    msgParts.push(`Podés revisar y confirmar tu pedido en la pestaña **🛒 Carrito**.`);
    result.reply = msgParts.join('\n\n');
    return result;
  }

  if (text.includes('tacc') || text.includes('celiac') || text.includes('celíac') || text.includes('veggie') || text.includes('vegetarian')) {
    const sintacc = catalog.filter((p) => p.inStock && p.tags.includes('sintacc'));
    const veggie = catalog.filter((p) => p.inStock && p.tags.includes('veggie'));
    result.suggestedItems = [
      ...(sintacc[0] ? [{ id: sintacc[0].id, quantity: 1 }] : []),
      ...(veggie[2] ? [{ id: veggie[2].id, quantity: 2 }] : [])
    ];
    result.reply =
      `En **La Cantina de Don Brasa** tenemos cocina aislada para celíacos y varias especialidades vegetarianas al horno de barro:\n\n` +
      `🌾 **Opciones Sin TACC disponibles hoy:**\n` +
      sintacc.map((p) => `• **${p.name}** ($${p.price.toLocaleString('es-AR')})`).join('\n') +
      `\n\n🌿 **Opciones Vegetarianas:**\n` +
      veggie.slice(0, 5).map((p) => `• **${p.name}** ($${p.price.toLocaleString('es-AR')})`).join('\n');
    return result;
  }

  const avail = catalog.filter((p) => p.inStock);
  result.suggestedItems = avail.slice(0, 3).map((p) => ({ id: p.id, quantity: 1 }));
  result.reply =
    `¡Contame qué tenés ganas de comer hoy! Puedo sugerirte pizzas al molde, empanadas cortadas a cuchillo, platos de bodegón o reservarte una mesa cómoda en el patio.\n\n` +
    `Acá abajo te dejo los favoritos de esta noche por si querés sumarlos al **Carrito** con un clic:`;
  return result;
}

// ============================================================================
// CONFIRMAR PEDIDO Y SEGUIMIENTO EN VIVO (TRACKER)
// ============================================================================
function submitFinalOrder() {
  if (cart.length === 0) {
    alert('Agregá al menos un plato al carrito antes de confirmar tu pedido.');
    return;
  }

  const name = document.getElementById('cust-name')?.value.trim() || 'Cliente Web';
  const address =
    deliveryType === 'takeaway'
      ? 'Retiro en mostrador (Av. Pellegrini 1540)'
      : document.getElementById('cust-address')?.value.trim() || 'Centro, Rosario';
  const payment = document.getElementById('cust-payment')?.value || 'Transferencia';
  const generalNotes = document.getElementById('cust-notes')?.value.trim() || '';
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
    source: '🛒 Pedido Web',
    status: 'new',
    time: nowStr,
    total: finalTotal,
    items: orderItems
  };

  orders.unshift(newOrder);
  activeOrderId = newOrder.id;
  cart = [];
  persistAllState();
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
    wrap.innerHTML = `<p>No hay pedidos activos en este momento.</p>`;
    return;
  }

  const step1Class = currentOrd.status === 'new' ? 'current' : 'done';
  const step2Class = currentOrd.status === 'cooking' ? 'current' : currentOrd.status === 'ready' ? 'done' : '';
  const step3Class = currentOrd.status === 'ready' ? 'current done' : '';

  wrap.innerHTML = `
    <div class="tracker-card">
      <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:12px;">
        <div>
          <span class="eyebrow-tag">SEGUIMIENTO DE MI PEDIDO EN TIEMPO REAL</span>
          <h2 style="font-family:var(--font-serif); color:var(--green-bodegon);">Pedido #${currentOrd.id} — ${currentOrd.customerName}</h2>
          <p class="sub-copy">📍 ${currentOrd.address} • Confirmado a las ${currentOrd.time}</p>
        </div>
        <span class="order-source-badge" style="font-size:0.8rem; padding:6px 10px;">${currentOrd.source}</span>
      </div>

      <div class="tracker-steps">
        <div class="t-step ${step1Class}">
          <strong style="display:block; font-size:0.95rem;">1. Pedido Confirmado</strong>
          <small class="sub-copy">Recibido en cocina sin demoras</small>
        </div>
        <div class="t-step ${step2Class}">
          <strong style="display:block; font-size:0.95rem;">2. En Horno de Barro (430°C)</strong>
          <small class="sub-copy">Maestro pizzero preparando tus platos</small>
        </div>
        <div class="t-step ${step3Class}">
          <strong style="display:block; font-size:0.95rem;">3. En Camino / Listo</strong>
          <small class="sub-copy">Saliendo desde Av. Pellegrini 1540</small>
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
            <span>TOTAL DEL PEDIDO (${currentOrd.paymentMethod})</span>
            <span>$${currentOrd.total.toLocaleString('es-AR')}</span>
          </div>
        </div>
      </div>

      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
        <span class="sub-copy" style="font-size:0.82rem;">💡 El estado se actualiza automáticamente cuando la cocina avanza tu pedido en el panel administrativo.</span>
        <a href="admin.html" class="btn-outline-dark" style="text-decoration:none;">
          👨‍🍳 Abrir Panel Cocina & Admin →
        </a>
      </div>
    </div>
  `;
}

// ============================================================================
// PANEL ADMINISTRADOR (admin.html): ABM DE PRODUCTOS, PRECIOS, STOCK Y COCINA
// ============================================================================
function switchAdminSubtab(tabName) {
  document.querySelectorAll('.adm-subtab').forEach((b) => b.classList.remove('active'));
  document.querySelectorAll('.adm-view').forEach((v) => v.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach((n) => n.classList.remove('active'));
  document.querySelectorAll('.mnav-btn').forEach((m) => m.classList.remove('active'));

  const tab = document.getElementById(`admtab-${tabName}`);
  const view = document.getElementById(`admview-${tabName}`);
  const nav = document.getElementById(`admnav-${tabName}`);
  const mnav = document.getElementById(`mnav-${tabName}`);

  if (tab) tab.classList.add('active');
  if (view) view.classList.add('active');
  if (nav) nav.classList.add('active');
  if (mnav) mnav.classList.add('active');
}

function renderAdminDashboard() {
  const admBadge = document.getElementById('admin-orders-badge');
  if (admBadge) admBadge.textContent = orders.length;

  const kpiOrd = document.getElementById('kpi-orders-count');
  if (!kpiOrd) return; // No estamos en admin.html

  kpiOrd.textContent = orders.length;

  const totalRev = orders.reduce((acc, o) => acc + (o.total || 0), 0);
  const kpiRev = document.getElementById('kpi-revenue');
  if (kpiRev) kpiRev.textContent = '$' + totalRev.toLocaleString('es-AR');

  const kpiCat = document.getElementById('kpi-catalog-count');
  if (kpiCat) kpiCat.textContent = catalog.length;

  const kpiRes = document.getElementById('kpi-reservations-count');
  if (kpiRes) kpiRes.textContent = reservations.length;

  const cols = { new: [], cooking: [], ready: [] };
  orders.forEach((o) => {
    if (cols[o.status]) cols[o.status].push(o);
  });

  const cNew = document.getElementById('count-new');
  const cCook = document.getElementById('count-cooking');
  const cReady = document.getElementById('count-ready');
  if (cNew) cNew.textContent = cols.new.length;
  if (cCook) cCook.textContent = cols.cooking.length;
  if (cReady) cReady.textContent = cols.ready.length;

  const renderOrderCard = (o) => {
    let nextLabel = '';
    if (o.status === 'new') nextLabel = '🔥 Meter al Horno de Barro →';
    else if (o.status === 'cooking') nextLabel = '🛵 Despachar Pedido →';

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

  const kNew = document.getElementById('kanban-new');
  const kCook = document.getElementById('kanban-cooking');
  const kReady = document.getElementById('kanban-ready');
  if (kNew) kNew.innerHTML = cols.new.map(renderOrderCard).join('');
  if (kCook) kCook.innerHTML = cols.cooking.map(renderOrderCard).join('');
  if (kReady) kReady.innerHTML = cols.ready.map(renderOrderCard).join('');

  const stockEl = document.getElementById('admin-stock-list');
  if (stockEl) {
    stockEl.innerHTML = catalog
      .map(
        (item) => `
        <div class="admin-prod-row">
          <div class="stock-dish-cell">
            <img src="${item.image}" alt="${item.name}" class="stock-thumb" loading="lazy" />
            <div>
              <strong>${item.name}</strong>
              <div style="font-size:0.74rem; color:var(--ink-muted);">${item.category} • ID: <code>${item.id}</code></div>
            </div>
          </div>

          <div class="inline-price-box">
            <span>$</span>
            <input
              type="number"
              id="price-input-${item.id}"
              class="inline-price-input"
              value="${item.price}"
              step="50"
              min="100"
            />
            <button
              type="button"
              class="btn-save-price"
              id="btn-save-price-${item.id}"
              onclick="saveInlinePrice('${item.id}')"
            >
              Guardar $
            </button>
          </div>

          <div class="admin-row-actions">
            <button
              type="button"
              class="btn-toggle-stock ${item.inStock ? 'in-stock' : 'out-stock'}"
              onclick="toggleProductStock('${item.id}')"
            >
              ${item.inStock ? '🟢 En Stock' : '🔴 AGOTADO'}
            </button>
            <button type="button" class="btn-edit-prod" onclick="openProductEditorModal('${item.id}')">
              ✏️ Editar
            </button>
            <button type="button" class="btn-delete-prod" onclick="deleteProductFromCatalog('${item.id}')" title="Eliminar producto">
              🗑️
            </button>
          </div>
        </div>
      `
      )
      .join('');
  }

  const resEl = document.getElementById('admin-reservations-list');
  if (resEl) {
    resEl.innerHTML = reservations
      .map(
        (r) => `
        <div class="stock-row">
          <div>
            <strong>🪑 ${r.time} — ${r.name} (${r.people} personas)</strong>
            <div style="font-size:0.75rem; color:var(--ink-muted);">${r.area} • ${r.notes}</div>
          </div>
          <span class="order-source-badge">Confirmada</span>
        </div>
      `
      )
      .join('');
  }

  const tablesCtrlEl = document.getElementById('admin-tables-control-list');
  if (tablesCtrlEl) {
    tablesCtrlEl.innerHTML = restaurantTables
      .map(
        (t) => `
        <div class="stock-row">
          <div>
            <strong>Mesa #${t.number} — ${t.zone} (${t.capacity} a ${t.maxFlex} pers.)</strong>
            <div style="font-size:0.75rem; color:var(--ink-muted);">${
              t.status === 'occupied' ? `🔒 Ocupada: ${t.guest}` : '🟢 Libre para asignar'
            }</div>
          </div>
          <button
            type="button"
            class="btn-toggle-stock ${t.status === 'free' ? 'in-stock' : 'out-stock'}"
            onclick="toggleTableOccupiedStatus('${t.id}')"
          >
            ${t.status === 'free' ? '🟢 Libre (Ocupar)' : '🔓 Liberar Mesa'}
          </button>
        </div>
      `
      )
      .join('');
  }
}

function saveInlinePrice(productId) {
  const input = document.getElementById(`price-input-${productId}`);
  const btn = document.getElementById(`btn-save-price-${productId}`);
  const prod = catalog.find((p) => p.id === productId);
  if (!input || !prod) return;

  const newPrice = Math.max(100, Math.round(Number(input.value) || prod.price));
  prod.price = newPrice;
  persistAllState();
  renderCatalog();
  renderCart();

  if (btn) {
    btn.textContent = '✓ Guardado';
    btn.style.background = 'var(--terracotta)';
    setTimeout(() => {
      btn.textContent = 'Guardar $';
      btn.style.background = 'var(--green-bodegon)';
    }, 1200);
  }
}

function applyBulkPriceChange(percent) {
  const factor = 1 + percent / 100;
  catalog.forEach((item) => {
    item.price = Math.max(100, Math.round((item.price * factor) / 50) * 50);
  });
  persistAllState();
  refreshAllViews();
}

function resetCatalogToDefaults() {
  catalog = JSON.parse(JSON.stringify(INITIAL_CATALOG));
  persistAllState();
  refreshAllViews();
}

function deleteProductFromCatalog(productId) {
  if (catalog.length <= 1) return;
  catalog = catalog.filter((p) => p.id !== productId);
  cart = cart.filter((c) => c.id !== productId);
  persistAllState();
  refreshAllViews();
}

const PRESET_PHOTOS = {
  pizza: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=640&q=80',
  empanada: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=640&q=80',
  bodegon: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=640&q=80',
  bebida: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=640&q=80'
};

function setPresetDishPhoto(type) {
  const input = document.getElementById('edit-prod-image');
  if (input && PRESET_PHOTOS[type]) {
    input.value = PRESET_PHOTOS[type];
  }
}

function handleLocalImageUpload(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    const dataUrl = e.target?.result;
    if (typeof dataUrl === 'string') {
      const imgInput = document.getElementById('edit-prod-image');
      if (imgInput) imgInput.value = dataUrl;
    }
  };
  reader.readAsDataURL(file);
}

function openProductEditorModal(productId = null) {
  const modal = document.getElementById('product-editor-modal');
  const titleEl = document.getElementById('prod-editor-title');
  if (!modal || !titleEl) return;
  const existing = productId ? catalog.find((p) => p.id === productId) : null;

  if (existing) {
    titleEl.textContent = `Editar Plato: ${existing.name}`;
    document.getElementById('edit-prod-id').value = existing.id;
    document.getElementById('edit-prod-name').value = existing.name;
    document.getElementById('edit-prod-category').value = existing.category;
    document.getElementById('edit-prod-price').value = existing.price;
    document.getElementById('edit-prod-stock').value = String(existing.inStock);
    document.getElementById('edit-prod-desc').value = existing.description;
    document.getElementById('edit-prod-image').value = existing.image;
    document.getElementById('edit-tag-popular').checked = existing.tags.includes('popular');
    document.getElementById('edit-tag-sintacc').checked = existing.tags.includes('sintacc');
    document.getElementById('edit-tag-veggie').checked = existing.tags.includes('veggie');
  } else {
    titleEl.textContent = 'Subir Nuevo Plato / Producto a la Carta';
    document.getElementById('edit-prod-id').value = '';
    document.getElementById('edit-prod-name').value = '';
    document.getElementById('edit-prod-category').value = 'Pizzas';
    document.getElementById('edit-prod-price').value = '14500';
    document.getElementById('edit-prod-stock').value = 'true';
    document.getElementById('edit-prod-desc').value = '';
    document.getElementById('edit-prod-image').value = PRESET_PHOTOS.pizza;
    document.getElementById('edit-tag-popular').checked = true;
    document.getElementById('edit-tag-sintacc').checked = false;
    document.getElementById('edit-tag-veggie').checked = false;
  }

  modal.classList.remove('hidden');
}

function closeProductEditorModal() {
  document.getElementById('product-editor-modal')?.classList.add('hidden');
}

function saveProductFromModal(e) {
  e.preventDefault();
  const idVal = document.getElementById('edit-prod-id').value.trim();
  const name = document.getElementById('edit-prod-name').value.trim();
  const category = document.getElementById('edit-prod-category').value;
  const price = Math.max(100, Number(document.getElementById('edit-prod-price').value) || 10000);
  const inStock = document.getElementById('edit-prod-stock').value === 'true';
  const description = document.getElementById('edit-prod-desc').value.trim();
  const image = document.getElementById('edit-prod-image').value.trim() || PRESET_PHOTOS.pizza;

  const tags = [];
  if (document.getElementById('edit-tag-popular').checked) tags.push('popular');
  if (document.getElementById('edit-tag-sintacc').checked) tags.push('sintacc');
  if (document.getElementById('edit-tag-veggie').checked) tags.push('veggie');

  if (idVal) {
    const existing = catalog.find((p) => p.id === idVal);
    if (existing) {
      existing.name = name;
      existing.category = category;
      existing.price = price;
      existing.inStock = inStock;
      existing.description = description;
      existing.image = image;
      existing.tags = tags;
    }
  } else {
    const newId = 'custom_' + (catalog.length + 1) + '_' + Math.floor(Math.random() * 900);
    catalog.unshift({
      id: newId,
      name,
      category,
      price,
      image,
      inStock,
      tags,
      description
    });
  }

  persistAllState();
  refreshAllViews();
  closeProductEditorModal();
}

function advanceOrderStatus(orderId) {
  const ord = orders.find((o) => o.id === orderId);
  if (!ord) return;
  if (ord.status === 'new') ord.status = 'cooking';
  else if (ord.status === 'cooking') ord.status = 'ready';
  persistAllState();
  renderAdminDashboard();
  renderOrderTracker();
}

function toggleProductStock(productId) {
  const prod = catalog.find((p) => p.id === productId);
  if (!prod) return;
  prod.inStock = !prod.inStock;
  persistAllState();
  refreshAllViews();
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
    source: '💬 Mozo Virtual (En Vivo)',
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
  persistAllState();
  renderAdminDashboard();
  renderOrderTracker();
  switchAdminSubtab('kanban');
}

// ============================================================================
// CONFIGURACIÓN DE OPENAI API KEY (SOLO DESDE ADMIN)
// ============================================================================
function openApiKeyModal() {
  const current = sessionStorage.getItem('OPENAI_API_KEY') || '';
  const input = document.getElementById('modal-apikey-input');
  const msg = document.getElementById('apikey-status-msg');
  if (input) input.value = current;
  if (msg) msg.textContent = '';
  document.getElementById('apikey-modal')?.classList.remove('hidden');
}

function closeApiKeyModal() {
  document.getElementById('apikey-modal')?.classList.add('hidden');
}

async function saveApiKeyConfig() {
  const key = document.getElementById('modal-apikey-input')?.value.trim() || '';
  const model = document.getElementById('modal-model-select')?.value || 'gpt-4o-mini';
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

  if (msg) {
    msg.style.color = 'var(--green-ok)';
    msg.style.fontWeight = '700';
    msg.textContent = '✅ Configuración actualizada.';
  }
  setTimeout(() => closeApiKeyModal(), 900);
}
