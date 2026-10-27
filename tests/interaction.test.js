import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {JSDOM} from 'jsdom';
import {flavors,buildOrderMessage,instagramDMUrl,getScrollState} from '../src/catalog.js';
function setup({motion=false}={}){
 const dom=new JSDOM(readFileSync(new URL('../index.html',import.meta.url),'utf8'),{url:'https://dpdcake.vercel.app',runScripts:'outside-only',pretendToBeVisual:true});const w=dom.window;
 w.matchMedia=()=>({matches:!motion});w.requestAnimationFrame=fn=>{fn(0);return 1;};w.scrollTo=()=>{};w.HTMLElement.prototype.scrollIntoView=()=>{};
 w.HTMLDialogElement.prototype.showModal=function(){this.setAttribute('open','');};w.HTMLDialogElement.prototype.close=function(){this.removeAttribute('open');this.dispatchEvent(new w.Event('close'));};
 let opened;const animations=[];w.open=url=>{opened=url;};
 Object.assign(w,{flavors,buildOrderMessage,instagramDMUrl,getScrollState,gsap:{killTweensOf(){},set(){},to(_e,o){if(o.onComplete)animations.push(o.onComplete);},fromTo(_e,_from,to){if(to.onComplete)animations.push(to.onComplete);}}});
 const source=readFileSync(new URL('../src/main.js',import.meta.url),'utf8').replace(/^import .*;\n/gm,'');w.eval(source);return {dom,w,document:w.document,getOpened:()=>opened,finishAnimation:()=>{assert.ok(animations.length,'Expected a pending animation');animations.shift()();},animationCount:()=>animations.length};
}
test('visitor can choose several flavors, copy the order and open Instagram',async()=>{
 const app=setup(),d=app.document;d.querySelector('#feature-add').click();d.querySelector('[data-add="brownie"]').click();assert.equal(d.querySelector('#selection-count').textContent,'2');d.querySelector('.header-order').click();assert.ok(d.querySelector('#order-dialog').open);assert.equal(d.querySelectorAll('input[name="flavors"]:checked').length,2);
 d.querySelector('select[name="size"]').value='Mediana';d.querySelector('input[name="guests"]').value='8';d.querySelector('input[name="date"]').value='2100-12-24';d.querySelector('textarea').value='Alergia: nueces & avellanas';d.querySelector('#order-form').dispatchEvent(new app.w.Event('submit',{bubbles:true,cancelable:true}));assert.equal(app.getOpened(),undefined);const message=d.querySelector('#instagram-summary').value;for(const part of ['Tradicional, Brownie','Tamaño solicitado: Mediana','Personas: 8','24/12/2100','nueces & avellanas'])assert.ok(message.includes(part));
 let copied;Object.defineProperty(app.w.navigator,'clipboard',{value:{writeText:async text=>{copied=text;}},configurable:true});
 d.querySelector('#copy-instagram').click();await Promise.resolve();
 assert.equal(app.getOpened(),'https://ig.me/m/dpdcake');assert.equal(copied,message);assert.ok(d.querySelector('#copy-status').textContent.includes('Pedido copiado'));

 const check=d.querySelector('input[value="brownie"]');check.checked=false;check.dispatchEvent(new app.w.Event('change',{bubbles:true}));assert.equal(d.querySelector('#selection-count').textContent,'1');assert.equal(d.querySelector('[data-add="brownie"]').getAttribute('aria-pressed'),'false');app.dom.window.close();
});
test('filters retain selections and restore correct selected state',()=>{
 const app=setup(),d=app.document;d.querySelector('[data-add="pistacho"]').click();d.querySelector('[data-filter="chocolate"]').click();assert.equal(d.querySelectorAll('.product-card').length,3);assert.equal(d.querySelector('[data-add="pistacho"]'),null);assert.equal(d.querySelector('#selection-count').textContent,'1');d.querySelector('[data-filter="all"]').click();assert.equal(d.querySelectorAll('.product-card').length,10);assert.equal(d.querySelector('[data-add="pistacho"]').getAttribute('aria-pressed'),'true');app.dom.window.close();
});
test('direct flavor navigation works with reduced motion and uses product image',()=>{
 const app=setup(),d=app.document;d.querySelector('[data-explore="1"]').click();assert.equal(d.querySelector('#feature-name').textContent,'Pistacho.');assert.equal(d.querySelector('#feature-product').getAttribute('src'),'/assets/flavors/pistacho.webp');d.querySelector('#feature-add').click();assert.ok(d.querySelector('input[value="pistacho"]').checked);assert.equal(d.querySelector('canvas'),null);app.dom.window.close();
});

function scrollToFlavor(app,index){
 Object.defineProperty(app.w,'innerHeight',{value:1000,configurable:true});
 const story=app.document.querySelector('#flavor-story');
 Object.defineProperties(story,{offsetTop:{value:500,configurable:true},offsetHeight:{value:10500,configurable:true}});
 Object.defineProperty(app.w,'scrollY',{value:500+(index+.35)/10*9500,configurable:true});
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
 assert.equal(d.querySelector('#feature-name').textContent,'Brownie.');
 app.finishAnimation();assert.equal(d.querySelector('#feature-name').textContent,'Brownie.');app.dom.window.close();
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
