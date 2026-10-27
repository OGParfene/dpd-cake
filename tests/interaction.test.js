import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {JSDOM} from 'jsdom';
import {flavors,buildOrderMessage,whatsappUrl,getScrollState} from '../src/catalog.js';
function setup(){
 const dom=new JSDOM(readFileSync(new URL('../index.html',import.meta.url),'utf8'),{url:'https://dpdcake.vercel.app',runScripts:'outside-only',pretendToBeVisual:true});const w=dom.window;
 w.matchMedia=()=>({matches:true});w.requestAnimationFrame=fn=>{fn(0);return 1;};w.scrollTo=()=>{};w.HTMLElement.prototype.scrollIntoView=()=>{};
 w.HTMLDialogElement.prototype.showModal=function(){this.setAttribute('open','');};w.HTMLDialogElement.prototype.close=function(){this.removeAttribute('open');this.dispatchEvent(new w.Event('close'));};
 let opened;w.open=(url)=>{opened=url;};Object.assign(w,{flavors,buildOrderMessage,whatsappUrl,getScrollState,gsap:{killTweensOf(){},to(_e,o){o.onComplete?.();},fromTo(){}}});
 const source=readFileSync(new URL('../src/main.js',import.meta.url),'utf8').replace(/^import .*;\n/gm,'').replace(/import\('\.\/cake\.js'\)[\s\S]*?\.catch\(showFallback\);/,'showFallback();');
 w.eval(source);return {dom,w,document:w.document,getOpened:()=>opened};
}
test('visitor can choose multiple flavors, change selections and prepare WhatsApp consultation',()=>{
 const app=setup();const d=app.document;
 d.querySelector('#add-flavor').click();d.querySelector('[data-add="brownie"]').click();assert.equal(d.querySelector('#selection-count').textContent,'2');
 d.querySelector('.header-order').click();assert.ok(d.querySelector('#order-dialog').open);assert.equal(d.querySelectorAll('input[name="flavors"]:checked').length,2);
 d.querySelector('input[name="guests"]').value='8';d.querySelector('input[name="date"]').value='2100-12-24';d.querySelector('textarea').value='Alergia: nueces & avellanas';
 d.querySelector('#order-form').dispatchEvent(new app.w.Event('submit',{bubbles:true,cancelable:true}));const u=new URL(app.getOpened());assert.equal(u.pathname,'/34601082383');const message=u.searchParams.get('text');assert.ok(message.includes('Tradicional, Brownie'));assert.ok(message.includes('Personas: 8'));assert.ok(message.includes('24/12/2100'));assert.ok(message.includes('nueces & avellanas'));
 const check=d.querySelector('input[value="brownie"]');check.checked=false;check.dispatchEvent(new app.w.Event('change',{bubbles:true}));assert.equal(d.querySelector('#selection-count').textContent,'1');assert.equal(d.querySelector('[data-add="brownie"]').getAttribute('aria-pressed'),'false');app.dom.window.close();
});
test('reduced-motion visitor can choose a flavor directly and order it without scrolling',()=>{
 const app=setup();const d=app.document;d.querySelector('[data-explore="1"]').click();assert.equal(d.querySelector('#active-name').textContent,'Pistacho');d.querySelector('#quick-order').click();assert.ok(d.querySelector('input[value="pistacho"]').checked);assert.ok(d.querySelector('#order-dialog').open);assert.ok(!d.querySelector('.cake-fallback').hidden);app.dom.window.close();
});
