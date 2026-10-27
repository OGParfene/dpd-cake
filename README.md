# DPD Cake

Web de DPD Cake: diez sabores, una carta visual y pedidos por WhatsApp.

**Web:** https://dpdcake.vercel.app/  
**Repositorio:** https://github.com/OGParfene/dpd-cake

## Desarrollo

```sh
npm ci
npm run dev
```

```sh
npm test
npm run build
```

Vite genera `dist/`. La configuración de publicación está en `vercel.json`.

## Qué contiene

- Catálogo de diez sabores confirmado por las publicaciones de DPD Cake.
- Composiciones de producto en WebP y logo limpio de alta resolución.
- Degustación visual al hacer scroll, navegación directa y alternativa sin movimiento.
- Filtros y selección de varios sabores para preparar una consulta por WhatsApp.
- Clientes, Instagram, contacto y privacidad.
- Documentación de marca, recursos maestros y archivo de versiones anteriores.

La web actual utiliza imágenes de presentación; no utiliza modelos 3D. Los materiales nuevos se crearon con autorización del usuario siguiendo las referencias de la marca. Los originales adjuntos en el chat todavía no se han proporcionado como archivos descargables y no se afirma que estén incluidos aquí.

## Cómo editar

| Archivo | Contenido |
| --- | --- |
| `src/catalog.js` | Sabores, textos, categorías, colores e imágenes |
| `src/main.js` | Scroll, filtros, selección, diálogos y WhatsApp |
| `src/style.css` | Layout, tipografía, móvil y movimiento reducido |
| `index.html` | Estructura, textos generales, clientes y contacto |
| `public/assets/flavors/` | Recortes optimizados de producto |
| `docs/recursos-maestros/` | Materiales gráficos de alta resolución |

## Documentación

- [Marca y catálogo](docs/MARCA-Y-CONTENIDO.md).
- [Recursos y dirección visual](docs/RECURSOS-Y-DISENO.md).
- [Estado y publicación](docs/ESTADO-DEL-PROYECTO.md).
- [Verificación y límites](docs/VALIDACION.md).

## Pedidos

WhatsApp: +34 601 082 383. Se prepara un mensaje con los sabores, personas, fecha y notas; no se envía automáticamente. DPD Cake confirma formato, precio, disponibilidad, ingredientes y recogida o entrega antes de cerrar el pedido.

## Privacidad y accesibilidad

Sin analítica, cookies publicitarias, backend ni almacenamiento de datos del visitante. Google Fonts sirve las tipografías; se indica en Privacidad. Formularios etiquetados, foco visible, diálogos nativos y soporte de movimiento reducido.

## Verificación

Las pruebas y la compilación se pueden ejecutar con los comandos anteriores. La revisión en navegador real sigue pendiente por falta de herramienta de navegador conectada; no se presenta la validación DOM como revisión visual.
