export const flavors = [
 {id:'queso',name:'La de queso',description:'El antojo que lo empezó todo. Para los que siempre vuelven al clásico.',category:'queso',color:'#f2d476',topping:'#be8239',tag:'El clásico',source:'user'},
 {id:'pistacho',name:'Pistacho',description:'Para el team pistacho. Un sabor con personalidad propia.',category:'queso',color:'#d3dbb6',topping:'#8b9d50',tag:'Team pistacho',source:'ruta13-indexed-menu'},
 {id:'lotus',name:'Queso y Lotus',description:'Un encuentro de los que apetece repetir. Queso, galleta y ganas de más.',category:'queso',color:'#e9c6a6',topping:'#bd773e',tag:'Modo galleta',source:'ruta13-indexed-menu'},
 {id:'nutella',name:'Nutella',description:'Ese nombre que hace que ya no necesites seguir leyendo.',category:'chocolate',color:'#d6c6bb',topping:'#70462c',tag:'Choco lovers',source:'ruta13-indexed-menu'},
 {id:'pantera',name:'Pantera Rosa',description:'Un guiño muy dulce al sabor de la infancia. ¿Te vienes de vuelta?',category:'queso',color:'#f0bfce',topping:'#d986aa',tag:'Pura nostalgia',source:'ruta13-indexed-menu'},
 {id:'tres-chocolates',name:'Tres chocolates',description:'Cuando un solo chocolate no basta. Tres razones para dejar sitio al postre.',category:'chocolate',color:'#e0c9aa',topping:'#58392e',tag:'Triple antojo',source:'user'},
 {id:'kinder',name:'Kinder Bueno',description:'Hay sabores que no necesitan presentación. Este es uno de ellos.',category:'chocolate',color:'#e8d7b7',topping:'#9b6b45',tag:'El capricho',source:'ruta13-indexed-menu'}
];
export function buildOrderMessage({flavor,guests,date,notes}){
 const lines=['¡Hola, DPD Cake! Me gustaría consultar un encargo.',`🍰 Sabor: ${flavor || 'Me gustaría que me recomendarais un sabor'}.`];
 if(guests)lines.push(`🥄 Personas: ${guests}.`);
 if(date){const [y,m,d]=date.split('-');lines.push(`📅 Fecha deseada: ${d}/${m}/${y}.`);}
 if(notes?.trim())lines.push(`✏️ Detalles: ${notes.trim()}`);
 lines.push('¿Qué tamaños tenéis disponibles? ¿Podéis confirmarme precio, disponibilidad, ingredientes y opciones de recogida o entrega?');
 return lines.join('\n');
}
export const whatsappUrl=message=>`https://wa.me/34601082383?text=${encodeURIComponent(message)}`;
