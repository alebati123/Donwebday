// ============================================================================
// DON BRASA IA — SISTEMA INTEGRAL DE ATENCIÓN, PEDIDOS Y RESERVAS CON IA
// Hackatón DonWeb Day Rosario 2026 ("Del problema al servidor")
// ============================================================================

const BUSINESS_INFO = {
  name: 'Don Brasa — Bodegón & Pizzería Rosarina',
  address: 'Av. Pellegrini 1540, Rosario',
  deliveryFee: 1800,
  freeDeliveryMin: 35000,
  takeawayDiscount: 0.10
};

// Catálogo en tiempo real (sincronizado entre Tienda, Chatbot IA y Panel de Cocina)
const INITIAL_CATALOG = [
  {
    id: 'p1',
    name: 'Pizza Muzzarella Clásica a la Piedra',
    category: 'Pizzas',
    price: 11500,
    emoji: '🍕',
    inStock: true,
    tags: ['popular', 'veggie'],
    description: 'Salsa de tomates mendocinos, 400g de muzzarella seleccionada, orégano y aceitunas verdes (8 porciones).'
  },
  {
    id: 'p2',
    name: 'Pizza Napolitana Especial con Ajo',
    category: 'Pizzas',
    price: 13200,
    emoji: '🍅',
    inStock: true,
    tags: ['popular', 'veggie'],
    description: 'Muzzarella, rodajas de tomate fresco, provenzal casero, queso parmesano gratinado y oliva.'
  },
  {
    id: 'p3',
    name: 'Pizza Fugazzeta Rellena Don Brasa',
    category: 'Pizzas',
    price: 15400,
    emoji: '🧅',
    inStock: true,
    tags: ['veggie'],
    description: 'Doble masa rellena con abundante muzzarella y jamón (opcional sin jamón), cubierta de cebolla caramelizada.'
  },
  {
    id: 'p4',
    name: 'Pizza Rúcula, Crudo y Parmesano',
    category: 'Pizzas',
    price: 15800,
    emoji: '🥬',
    inStock: true,
    tags: ['popular'],
    description: 'Base de muzzarella, rúcula fresca recién cortada, fetas de jamón crudo serrano y escamas de reggianito.'
  },
  {
    id: 'p5',
    name: 'Pizza Muzzarella SIN TACC (Apta Celíacos)',
    category: 'Pizzas',
    price: 13900,
    emoji: '🌾',
    inStock: true,
    tags: ['sintacc', 'veggie'],
    description: 'Elaborada en sector aislado libre de gluten con premezcla certificada y muzzarella de primera calidad (Individual grande).'
  },
  {
    id: 'e1',
    name: 'Empanada de Carne Cortada a Cuchillo',
    category: 'Empanadas',
    price: 1900,
    emoji: '🥟',
    inStock: true,
    tags: ['popular'],
    description: 'Roast beef braseado a cuchillo, cebolla de verdeo, huevo de campo y comino suave al horno de barro.'
  },
  {
    id: 'e2',
    name: 'Empanada de Jamón y Queso Fundido',
    category: 'Empanadas',
    price: 1800,
    emoji: '🧀',
    inStock: true,
    tags: [],
    description: 'Jamón cocido natural en cubos y abundante muzzarella derretida.'
  },
  {
    id: 'e3',
    name: 'Empanada Humita & Queso (Veggie)',
    category: 'Empanadas',
    price: 1850,
    emoji: '🌽',
    inStock: true,
    tags: ['veggie'],
    description: 'Choclo cremoso condimentado con salsa blanca casera, albahaca y cubos de muzzarella.'
  },
  {
    id: 'e4',
    name: 'Empanada Caprese Vegana / Veggie',
    category: 'Empanadas',
    price: 1850,
    emoji: '🌿',
    inStock: true,
    tags: ['veggie'],
    description: 'Tomate concassé, albahaca fresca, aceite de oliva y queso o muzzarella de almendras.'
  },
  {
    id: 'b1',
    name: 'Milanesa Napolitana XXL para Compartir (2 a 3 pers.)',
    category: 'Bodegón',
    price: 22500,
    emoji: '🥩',
    inStock: true,
    tags: ['popular'],
    description: 'Clásico de Pellegrini: peceto tiernizado con salsa fileto, jamón, muzzarella y montaña de papas fritas caseras.'
  },
  {
    id: 'b2',
    name: 'Sorrentinos Caseros de Calabaza y Muzzarella',
    category: 'Bodegón',
    price: 11800,
    emoji: '🍝',
    inStock: true,
    tags: ['veggie'],
    description: 'Pasta artesanal con salsa rosa o crema de hongos y queso estacionado.'
  },
  {
    id: 'b3',
    name: 'Porción de Fainá Clásico al Horno',
    category: 'Bodegón',
    price: 2400,
    emoji: '🥞',
    inStock: true,
    tags: ['sintacc', 'veggie'],
    description: 'Harina de garbanzos pura, crocante por fuera y cremosa por dentro.'
  },
  {
    id: 'd1',
    name: 'Gaseosa Línea Coca-Cola 1.5L',
    category: 'Bebidas y Postres',
    price: 4200,
    emoji: '🥤',
    inStock: true,
    tags: ['sintacc', 'veggie'],
    description: 'Coca-Cola Original o Sin Azúcar 1.5 Litros bien fría.'
  },
  {
    id: 'd2',
    name: 'Limonada Casera con Menta y Jengibre (1L)',
    category: 'Bebidas y Postres',
    price: 4500,
    emoji: '🍋',
    inStock: true,
    tags: ['sintacc', 'veggie', 'popular'],
    description: 'Exprimida en el momento con limones frescos, menta de huerta y jengibre.'
  },
  {
    id: 'd3',
    name: 'Cerveza Artesanal Patagonia Amber Lager 730ml',
    category: 'Bebidas y Postres',
    price: 6800,
    emoji: '🍺',
    inStock: true,
    tags: ['veggie'],
    description: 'Botella grande de 730ml ideal para maridar con pizzas y picadas.'
  },
  {
    id: 'd4',
    name: 'Flan Casero Mixto de Bodegón',
    category: 'Bebidas y Postres',
    price: 4900,
    emoji: '🍮',
    inStock: true,
    tags: ['sintacc', 'veggie'],
    description: 'Con abundante dulce de leche colonial y crema chantilly batida.'
  }
];

let catalog = JSON.parse(JSON.stringify(INITIAL_CATALOG));
let currentCategory = 'all';
let cart = [];
let deliveryType = 'delivery';
let chatHistory = [];
let suggestedCombosStore = {};

// Pedidos iniciales en el Tablero Kanban del negocio para mostrar actividad real
let orders = [
  {
    id: 'DB-1041',
    customerName: 'Sofía Pellegrini',
    address: '9 de Julio 1420 Piso 2 A',
    deliveryType: 'delivery',
    paymentMethod: 'Transferencia',
    source: '🤖 BrasaIA (WhatsApp Parser)',
    status: 'new',
    time: 'Hace 3 min',
    total: 29100,
    items: [
      { name: 'Pizza Muzzarella Clásica a la Piedra', quantity: 1 },
      { name: 'Empanada de Carne Cortada a Cuchillo', quantity: 6 },
      { name: 'Gaseosa Línea Coca-Cola 1.5L', quantity: 1 }
    ]
  },
  {
    id: 'DB-1040',
    customerName: 'Tomás Ríos',
    address: 'Retiro por el local (Av. Pellegrini 1540)',
    deliveryType: 'takeaway',
    paymentMethod: 'Efectivo (10% OFF)',
    source: '🤖 BrasaIA (Combo Grupal)',
    status: 'cooking',
    time: 'Hace 12 min',
    total: 36450,
    items: [
      { name: 'Milanesa Napolitana XXL para Compartir', quantity: 1 },
      { name: 'Pizza Napolitana Especial con Ajo', quantity: 1 },
      { name: 'Limonada Casera con Menta y Jengibre (1L)', quantity: 1 }
    ]
  },
  {
    id: 'DB-1039',
    customerName: 'Valentina Moretti',
    address: 'Bv. Oroño 620 PB',
    deliveryType: 'delivery',
    paymentMethod: 'Mercado Pago',
    source: '🤖 BrasaIA (Chat Web)',
    status: 'ready',
    time: 'Hace 24 min',
    total: 29050,
    items: [
      { name: 'Pizza Muzzarella SIN TACC (Apta Celíacos)', quantity: 1 },
      { name: 'Empanada Humita & Queso (Veggie)', quantity: 4 },
      { name: 'Flan Casero Mixto de Bodegón', quantity: 1 }
    ]
  }
];

let reservations = [
  {
    id: 'RES-201',
    name: 'Familia Benítez',
    people: 5,
    time: '21:00 hs',
    area: 'Salón Interior',
    notes: '1 silla para bebé • Confirmado por BrasaIA'
  },
  {
    id: 'RES-202',
    name: 'Camila & Amigos',
    people: 4,
    time: '22:00 hs',
    area: 'Patio Cervecero',
    notes: 'Menú vegetariano y Sin TACC consultado con IA'
  }
];

// ============================================================================
// INICIALIZACIÓN
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {
  renderCatalog();
  renderCart();
  renderAdminDashboard();
  initWelcomeChat();
  checkServerAiStatus();
});

function switchMainView(viewName) {
  document.querySelectorAll('.main-view').forEach((el) => el.classList.remove('active'));
  document.querySelectorAll('.view-tab').forEach((el) => el.classList.remove('active'));

  const targetView = document.getElementById(`view-${viewName}`);
  const targetTab = document.getElementById(`tab-${viewName}`);
  if (targetView) targetView.classList.add('active');
  if (targetTab) targetTab.classList.add('active');

  if (viewName === 'admin') {
    renderAdminDashboard();
  }
}

function switchRightPanel(panelName) {
  document.querySelectorAll('.rpanel').forEach((el) => el.classList.remove('active'));
  document.querySelectorAll('.asst-tab').forEach((el) => el.classList.remove('active'));

  const panel = document.getElementById(`rpanel-${panelName}`);
  const tab = document.getElementById(`rtab-${panelName}`);
  if (panel) panel.classList.add('active');
  if (tab) tab.classList.add('active');
}

// ============================================================================
// CATÁLOGO INTERACTIVO
// ============================================================================
function selectCategory(cat) {
  currentCategory = cat;
  document.querySelectorAll('.cat-pill').forEach((btn) => {
    btn.classList.toggle('active', btn.getAttribute('onclick').includes(`'${cat}'`));
  });
  renderCatalog();
}

function renderCatalog() {
  const grid = document.getElementById('catalog-grid');
  const query = (document.getElementById('catalog-search')?.value || '').toLowerCase().trim();

  const filtered = catalog.filter((item) => {
    const matchesCat =
      currentCategory === 'all' ||
      (currentCategory === 'diet'
        ? item.tags.includes('sintacc') || item.tags.includes('veggie')
        : item.category === currentCategory);

    const matchesSearch =
      !query ||
      item.name.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.tags.some((t) => t.toLowerCase().includes(query));

    return matchesCat && matchesSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `<div class="text-muted" style="padding: 24px;">No encontramos platos con ese filtro. ¡Preguntale a BrasaIA en el chat para armar una alternativa!</div>`;
    return;
  }

  grid.innerHTML = filtered
    .map((item) => {
      const badges = [];
      if (!item.inStock) {
        badges.push(`<span class="tag-badge soldout">AGOTADO HOY</span>`);
      } else {
        if (item.tags.includes('popular')) badges.push(`<span class="tag-badge popular">🔥 Más pedido</span>`);
        if (item.tags.includes('sintacc')) badges.push(`<span class="tag-badge sintacc">🌾 Sin TACC</span>`);
        if (item.tags.includes('veggie')) badges.push(`<span class="tag-badge veggie">🌱 Veggie</span>`);
      }

      return `
        <article class="product-card ${!item.inStock ? 'out-of-stock' : ''}">
          <div>
            <div class="prod-top">
              <div class="prod-emoji">${item.emoji}</div>
              <div class="prod-badges">${badges.join('')}</div>
            </div>
            <h3 class="prod-title">${item.name}</h3>
            <p class="prod-desc">${item.description}</p>
          </div>
          <div class="prod-footer">
            <span class="prod-price">$${item.price.toLocaleString('es-AR')}</span>
            <button
              class="btn-add-prod"
              ${!item.inStock ? 'disabled' : ''}
              onclick="addToCart('${item.id}', 1)"
            >
              ${item.inStock ? '+ Sumar' : 'Sin Stock'}
            </button>
          </div>
        </article>
      `;
    })
    .join('');
}

// ============================================================================
// CARRITO Y UPSELLING IA
// ============================================================================
function addToCart(productId, qty = 1) {
  const product = catalog.find((p) => p.id === productId);
  if (!product || !product.inStock) return false;

  const existing = cart.find((c) => c.id === productId);
  if (existing) {
    existing.quantity += qty;
  } else {
    cart.push({ id: product.id, quantity: qty });
  }
  renderCart();
  return true;
}

function changeCartQty(productId, delta) {
  const idx = cart.findIndex((c) => c.id === productId);
  if (idx === -1) return;
  cart[idx].quantity += delta;
  if (cart[idx].quantity <= 0) {
    cart.splice(idx, 1);
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
  const breakdownEl = document.getElementById('totals-breakdown');
  const upsellBox = document.getElementById('ai-upsell-box');

  const { subtotal, discount, shipping, finalTotal, totalItems } = calculateCartTotals();
  badgeEl.textContent = totalItems;

  if (cart.length === 0) {
    listEl.innerHTML = `
      <div class="text-muted" style="text-align:center; padding: 26px 12px;">
        🛒 Tu pedido está vacío.<br/>
        <small>Podés sumar productos desde la carta o pedirle a <strong>BrasaIA</strong> que te arme el pedido completo.</small>
      </div>
    `;
    upsellBox.classList.add('hidden');
  } else {
    listEl.innerHTML = cart
      .map((entry) => {
        const prod = catalog.find((p) => p.id === entry.id);
        if (!prod) return '';
        return `
          <div class="cart-item-row">
            <div class="cart-item-info">
              <strong>${prod.emoji} ${prod.name}</strong>
              <small>$${prod.price.toLocaleString('es-AR')} c/u • Subtotal: $${(prod.price * entry.quantity).toLocaleString('es-AR')}</small>
            </div>
            <div class="cart-qty-controls">
              <button class="qty-btn" onclick="changeCartQty('${prod.id}', -1)">−</button>
              <span>${entry.quantity}</span>
              <button class="qty-btn" onclick="changeCartQty('${prod.id}', 1)">+</button>
            </div>
          </div>
        `;
      })
      .join('');

    // Upselling inteligente automático según lo que hay en el carrito
    const hasPizza = cart.some((c) => c.id.startsWith('p'));
    const hasFaina = cart.some((c) => c.id === 'b3');
    const hasDrink = cart.some((c) => c.id.startsWith('d'));

    if (hasPizza && !hasFaina && catalog.find((p) => p.id === 'b3')?.inStock) {
      upsellBox.classList.remove('hidden');
      upsellBox.innerHTML = `
        <div>✨ <strong>Sugerencia IA:</strong> ¿Sumamos una porción de <em>Fainá Clásico al Horno</em> para acompañar tu pizza por $2.400?</div>
        <button class="btn-add-prod" onclick="addToCart('b3', 1)">+ Sumar</button>
      `;
    } else if (!hasDrink && catalog.find((p) => p.id === 'd2')?.inStock) {
      upsellBox.classList.remove('hidden');
      upsellBox.innerHTML = `
        <div>✨ <strong>Sugerencia IA:</strong> ¿Le agregamos una <em>Limonada Casera de 1L</em> bien fría por $4.500?</div>
        <button class="btn-add-prod" onclick="addToCart('d2', 1)">+ Sumar</button>
      `;
    } else {
      upsellBox.classList.add('hidden');
    }
  }

  breakdownEl.innerHTML = `
    <div class="total-line">
      <span>Subtotal productos (${totalItems})</span>
      <span>$${subtotal.toLocaleString('es-AR')}</span>
    </div>
    ${
      deliveryType === 'takeaway'
        ? `<div class="total-line" style="color: #6ee7b7;">
            <span>Descuento Retiro en Local (10% OFF)</span>
            <span>-$${discount.toLocaleString('es-AR')}</span>
          </div>`
        : `<div class="total-line">
            <span>Envío a domicilio ${subtotal >= BUSINESS_INFO.freeDeliveryMin ? '(¡Bonificado!)' : ''}</span>
            <span>${shipping === 0 && subtotal > 0 ? 'GRATIS' : '$' + shipping.toLocaleString('es-AR')}</span>
          </div>`
    }
    <div class="total-line final">
      <span>Total a Pagar</span>
      <span>$${finalTotal.toLocaleString('es-AR')}</span>
    </div>
  `;
}

// ============================================================================
// CONCIERGE CONVERSACIONAL IA (OPENAI API + MOTOR LOCAL RESILIENTE)
// ============================================================================
function initWelcomeChat() {
  chatHistory = [];
  const box = document.getElementById('chat-messages');
  box.innerHTML = '';
  appendAssistantMessage({
    reply:
      '¡Hola! 👋 Soy **BrasaIA**, el asistente inteligente de **Don Brasa (Av. Pellegrini 1540)**.\n\n' +
      'Puedo ayudarte al instante sin esperas de WhatsApp:\n' +
      '• 🍕 **Armar combos** según cuántos son, presupuesto o si hay vegetarianos/celíacos.\n' +
      '• 🛒 **Tomar tu pedido directo** en lenguaje natural y cargarlo al carrito.\n' +
      '• 📅 **Reservar una mesa** en el salón o patio cervecero.\n\n' +
      '¿Qué te gustaría comer o consultar hoy?'
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

function appendAssistantMessage(aiData, providerLabel = 'BrasaIA') {
  const box = document.getElementById('chat-messages');
  const div = document.createElement('div');
  div.className = 'msg-bubble assistant';

  let innerHtml = `
    <div class="msg-header">
      <span>🤖 ${providerLabel}</span>
    </div>
    <div>${formatMarkdownText(aiData.reply)}</div>
  `;

  // Si la IA agregó productos automáticamente al carrito
  if (Array.isArray(aiData.autoCartAdd) && aiData.autoCartAdd.length > 0) {
    const addedNames = [];
    aiData.autoCartAdd.forEach((item) => {
      const prod = catalog.find((p) => p.id === item.id);
      if (prod && prod.inStock) {
        addToCart(prod.id, Number(item.quantity) || 1);
        addedNames.push(`${item.quantity || 1}x ${prod.name}`);
      }
    });
    if (addedNames.length > 0) {
      innerHtml += `
        <div class="auto-added-pill">
          ✅ Cargado en tu carrito: ${addedNames.join(', ')}
        </div>
      `;
    }
  }

  // Si la IA completó datos del cliente (nombre, dirección, pago, modalidad)
  if (aiData.extractedOrder) {
    applyExtractedCustomerData(aiData.extractedOrder);
  }

  // Si la IA detectó una reserva de mesa
  if (aiData.reservation && aiData.reservation.detected) {
    registerNewReservation(aiData.reservation);
    innerHtml += `
      <div class="auto-added-pill">
        📅 Reserva registrada en vivo: ${aiData.reservation.people || 2} personas a las ${
      aiData.reservation.time || '21:30'
    } hs (${aiData.reservation.area || 'Salón'})
      </div>
    `;
  }

  // Si la IA propuso un combo sugerido para agregar con 1 clic
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
            <span>${v.quantity}x ${v.emoji} ${v.name}</span>
            <strong>$${(v.price * v.quantity).toLocaleString('es-AR')}</strong>
          </div>
        `
        )
        .join('');

      innerHtml += `
        <div class="ai-combo-card">
          <h4>✨ Propuesta Armado Inteligente (Total: $${comboTotal.toLocaleString('es-AR')})</h4>
          ${rowsHtml}
          <button class="btn-apply-combo" onclick="applySuggestedCombo('${comboId}')">
            🛒 Agregar todo este combo al carrito ($${comboTotal.toLocaleString('es-AR')})
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
  items.forEach((it) => addToCart(it.id, it.quantity));
  switchRightPanel('cart');
}

function applyExtractedCustomerData(ext) {
  if (!ext) return;
  if (ext.customerName) {
    document.getElementById('cust-name').value = ext.customerName;
  }
  if (ext.address) {
    document.getElementById('cust-address').value = ext.address;
  }
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
  if (ext.notes) {
    document.getElementById('cust-notes').value = ext.notes;
  }
}

function registerNewReservation(resObj) {
  const newRes = {
    id: `RES-${203 + reservations.length}`,
    name: resObj.name || 'Cliente Web IA',
    people: Number(resObj.people) || 4,
    time: resObj.time || '21:30 hs',
    area: resObj.area || 'Patio Cervecero',
    notes: resObj.notes || 'Confirmada automáticamente por BrasaIA'
  };
  reservations.unshift(newRes);
  renderAdminDashboard();
}

function triggerQuickPrompt(promptText) {
  switchRightPanel('chat');
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
  loadingDiv.innerHTML = `<div class="msg-header">🤖 BrasaIA</div><div>⏳ <em>Analizando carta en vivo y procesando tu solicitud...</em></div>`;
  if (mode === 'chat') {
    box.appendChild(loadingDiv);
    box.scrollTop = box.scrollHeight;
  }

  const clientApiKey = sessionStorage.getItem('OPENAI_API_KEY') || localStorage.getItem('OPENAI_API_KEY') || '';
  const selectedModel = sessionStorage.getItem('OPENAI_MODEL') || 'gpt-4o-mini';

  let aiResult = null;
  let usedProvider = 'BrasaIA • OpenAI GPT';

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
        usedProvider = `BrasaIA • OpenAI (${json.model || selectedModel})`;
      }
    }
  } catch {
    // Si está en un servidor puramente estático sin backend Node/Vercel y el usuario cargó una API Key en el navegador:
  }

  // Intento directo a OpenAI si hay API Key en sesión y el backend es estático
  if (!aiResult && clientApiKey && clientApiKey.startsWith('sk-')) {
    try {
      const directResp = await callOpenAiDirectlyFromBrowser(chatHistory, clientApiKey, selectedModel, mode);
      if (directResp) {
        aiResult = directResp;
        usedProvider = `BrasaIA • OpenAI (${selectedModel})`;
      }
    } catch {
      // Fallback al motor local
    }
  }

  // Motor Inteligente Local de Respaldo (100% funcional incluso sin internet o antes de cargar la API Key)
  if (!aiResult) {
    aiResult = localSmartEngine(userText, mode);
    usedProvider = 'BrasaIA • Motor Inteligente Integrado';
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

// Llamada directa desde el navegador en caso de hosting estático + API Key ingresada en el modal
async function callOpenAiDirectlyFromBrowser(messages, apiKey, model, mode) {
  const catalogSummary = catalog
    .map(
      (i) =>
        `- ID: "${i.id}" | ${i.name} | $${i.price} | ${i.inStock ? 'DISPONIBLE' : 'AGOTADO'} | Tags: ${i.tags.join(',')}`
    )
    .join('\n');

  const sys = `Eres BrasaIA de Don Brasa (Rosario). Catálogo:\n${catalogSummary}\nResponde SIEMPRE en JSON con claves: reply (string), suggestedItems (array de {id, quantity}), autoCartAdd (array de {id, quantity}), extractedOrder ({customerName, address, paymentMethod, deliveryType, notes}), reservation ({detected, name, people, time, area, notes}). Modo: ${mode}.`;

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
// MOTOR NLU LOCAL DE RESPALDO (GARANTIZA 0 FALLOS EN LA DEMO ANTE EL JURADO)
// ============================================================================
function localSmartEngine(rawText, mode = 'chat') {
  const text = rawText.toLowerCase();
  const result = {
    reply: '',
    suggestedItems: [],
    autoCartAdd: [],
    extractedOrder: {},
    reservation: { detected: false }
  };

  // 1. Detectar datos de cliente / dirección / pago en el texto
  const addressMatch = rawText.match(
    /(?:a\s+|en\s+|direcci[oó]n[:\s]+)?((?:bv\.?\s*oro[ñn]o|pellegrini|rioja|cordoba|c[oó]rdoba|santa\s+fe|san\s+mart[ií]n|mitre|sarmiento|entre\s+r[ií]os|corrientes|9\s+de\s+julio|3\s+de\s+febrero|mendoza|san\s+juan|urquiza|italia|espa[ñn]a|dorrego|moreno|balcarce|alear|v[eé]lez\s+sarsfield|ov\.?\s*lagos|francia|callao|pichincha)\s+\d{2,5}(?:\s*piso\s*\w+)?(?:\s*dto\s*\w+|\s*[a-z])?)/i
  );
  if (addressMatch) {
    result.extractedOrder.address = addressMatch[1].trim();
    result.extractedOrder.deliveryType = 'delivery';
  }
  if (text.includes('retiro') || text.includes('passo a buscar') || text.includes('paso a buscar') || text.includes('take away')) {
    result.extractedOrder.deliveryType = 'takeaway';
  }
  const nameMatch = rawText.match(/(?:a\s+nombre\s+de|soy|me\s+llamo)\s+([A-ZÁÉÍÓÚÑa-záéíóúñ]+(?:\s+[A-ZÁÉÍÓÚÑa-záéíóúñ]+)?)/i);
  if (nameMatch) {
    result.extractedOrder.customerName = nameMatch[1].trim();
  }
  if (text.includes('transferencia')) result.extractedOrder.paymentMethod = 'Transferencia';
  else if (text.includes('efectivo')) result.extractedOrder.paymentMethod = 'Efectivo';
  else if (text.includes('mercado pago') || text.includes('mercadopago')) result.extractedOrder.paymentMethod = 'Mercado Pago';

  // 2. Detectar si es una RESERVA de mesa
  if (text.includes('reserv') || (text.includes('mesa') && (text.includes('personas') || text.includes('hs') || text.includes('21') || text.includes('22')))) {
    const peopleMatch = text.match(/(\d+)\s*(?:personas|amigos|comensales)/);
    const timeMatch = text.match(/(\d{1,2}(?::\d{2})?)\s*(?:hs|horas)?/);
    const area = text.includes('patio') ? 'Patio Cervecero' : 'Salón Interior';
    const rName = result.extractedOrder.customerName || 'Cliente Web';
    const people = peopleMatch ? Number(peopleMatch[1]) : 4;
    const time = timeMatch ? (timeMatch[1].includes(':') ? timeMatch[1] : `${timeMatch[1]}:00`) : '21:30';

    result.reservation = {
      detected: true,
      name: rName,
      people,
      time,
      area,
      notes: 'Reserva confirmada automáticamente por BrasaIA'
    };
    result.reply =
      `¡Excelente, **${rName}**! 📅 Ya dejé confirmada tu reserva en nuestro sistema en vivo:\n\n` +
      `• **Comensales:** ${people} personas\n` +
      `• **Horario:** Hoy a las ${time} hs\n` +
      `• **Sector:** ${area}\n\n` +
      `Te esperamos en **Av. Pellegrini 1540**. Podés ver tu reserva reflejada ahora mismo en el **Panel del Negocio**.`;
    return result;
  }

  // 3. Detectar armado de COMBO por presupuesto o grupo de amigos
  if (
    text.includes('presupuesto') ||
    text.includes('gastar') ||
    text.includes('combo') ||
    text.includes('recomend') ||
    (text.includes('somos') && (text.includes('amigos') || text.includes('personas')))
  ) {
    const budgetMatch = rawText.replace(/\./g, '').match(/\$?\s*(\d{4,6})/);
    const budget = budgetMatch ? Number(budgetMatch[1]) : 34000;
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

    if (hasCeliac) {
      tryAdd('p5', 1);
    }
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
      `¡Armé la combinación ideal respetando tu tope de **$${budget.toLocaleString('es-AR')}** y solo con platos en stock en cocina! 🔥\n\n` +
      `${listStr}\n\n` +
      `💰 **Total del Combo: $${runningTotal.toLocaleString('es-AR')}** ${
        runningTotal >= BUSINESS_INFO.freeDeliveryMin ? '(¡Con envío GRATIS incluido!)' : `(Te sobran $${(budget - runningTotal).toLocaleString('es-AR')} de tu presupuesto)`
      }.\n\n` +
      `Hacé clic en el botón verde de acá abajo para sumarlo completo a tu pedido:`;
    return result;
  }

  // 4. Detectar productos específicos pedidos (tanto en chat como en pegado de WhatsApp)
  const wordNums = { una: 1, un: 1, uno: 1, dos: 2, tres: 3, cuatro: 4, cinco: 5, seis: 6, media: 6, docena: 12 };
  const matcherRules = [
    { id: 'p5', regex: /(\d+|una|un|dos|tres)?\s*(?:pizzas?\s*)?(?:muzza(?:rella)?\s+)?sin\s+tacc/i },
    { id: 'p2', regex: /(\d+|una|un|dos|tres)?\s*(?:pizzas?\s*)?napolitanas?/i },
    { id: 'p3', regex: /(\d+|una|un|dos|tres)?\s*(?:pizzas?\s*)?fugazzetas?/i },
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
    { id: 'd3', regex: /(\d+|una|un|dos)?\s*(?:cervezas?|patagonia|birras?)/i },
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
      msgParts.push(`¡Perfecto! Ya procesé tu pedido y lo sumé automáticamente al carrito:\n\n${summary}`);
    }

    if (outOfStockRequested.length > 0) {
      const names = outOfStockRequested.map((p) => `**${p.name}**`).join(', ');
      const alt = catalog.find((p) => p.inStock && p.category === outOfStockRequested[0].category);
      msgParts.push(
        `⚠️ **Aviso de stock en vivo:** En este momento se acaba de agotar ${names} en cocina. ${
          alt ? `Te sugiero reemplazarlo por **${alt.name}** ($${alt.price.toLocaleString('es-AR')}) que está disponible recién salido.` : ''
        }`
      );
      if (alt) {
        result.suggestedItems.push({ id: alt.id, quantity: 1 });
      }
    }

    if (result.extractedOrder.address) {
      msgParts.push(`📍 **Dirección detectada:** ${result.extractedOrder.address}`);
    }
    if (result.extractedOrder.paymentMethod) {
      msgParts.push(`💳 **Medio de pago:** ${result.extractedOrder.paymentMethod}`);
    }
    msgParts.push(`Podés revisar y confirmar el envío a cocina en la pestaña **🛒 Mi Pedido**.`);
    result.reply = msgParts.join('\n\n');
    return result;
  }

  // 5. Consultas de Celíacos / Sin TACC / Veggie
  if (text.includes('tacc') || text.includes('celiac') || text.includes('celíac') || text.includes('veggie') || text.includes('vegetarian')) {
    const sintacc = catalog.filter((p) => p.inStock && p.tags.includes('sintacc'));
    const veggie = catalog.filter((p) => p.inStock && p.tags.includes('veggie'));
    result.suggestedItems = [
      ...(sintacc[0] ? [{ id: sintacc[0].id, quantity: 1 }] : []),
      ...(veggie[2] ? [{ id: veggie[2].id, quantity: 2 }] : [])
    ];
    result.reply =
      `¡Sí! Cuidamos muchísimo las opciones especiales y están todas identificadas en nuestra carta en vivo:\n\n` +
      `🌾 **Opciones Sin TACC (Aptas Celíacos en sector aislado):**\n` +
      sintacc.map((p) => `• **${p.name}** ($${p.price.toLocaleString('es-AR')})`).join('\n') +
      `\n\n🌱 **Opciones Vegetarianas destacadas:**\n` +
      veggie.slice(0, 5).map((p) => `• **${p.name}** ($${p.price.toLocaleString('es-AR')})`).join('\n');
    return result;
  }

  // 6. Consultas de envío, zonas, horarios y medios de pago
  if (text.includes('envío') || text.includes('envio') || text.includes('pichincha') || text.includes('pago') || text.includes('horario') || text.includes('donde')) {
    result.reply =
      `📍 **Información de Entregas y Pagos en Don Brasa:**\n\n` +
      `• **Dirección del local:** Av. Pellegrini 1540, Rosario (Abierto de 19:00 a 00:30 hs).\n` +
      `• **Zonas de Delivery:** Centro, Macrocentro, Pichincha, Echesortu y Abasto.\n` +
      `• **Costo de envío:** $1.800 (¡**GRATIS** en pedidos desde $35.000!). Demora estimada: 35-40 min.\n` +
      `• **Take Away (Retiro en local):** Listo en 20 min con **10% de descuento** en efectivo.\n` +
      `• **Medios de pago:** Transferencia (Alias: \`DONBRASA.ROSARIO\`), Mercado Pago, Efectivo y Tarjetas.`;
    return result;
  }

  // Respuesta general con sugerencia de los más pedidos
  result.suggestedItems = [
    { id: 'p1', quantity: 1 },
    { id: 'e1', quantity: 4 },
    { id: 'd2', quantity: 1 }
  ];
  result.reply =
    `¡Con gusto te ayudo! En **Don Brasa** podés decirme directamente qué tenés ganas de comer, cuántos son y cuánto quieren gastar, o pegar el pedido directo.\n\n` +
    `Te dejo acá abajo nuestro **Combo Clásico Rosarino más pedido de la noche** por si querés sumarlo con un clic:`;
  return result;
}

// ============================================================================
// TRANSFORMADOR DE MENSAJE DE WHATSAPP A PEDIDO (SUB-PANEL 2)
// ============================================================================
const WA_SAMPLES = {
  1: 'Hola buenas noches! Soy Martín Gómez, mandame por favor 1 pizza napolitana especial, 6 empanadas de carne cortada a cuchillo, 2 de jamon y queso y una coca de litro y medio a Bv. Oroño 840 Piso 3 B. Pago por transferencia. Gracias!',
  2: 'Hola che te paso el pedido del audio: somos varios acá en Rioja 1850, mandanos 1 milanesa napolitana para compartir, 1 pizza de muzzarella clásica y 1 limonada de litro. A nombre de Lucía, pagamos con Mercado Pago.',
  3: 'Buenas! Soy Federico, paso a retirar por el local en 20 minutos: preparame 1 pizza muzzarella sin TACC, 4 empanadas de humita y 1 porción de fainá. Pago en efectivo en el mostrador.'
};

function loadWhatsAppSample(num) {
  const input = document.getElementById('wa-raw-input');
  input.value = WA_SAMPLES[num] || '';
}

async function processWhatsAppText() {
  const raw = document.getElementById('wa-raw-input').value.trim();
  const resBox = document.getElementById('wa-parse-result');
  const btn = document.getElementById('btn-parse-wa');

  if (!raw) {
    resBox.classList.remove('hidden');
    resBox.innerHTML = '⚠️ Pegá un mensaje o elegí uno de los ejemplos de arriba primero.';
    return;
  }

  btn.disabled = true;
  btn.textContent = '⏳ Extrayendo productos, cantidades y dirección con IA...';

  // Limpiamos carrito actual para cargar limpio el pedido de WhatsApp
  cart = [];
  const aiData = await sendChatMessage(raw, 'whatsapp_parser');

  if (Array.isArray(aiData.autoCartAdd)) {
    aiData.autoCartAdd.forEach((item) => addToCart(item.id, Number(item.quantity) || 1));
  }
  if (aiData.extractedOrder) {
    applyExtractedCustomerData(aiData.extractedOrder);
  }

  btn.disabled = false;
  btn.textContent = '✨ Procesar con IA y Armar Pedido Automático';

  const { finalTotal, totalItems } = calculateCartTotals();
  resBox.classList.remove('hidden');
  resBox.innerHTML = `
    <div style="margin-bottom:8px; color:#6ee7b7; font-weight:700;">
      ✅ ¡Mensaje de WhatsApp transformado en comanda estructurada!
    </div>
    <div>• <strong>Productos detectados:</strong> ${totalItems} unidades cargadas al carrito</div>
    <div>• <strong>Cliente:</strong> ${document.getElementById('cust-name').value || 'Detectado'}</div>
    <div>• <strong>Entrega:</strong> ${
      deliveryType === 'takeaway'
        ? 'Retiro en local (10% OFF)'
        : document.getElementById('cust-address').value || 'Envío a domicilio'
    }</div>
    <div>• <strong>Total calculado:</strong> $${finalTotal.toLocaleString('es-AR')}</div>
    <button class="btn-primary" style="margin-top:10px;" onclick="switchRightPanel('cart')">
      🛒 Ir al Carrito Listo para Confirmar (${totalItems})
    </button>
  `;
}

// ============================================================================
// CONFIRMACIÓN DE PEDIDO Y SINCRONIZACIÓN CON EL TABLERO KANBAN DE COCINA
// ============================================================================
function submitFinalOrder() {
  if (cart.length === 0) {
    alert('Agregá al menos un producto al pedido antes de confirmar.');
    return;
  }

  const name = document.getElementById('cust-name').value.trim() || 'Cliente Web';
  const address =
    deliveryType === 'takeaway'
      ? 'Retiro por el local (Av. Pellegrini 1540)'
      : document.getElementById('cust-address').value.trim() || 'Centro, Rosario';
  const payment = document.getElementById('cust-payment').value;
  const { finalTotal } = calculateCartTotals();

  const orderItems = cart
    .map((entry) => {
      const p = catalog.find((x) => x.id === entry.id);
      return p ? { name: p.name, quantity: entry.quantity, price: p.price } : null;
    })
    .filter(Boolean);

  const newOrder = {
    id: `DB-${1042 + orders.length}`,
    customerName: name,
    address,
    deliveryType,
    paymentMethod: payment,
    source: '🤖 BrasaIA (Web Directo)',
    status: 'new',
    time: 'Recién ingresado',
    total: finalTotal,
    items: orderItems
  };

  orders.unshift(newOrder);
  cart = [];
  renderCart();
  renderAdminDashboard();

  const ticketEl = document.getElementById('order-ticket-content');
  ticketEl.innerHTML = `
    <div><strong>Comanda N°:</strong> #${newOrder.id}</div>
    <div><strong>Cliente:</strong> ${newOrder.customerName}</div>
    <div><strong>Entrega:</strong> ${newOrder.address}</div>
    <div><strong>Pago:</strong> ${newOrder.paymentMethod}</div>
    <hr style="border:none; border-top:1px dashed #334155; margin:8px 0;" />
    ${newOrder.items.map((i) => `<div>• ${i.quantity}x ${i.name}</div>`).join('')}
    <hr style="border:none; border-top:1px dashed #334155; margin:8px 0;" />
    <div style="font-size:1rem; font-weight:800; color:#fbbf24;">TOTAL: $${newOrder.total.toLocaleString('es-AR')}</div>
  `;

  document.getElementById('order-modal').classList.remove('hidden');
}

function closeOrderModal() {
  document.getElementById('order-modal').classList.add('hidden');
}

function closeOrderModalAndGoAdmin() {
  closeOrderModal();
  switchMainView('admin');
}

// ============================================================================
// PANEL DEL COMERCIO (KANBAN EN VIVO, CONTROL DE STOCK Y RESERVAS)
// ============================================================================
function renderAdminDashboard() {
  // Actualizar badge superior y KPIs
  document.getElementById('admin-orders-badge').textContent = orders.length;
  document.getElementById('kpi-orders-count').textContent = orders.length;

  const totalRev = orders.reduce((acc, o) => acc + (o.total || 0), 0);
  document.getElementById('kpi-revenue').textContent = '$' + totalRev.toLocaleString('es-AR');

  const minsSaved = orders.length * 8 + reservations.length * 5;
  const hrs = Math.floor(minsSaved / 60);
  const remMins = minsSaved % 60;
  document.getElementById('kpi-time-saved').textContent = hrs > 0 ? `${hrs}h ${remMins}m` : `${remMins} min`;
  document.getElementById('kpi-reservations-count').textContent = reservations.length;

  // Renderizar columnas Kanban
  const cols = { new: [], cooking: [], ready: [] };
  orders.forEach((o) => {
    if (cols[o.status]) cols[o.status].push(o);
  });

  document.getElementById('count-new').textContent = cols.new.length;
  document.getElementById('count-cooking').textContent = cols.cooking.length;
  document.getElementById('count-ready').textContent = cols.ready.length;

  const renderOrderCard = (o) => {
    let nextLabel = '';
    if (o.status === 'new') nextLabel = '🔥 Pasar a Cocina / Horno →';
    else if (o.status === 'cooking') nextLabel = '🛵 Marcar Listo / En Camino →';

    return `
      <div class="order-card">
        <div class="order-card-top">
          <span class="order-id">#${o.id} • ${o.customerName}</span>
          <span class="order-source-badge">${o.source}</span>
        </div>
        <div class="text-muted" style="font-size:0.76rem;">📍 ${o.address} (${o.time})</div>
        <ul class="order-items-ul">
          ${o.items.map((it) => `<li>• <strong>${it.quantity}x</strong> ${it.name}</li>`).join('')}
        </ul>
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <span class="text-muted" style="font-size:0.75rem;">💳 ${o.paymentMethod}</span>
          <strong style="color:#fbbf24;">$${o.total.toLocaleString('es-AR')}</strong>
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

  // Renderizar lista de control de stock en tiempo real
  const stockEl = document.getElementById('admin-stock-list');
  stockEl.innerHTML = catalog
    .map(
      (item) => `
      <div class="stock-row">
        <div>
          <strong>${item.emoji} ${item.name}</strong>
          <small class="text-muted" style="margin-left:6px;">$${item.price.toLocaleString('es-AR')}</small>
        </div>
        <button
          class="btn-toggle-stock ${item.inStock ? 'in-stock' : 'out-stock'}"
          onclick="toggleProductStock('${item.id}')"
        >
          ${item.inStock ? '✅ Disponible (Click para Agotar)' : '❌ AGOTADO (Click para Activar)'}
        </button>
      </div>
    `
    )
    .join('');

  // Renderizar lista de reservas tomadas por IA
  const resEl = document.getElementById('admin-reservations-list');
  resEl.innerHTML = reservations
    .map(
      (r) => `
      <div class="stock-row">
        <div>
          <strong>📅 ${r.time} — ${r.name} (${r.people} pers.)</strong>
          <div class="text-muted" style="font-size:0.76rem;">Sector: ${r.area} • ${r.notes}</div>
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
    source: '🤖 BrasaIA (Simulación En Vivo)',
    status: 'new',
    time: 'Ahora mismo',
    total: 27400,
    items: [
      { name: 'Pizza Rúcula, Crudo y Parmesano', quantity: 1 },
      { name: 'Empanada de Carne Cortada a Cuchillo', quantity: 4 },
      { name: 'Limonada Casera con Menta y Jengibre (1L)', quantity: 1 }
    ]
  };
  orders.unshift(simOrder);
  renderAdminDashboard();
}

// ============================================================================
// CONFIGURACIÓN DE OPENAI API KEY (MODAL EN CALIENTE SIN EXPONER EN GITHUB)
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
        txt.textContent = `OpenAI Activo (${data.model || 'gpt-4o-mini'})`;
        return;
      }
    }
  } catch {
    // Servidor estático
  }

  if (localKey) {
    dot.classList.remove('hybrid');
    txt.textContent = 'OpenAI Activo (Sesión)';
  } else {
    dot.classList.add('hybrid');
    txt.textContent = 'IA Activa (Configurar OpenAI Key)';
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
    // Si está en Vercel/estático, ya quedó en sessionStorage/localStorage
  }

  await checkServerAiStatus();
  msg.textContent = '✅ Configuración guardada y activa. La clave NO se sube a GitHub.';
  setTimeout(() => closeApiKeyModal(), 900);
}

