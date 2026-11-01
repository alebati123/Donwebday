const http = require('http');
const fs = require('fs');
const path = require('path');
const { handleChatRequest } = require('./api/chat');

// Carga automática de archivo .env sin requerir dependencias externas (npm install cero)
function loadEnvFile() {
  const envPath = path.join(__dirname, '.env');
  if (!fs.existsSync(envPath)) return;
  try {
    const content = fs.readFileSync(envPath, 'utf8');
    content.split(/\r?\n/).forEach((line) => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) return;
      const eqIdx = trimmed.indexOf('=');
      if (eqIdx === -1) return;
      const key = trimmed.slice(0, eqIdx).trim();
      let val = trimmed.slice(eqIdx + 1).trim();
      if (
        (val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))
      ) {
        val = val.slice(1, -1);
      }
      if (!process.env[key]) {
        process.env[key] = val;
      }
    });
  } catch (err) {
    console.warn('No se pudo leer .env:', err.message);
  }
}

loadEnvFile();

let runtimeApiKey = process.env.OPENAI_API_KEY || '';
let runtimeModel = process.env.OPENAI_MODEL || 'gpt-4o-mini';

const PORT = process.env.PORT || 3000;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon'
};

const BLOCKED_FILES = new Set([
  '/server.js',
  '/.env',
  '/.env.local',
  '/.env.example',
  '/.gitignore',
  '/package.json',
  '/vercel.json'
]);

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
      if (data.length > 1e6) req.destroy();
    });
    req.on('end', () => {
      try {
        resolve(data ? JSON.parse(data) : {});
      } catch (e) {
        reject(e);
      }
    });
    req.on('error', reject);
  });
}

const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    return res.end();
  }

  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = parsedUrl.pathname;

  // Endpoint de estado y verificación de IA
  if (pathname === '/api/chat' && req.method === 'GET') {
    const activeKey = runtimeApiKey || process.env.OPENAI_API_KEY || '';
    const hasKey = Boolean(activeKey && activeKey !== 'tu_api_key_de_openai_aqui');
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    return res.end(
      JSON.stringify({
        status: 'online',
        hasServerApiKey: hasKey,
        model: runtimeModel
      })
    );
  }

  // Endpoint para configurar la API Key en caliente en el servidor sin subirla a GitHub
  if (pathname === '/api/config-key' && req.method === 'POST') {
    try {
      const body = await readJsonBody(req);
      if (body.apiKey && typeof body.apiKey === 'string') {
        runtimeApiKey = body.apiKey.trim();
        if (body.model) runtimeModel = body.model.trim();
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        return res.end(
          JSON.stringify({
            ok: true,
            hasServerApiKey: Boolean(runtimeApiKey),
            model: runtimeModel
          })
        );
      }
      res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
      return res.end(JSON.stringify({ ok: false, error: 'API Key inválida' }));
    } catch (err) {
      res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
      return res.end(JSON.stringify({ ok: false, error: err.message }));
    }
  }

  // Endpoint principal de conversación y procesamiento IA
  if (pathname === '/api/chat' && req.method === 'POST') {
    try {
      const body = await readJsonBody(req);
      if (body.clientApiKey && !runtimeApiKey) {
        runtimeApiKey = body.clientApiKey.trim();
      }
      const activeKey = runtimeApiKey || process.env.OPENAI_API_KEY || '';
      const result = await handleChatRequest(body, activeKey, runtimeModel);
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      return res.end(JSON.stringify(result));
    } catch (err) {
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      return res.end(
        JSON.stringify({
          ok: false,
          fallback: true,
          reason: 'SERVER_ERROR',
          message: err.message
        })
      );
    }
  }

  // Archivos estáticos del Frontend
  let safePath = pathname === '/' ? '/index.html' : pathname;
  if (BLOCKED_FILES.has(safePath) || safePath.startsWith('/api/') || safePath.includes('..')) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    return res.end('Acceso denegado');
  }

  const filePath = path.join(__dirname, safePath);
  fs.readFile(filePath, (err, content) => {
    if (err) {
      // Fallback SPA a index.html
      fs.readFile(path.join(__dirname, 'index.html'), (err2, indexContent) => {
        if (err2) {
          res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
          return res.end('404 - Archivo no encontrado');
        }
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(indexContent);
      });
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content);
  });
});

server.listen(PORT, () => {
  console.log('====================================================');
  console.log(`🚀 Don Brasa IA corriendo en: http://localhost:${PORT}`);
  console.log(
    `🔑 Estado OpenAI API Key en servidor: ${
      runtimeApiKey && runtimeApiKey !== 'tu_api_key_de_openai_aqui'
        ? 'ACTIVA ✅'
        : 'MODO HÍBRIDO / PENDIENTE DE CARGAR ⚙️'
    }`
  );
  console.log('====================================================');
});

