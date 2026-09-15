# Previo a subida: castilglass.es en IONOS

Detalle completo en `PENDIENTE.md` (apartados 1 y 2).

## 1. Antes de subir
- [ ] Pegar la clave de Web3Forms en `Frontend/src/app/services/contact-form.service.ts` (`WEB3FORMS_ACCESS_KEY`). Sin ella los formularios no envían nada.
- [ ] Generar la web:
  ```bash
  cd Frontend
  npm install
  npm run build
  ```
- [ ] Lo que se sube es **el contenido** de `Frontend/dist/castilglass-angular-site/browser/`, no la carpeta.

## 2. Mirar qué hay contratado en IONOS
- **Webhosting** → seguir la opción A.
- **Solo dominio** → seguir la opción B.

## A) Con Webhosting de IONOS

1. **Acceso SFTP:** IONOS → *Hosting* → contrato → *SFTP y SSH*. Apuntar servidor, usuario y contraseña (crearla si no hay).
2. **Subir archivos** con FileZilla (protocolo SFTP, puerto 22): entrar en la carpeta de la web (o crear `/castilglass`) y subir todo lo de dentro de `browser/`:
   - `index.html`, `.js`, `.css`, `favicon.ico`, `robots.txt`, `sitemap.xml`
   - carpetas `images`, `nuestros-servicios`, `solicitar-presupuesto`, `aviso-legal`, `politica-cookies`, `politica-privacidad`
3. **Crear `.htaccess`** en esa misma carpeta con este contenido (URLs sin barra final, y `http`/`www` → `https://castilglass.es`):
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
4. **Conectar el dominio:** *Dominios y SSL* → `castilglass.es` → *Uso del dominio* / *Destino* → *Webspace* → la carpeta del paso 2. Lo mismo para `www.castilglass.es`.
5. **HTTPS:** *Dominios y SSL* → *Certificados SSL* → asignar el certificado del hosting a `castilglass.es` y `www`. Tarda unos minutos.

**Para actualizar la web más adelante:** `npm run build` y volver a subir el contenido de `browser/`, borrando los `.js`/`.css` antiguos (cambian de nombre en cada build). No borrar el `.htaccess`.

## B) Solo dominio en IONOS

1. Alojar la web en Vercel o Netlify (gratis), con la carpeta `Frontend/dist/castilglass-angular-site/browser/` como salida.
2. IONOS → *Dominios y SSL* → `castilglass.es` → *DNS*:
   - Borrar los `A`/`AAAA` antiguos de `@` y `www` (página de aparcamiento de IONOS).
   - Añadir los registros que indique Vercel/Netlify (normalmente `A` en `@` y `CNAME` en `www`).
3. El HTTPS lo pone Vercel/Netlify. El `.htaccess` no sirve aquí: las redirecciones se configuran en su panel.

## 3. Comprobar tras publicar
- [ ] `https://castilglass.es` carga con candado (HTTPS).
- [ ] `https://castilglass.es/nuestros-servicios` carga sin añadir `/` al final.
- [ ] `http://castilglass.es` y `https://www.castilglass.es` redirigen a `https://castilglass.es`.
- [ ] `https://castilglass.es/robots.txt` y `https://castilglass.es/sitemap.xml` cargan.
- [ ] Enviar los dos formularios (home y `/solicitar-presupuesto`) y comprobar que llega el correo.

## 4. Después (no bloquea la subida)
- Fotos reales en lugar de las de prueba (`PENDIENTE.md` 1.2).
- Mapa de Google / cookies (`PENDIENTE.md` 1.3).
- Google Search Console y Perfil de Empresa en Google (`PENDIENTE.md` 3).
