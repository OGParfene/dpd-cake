import test from 'node:test';
import assert from 'node:assert/strict';
import {buildOrderMessage,instagramDMUrl,flavors,categories,cookieChunks,cookieFillings,getScrollState} from '../src/catalog.js';
test('Instagram preserves all chosen flavors, time, date and literal notes',()=>{
 const message=buildOrderMessage({flavors:['Pistacho','Ron y pasas','Tres chocolates'],time:'18:30',date:'2026-12-24',notes:'Alergia: nueces & avellanas + pregunta #1'});
 const url=new URL(instagramDMUrl);assert.equal(url.hostname,'ig.me');assert.equal(url.pathname,'/m/dpdcake');assert.equal(url.search,'');
 for(const text of ['Pistacho','Ron y pasas','Tres chocolates','18:30','24/12/2026','nueces & avellanas + pregunta #1','formato','precio'])assert.ok(message.includes(text));
});
test('empty consultation asks for a recommendation without fabricated values',()=>{const message=buildOrderMessage();assert.ok(message.includes('recomendarais'));assert.ok(!message.includes('undefined'));assert.ok(!message.includes('NaN'));});
test('expanded catalog has all 29 confirmed products in the right categories',()=>{
 assert.equal(flavors.length,29);assert.equal(new Set(flavors.map(f=>f.id)).size,29);
 for(const [category,count] of Object.entries({queso:24,tartas:1,cookies:2,brownie:2}))assert.equal(flavors.filter(f=>f.category===category).length,count);
 assert.equal(flavors.find(f=>f.id==='dark-chocolate').category,'queso');assert.equal(flavors.find(f=>f.id==='brownie').category,'queso');
 assert.equal(flavors.find(f=>f.id==='desde-cero').name,'Desde Cero (Chocoflakes)');
 assert.equal(cookieChunks.length,4);assert.equal(cookieFillings.length,3);
 assert.ok(flavors.every(f=>categories.some(c=>c.id===f.category)));
});
test('scroll state reaches every product in full and filtered categories',()=>{
 for(const count of [1,2,24,29]){
  assert.equal(getScrollState(-500,100,11000,1000,count).index,0);
  assert.equal(getScrollState(20000,100,11000,1000,count).index,count-1);
  for(let i=0;i<count;i++)assert.equal(getScrollState(100+(i+.5)/count*10000,100,11000,1000,count).index,i);
 }
});

test('every offered size is included literally in the Instagram consultation',()=>{for(const size of ['Grande','12 tartaletas individuales']){const message=buildOrderMessage({flavors:['Pistacho'],size});assert.ok(message.includes(`Formato de tarta: ${size}.`));}});

test('cookie preferences stay associated with each selected cookie',()=>{
 const message=buildOrderMessage({flavors:['Cookie Crumble','Cookie clásica'],cookies:[{name:'Cookie Crumble',chunks:['Pistacho','Fresas deshidratadas'],filling:'Chocolate blanco'},{name:'Cookie clásica',chunks:['Chocolate sin lactosa'],filling:'Sin relleno'}]});
 assert.ok(message.includes('Cookie Crumble — trozos: Pistacho, Fresas deshidratadas; relleno: Chocolate blanco; tamaño: a consultar; cantidad: a consultar.'));
 assert.ok(message.includes('Cookie clásica — trozos: Chocolate sin lactosa; relleno: Sin relleno; tamaño: a consultar; cantidad: a consultar.'));
});

test('requested collection time and per-cookie size and portion are preserved without a headcount',()=>{
 const message=buildOrderMessage({time:'09:05',guests:12,cookies:[{name:'Cookie Crumble',size:'80 g',portion:'1 ración'},{name:'Cookie clásica',size:'40 g',portion:'½ ración'}]});
 assert.ok(message.includes('Hora de entrega/recogida solicitada: 09:05.'));assert.ok(!message.includes('Personas:'));
 assert.ok(message.includes('Cookie Crumble — trozos: a consultar; relleno: a consultar; tamaño: 80 g; cantidad: 1 ración.'));
 assert.ok(message.includes('Cookie clásica — trozos: a consultar; relleno: a consultar; tamaño: 40 g; cantidad: ½ ración.'));
 assert.ok(!buildOrderMessage().includes('Hora de entrega/recogida solicitada:'));
});
