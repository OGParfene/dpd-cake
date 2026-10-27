# Estado del proyecto

## Código

Aplicación estática Vite con JavaScript, Three.js y GSAP. El catálogo, colores y materiales se editan en `src/catalog.js`; las piezas se generan en `src/cake.js` y `src/geometry.js`; la selección y WhatsApp están en `src/main.js`.

## Publicación

- Web: https://dpdcake.vercel.app/
- Proveedor: Vercel.
- Equipo del usuario: ogparfenes-projects.
- Proyecto: dpdcake.
- Project ID: prj_yqGeMAeM6o1E0ynbAe3GVhZK284D.
- Team ID: team_QFLT1K8ZehExUwOIS2LvOZ05.
- Configuración: `vercel.json`; build `npm run build`, directorio `dist`.

## GitHub

El usuario ha autorizado crear un repositorio privado `OGParfene/dpdcake`. Se han intentado los dos mecanismos soportados con la conexión autenticada como OGParfene:

1. `gh repo create`: `Resource not accessible by integration (createRepository)`.
2. API REST `POST /user/repos`: HTTP 403, `Resource not accessible by integration`.

Por tanto, la creación remota no está completada. No se ha inventado una URL de repositorio ni se ha afirmado que exista. El código y documentación están versionados en Git local y se entregan como ZIP y bundle importable. Tras habilitar la creación de repositorios en la conexión, o crear el repositorio privado vacío, se podrá añadir `origin`, hacer push y conectar el Git de Vercel.

## Verificación

Pruebas de lógica de catálogo, scroll y geometría 3D; pruebas de interacción DOM de selección múltiple, modificación del pedido, modo de movimiento reducido y mensaje WhatsApp. Compilación de producción. La revisión visual y de WebGL en un navegador real está pendiente porque no hay herramienta de navegador conectada disponible en esta sesión. No confundir estas pruebas con una validación visual.

## Pendientes de contenido

- Archivos originales descargables de las piezas recibidas en el chat.
- Logo DPD Cake de alta resolución.
- Medidas, precios y guía de tamaños oficiales.
- Condiciones de recogida, entrega y antelación.
- Confirmación de Black Bull y del colaborador «Desde Cero».
- Nombres de los festivales patrocinados.
