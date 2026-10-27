import test from 'node:test';
import assert from 'node:assert/strict';
import {buildOrderMessage,instagramDMUrl,flavors,getScrollState} from '../src/catalog.js';
test('Instagram preserves all chosen flavors, guests, date and literal notes',()=>{
 const message=buildOrderMessage({flavors:['Pistacho','Ron y pasas','Tres chocolates'],guests:8,date:'2026-12-24',notes:'Alergia: nueces & avellanas + pregunta #1'});
 const url=new URL(instagramDMUrl);assert.equal(url.hostname,'ig.me');assert.equal(url.pathname,'/m/dpdcake');assert.equal(url.search,'');
 for(const text of ['Pistacho','Ron y pasas','Tres chocolates','8','24/12/2026','nueces & avellanas + pregunta #1','tamaños','precio'])assert.ok(message.includes(text));
});
test('empty consultation asks for a recommendation without fabricated values',()=>{const message=buildOrderMessage();assert.ok(message.includes('recomendarais'));assert.ok(!message.includes('undefined'));assert.ok(!message.includes('NaN'));});
test('catalog exactly reflects 10 distinct documented flavors, not the collaboration',()=>{assert.equal(flavors.length,10);assert.equal(new Set(flavors.map(f=>f.id)).size,10);assert.ok(flavors.every(f=>f.source==='user-brand-image'));assert.equal(flavors.filter(f=>f.id==='happy-hippo').length,1);assert.ok(!flavors.some(f=>f.name.includes('Desde Cero')));});
test('scroll state clamps before and after story and reaches all 10 flavors',()=>{assert.equal(getScrollState(-500,100,11000,1000,10).index,0);assert.equal(getScrollState(20000,100,11000,1000,10).index,9);for(let i=0;i<10;i++)assert.equal(getScrollState(100+(i+.5)*1000,100,11000,1000,10).index,i);});

test('every offered size is included literally in the Instagram consultation',()=>{for(const size of ['Pequeña','Mediana','Grande']){const message=buildOrderMessage({flavors:['Pistacho'],size});assert.ok(message.includes(`Tamaño solicitado: ${size}.`));}});
