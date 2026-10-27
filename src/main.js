import './style.css';
import './icons.css';
import {gsap} from 'gsap';
import {flavors,buildOrderMessage,instagramDMUrl,getScrollState} from './catalog.js';

const $=s=>document.querySelector(s);
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const chosen=new Set();const story=$('#flavor-story');const stage=$('.flavor-stage');
let current=-1,framePending=false,forcedIndex=null,jumpTimer,feedbackTimer;
let requestedFlavor=0,transitioning=false,directRequest=false,transitionVersion=0;
const image=$('#feature-product'),name=$('#feature-name'),description=$('#feature-description');
const grid=$('#catalog-grid');let filter='all';
function renderCatalog(){
 grid.innerHTML=flavors.filter(f=>filter==='all'||f.category===filter).map(f=>`<article class="product-card"><div class="product-art" style="--flavor-paper:${f.paper}"><span>${String(flavors.indexOf(f)+1).padStart(2,'0')}</span><img src="${f.image}" alt="Composición de cheesecake ${f.name}" width="512" height="307" loading="lazy"/><button data-add="${f.id}" aria-label="Añadir ${f.name} a mi pedido" aria-pressed="false"><i class="ph ph-plus" aria-hidden="true"></i></button></div><h3>${f.name}</h3><p>${f.description}</p></article>`).join('');updateSelection();
}
$('#flavor-dots').innerHTML=flavors.map((f,i)=>`<button data-explore="${i}" aria-label="Ver ${f.name}" aria-pressed="${i===0}"></button>`).join('');
$('#order-flavors').insertAdjacentHTML('beforeend',flavors.map(f=>`<label class="flavor-checkbox"><input type="checkbox" value="${f.id}" name="flavors"/><span>${f.name}</span></label>`).join(''));
function updateSelection(){
 const count=chosen.size;$('#selection-count').textContent=count;$('#basket-count').textContent=count;$('.basket-button').classList.toggle('has-items',count>0);
 document.querySelectorAll('[data-add]').forEach(b=>{const selected=chosen.has(b.dataset.add);const f=flavors.find(f=>f.id===b.dataset.add);b.setAttribute('aria-pressed',String(selected));b.setAttribute('aria-label',`${selected?'Quitar':'Añadir'} ${f.name} ${selected?'de':'a'} mi pedido`);b.querySelector('i').className=`ph ph-${selected?'check':'plus'}`;});
 document.querySelectorAll('input[name="flavors"]').forEach(input=>input.checked=chosen.has(input.value));
 const selected=chosen.has(flavors[Math.max(0,current)].id);const button=$('#feature-add');button.classList.toggle('is-selected',selected);button.setAttribute('aria-pressed',String(selected));button.querySelector('span').textContent=selected?'En mi pedido':'La quiero';button.querySelector('i').className=`ph ph-${selected?'check':'plus'}`;
 refreshSummary();
}
function toggleFlavor(id){
 const f=flavors.find(f=>f.id===id);if(chosen.has(id))chosen.delete(id);else chosen.add(id);updateSelection();clearTimeout(feedbackTimer);$('#selection-feedback').textContent=chosen.has(id)?`${f.name} añadida. ¿Otro antojo?`:`${f.name} quitada de tu consulta.`;feedbackTimer=setTimeout(()=>$('#selection-feedback').textContent='',3500);
}
function showFlavor(index){
 current=index;const f=flavors[index];stage.style.setProperty('--scene',f.paper);
 $('#feature-number').textContent=String(index+1).padStart(2,'0');$('#feature-counter').textContent=`${String(index+1).padStart(2,'0')} — 10`;$('#feature-type').textContent=f.id==='tres-chocolates'?'SPECIAL CAKE':'CHEESECAKE';
 document.querySelectorAll('[data-explore]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.explore)===index)));
 $('#prev-flavor').disabled=index===0;$('#next-flavor').disabled=index===flavors.length-1;
 image.src=f.image;image.alt=`Composición de cheesecake ${f.name}`;name.textContent=f.name+'.';description.textContent=f.description;
 updateSelection();
}
function animateNextFlavor(){
 if(transitioning||requestedFlavor===current)return;
 // Finish each adjacent flavor before moving on, even after a large scroll gesture.
 const next=directRequest?requestedFlavor:current+Math.sign(requestedFlavor-current);
 const direction=next>current?1:-1,version=++transitionVersion;transitioning=true;
 gsap.to([image,name,description],{opacity:0,duration:.22,ease:'power1.inOut',onComplete:()=>{
  if(version!==transitionVersion)return;showFlavor(next);
  gsap.fromTo(image,{opacity:0,x:direction*28,rotation:direction*2,scale:.985},{opacity:1,x:0,rotation:-8,scale:1,duration:.85,ease:'power2.out',onComplete:()=>{
   if(version!==transitionVersion)return;transitioning=false;animateNextFlavor();
  }});
  gsap.fromTo([name,description],{opacity:0,y:10},{opacity:1,y:0,duration:.55,stagger:.05,ease:'power2.out'});
 }});
}
function applyFlavor(index,immediate=false,direct=false){
 requestedFlavor=index;directRequest=direct;
 if(immediate||reduced){
  if(index===current&&!transitioning)return;
  // Jumping past the section should not leave a backlog of invisible transitions.
  transitionVersion++;transitioning=false;gsap.killTweensOf([image,name,description]);showFlavor(index);
  gsap.set([image,name,description],{opacity:1,x:0,y:0});gsap.set(image,{rotation:-8,scale:1});return;
 }
 animateNextFlavor();
}
function jumpTo(index){
 index=Math.max(0,Math.min(flavors.length-1,index));forcedIndex=index;clearTimeout(jumpTimer);applyFlavor(index,false,true);
 if(reduced){story.scrollIntoView({behavior:'instant',block:'start'});return;}
 const top=story.offsetTop+(index+.35)/flavors.length*Math.max(1,story.offsetHeight-window.innerHeight);window.scrollTo({top,behavior:'smooth'});jumpTimer=setTimeout(()=>{forcedIndex=null;},900);
}
function onScroll(){
 if(framePending)return;framePending=true;requestAnimationFrame(()=>{framePending=false;
  if(!reduced){
   const state=getScrollState(window.scrollY,story.offsetTop,story.offsetHeight,window.innerHeight,flavors.length);
   const outside=window.scrollY<story.offsetTop||window.scrollY>story.offsetTop+story.offsetHeight-window.innerHeight;
   applyFlavor(forcedIndex??state.index,outside&&forcedIndex===null,forcedIndex!==null);
   const y=Math.min(window.scrollY,900);$('.hero-product').style.transform=`translateY(${y*.11}px) rotate(${-13+y*.009}deg)`;
  }
 });
}
renderCatalog();applyFlavor(0,true);
window.addEventListener('scroll',onScroll,{passive:true});window.addEventListener('resize',onScroll);onScroll();
$('#prev-flavor').addEventListener('click',()=>jumpTo(current-1));$('#next-flavor').addEventListener('click',()=>jumpTo(current+1));$('#feature-add').addEventListener('click',()=>toggleFlavor(flavors[current].id));
$('#flavor-dots').addEventListener('click',e=>{const b=e.target.closest('[data-explore]');if(b)jumpTo(Number(b.dataset.explore));});
grid.addEventListener('click',e=>{const b=e.target.closest('[data-add]');if(b)toggleFlavor(b.dataset.add);});
document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{filter=b.dataset.filter;document.querySelectorAll('[data-filter]').forEach(button=>{button.classList.toggle('active',button===b);button.setAttribute('aria-pressed',String(button===b));});renderCatalog();}));
let returnFocus;
function openOrder(){returnFocus=document.activeElement;$('#order-dialog').showModal();}
document.querySelectorAll('.order-trigger').forEach(b=>b.addEventListener('click',openOrder));
$('#order-flavors').addEventListener('change',e=>{if(e.target.matches('input')){if(e.target.checked)chosen.add(e.target.value);else chosen.delete(e.target.value);updateSelection();}});
const date=$('input[name="date"]'),today=new Date();date.min=[today.getFullYear(),String(today.getMonth()+1).padStart(2,'0'),String(today.getDate()).padStart(2,'0')].join('-');
function currentOrderMessage(){
 const data=new FormData($('#order-form'));
 return buildOrderMessage({flavors:flavors.filter(f=>chosen.has(f.id)).map(f=>f.name),size:data.get('size'),guests:data.get('guests'),date:data.get('date'),notes:data.get('notes')});
}
function refreshSummary(){
 if($('#instagram-review').hidden)return;
 $('#instagram-summary').value=currentOrderMessage();$('#copy-status').textContent='';
}
$('#order-form').addEventListener('input',refreshSummary);
$('#order-form').addEventListener('submit',e=>{
 e.preventDefault();if(!e.target.reportValidity())return;
 $('#instagram-review').hidden=false;refreshSummary();$('#copy-instagram').focus();
});
$('#copy-instagram').addEventListener('click',()=>{
 const summary=$('#instagram-summary'),status=$('#copy-status');
 const manualCopy=()=>{status.textContent='No se pudo copiar automáticamente. Selecciona y copia el texto de abajo; después pégalo en Instagram.';summary.focus();summary.select();};
 // Start copying while focused, and open the chat in the same click (no awaited popup).
 let copying;
 try{copying=navigator.clipboard?.writeText(summary.value);}catch{}
 window.open(instagramDMUrl,'_blank','noopener,noreferrer');
 if(!copying){manualCopy();return;}
 copying.then(()=>{status.textContent='Pedido copiado. Pégalo en el chat de @dpdcake y pulsa Enviar.';},manualCopy);
});
document.querySelectorAll('dialog').forEach(d=>{d.querySelector('.dialog-close').addEventListener('click',()=>d.close());d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close();}});d.addEventListener('close',()=>returnFocus?.focus());});
$('#business-link').href=instagramDMUrl;$('#year').textContent=new Date().getFullYear();
// Decode the small product cutouts before they enter the scroll experience.
for(const f of flavors){const preload=new Image();preload.src=f.image;}
if(!reduced){gsap.fromTo('.hero-copy>h1',{opacity:0,y:30},{opacity:1,y:0,duration:.9,ease:'power3.out'});gsap.fromTo('.hero-product',{opacity:0,scale:.95},{opacity:1,scale:1,duration:1.1,ease:'power2.out'});}
