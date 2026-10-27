# DPD Cake

Web de DPD Cake con diez sabores confirmados por las piezas de la marca, una tarta 3D interactiva, cambios de fondo al hacer scroll y selección de sabores para consultas por WhatsApp.

**Web:** https://dpdcake.vercel.app/

## Arranque

```sh
npm ci
npm run dev
```

```sh
npm test
npm run build
```

`npm run build` genera `dist/`. Vercel utiliza `vercel.json`.

## Cómo editar

| Archivo | Contenido |
| --- | --- |
| `src/catalog.js` | Sabores, textos, colores, materiales y mensaje de pedido |
| `src/cake.js` | Modelo creativo 3D, toppings y animaciones |
| `src/geometry.js` | Geometría de las porciones |
| `src/main.js` | Scroll, navegación, selección múltiple y diálogos |
| `src/style.css` | Diseño adaptable y movimiento reducido |
| `index.html` | Estructura, contacto, clientes y privacidad |
| `public/assets/` | Logos, textura de grafiti, iconos y fallback |

## Documentación

- [Marca, catálogo y referencias](docs/MARCA-Y-CONTENIDO.md).
- [Publicación, verificación y estado de GitHub](docs/ESTADO-DEL-PROYECTO.md).

## Pedidos y privacidad

WhatsApp al +34 601 082 383. La selección prepara un mensaje con sabores, personas, fecha y notas; no lo envía automáticamente. El negocio confirma tamaño, precio, disponibilidad, ingredientes y entrega. No hay backend, analítica, cookies publicitarias ni almacenamiento de datos del visitante. Las fuentes se sirven desde Google Fonts; se indica en Privacidad.

## Accesibilidad y funcionamiento

Carta y pedidos siguen funcionando si WebGL no está disponible. El modelo 3D se carga aparte para no bloquear la interfaz. Navegación de sabores mediante botones y carta, formularios etiquetados, diálogos nativos, foco visible y alternativa con movimiento reducido. La tarta es una representación creativa 3D; las fotografías reales se consultan en Instagram.

## Validación

`npm test` comprueba catálogo, scroll, geometría, selección y WhatsApp. La compilación y estas pruebas no sustituyen una revisión visual real: esa revisión sigue pendiente por falta de navegador conectado.

Los originales de las piezas adjuntas en el chat no están disponibles como archivos locales: este repositorio documenta su contenido sin afirmar que los contiene. El estado de acceso de GitHub está registrado en la documentación; la creación remota ha sido rechazada por la integración, aunque el usuario la ha autorizado.
