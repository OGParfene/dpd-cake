# DPD Cake — recursos y dirección visual actual

## Dirección

La web actual retira el modelo 3D procedural y Three.js. Utiliza composiciones fotográficas de porciones, fondos de color suaves, mucho espacio y jerarquía tipográfica. El amarillo y el logo son los elementos principales de la marca. La letra de pincel se reserva para acentos, siguiendo las publicaciones.

La navegación consiste en una portada breve, una degustación de sabores ligada al scroll, una carta con filtros y una consulta de pedido por WhatsApp. El recorrido de sabores ocupa unas cuatro alturas de pantalla, con botones para saltar directamente a cualquier sabor y alternativa sin animaciones.

## Recursos nuevos

El usuario autorizó crear los materiales que faltasen, siguiendo las publicaciones. Las imágenes nuevas son composiciones de presentación generadas con esas referencias; no se hacen pasar por fotografías reales de las tartas de DPD Cake. La web incluye una aclaración al pie y acceso al Instagram original.

- `public/assets/flavors/*.webp`: diez porciones, una por sabor. Se generaron juntas para mantener la misma perspectiva y lenguaje fotográfico. Los recortes conservan los píxeles del recurso maestro, con codificación WebP para web.
- `public/assets/flavors/hero.webp`: porción tradicional de alta resolución para portada.
- `public/assets/logo-clean.webp`: reinterpretación limpia de alta resolución basada en la miniatura original. Se conserva el archivo original en `public/assets/logo.jpg`.
- `docs/recursos-maestros/`: PNG originales de los materiales nuevos, con transparencia, para futuras ediciones.
- `docs/archivo/`: materiales de versiones anteriores; no se envían al navegador.

Las fotografías originales de las publicaciones adjuntas siguen disponibles como referencia en el chat, pero no como archivos descargables de este entorno. No se afirma que esos originales estén incluidos en el repositorio.

## Referencias consultadas

- BasK: https://www.bask.ae/ — catálogo de producto protagonista, colección y conversión directa.
- Jolene: https://www.jolenebakery.com/ — estructura breve, jerarquía clara y acceso sencillo al catálogo.
- Publicaciones de DPD Cake facilitadas por el usuario: fuente principal de colores, sabores, tono y lenguaje visual.

No se han copiado fotografías, textos, marcas o diseños completos de terceros.

## Edición

- Cambiar sabores, textos, colores y rutas de imagen en `src/catalog.js`.
- Sustituir una composición por una foto original conservando la ruta WebP; también puede editarse la ruta en el catálogo.
- Editar layout y movimiento en `src/style.css` y `src/main.js`.
- Mantener `prefers-reduced-motion`, navegación por botones y textos alternativos al editar las animaciones.
