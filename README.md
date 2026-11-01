# 🍕 La Cantina de Don Brasa — Plataforma de Bodegón con IA
### Solución Integral de Atención, Pedidos y Reservas para Gastronomía Local

> **Hackatón DonWeb Day Rosario 2026** — *"Del problema al servidor"*  
> **Comercio:** La Cantina de Don Brasa (Av. Pellegrini 1540, Rosario)  
> **Repositorio Oficial:** [https://github.com/alebati123/Donwebday.git](https://github.com/alebati123/Donwebday.git)  
> **Despliegue en Vivo (DonWeb Cloud Server):** [http://201.32.132.185/](http://201.32.132.185/)  
> **Panel de Cocina & Administración:** [http://201.32.132.185/admin.html](http://201.32.132.185/admin.html)

---

## 🎯 1. Diagnóstico del Problema en Negocios Locales

Los comercios gastronómicos tradicionales (bodegones, pizzerías y rotiserías) concentran más del 70% de su demanda entre las 20:00 y las 23:30 hs. Durante esa franja crítica, la atención manual por WhatsApp y llamadas genera graves pérdidas:

1. **Pérdida directa de ventas por demoras:** Tiempos de respuesta de 25 a 40 minutos en responder un mensaje de WhatsApp provocan que los clientes pidan en otro lugar.
2. **Errores humanos en la toma de pedidos:** Confusión en direcciones, falta de registro de medios de pago o errores al transcribir pedidos dictados de forma informal.
3. **Mala gestión de reservas en grupos impares:** Clientes que quieren reservar para 3, 5 o 7 personas son rechazados o apretados en mesas de 2 o 4 personas por falta de flexibilidad en el plano de mesas.
4. **Desconexión con la cocina (Quiebres de Stock):** Quien atiende el chat desconoce qué platos se agotaron en el horno de barro, generando reclamos posteriores y cancelaciones.

---

## 💡 2. Nuestra Solución: Arquitectura de Doble Entorno con IA

Diseñamos una plataforma web completa dividida en dos aplicaciones independientes pero sincronizadas en tiempo real:

```
                  ┌────────────────────────────────────────┐
                  │          CLIENTE WEB (index.html)      │
                  │   Carta Fotográfica + Mozo Virtual     │
                  │   Carrito de Compras + Mesas Flexibles │
                  └───────────────────┬────────────────────┘
                                      │
                   Sincronización HTTP / State + SSE
                                      │
                  ┌───────────────────┴────────────────────┐
                  │      DONWEB CLOUD SERVER (Node.js)     │
                  │       http://201.32.132.185:80/        │
                  │   Integrado con OpenAI (gpt-4o-mini)   │
                  └───────────────────┬────────────────────┘
                                      │
                  ┌───────────────────┴────────────────────┐
                  │     PANEL ADMIN & COCINA (admin.html)  │
                  │   Kanban de Cocina + ABM de Platos     │
                  │   Editor de Precios + Control de Mesas │
                  └────────────────────────────────────────┘
```

---

## 📱 3. Funcionalidades para el Cliente (`/index.html`)

* **🍽️ Carta Digital Fotográfica Editorial:** Platos tradicionales de bodegón, pizzas al horno de barro, empanadas y opciones Sin TACC / Vegetarianas con filtros por categoría y modal de personalización (punto de cocción y notas al maestro pizzero).
* **💬 Don Vito (Mozo Virtual con IA - OpenAI `gpt-4o-mini`):**
  * **Recomendaciones por ganas de comer:** En lugar de indagar en presupuestos fríos, Don Vito consulta qué tienen ganas de probar y sugiere combinaciones tentadoras listas para agregar con 1 clic.
  * **Carga automática al Carrito (`autoCartAdd`):** Si el cliente escribe su pedido en lenguaje natural (ej: *"Mandame 1 muzzarella al molde y 4 empanadas de carne a Rioja 1450, soy Martín y pago por transferencia"*), la IA detecta los platos, las cantidades, el nombre, la dirección y el método de pago, cargándolos automáticamente al carrito.
* **🪑 Reserva Inteligente de Mesas Modulares:**
  * Solución específica para comensales impares (3, 5 y 7 personas) y grupos grandes (8 a 12 personas).
  * El sistema asigna automáticamente mesas cómodas de mayor capacidad y calcula la configuración de asientos (ej. *"Mesa de 4 adaptada para 3 con silla en cabecera"* o *"Unión de mesas contiguas"*).
  * **Protección anti-falsos positivos:** La IA solo reserva cuando el cliente lo solicita explícitamente, evitando reservas automáticas al hacer preguntas sobre comida.
* **🛵 Seguimiento de Pedido en Vivo:** Línea de tiempo térmica que avanza conforme la cocina cambia el estado del pedido.
* **📱 100% Responsive:** Diseñado con grillas adaptativas para celulares pequeños (320px, 375px), tablets (768px) y pantallas de escritorio (1024px, 1440px).

---

## 👨‍🍳 4. Funcionalidades para el Comercio (`/admin.html`)

* **🔥 Tablero Kanban de Cocina en Tiempo Real:** 
  * Columnas: `📥 Nuevos Pedidos` ➔ `🔥 En Horno de Barro (430°C)` ➔ `🛵 Despachados / Listos`.
  * Los pedidos confirmados por el cliente o armados por Don Vito entran de inmediato a la comanda de cocina.
* **📦 ABM Completo de Carta y Precios:**
  * Subida de nuevos platos con foto propia o preset fotográfico de alta calidad.
  * Modificación de precios unitarios con guardado en 1 clic.
  * Botones de ajuste masivo de precios por inflación (+10%, +15%, -5%).
* **🟢 Control de Stock Vivo Sincronizado con el Prompt de la IA:**
  * Al marcar un plato como **"🔴 AGOTADO"** en el panel, el catálogo que lee Don Vito se actualiza en el acto. Si un comensal intenta pedirlo por chat, la IA le avisa amablemente que se terminó la última tanda y le ofrece la mejor alternativa en stock.
* **🔓 Gestión y Liberación de Mesas:** Control del salón y patio para ocupar o liberar mesas con un clic.
* **📊 Métricas y KPIs del Turno:** Facturación en vivo, cantidad de pedidos procesados y mesas reservadas.

---

## 🔒 5. Arquitectura Técnica y Seguridad de Credenciales

* **Backend:** Servidor Node.js nativo (sin frameworks pesados), de arranque instantáneo y mínimo consumo de RAM (< 10 MB).
* **Seguridad de la API Key:**
  * La clave de OpenAI **NUNCA** se almacena en el frontend ni se commitea a Git.
  * Excluida mediante `.gitignore` y administrada en variables de entorno seguras en el servidor (`.env`).
  * Modal interno en `/admin.html` para actualizar la clave en caliente (`/api/config-key`).
* **Resiliencia & Fallback:** Motor NLU heurístico local integrado que mantiene la atención de clientes y armado de pedidos activa incluso si se agota la cuota o falla la conexión con el proveedor de IA.

---

## 🚀 6. Despliegue en Servidor DonWeb Cloud

El proyecto se encuentra instalado y corriendo de forma permanente en un Cloud Server de DonWeb:

* **Sistema Operativo:** Ubuntu 24.04 LTS (Noble Numbat)
* **Entorno de Ejecución:** Node.js v20.20.2 LTS
* **Gestor de Proceso:** Servicio persistente `systemd` (`cantina.service`) con reinicio automático ante fallas o reinicios del servidor.
* **Puerto:** Puerto 80 HTTP estándar (acceso directo sin puertos raros).
* **Dirección IP Pública:** `201.32.132.185`

---

## 🧪 7. Guía Rápida para Evaluación del Jurado (Paso a Paso en 3 Minutos)

1. **Abrir la Tienda del Cliente:** Entrar a [http://201.32.132.185/](http://201.32.132.185/) desde la computadora o el celular.
2. **Consultar al Mozo Virtual (Don Vito):**
   * En el chat, escribir: *"Somos 3 personas, qué nos recomendás para comer hoy?"* ➔ Don Vito sugerirá platos ideales para compartir **sin forzar una reserva prematura**.
   * Escribir un pedido directo: *"Mandame 1 muzzarella al molde y 4 empanadas de carne a Bv. Oroño 650, soy Camila y pago con Mercado Pago"* ➔ Don Vito cargará los ítems al carrito y autocompletará la dirección y medio de pago.
3. **Comprobar la Sincronización con Cocina:**
   * Abrir en otra pestaña el panel administrativo: [http://201.32.132.185/admin.html](http://201.32.132.185/admin.html).
   * Confirmar el pedido en el Carrito de la tienda del cliente y ver cómo aparece inmediatamente en la columna `📥 Nuevos` del Kanban de Cocina.
   * Hacer clic en `🔥 Meter al Horno de Barro →` en el panel admin y observar cómo el estado cambia en la vista de seguimiento del cliente.
4. **Comprobar el Quiebre de Stock con la IA:**
   * En `/admin.html`, marcar la *Pizza Napolitana Especial* como **🔴 AGOTADO**.
   * Volver al chat con Don Vito y pedir: *"Quiero pedir una pizza napolitana"* ➔ Don Vito avisará que se agotó en cocina y sugerirá otra pizza disponible.
5. **Probar Reserva para Grupo Impar:**
   * En el chat, escribir: *"Quiero reservar una mesa para 5 personas hoy a las 21:30 a nombre de Gonzalo"* ➔ Don Vito asignará una mesa cómoda con silla en cabecera y la marcará ocupada en el libro de reservas.
