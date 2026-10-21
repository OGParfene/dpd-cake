import test from 'node:test';
import assert from 'node:assert/strict';
import {buildOrderMessage,whatsappUrl,flavors} from '../src/catalog.js';
test('WhatsApp contains chosen flavor, guests, date and literal customer notes',()=>{
 const message=buildOrderMessage({flavor:'Queso y Lotus',guests:8,date:'2026-12-24',notes:'Alergia: nueces & avellanas + pregunta #1'});
 const url=new URL(whatsappUrl(message));
 assert.equal(url.hostname,'wa.me');assert.equal(url.pathname,'/34601082383');assert.equal(url.searchParams.get('text'),message);
 for(const text of ['Queso y Lotus','8','24/12/2026','nueces & avellanas + pregunta #1','tamaños','precio'])assert.ok(message.includes(text));
});
test('size consultation works without an assumed flavor or invented size',()=>{
 const message=buildOrderMessage({guests:12});assert.ok(message.includes('recomendarais'));assert.ok(message.includes('12'));assert.ok(!message.includes('undefined'));assert.ok(!message.includes('NaN'));
});
test('every catalog flavor has a unique identifier and a recorded source',()=>{
 assert.equal(new Set(flavors.map(f=>f.id)).size,flavors.length);assert.ok(flavors.every(f=>f.name&&f.source));
});
