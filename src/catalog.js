// Diez sabores confirmados por las piezas de marca. Edita aquí la carta.
export const flavors = [
  {
    "id": "tradicional",
    "name": "Tradicional",
    "description": "Queso y dulzura. La sencillez de una tarta bien hecha.",
    "paper": "#f1d28b",
    "image": "/assets/flavors/tradicional.webp",
    "category": "queso",
    "source": "user-brand-image"
  },
  {
    "id": "pistacho",
    "name": "Pistacho",
    "description": "Un toque sorprendente. Una combinación irresistible.",
    "paper": "#d9e2b3",
    "image": "/assets/flavors/pistacho.webp",
    "category": "queso",
    "source": "user-brand-image"
  },
  {
    "id": "frutas",
    "name": "Frutas",
    "description": "Un poco de color a tu vida. Y de queso, por supuesto.",
    "paper": "#f6c4b4",
    "image": "/assets/flavors/frutas.webp",
    "category": "queso",
    "source": "user-brand-image"
  },
  {
    "id": "cabrales",
    "name": "Cabrales",
    "description": "Mucha personalidad. Cremosa desde el primer bocado.",
    "paper": "#edcc7f",
    "image": "/assets/flavors/cabrales.webp",
    "category": "queso",
    "source": "user-brand-image"
  },
  {
    "id": "dark-chocolate",
    "name": "Dark Chocolate",
    "description": "Oscura, intensa y dulce. Tu momento más goloso.",
    "paper": "#d3b6a5",
    "image": "/assets/flavors/dark-chocolate.webp",
    "category": "chocolate",
    "source": "user-brand-image"
  },
  {
    "id": "crumble-cookie",
    "name": "Crumble Cookie",
    "description": "Galleta y queso. Una fusión para repetir.",
    "paper": "#e4d0b3",
    "image": "/assets/flavors/crumble-cookie.webp",
    "category": "queso",
    "source": "user-brand-image"
  },
  {
    "id": "ron-pasas",
    "name": "Ron y pasas",
    "description": "La más rebelde. Ron, pasas y mucho carácter.",
    "paper": "#e7c39b",
    "image": "/assets/flavors/ron-pasas.webp",
    "category": "queso",
    "source": "user-brand-image"
  },
  {
    "id": "happy-hippo",
    "name": "Happy Hippo",
    "description": "Cremosidad suave y un toque dulce en cada bocado.",
    "paper": "#efdcba",
    "image": "/assets/flavors/happy-hippo.webp",
    "category": "queso",
    "source": "user-brand-image"
  },
  {
    "id": "tres-chocolates",
    "name": "Tres chocolates",
    "description": "Tres sabores. Una combinación que nunca falla.",
    "paper": "#dfcfc5",
    "image": "/assets/flavors/tres-chocolates.webp",
    "category": "chocolate",
    "source": "user-brand-image"
  },
  {
    "id": "brownie",
    "name": "Brownie",
    "description": "Cuando el brownie y la tarta de queso se enamoran.",
    "paper": "#dfbeab",
    "image": "/assets/flavors/brownie.webp",
    "category": "chocolate",
    "source": "user-brand-image"
  }
];
export const instagramDMUrl='https://ig.me/m/dpdcake';
export const instagramProfileUrl='https://www.instagram.com/dpdcake/';
export function buildOrderMessage({flavors:chosen=[],flavor,size,guests,date,notes}={}){
 const names=chosen.length?chosen:flavor?[flavor]:[];
 const lines=['¡Hola, DPD Cake! Me gustaría consultar un encargo.',names.length?`Sabores: ${names.join(', ')}.`:'Me gustaría que me recomendarais un sabor.'];
 if(size)lines.push(`Tamaño solicitado: ${size}.`);
 if(guests)lines.push(`Personas: ${guests}.`);
 if(date){const [y,m,d]=date.split('-');lines.push(`Fecha deseada: ${d}/${m}/${y}.`);}
 if(notes?.trim())lines.push(`Detalles: ${notes.trim()}`);
 lines.push('¿Qué tamaños tenéis disponibles? ¿Podéis confirmarme precio, disponibilidad, ingredientes y recogida o entrega?');
 return lines.join('\n');
}
export function getScrollState(scrollY,top,height,viewport,count){
 const range=Math.max(1,height-viewport);
 const progress=Math.min(1,Math.max(0,(scrollY-top)/range));
 const position=progress*count;
 return {progress,index:Math.min(count-1,Math.floor(position)),local:position-Math.floor(position)};
}
