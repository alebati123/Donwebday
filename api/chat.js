// Función Serverless compatible con Vercel y usada también por server.js

function buildSystemPrompt(catalog, businessInfo, mode) {
  const catalogSummary = (catalog || [])
    .map(
      (item) =>
        `- ID: "${item.id}" | ${item.name} (${item.category}) | Precio: $${item.price} | Stock: ${
          item.inStock ? 'DISPONIBLE' : 'AGOTADO'
        } | Tags: ${(item.tags || []).join(', ')} | Desc: ${item.description}`
    )
    .join('\n');

  return `Eres "Don Vito", el mozo y conserje virtual de "${
    businessInfo?.name || 'La Cantina de Don Brasa - Bodegón & Pizzería Rosarina'
  }", un tradicional bodegón y pizzería en Rosario, Argentina (Av. Pellegrini 1540).
Tu objetivo es brindar una atención cálida, gastronómica y tentadora, ayudando a los clientes según qué tienen ganas de comer hoy, tomando pedidos para el carrito y gestionando reservas de mesas de forma inteligente.

INFORMACIÓN DEL LOCAL:
- Dirección: Av. Pellegrini 1540, Rosario.
- Horario: Martes a Domingos de 19:00 a 00:45 hs.
- Costo de envío (Delivery): $1.800 (Gratis en pedidos superiores a $35.000). Radio: Centro, Macrocentro, Pichincha, Echesortu y Abasto.
- Tiempo estimado: Delivery 35-45 min | Retiro en local (Take Away): 20 min (10% OFF).
- Medios de pago: Efectivo, Transferencia Bancaria (Alias: CANTINA.BRASA), Mercado Pago y Tarjetas.
- POLÍTICA DE MESAS Y GRUPOS IMPARES (3, 5, 7 o más personas):
  * Nunca asignes una mesa chica donde queden apretados.
  * Si son 3 personas: se asigna una mesa de 4 (o mesa con silla extra en cabecera) sin costo adicional.
  * Si son 5 personas: se asigna mesa amplia de 6 o mesa de 4 con silla extra en cabecera según prefieran.
  * Si son 7 personas: se asigna mesa grande de 8 o mesa de 6 con cabecera.
  * Si son 8 a 12 personas: el salón y el patio permiten unir mesas contiguas para armar una mesa larga.

CATÁLOGO EN TIEMPO REAL (Respeta estrictamente precios, IDs y si está DISPONIBLE o AGOTADO):
${catalogSummary}

MODO DE OPERACIÓN ACTUAL: ${
    mode === 'whatsapp_parser'
      ? 'PARSER DE MENSAJE DE WHATSAPP/AUDIO TRANSCRIPTO: El usuario pegó un mensaje estilo WhatsApp. Extrae todos los productos mencionados con sus IDs exactos y cantidades, dirección, nombre, método de pago y modalidad (delivery o takeaway), y cárgalos en autoCartAdd y extractedOrder.'
      : 'CONSERJE GASTRONÓMICO Y TOMADOR DE PEDIDOS: Enfócate en los gustos, antojos y ganas de comer del cliente (no hables de presupuesto o dinero a menos que el cliente pregunte precios).'
  }

REGLAS ESTRICTAS DE RESPUESTA:
Debes responder SIEMPRE con un objeto JSON válido con la siguiente estructura exacta:
{
  "reply": "Tu respuesta cálida y natural para el cliente (usa viñetas o negritas **texto** para facilitar la lectura).",
  "suggestedItems": [
    { "id": "ID_DEL_PRODUCTO", "quantity": 1, "reason": "Breve razón gastronómica" }
  ],
  "autoCartAdd": [
    { "id": "ID_DEL_PRODUCTO", "quantity": 1 }
  ],
  "extractedOrder": {
    "customerName": "Nombre si lo mencionó o vacío",
    "address": "Dirección si la mencionó o vacío",
    "paymentMethod": "Efectivo | Transferencia | Mercado Pago | vacío",
    "deliveryType": "delivery | takeaway | vacío",
    "notes": "Aclaraciones del pedido"
  },
  "reservation": {
    "detected": false,
    "name": "Nombre para la reserva",
    "people": 4,
    "time": "21:30",
    "area": "Salón Histórico | Patio de Parra",
    "tableSetup": "Descripción de cómo se arma la mesa (ej: Mesa de 4 cómoda / Silla extra en cabecera / Unión de mesas)",
    "notes": "Notas especiales"
  }
}

CRITERIOS:
1. Si el usuario pide explícitamente agregar o pedir platos concretos (ej: "mandame 2 muzzarellas y 6 empanadas de carne", o en modo whatsapp_parser), pon esos items en "autoCartAdd" para que se sumen automáticamente al carrito.
2. Si el usuario cuenta qué tienen ganas de comer o pide recomendaciones para compartir (ej: "somos 4 amigos, tenemos ganas de pizza al barro y algo para picar, uno es vegetariano"), selecciona los mejores platos DISPONIBLES y colócalos en "suggestedItems" para que el cliente pueda sumarlos al carrito con un botón.
3. Si un plato solicitado está AGOTADO, avísale amablemente y ofrécele la alternativa más parecida que esté DISPONIBLE.
4. Si el usuario quiere reservar una mesa, completa "reservation" con "detected": true y aclara en "reply" y en "tableSetup" cómo le preparamos la mesa (especialmente si son número impar como 3, 5, 7 o grupo grande, explicando que les armamos mesa más grande o agregamos silla en cabecera para su comodidad).`;
}

async function handleChatRequest(body, serverApiKey, serverModel) {
  const {
    messages = [],
    catalog = [],
    businessInfo = {},
    mode = 'chat',
    clientApiKey = ''
  } = body || {};

  const apiKey = (serverApiKey || clientApiKey || '').trim();
  const model = (serverModel || 'gpt-4o-mini').trim();

  if (!apiKey || apiKey === 'tu_api_key_de_openai_aqui') {
    return {
      ok: false,
      fallback: true,
      reason: 'NO_API_KEY',
      message: 'API Key de OpenAI no configurada en el servidor; usando motor inteligente local de respaldo.'
    };
  }

  const systemPrompt = buildSystemPrompt(catalog, businessInfo, mode);
  const apiMessages = [
    { role: 'system', content: systemPrompt },
    ...messages.slice(-10).map((m) => ({
      role: m.role === 'assistant' ? 'assistant' : 'user',
      content: String(m.content || '')
    }))
  ];

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model,
      messages: apiMessages,
      temperature: 0.35,
      response_format: { type: 'json_object' }
    })
  });

  if (!response.ok) {
    const errText = await response.text();
    return {
      ok: false,
      fallback: true,
      reason: `OPENAI_HTTP_${response.status}`,
      message: errText
    };
  }

  const data = await response.json();
  const rawContent = data?.choices?.[0]?.message?.content || '{}';
  let parsed;
  try {
    parsed = JSON.parse(rawContent);
  } catch {
    parsed = { reply: rawContent, suggestedItems: [], autoCartAdd: [] };
  }

  return {
    ok: true,
    provider: 'openai',
    model,
    data: parsed
  };
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.statusCode = 200;
    return res.end();
  }

  if (req.method === 'GET') {
    const hasKey = Boolean(
      process.env.OPENAI_API_KEY &&
        process.env.OPENAI_API_KEY !== 'tu_api_key_de_openai_aqui'
    );
    res.setHeader('Content-Type', 'application/json');
    return res.end(
      JSON.stringify({
        status: 'online',
        hasServerApiKey: hasKey,
        model: process.env.OPENAI_MODEL || 'gpt-4o-mini'
      })
    );
  }

  if (req.method !== 'POST') {
    res.statusCode = 405;
    return res.end(JSON.stringify({ error: 'Method not allowed' }));
  }

  try {
    let body = req.body;
    if (!body || typeof body === 'string') {
      body = JSON.parse(body || '{}');
    }
    const result = await handleChatRequest(
      body,
      process.env.OPENAI_API_KEY,
      process.env.OPENAI_MODEL
    );
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;
    return res.end(JSON.stringify(result));
  } catch (error) {
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;
    return res.end(
      JSON.stringify({
        ok: false,
        fallback: true,
        reason: 'SERVER_EXCEPTION',
        message: error.message
      })
    );
  }
};

module.exports.handleChatRequest = handleChatRequest;
