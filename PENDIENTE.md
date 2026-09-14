# Castilglass (castilglass.es)

Web estática en Angular 21 (código en `Frontend/`). Estado a 14/09/2026: el build compila sin errores.

- Desarrollo: `cd Frontend && npm install && npm start` → http://localhost:4200
- Build: `npm run build` → `Frontend/dist/castilglass-angular-site/browser/`

## 1. Imprescindible antes de publicar

### 1.1 Clave de Web3Forms (formularios)
Sin la clave, los formularios no envían nada (el visitante ve un aviso para llamar o escribir por WhatsApp).

1. Entrar en https://web3forms.com y poner `castilglass@hotmail.com`.
2. Copiar la clave que llega al correo.
3. Pegarla en `Frontend/src/app/services/contact-form.service.ts`, en `WEB3FORMS_ACCESS_KEY`.
4. Probar los dos formularios: contacto (home) y `/solicitar-presupuesto`.

### 1.2 Fotos reales
Todas las imágenes de contenido son de prueba (`lh3.googleusercontent.com/aida-public/...`). Pueden dejar de verse y no son de Castilglass.

| Archivo | Imágenes |
|---|---|
| `Frontend/src/app/components/layout/main/main.html` | 4 |
| `Frontend/src/app/components/apartado-servicios/apartado-servicios.html` y `.ts` | 5 |

- Guardar las fotos en `Frontend/public/images/` (formato `.webp`, ancho máximo ~1600 px) y usar rutas `images/nombre.webp`.
- Poner textos `alt` descriptivos con aluminio / PVC / hierro. El de la foto principal de la home aún dice "cristalería".
- Imagen para compartir en redes y WhatsApp: ahora es el logo sobre fondo claro (`Frontend/public/images/og-castilglass.jpg`, 1200×630). Mejor sustituirla por una foto real de una obra con el mismo nombre y tamaño.

### 1.3 Mapa de Google y cookies
El mapa de la home instala cookies de Google nada más cargar la página, y no hay banner de consentimiento. Opciones:

- **Recomendada:** el mapa solo se carga al pulsar "Ver mapa". Así no hace falta banner.
- Poner un banner de consentimiento de cookies.

### 1.4 Revisión legal
Los textos de privacidad y cookies ya reflejan lo que hace la web: Web3Forms, correo de Microsoft, Google Maps/Fonts, sin analítica y con el derecho a reclamar ante la AEPD. Pendiente:

- Si el servidor es físicamente vuestro (no alquilado), quitar "nuestro proveedor de alojamiento web" en la sección Destinatarios de `politica-privacidad.html`.
- Que lo revise alguien que sepa de protección de datos.
- Titular de la web: **Castilglass, S.L.L.** (NIF B14973499). Castillo Cañizares aparece como nombre comercial en la home, el footer, el aviso legal y los datos estructurados.
- Aviso legal: faltan los datos del Registro Mercantil (tomo, folio, hoja). Se añadirán más adelante.
- Si algún día se envían boletines o novedades, hace falta una casilla de consentimiento aparte en los formularios.

### 1.5 Revisar textos
- Leer todas las páginas completas.

### 1.6 Subir cambios a git
Hay cambios sin commit: SEO, Web3Forms, textos legales, build estático, `robots.txt` y `sitemap.xml`.

## 2. Despliegue en servidor propio

### 2.1 Generar y subir
```bash
cd Frontend
npm install
npm run build
```
Subir **el contenido** de `Frontend/dist/castilglass-angular-site/browser/` a la raíz de la web.

### 2.2 Configuración del servidor
Cada página tiene que servirse sin barra final (`/nuestros-servicios` → `nuestros-servicios/index.html`), porque las URL canónicas del SEO van sin barra. Además, `www` y `http` deben redirigir a `https://castilglass.es`.

**Apache** (`.htaccess` en la raíz de la web):
```apache
DirectorySlash Off
Header always set Strict-Transport-Security "max-age=31536000"
Header always set X-Content-Type-Options "nosniff"
RewriteEngine On
RewriteCond %{HTTP_HOST} ^www\. [NC,OR]
RewriteCond %{HTTPS} off
RewriteRule ^ https://castilglass.es%{REQUEST_URI} [R=301,L]
RewriteCond %{REQUEST_FILENAME}/index.html -f
RewriteRule ^(.+?)/?$ $1/index.html [L]
```

**nginx:**
```nginx
server {
  server_name castilglass.es;
  root /var/www/castilglass;
  add_header Strict-Transport-Security "max-age=31536000" always;
  add_header X-Content-Type-Options "nosniff" always;
  location / { try_files $uri $uri/index.html =404; }
}
server { server_name www.castilglass.es; return 301 https://castilglass.es$request_uri; }
```

### 2.3 Dominio en IONOS
IONOS → Dominios y SSL → `castilglass.es` → DNS:

- Borrar los registros `A`/`AAAA` antiguos de `@` y `www` (los de la página de aparcamiento de IONOS).
- `A` en `@` → IP del servidor.
- `CNAME` en `www` → `castilglass.es`.
- Activar HTTPS (Let's Encrypt/certbot o el SSL de IONOS).

### 2.4 Comprobar tras publicar
- `https://castilglass.es/robots.txt` y `https://castilglass.es/sitemap.xml` cargan.
- `https://castilglass.es/nuestros-servicios` carga sin redirigir a una URL con `/` al final.
- `http://` y `www.` redirigen a `https://castilglass.es`.
- Los formularios envían y llega el correo.

## 3. SEO después de publicar (por orden de impacto)

1. **Perfil de Empresa en Google (Google Business Profile)** (https://www.google.com/maps?cid=4761733920034228552). Corregir:
   - Nombre: **Castilglass** (ahora pone "Castilglas").
   - Categoría: ahora es "Centro comercial". Poner **Carpintería metálica, aluminio y PVC** (elegir en Google las categorías que más se acerquen).
   - Teléfono: solo el móvil, **+34 600 952 601**.
   - Horario: **lunes a viernes de 7:00 a 15:00**; tardes con cita previa.
   - Dirección igual que en la web, fotos reales y enlace a `https://castilglass.es`.
2. **Reseñas en Google:** pedir una reseña a cada cliente.
3. **Google Search Console:** verificar el dominio con un registro TXT en IONOS y enviar `https://castilglass.es/sitemap.xml`.
4. **Una página por servicio:** por ejemplo `/ventanas-aluminio-cordoba`, `/ventanas-pvc-cordoba` y `/herreria-cordoba`, con texto propio y fotos. Es lo que más ayuda a posicionar búsquedas concretas. Añadirlas también a `Frontend/public/sitemap.xml`.
5. **Directorios:** Páginas Amarillas, Habitissimo, Cronoshare…, siempre con los mismos datos.

## 4. Mejoras menores

- **Galería de productos:** no existe. Si se crea, añadirla al array `sections` de `Frontend/src/app/components/layout/header/header.ts`.
- **Correo con dominio propio** (p. ej. `info@castilglass.es`): da más confianza que `@hotmail.com`. Si se cambia, actualizarlo en la web, en los textos legales y en el JSON-LD.
- **`npm audit`:** avisa de vulnerabilidades en dependencias. Revisar con `npm audit` (no afectan a la web estática publicada, solo al entorno de build).

## Ya hecho (14/09/2026)

- SEO: títulos, descripciones y URL canónica por página; `lang="es"`; Open Graph; datos estructurados de empresa (JSON-LD); `robots.txt`; `sitemap.xml`; páginas legales con `noindex`.
- Enfoque en aluminio, PVC y hierro en títulos, H1 de la home, footer y descripciones.
- Formularios migrados de Formspree a Web3Forms (plan gratuito).
- Textos legales corregidos (privacidad y cookies) y aviso de privacidad en el formulario de la home.
- Build estático: sin Node ni Express; eliminado `vercel.json`.
- Rediseño visual (estilo industrial): componentes UI reutilizables, datos de contacto y servicios centralizados en `Frontend/src/app/data/`, tipografías autoalojadas (Barlow, Barlow Condensed, IBM Plex Mono) sin peticiones a Google Fonts, iconos SVG propios y logo recortado.
- Auditoría de SEO y accesibilidad corregida: formularios con etiquetas y `autocomplete`, iconos ocultos a lectores de pantalla, menú móvil accesible con teclado, enlaces rastreables en el menú, contraste, jerarquía de encabezados, enlace "Saltar al contenido", mensajes de formulario anunciados, logo optimizado (2,3 MB → WebP), fuente de iconos recortada y descripciones en las páginas legales.
