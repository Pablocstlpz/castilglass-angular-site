# Automatizaciones con n8n (ideas)

La web es **estática** (Angular, sin base de datos ni panel). n8n no puede "subir algo a la web" directamente: tiene que hacer un commit en GitHub y que la web se vuelva a publicar.

Orden recomendado: **1 → 2 → 4 → 3**.

## 1. Formularios → avisos y registro
El `fetch` de `Frontend/src/app/services/contact-form.service.ts` envía a un webhook de n8n (además o en lugar de Web3Forms). n8n:
- Avisa al momento por Telegram/WhatsApp con nombre, teléfono y lo que pide.
- Guarda cada contacto en una Google Sheet (lista de clientes sencilla).
- Envía al cliente un correo automático ("Recibido, te llamamos en 24 h").

Obligatorio:
- [ ] Filtro de spam en n8n: descartar los envíos con el campo trampa `_gotcha` relleno y validar los campos.
- [ ] Actualizar `politica-privacidad.html`: ahora solo nombra Web3Forms, hay que añadir n8n y dónde está alojado.

## 2. Pedir reseñas en Google (lo que más ayuda al SEO local)
- **Disparo:** mensaje al bot de Telegram ("obra terminada, +34 6xx…") o marcar una fila en la Sheet.
- **Acción:** a los 2–3 días, WhatsApp/SMS al cliente con el enlace directo para dejar la reseña (sale del Perfil de Empresa en Google).

## 3. Subir fotos de obras
1. Enviar la foto al bot de Telegram con una frase ("ventana PVC en Córdoba").
2. n8n la redimensiona (ancho máx. 1600 px) y la pasa a WebP. Si el nodo *Edit Image* no convierte a WebP, usar `cwebp` en un n8n propio.
3. Una IA propone el texto `alt` a partir de la frase.
4. Commit en GitHub: la foto va a `Frontend/public/images/obras/` y se añade una entrada en `obras.json`.
5. Publicación:
   - **Vercel:** se publica sola en cada commit.
   - **IONOS:** hace falta una GitHub Action que compile (`npm run build`) y suba `browser/` por SFTP.

Requisitos:
- [ ] Cambio en la web: galería que lea `obras.json` en lugar de fotos puestas a mano.
- Solo compensa si se suben obras a menudo. Las 13 fotos de prueba (`PENDIENTE.md` 1.2) es más rápido cambiarlas a mano una vez.
- Subir la foto también al Perfil de Empresa en Google requiere pedir acceso a su API, y Google no siempre lo aprueba.

## 4. Vigilancia de la web
- Cada hora: comprobar que `https://castilglass.es` responde y que el certificado HTTPS no caduca pronto. Si falla, aviso por Telegram.
- Cada mes: resumen de Google Search Console (clics, posición media, consultas nuevas) por correo. Necesita Search Console configurado (`PENDIENTE.md` 3).

## No hacer
- Que una IA escriba artículos o cambie títulos y descripciones sola: Google puede tomarlo por spam y bajar la web.
- Cambios de SEO automáticos cada poco tiempo: Google tarda semanas en reaccionar, así que no se puede medir qué funciona.
- Montar el flujo de fotos (3) antes de tener 1, 2 y 4 funcionando.

## Dónde alojar n8n
- **n8n Cloud:** de pago, sin mantenimiento.
- **n8n propio en un VPS barato:** más barato, pero hay que mantenerlo (actualizaciones, copias de seguridad, HTTPS).
