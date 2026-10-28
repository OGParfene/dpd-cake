import test from 'node:test';
import assert from 'node:assert/strict';
import {buildOrderMessage,instagramDMUrl,flavors,categories,cookieChunks,cookieFillings,getScrollState} from '../src/catalog.js';
test('Instagram preserves all chosen flavors, guests, date and literal notes',()=>{
 const message=buildOrderMessage({flavors:['Pistacho','Ron y pasas','Tres chocolates'],guests:8,date:'2026-12-24',notes:'Alergia: nueces & avellanas + pregunta #1'});
 const url=new URL(instagramDMUrl);assert.equal(url.hostname,'ig.me');assert.equal(url.pathname,'/m/dpdcake');assert.equal(url.search,'');
 for(const text of ['Pistacho','Ron y pasas','Tres chocolates','8','24/12/2026','nueces & avellanas + pregunta #1','tamaños','precio'])assert.ok(message.includes(text));
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

test('every offered size is included literally in the Instagram consultation',()=>{for(const size of ['Pequeña','Mediana','Grande']){const message=buildOrderMessage({flavors:['Pistacho'],size});assert.ok(message.includes(`Tamaño solicitado: ${size}.`));}});

test('cookie preferences stay associated with each selected cookie',()=>{
 const message=buildOrderMessage({flavors:['Cookie Crumble','Cookie clásica'],cookies:[{name:'Cookie Crumble',chunks:['Pistacho','Fresas deshidratadas'],filling:'Chocolate blanco'},{name:'Cookie clásica',chunks:['Chocolate sin lactosa'],filling:'Sin relleno'}]});
 assert.ok(message.includes('Cookie Crumble — trozos: Pistacho, Fresas deshidratadas; relleno: Chocolate blanco.'));
 assert.ok(message.includes('Cookie clásica — trozos: Chocolate sin lactosa; relleno: Sin relleno.'));
});
