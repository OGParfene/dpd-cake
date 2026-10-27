# Validación — 27/10/2026

- Compilación Vite: correcta.
- Ocho pruebas automáticas: correctas.
- Cobertura funcional: catálogo de diez sabores sin duplicados, selección múltiple, cambios de selección desde el formulario, consulta WhatsApp con datos literales, selección directa con movimiento reducido, límites del scroll y geometría finita de las porciones.
- HTML: identificadores únicos, anclas válidas y archivos de imagen presentes.
- Renderizado 3D: modelo y geometría compilados; pendiente de inspección en navegador y GPU reales.
- Revisión visual de escritorio y móvil: bloqueada por falta de navegador conectado. Las pruebas DOM no son una captura ni una verificación visual.

El bundle 3D se descarga por separado de la interfaz. Si falla o no hay WebGL, se muestra una imagen ilustrativa y la carta y los pedidos siguen disponibles. El diseño incluye una alternativa para movimiento reducido.
