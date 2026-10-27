// Catálogo confirmado por las piezas de marca facilitadas el 27/10/2026.
// Una fila por sabor: los cambios aquí actualizan escena, menú y pedidos.
export const flavors = [
 {id:'tradicional',name:'Tradicional',display:'Tradi\ncional.',description:'Queso y dulzura. La sencillez de una tarta bien hecha.',color:'#d3953a',ink:'#fff9ed',filling:'#f5dfac',top:'#ad571d',crumb:'#ac763f',topping:'plain',category:'queso',source:'user-brand-image'},
 {id:'pistacho',name:'Pistacho',display:'Pistacho.',description:'Un toque sorprendente. Una combinación irresistible.',color:'#a8b15f',ink:'#fffceb',filling:'#b7be86',top:'#99571c',crumb:'#a17b3e',topping:'pistachio',category:'queso',source:'user-brand-image'},
 {id:'frutas',name:'Frutas',display:'Frutas.',description:'Un poco de color a tu vida. Y de queso, por supuesto.',color:'#df765a',ink:'#fff8ea',filling:'#f1e6bd',top:'#f2d99a',crumb:'#bc8b4d',topping:'fruit',category:'queso',source:'user-brand-image'},
 {id:'cabrales',name:'Cabrales',display:'Cabrales.',description:'Mucha personalidad. Cremosa desde el primer bocado.',color:'#d5a237',ink:'#fff9e7',filling:'#ded7b4',top:'#bb711e',crumb:'#a4763e',topping:'cabrales',category:'queso',source:'user-brand-image'},
 {id:'dark-chocolate',name:'Dark Chocolate',display:'Dark\nchocolate.',description:'Oscura, intensa y dulce. Tu momento más goloso.',color:'#48291f',ink:'#fff1da',filling:'#693a28',top:'#3e2018',crumb:'#42261c',topping:'chocolate',category:'chocolate',source:'user-brand-image'},
 {id:'crumble-cookie',name:'Crumble Cookie',display:'Crumble\ncookie.',description:'Galleta y queso. Una fusión para repetir.',color:'#b88051',ink:'#fff6e4',filling:'#d3b38d',top:'#97612e',crumb:'#947044',topping:'cookie',category:'queso',source:'user-brand-image'},
 {id:'ron-pasas',name:'Ron y pasas',display:'Ron y\npasas.',description:'La más rebelde. Ron, pasas y mucho carácter.',color:'#a75c30',ink:'#fff5df',filling:'#ead3a1',top:'#a0531e',crumb:'#986735',topping:'raisin',category:'queso',source:'user-brand-image'},
 {id:'happy-hippo',name:'Happy Hippo',display:'Happy\nHippo.',description:'Cremosidad suave y un toque dulce en cada bocado.',color:'#c69b67',ink:'#fff8e8',filling:'#efdeaf',top:'#ad6026',crumb:'#b58c4c',topping:'hippo',category:'queso',source:'user-brand-image'},
 {id:'tres-chocolates',name:'Tres chocolates',display:'3\nchocolates.',description:'Tres sabores. Una combinación que nunca falla.',color:'#a27c68',ink:'#fff5e8',filling:'#ba8b6b',top:'#f1e0bc',crumb:'#9a6c3e',topping:'triple',category:'chocolate',source:'user-brand-image'},
 {id:'brownie',name:'Brownie',display:'Brownie.',description:'Cuando el brownie y la tarta de queso se enamoran.',color:'#945a3e',ink:'#fff3e6',filling:'#bc8a6b',top:'#7c3c20',crumb:'#794f31',topping:'brownie',category:'chocolate',source:'user-brand-image'}
];
export const whatsappUrl=message=>`https://wa.me/34601082383?text=${encodeURIComponent(message)}`;
export function buildOrderMessage({flavors:chosen=[],flavor,guests,date,notes}={}){
 const names=chosen.length?chosen:flavor?[flavor]:[];
 const lines=['¡Hola, DPD Cake! Me gustaría consultar un encargo.',names.length?`Sabores: ${names.join(', ')}.`:'Me gustaría que me recomendarais un sabor.'];
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
