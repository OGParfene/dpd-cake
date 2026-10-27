# Pedidos por Instagram

El canal de consulta es @dpdcake. El formulario crea un resumen visible con sabores, tamaño, personas, fecha y notas. El siguiente botón intenta copiarlo al portapapeles y abre https://ig.me/m/dpdcake dentro del mismo gesto del usuario. No se incluyen datos del pedido en el enlace. El cliente lo pega y lo envía manualmente en Instagram.

Si el navegador no permite copiar, el resumen permanece visible y seleccionable. Hay un enlace al perfil https://www.instagram.com/dpdcake/ para pulsar Mensaje si el enlace directo no funciona en el dispositivo. Puede requerir inicio de sesión.

No se usa API de mensajería, autenticación de Instagram desde la web ni envíos automáticos. La apertura del chat en la app y el envío final no se han probado con una sesión real de Instagram. Se comprueban en DOM la preparación, copia, enlace y fallback.

Referencia del enlace: https://developers.facebook.com/docs/instagram-platform/instagram-api-with-instagram-login/messaging-api/ig-me/ (la documentación devolvió 429 en esta sesión; el enlace no añade parámetros de mensaje no documentados).
