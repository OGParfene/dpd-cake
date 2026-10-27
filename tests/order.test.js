import test from 'node:test';
import assert from 'node:assert/strict';
import {buildOrderMessage,whatsappUrl,flavors,getScrollState} from '../src/catalog.js';
import {makeWedge,sliceOffset,TAU} from '../src/geometry.js';
test('WhatsApp preserves all chosen flavors, guests, date and literal notes',()=>{
 const message=buildOrderMessage({flavors:['Pistacho','Ron y pasas','Tres chocolates'],guests:8,date:'2026-12-24',notes:'Alergia: nueces & avellanas + pregunta #1'});
 const url=new URL(whatsappUrl(message));assert.equal(url.hostname,'wa.me');assert.equal(url.pathname,'/34601082383');assert.equal(url.searchParams.get('text'),message);
 for(const text of ['Pistacho','Ron y pasas','Tres chocolates','8','24/12/2026','nueces & avellanas + pregunta #1','tamaños','precio'])assert.ok(message.includes(text));
});
test('empty consultation asks for a recommendation without fabricated values',()=>{const message=buildOrderMessage();assert.ok(message.includes('recomendarais'));assert.ok(!message.includes('undefined'));assert.ok(!message.includes('NaN'));});
test('catalog exactly reflects 10 distinct documented flavors, not the collaboration',()=>{assert.equal(flavors.length,10);assert.equal(new Set(flavors.map(f=>f.id)).size,10);assert.ok(flavors.every(f=>f.source==='user-brand-image'));assert.equal(flavors.filter(f=>f.id==='happy-hippo').length,1);assert.ok(!flavors.some(f=>f.name.includes('Desde Cero')));});
test('scroll state clamps before and after story and reaches all 10 flavors',()=>{assert.equal(getScrollState(-500,100,11000,1000,10).index,0);assert.equal(getScrollState(20000,100,11000,1000,10).index,9);for(let i=0;i<10;i++)assert.equal(getScrollState(100+(i+.5)*1000,100,11000,1000,10).index,i);});
test('cake wedge has finite geometry and valid bounds',()=>{const g=makeWedge(1.86,.87,TAU/10);g.computeBoundingBox();for(const x of g.attributes.position.array)assert.ok(Number.isFinite(x));assert.ok(g.boundingBox.max.y>.85);assert.ok(g.boundingBox.min.y<.01);assert.ok(g.boundingBox.max.x>1.8);g.dispose();assert.throws(()=>makeWedge(0,1,1),RangeError);});
test('exploded slices maintain the requested distance in each angular sector',()=>{for(let i=0;i<10;i++){const p=sliceOffset(i,10,.7);assert.ok(Math.abs(Math.hypot(p.x,p.z)-.7)<1e-10);}});
