import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {JSDOM} from 'jsdom';
import {flavors,categories,cookieChunks,cookieFillings,buildOrderMessage,instagramDMUrl,getScrollState} from '../src/catalog.js';
function setup({motion=false}={}){
 const dom=new JSDOM(readFileSync(new URL('../index.html',import.meta.url),'utf8'),{url:'https://dpdcake.vercel.app',runScripts:'outside-only',pretendToBeVisual:true});const w=dom.window;
 w.matchMedia=()=>({matches:!motion});w.requestAnimationFrame=fn=>{fn(0);return 1;};w.scrollTo=()=>{};w.HTMLElement.prototype.scrollIntoView=()=>{};
 w.HTMLDialogElement.prototype.showModal=function(){this.setAttribute('open','');};w.HTMLDialogElement.prototype.close=function(){this.removeAttribute('open');this.dispatchEvent(new w.Event('close'));};
 let opened;const animations=[];w.open=url=>{opened=url;};
 Object.assign(w,{flavors,categories,cookieChunks,cookieFillings,buildOrderMessage,instagramDMUrl,getScrollState,gsap:{killTweensOf(){},set(){},to(_e,o){if(o.onComplete)animations.push(o.onComplete);},fromTo(_e,_from,to){if(to.onComplete)animations.push(to.onComplete);}}});
 const source=readFileSync(new URL('../src/main.js',import.meta.url),'utf8').replace(/^import .*;\n/gm,'');w.eval(source);return {dom,w,document:w.document,getOpened:()=>opened,finishAnimation:()=>{assert.ok(animations.length,'Expected a pending animation');animations.shift()();},animationCount:()=>animations.length};
}
test('visitor can choose several flavors, copy the order and open Instagram',async()=>{
 const app=setup(),d=app.document;assert.equal(d.querySelector('[name="guests"]'),null);assert.deepEqual([...d.querySelector('[name="size"]').options].map(o=>o.value),['','Grande','12 tartaletas individuales']);d.querySelector('#feature-add').click();d.querySelector('[data-add="brownie"]').click();assert.equal(d.querySelector('#selection-count').textContent,'2');d.querySelector('.header-order').click();assert.ok(d.querySelector('#order-dialog').open);assert.equal(d.querySelectorAll('input[name="flavors"]:checked').length,2);
 d.querySelector('select[name="size"]').value='12 tartaletas individuales';d.querySelector('input[name="time"]').value='18:30';d.querySelector('input[name="date"]').value='2100-12-24';d.querySelector('textarea').value='Alergia: nueces & avellanas';d.querySelector('#order-form').dispatchEvent(new app.w.Event('submit',{bubbles:true,cancelable:true}));assert.equal(app.getOpened(),undefined);const message=d.querySelector('#instagram-summary').value;for(const part of ['Tradicional, Queso brownie','Formato de tarta: 12 tartaletas individuales','Hora de entrega/recogida solicitada: 18:30','24/12/2100','nueces & avellanas'])assert.ok(message.includes(part));
 assert.ok(!message.includes('Personas:'));
 let copied;Object.defineProperty(app.w.navigator,'clipboard',{value:{writeText:async text=>{copied=text;}},configurable:true});
 d.querySelector('#copy-instagram').click();await Promise.resolve();
 assert.equal(app.getOpened(),'https://ig.me/m/dpdcake');assert.equal(copied,message);assert.ok(d.querySelector('#copy-status').textContent.includes('Pedido copiado'));

 const check=d.querySelector('input[value="brownie"]');check.checked=false;check.dispatchEvent(new app.w.Event('change',{bubbles:true}));assert.equal(d.querySelector('#selection-count').textContent,'1');assert.equal(d.querySelector('[data-add="brownie"]').getAttribute('aria-pressed'),'false');app.dom.window.close();
});
test('filters retain selections and restore correct selected state',()=>{
 const app=setup(),d=app.document;d.querySelector('[data-add="pistacho"]').click();d.querySelector('[data-filter="brownie"]').click();assert.equal(d.querySelectorAll('.product-card').length,2);assert.equal(d.querySelector('[data-add="pistacho"]'),null);assert.equal(d.querySelector('#selection-count').textContent,'1');d.querySelector('[data-filter="all"]').click();assert.equal(d.querySelectorAll('.product-card').length,29);assert.equal(d.querySelector('[data-add="pistacho"]').getAttribute('aria-pressed'),'true');app.dom.window.close();
});
test('direct flavor navigation works with reduced motion and uses product image',()=>{
 const app=setup(),d=app.document;d.querySelector('[data-explore="1"]').click();assert.equal(d.querySelector('#feature-name').textContent,'Pistacho.');assert.equal(d.querySelector('#feature-product').getAttribute('src'),'/assets/flavors/pistacho.webp');d.querySelector('#feature-add').click();assert.ok(d.querySelector('input[value="pistacho"]').checked);assert.equal(d.querySelector('canvas'),null);app.dom.window.close();
});

function scrollToFlavor(app,index){
 Object.defineProperty(app.w,'innerHeight',{value:1000,configurable:true});
 const story=app.document.querySelector('#flavor-story');
 Object.defineProperties(story,{offsetTop:{value:500,configurable:true},offsetHeight:{value:10500,configurable:true}});
 Object.defineProperty(app.w,'scrollY',{value:500+(index+.35)/flavors.length*9500,configurable:true});
 app.w.dispatchEvent(new app.w.Event('scroll'));
}
test('fast scrolling shows each intervening flavor without cancelling its entrance',()=>{
 const app=setup({motion:true}),d=app.document;
 scrollToFlavor(app,3);scrollToFlavor(app,4);
 assert.equal(app.animationCount(),1);
 for(const index of [1,2,3,4]){
  app.finishAnimation();assert.equal(d.querySelector('#feature-name').textContent,flavors[index].name+'.');
  app.finishAnimation();
 }
 assert.equal(app.animationCount(),0);app.dom.window.close();
});
test('scrolling back reverses the sequence after the visible flavor finishes',()=>{
 const app=setup({motion:true}),d=app.document;scrollToFlavor(app,4);app.finishAnimation();
 assert.equal(d.querySelector('#feature-name').textContent,'Pistacho.');scrollToFlavor(app,0);
 app.finishAnimation();app.finishAnimation();assert.equal(d.querySelector('#feature-name').textContent,'Tradicional.');
 app.finishAnimation();assert.equal(app.animationCount(),0);app.dom.window.close();
});
test('direct navigation still goes straight to the chosen flavor',()=>{
 const app=setup({motion:true}),d=app.document;d.querySelector('[data-explore="8"]').click();
 app.finishAnimation();assert.equal(d.querySelector('#feature-name').textContent,'Tres chocolates.');
 app.finishAnimation();assert.equal(app.animationCount(),0);app.dom.window.close();
});
test('leaving the section clears queued transitions and ignores stale callbacks',()=>{
 const app=setup({motion:true}),d=app.document;scrollToFlavor(app,4);
 Object.defineProperty(app.w,'scrollY',{value:12000,configurable:true});app.w.dispatchEvent(new app.w.Event('scroll'));
 assert.equal(d.querySelector('#feature-name').textContent,'Browkie.');
 app.finishAnimation();assert.equal(d.querySelector('#feature-name').textContent,'Browkie.');app.dom.window.close();
});

test('clipboard refusal keeps the order available for manual copy',async()=>{
 const app=setup(),d=app.document;d.querySelector('#feature-add').click();d.querySelector('#order-form').dispatchEvent(new app.w.Event('submit',{bubbles:true,cancelable:true}));
 Object.defineProperty(app.w.navigator,'clipboard',{value:{writeText:()=>Promise.reject(new Error('Not allowed'))},configurable:true});
 d.querySelector('#copy-instagram').click();await Promise.resolve();assert.ok(d.querySelector('#copy-status').textContent.includes('No se pudo copiar'));assert.equal(d.activeElement.id,'instagram-summary');assert.ok(d.querySelector('#instagram-summary').value.includes('Tradicional'));assert.ok(d.querySelector('#instagram-review a').href.includes('instagram.com/dpdcake'));app.dom.window.close();
});
test('prepared summary updates when sizes or flavors change before copying',()=>{
 const app=setup(),d=app.document;d.querySelector('#order-form').dispatchEvent(new app.w.Event('submit',{bubbles:true,cancelable:true}));
 d.querySelector('[data-add="pistacho"]').click();const size=d.querySelector('[name="size"]');size.value='Grande';size.dispatchEvent(new app.w.Event('input',{bubbles:true}));
 assert.ok(d.querySelector('#instagram-summary').value.includes('Pistacho'));assert.ok(d.querySelector('#instagram-summary').value.includes('Grande'));assert.equal(app.getOpened(),undefined);app.dom.window.close();
});

test('story filters rebuild navigation and preserve selections across categories',()=>{
 const app=setup(),d=app.document;
 d.querySelector('[data-explore="28"]').click();assert.equal(d.querySelector('#feature-name').textContent,'Browkie.');
 d.querySelector('#feature-add').click();
 d.querySelector('[data-story-filter="cookies"]').click();
 assert.equal(d.querySelector('#feature-name').textContent,'Cookie Crumble.');assert.equal(d.querySelector('#feature-counter').textContent,'01 — 02');assert.equal(d.querySelectorAll('[data-explore]').length,2);
 assert.equal(d.querySelector('#flavor-story').style.getPropertyValue('--story-height'),'250svh');
 d.querySelector('#next-flavor').click();assert.equal(d.querySelector('#feature-name').textContent,'Cookie clásica.');assert.ok(d.querySelector('#next-flavor').disabled);
 d.querySelector('#feature-add').click();d.querySelector('[data-story-filter="queso"]').click();assert.equal(d.querySelectorAll('[data-explore]').length,24);assert.equal(d.querySelector('#feature-name').textContent,'Tradicional.');
 assert.equal(d.querySelector('#selection-count').textContent,'2');
 d.querySelector('[data-story-filter="brownie"]').click();d.querySelector('#next-flavor').click();assert.equal(d.querySelector('#feature-add').getAttribute('aria-pressed'),'true');
 app.dom.window.close();
});
test('changing a story category cancels a pending animation with old indices',()=>{
 const app=setup({motion:true}),d=app.document;
 scrollToFlavor(app,8);assert.equal(app.animationCount(),1);
 d.querySelector('[data-story-filter="cookies"]').click();assert.equal(d.querySelector('#feature-name').textContent,'Cookie Crumble.');
 app.finishAnimation();assert.equal(d.querySelector('#feature-name').textContent,'Cookie Crumble.');assert.equal(app.animationCount(),0);
 app.dom.window.close();
});
test('each cookie has its own chunks and filling and deselection removes its customization',()=>{
 const app=setup(),d=app.document;
 assert.ok(d.querySelector('#cookie-options').hidden);
 d.querySelector('[data-add="cookie-crumble"]').click();d.querySelector('[data-add="cookie-normal"]').click();
 assert.equal(d.querySelector('#cookie-options').hidden,false);assert.ok(d.querySelector('[name="size"]').disabled);
 const choose=(name,value)=>{const control=[...d.querySelectorAll(`[name="${name}"]`)].find(input=>input.value===value);control.checked=true;control.dispatchEvent(new app.w.Event('input',{bubbles:true}));};
 choose('cookie-crumble-chunks','Pistacho');choose('cookie-crumble-chunks','Fresas deshidratadas');choose('cookie-normal-chunks','Chocolate sin lactosa');
 d.querySelector('[name="cookie-crumble-filling"]').value='Chocolate blanco';d.querySelector('[name="cookie-normal-filling"]').value='Chocolate negro';
 d.querySelector('#order-form').dispatchEvent(new app.w.Event('submit',{bubbles:true,cancelable:true}));
 let summary=d.querySelector('#instagram-summary').value;
 assert.ok(summary.includes('Cookie Crumble — trozos: Pistacho, Fresas deshidratadas; relleno: Chocolate blanco; tamaño: a consultar; cantidad: a consultar.'));
 assert.ok(summary.includes('Cookie clásica — trozos: Chocolate sin lactosa; relleno: Chocolate negro; tamaño: a consultar; cantidad: a consultar.'));assert.ok(!summary.includes('Formato de tarta:'));
 for(const [name,value] of [['cookie-crumble-size','80 g'],['cookie-crumble-portion','1 ración'],['cookie-normal-size','40 g'],['cookie-normal-portion','½ ración']]){const input=d.querySelector(`[name="${name}"]`);input.value=value;input.dispatchEvent(new app.w.Event('input',{bubbles:true}));}
 summary=d.querySelector('#instagram-summary').value;assert.ok(summary.includes('Cookie Crumble — trozos: Pistacho, Fresas deshidratadas; relleno: Chocolate blanco; tamaño: 80 g; cantidad: 1 ración.'));assert.ok(summary.includes('Cookie clásica — trozos: Chocolate sin lactosa; relleno: Chocolate negro; tamaño: 40 g; cantidad: ½ ración.'));
 d.querySelector('[data-add="cookie-normal"]').click();summary=d.querySelector('#instagram-summary').value;
 assert.ok(!summary.includes('Cookie clásica'));assert.ok(!summary.includes('Chocolate sin lactosa'));assert.ok(!summary.includes('40 g'));assert.ok(!summary.includes('½ ración'));assert.ok(d.querySelector('[data-cookie-options="cookie-normal"]').disabled);
 d.querySelector('[data-add="pistacho"]').click();assert.equal(d.querySelector('[name="size"]').disabled,false);
 d.querySelector('[data-add="cookie-crumble"]').click();assert.ok(d.querySelector('#cookie-options').hidden);
 app.dom.window.close();
});
