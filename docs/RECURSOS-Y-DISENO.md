# DPD Cake — recursos y dirección visual actual

## Dirección

La web actual retira el modelo 3D procedural y Three.js. Utiliza composiciones fotográficas de porciones, fondos de color suaves, mucho espacio y jerarquía tipográfica. El amarillo y el logo son los elementos principales de la marca. La letra de pincel se reserva para acentos, siguiendo las publicaciones.

La navegación consiste en una portada breve, una degustación de sabores ligada al scroll, una carta con filtros y una consulta de pedido por Instagram. El recorrido de sabores ocupa aproximadamente una altura de pantalla por producto; su longitud se ajusta al filtrar, con botones para saltar directamente a cualquier sabor y alternativa sin animaciones.

## Recursos nuevos

El usuario autorizó crear los materiales que faltasen, siguiendo las publicaciones. Las imágenes nuevas son composiciones de presentación generadas con esas referencias; no se hacen pasar por fotografías reales de las tartas de DPD Cake. La web incluye una aclaración al pie y acceso al Instagram original.

- `public/assets/flavors/*.webp`: 29 recortes, uno por producto. Los diez iniciales se mantienen y los 19 nuevos se generaron tomando el maestro original como referencia para mantener perspectiva y lenguaje fotográfico. Los recortes conservan los píxeles del recurso maestro, con codificación WebP para web.
- `public/assets/flavors/hero.webp`: porción tradicional de alta resolución para portada.
- `public/assets/logo-clean.webp`: reinterpretación limpia de alta resolución basada en la miniatura original. Se conserva el archivo original en `public/assets/logo.jpg`.
- `docs/recursos-maestros/`: PNG maestros de los materiales nuevos, para futuras ediciones.
- `docs/archivo/`: materiales de versiones anteriores; no se envían al navegador.

Las fotografías originales de las publicaciones adjuntas siguen disponibles como referencia en el chat, pero no como archivos descargables de este entorno. No se afirma que esos originales estén incluidos en el repositorio.

## Referencias consultadas

- BasK: https://www.bask.ae/ — catálogo de producto protagonista, colección y conversión directa.
- Jolene: https://www.jolenebakery.com/ — estructura breve, jerarquía clara y acceso sencillo al catálogo.
- Publicaciones de DPD Cake facilitadas por el usuario: fuente principal de colores, sabores, tono y lenguaje visual.

No se han copiado fotografías, textos, marcas o diseños completos de terceros.

## Edición

- Los nuevos maestros son `catalogo-nuevo-a.png` (9 tartas de queso) y `catalogo-nuevo-b.png` (6 tartas de queso, 2 cookies y 2 brownies). Desde Cero utiliza el recurso individual `chocoflakes-maestro.png` para evitar fragmentos de los productos vecinos del maestro conjunto. Los productos se recortan y centran en lienzos transparentes de 512 × 340, con margen para la rotación.
- Cambiar sabores, textos, colores y rutas de imagen en `src/catalog.js`.
- Sustituir una composición por una foto original conservando la ruta WebP; también puede editarse la ruta en el catálogo.
- Editar layout y movimiento en `src/style.css` y `src/main.js`.
- Mantener `prefers-reduced-motion`, navegación por botones y textos alternativos al editar las animaciones.
