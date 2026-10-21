# DPD Cake

Web estática de DPD Cake. Vite y JavaScript; sin backend ni almacenamiento de datos de visitantes. Pedidos mediante enlaces a WhatsApp al +34 601 082 383. El enlace prepara una consulta; la confirmación y los precios se acuerdan con el negocio.

## Desarrollo

- `npm ci`
- `npm run dev`
- `npm test`
- `npm run build` → `dist/`

Vercel: configuración en `vercel.json`, rama `main`. Se recomienda conectar este repositorio para publicar automáticamente cada cambio.

## Edición

- Catálogo y procedencia: `src/catalog.js`.
- Página y textos: `index.html`.
- Estilo y animaciones: `src/style.css`.
- Pedidos, filtros y diálogos: `src/main.js`.
- Imágenes y logos: `public/assets/`.

## Contenido y límites de verificación

Investigación realizada el 21 de octubre de 2026. Instagram entregó metadatos públicos, pero no permitió recuperar publicaciones ni historias destacadas completas. No se ha realizado una auditoría exhaustiva de las 20 publicaciones o de sus historias.

- DPD Cake: logo original y descripción recuperados de metadatos públicos de https://www.instagram.com/dpdcake/ . El logo es una miniatura de 100 px: sustituir por el original de alta resolución cuando esté disponible.
- Queso y tres chocolates: facilitados por el usuario.
- Pistacho, Nutella, Pantera Rosa, queso y Lotus, Kinder Bueno: referencias indexadas de la carta de Ruta 13 en https://www.ubereats.com/es-en/store/ruta-13/SeMSDGnXUy-C6FHewXOdBg . La carta actual puede variar; por eso todos se presentan por consulta, sin precios ni promesas de disponibilidad.
- Rocket, Ruta 13 y Black Bull: relación comercial indicada por el usuario. No se han inventado testimonios, puntuaciones ni estadísticas.
- Logo Ruta 13: metadatos públicos de https://www.instagram.com/ruta_13_hamburgeseria/ .
- Logo Rocket: metadatos públicos de https://www.instagram.com/rocket_beers/ .
- Logo Black Bull: https://blackbullburgers.es/assets/img/logos/logo.png . Negocio encontrado: Black Bull Burgers by Javito (Arganda del Rey); confirmar con el propietario que es el mismo cliente mencionado.
- Foto principal: imagen generada, ilustrativa y rotulada como tal; no representa un producto real fotografiado de DPD Cake. Reemplazar por fotografía original cuando esté disponible.
- Ilustraciones del catálogo: SVG decorativos, no fotografías de productos ni representación de sus ingredientes o medidas.
- Tamaños, raciones oficiales, precios, ingredientes y condiciones de entrega no verificables: se consultan por WhatsApp. No se han inventado centímetros, pesos o tarifas.
- No se han atribuido patrocinios a festivales concretos por no disponer de sus nombres ni de evidencia de las historias.

## Accesibilidad y privacidad

Diseño adaptable a móvil, navegación con teclado, foco visible, diálogos nativos con Escape, enlaces con nombre accesible, soporte de movimiento reducido. Sin cookies de seguimiento ni analítica. Google Fonts sirve tipografías externas; esto se indica en Privacidad. No se envía ningún mensaje de WhatsApp automáticamente.

## Validación

Compilación de producción y pruebas de mensaje/URL WhatsApp, campos opcionales y consistencia del catálogo. No se dispuso de herramienta de navegador conectada para revisión visual de escritorio y móvil; completar esa revisión con el negocio antes de la comunicación comercial definitiva.
