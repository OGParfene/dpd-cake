# Validación de la carta ampliada — 30/10/2026

- 19 pruebas automatizadas pasan: selección múltiple, filtros de carta y de recorrido, navegación directa, transición secuencial tras scroll rápido, inversión del scroll, cambio de categoría durante una animación, salida del recorrido y callbacks antiguos, tamaños y resumen de Instagram, copia y alternativa manual.
- Las pruebas de cookies comprueban trozos y rellenos independientes para cada tipo, actualización del resumen, exclusión de opciones al desmarcar y omisión del tamaño de tarta en un pedido solo de cookies.
- Catálogo comprobado: 29 identificadores únicos; 24 tartas de queso, tres chocolates, dos cookies y dos brownies. Los componentes de cookies no se añaden como productos.
- Compilación de producción Vite y páginas legales verificadas.
- 19 imágenes de producto nuevas siguen el maestro fotográfico inicial, con recortes transparentes y margen para rotación. Son imágenes de presentación; las tartas reales están en Instagram.
- No hay navegador conectado: los tests de DOM no sustituyen una inspección visual en un navegador real. La apertura efectiva de Instagram depende del dispositivo y la sesión de la persona.

Comandos reproducibles:

```sh
npm ci
npm test
npm run build
```

El pedido actualizado verifica hora en lugar de personas, las dos opciones de formato de tarta, tamaño y ración independientes por cookie, actualización inmediata del resumen y exclusión de las opciones de una cookie desmarcada. No se calculan unidades por ración.
