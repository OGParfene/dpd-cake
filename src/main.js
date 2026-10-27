import './style.css';
import './icons.css';
import {gsap} from 'gsap';
import {flavors,buildOrderMessage,whatsappUrl,getScrollState} from './catalog.js';

const $=s=>document.querySelector(s);
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const story=$('.story');const stage=$('.stage');const chosen=new Set();
let current=-1,cake=null,framePending=false,forcedIndex=null,feedbackTimer;
const title=$('#flavor-title'),description=$('#flavor-description');
const menu=$('#menu-grid');
menu.innerHTML=flavors.map((f,i)=>`<article class="menu-item"><span class="menu-item-number">${String(i+1).padStart(2,'0')}</span><div><h3>${f.name}</h3><p>${f.description}</p></div><div class="menu-item-actions"><button data-explore="${i}" aria-label="Ver la tarta ${f.name}"><i class="ph ph-eye" aria-hidden="true"></i></button><button data-add="${f.id}" aria-label="Añadir ${f.name} a la consulta" aria-pressed="false"><i class="ph ph-plus" aria-hidden="true"></i></button></div></article>`).join('');
const checkboxes=$('#order-flavors');
checkboxes.insertAdjacentHTML('beforeend',flavors.map(f=>`<label class="flavor-checkbox"><input type="checkbox" value="${f.id}" name="flavors"/><span>${f.name}</span></label>`).join(''));
function updateSelection(){
 const count=chosen.size;$('#selection-count').textContent=count;$('#basket-count').textContent=count;$('.basket-button').classList.toggle('has-items',count>0);
 document.querySelectorAll('[data-add]').forEach(b=>{const selected=chosen.has(b.dataset.add);b.setAttribute('aria-pressed',String(selected));b.setAttribute('aria-label',`${selected?'Quitar':'Añadir'} ${flavors.find(f=>f.id===b.dataset.add).name} ${selected?'de':'a'} la consulta`);b.querySelector('i').className=`ph ph-${selected?'check':'plus'}`;});
 document.querySelectorAll('input[name="flavors"]').forEach(input=>input.checked=chosen.has(input.value));
 const selected=chosen.has(flavors[Math.max(0,current)].id);const button=$('#add-flavor');button.classList.toggle('is-selected',selected);button.setAttribute('aria-pressed',String(selected));button.querySelector('span').textContent=selected?'En mi pedido':'La quiero';button.querySelector('i').className=`ph ph-${selected?'check':'plus'}`;
}
function toggleFlavor(id){const f=flavors.find(f=>f.id===id);if(chosen.has(id))chosen.delete(id);else chosen.add(id);updateSelection();clearTimeout(feedbackTimer);$('#selection-feedback').textContent=chosen.has(id)?`${f.name} en tu consulta. ¿Otro antojo?`:`${f.name} quitada de tu consulta.`;feedbackTimer=setTimeout(()=>{$('#selection-feedback').textContent='';},3600);}
function applyFlavor(index,initial=false){
 if(index===current)return;current=index;const f=flavors[index];story.style.setProperty('--scene',f.color);story.style.setProperty('--scene-ink',f.ink);$('meta[name="theme-color"]').content=f.color;
 const update=()=>{title.innerHTML=`<span class="desktop-name">${f.display.split('\n').join('<br/>')}</span><span class="mobile-name">${f.name}.</span>`;description.textContent=f.description;$('#flavor-number').textContent=String(index+1).padStart(2,'0');$('#active-name').textContent=f.name;$('.stage-category').textContent=f.id==='tres-chocolates'?'SPECIAL CAKE':'CHEESECAKE';updateSelection();};
 if(initial||reduced){update();}else{gsap.killTweensOf([title,description]);gsap.to([title,description],{opacity:0,x:-12,duration:.12,onComplete:()=>{update();gsap.fromTo([title,description],{opacity:0,x:22},{opacity:1,x:0,duration:.42,stagger:.04,ease:'power2.out'});}});}
 $('#prev-flavor').disabled=index===0;$('#next-flavor').disabled=index===flavors.length-1;$('#flavor-progress-fill').style.width=`${(index+1)/flavors.length*100}%`;
}
function jumpTo(index){
 index=Math.max(0,Math.min(flavors.length-1,index));const range=story.offsetHeight-window.innerHeight;
 if(reduced){forcedIndex=index;applyFlavor(index);cake?.setFlavor(index);window.scrollTo({top:story.offsetTop,behavior:'instant'});return;}
 forcedIndex=null;window.scrollTo({top:story.offsetTop+(index+.12)/flavors.length*range,behavior:'smooth'});
}
function onScroll(){if(framePending)return;framePending=true;requestAnimationFrame(()=>{framePending=false;const state=getScrollState(window.scrollY,story.offsetTop,story.offsetHeight,window.innerHeight,flavors.length);const index=forcedIndex??state.index;applyFlavor(index);cake?.setFlavor(index,state.local);if(!reduced)$('.graffiti').style.transform=`translateY(${-state.progress*3}%) rotate(${state.progress*2}deg)`;});}
window.addEventListener('scroll',onScroll,{passive:true});window.addEventListener('resize',onScroll);applyFlavor(0,true);onScroll();
$('#prev-flavor').addEventListener('click',()=>jumpTo(current-1));$('#next-flavor').addEventListener('click',()=>jumpTo(current+1));
$('#add-flavor').addEventListener('click',()=>toggleFlavor(flavors[current].id));
for(const selector of ['#menu-toggle','#open-all'])$(selector).addEventListener('click',()=>$('#carta').scrollIntoView({behavior:reduced?'instant':'smooth'}));
menu.addEventListener('click',e=>{const add=e.target.closest('[data-add]');if(add)toggleFlavor(add.dataset.add);const explore=e.target.closest('[data-explore]');if(explore)jumpTo(Number(explore.dataset.explore));});
let focusReturn;
function openOrder(){focusReturn=document.activeElement;$('#order-dialog').showModal();}
document.querySelectorAll('.order-trigger').forEach(b=>b.addEventListener('click',openOrder));
$('#quick-order').addEventListener('click',()=>{chosen.add(flavors[current].id);updateSelection();openOrder();});
checkboxes.addEventListener('change',e=>{if(e.target.matches('input')){if(e.target.checked)chosen.add(e.target.value);else chosen.delete(e.target.value);updateSelection();}});
const dateInput=$('input[name="date"]');const today=new Date();dateInput.min=[today.getFullYear(),String(today.getMonth()+1).padStart(2,'0'),String(today.getDate()).padStart(2,'0')].join('-');
$('#order-form').addEventListener('submit',e=>{
 e.preventDefault();if(!e.target.reportValidity())return;const data=new FormData(e.target);
 const message=buildOrderMessage({flavors:flavors.filter(f=>chosen.has(f.id)).map(f=>f.name),guests:data.get('guests'),date:data.get('date'),notes:data.get('notes')});
 window.open(whatsappUrl(message),'_blank','noopener,noreferrer');
});
$('#privacy-open').addEventListener('click',()=>{focusReturn=document.activeElement;$('#privacy-dialog').showModal();});
document.querySelectorAll('dialog').forEach(d=>{d.querySelector('.dialog-close').addEventListener('click',()=>d.close());d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close();}});d.addEventListener('close',()=>focusReturn?.focus());});
$('#business-link').href=whatsappUrl('¡Hola, DPD Cake! Me gustaría consultar vuestros postres para mi negocio o evento.');$('#year').textContent=new Date().getFullYear();
// Keep the catalog and orders usable even if 3D is unsupported or its bundle cannot load.
function showFallback(){const image=$('.cake-fallback');image.hidden=false;$('#cake-canvas').hidden=true;$('#cake-hint').textContent='ELIGE TU SABOR EN LA CARTA.';$('#cake-stage').classList.add('loaded');}
import('./cake.js').then(({createCake})=>{cake=createCake($('#cake-canvas'),flavors,{onChoose:jumpTo,reducedMotion:reduced,onReady:()=>$('#cake-stage').classList.add('loaded')});if(!cake)showFallback();else cake.setFlavor(current);}).catch(showFallback);
window.addEventListener('pagehide',e=>{if(!e.persisted)cake?.dispose();});
