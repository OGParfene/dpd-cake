# Pedidos por Instagram

El canal de consulta es @dpdcake. El formulario crea un resumen visible con sabores, tamaño, hora de entrega/recogida, fecha y notas. El siguiente botón intenta copiarlo al portapapeles y abre https://ig.me/m/dpdcake dentro del mismo gesto del usuario. No se incluyen datos del pedido en el enlace. El cliente lo pega y lo envía manualmente en Instagram.

Si el navegador no permite copiar, el resumen permanece visible y seleccionable. Hay un enlace al perfil https://www.instagram.com/dpdcake/ para pulsar Mensaje si el enlace directo no funciona en el dispositivo. Puede requerir inicio de sesión.

No se usa API de mensajería, autenticación de Instagram desde la web ni envíos automáticos. La apertura del chat en la app y el envío final no se han probado con una sesión real de Instagram. Se comprueban en DOM la preparación, copia, enlace y fallback.

Referencia del enlace: https://developers.facebook.com/docs/instagram-platform/instagram-api-with-instagram-login/messaging-api/ig-me/ (la documentación devolvió 429 en esta sesión; el enlace no añade parámetros de mensaje no documentados).

## Carta ampliada (28/10/2026)

Las cookies Crumble y clásica tienen opciones separadas de trozos (selección múltiple) y relleno. Solo se incluyen en el resumen las opciones del tipo de cookie seleccionado. Al quitar una cookie sus preferencias dejan de enviarse; se conservan en memoria para recuperarlas si se vuelve a marcar. El tamaño de tartas se oculta y omite cuando la selección solo contiene cookies o brownies. No se envía ningún mensaje automáticamente.

Actualización del 30/10/2026: se sustituye personas por hora de entrega/recogida y los formatos de tarta pasan a Grande y 12 tartaletas individuales. Cada tipo de cookie tiene tamaño y cantidad (1 ración o ½ ración), conservados en su propia configuración y en el resumen. Los tamaños de cookie confirmados son Pequeño y Grande; se eligen en un desplegable independiente para cada tipo. El número de cookies por ración no se calcula sin información del negocio.
