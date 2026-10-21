import './style.css';
import {flavors,buildOrderMessage,whatsappUrl} from './catalog.js';

function cakeIllustration(flavor){
 const chocolate=flavor.id==='tres-chocolates';
 return `<svg viewBox="0 0 300 220" fill="none" aria-hidden="true"><ellipse cx="150" cy="179" rx="119" ry="25" fill="#faf6eb" stroke="#20201d" stroke-width="2.5"/><ellipse cx="150" cy="177" rx="102" ry="16" stroke="#20201d" stroke-opacity=".2"/><path d="M61 92L148 57 244 95 230 157Q147 198 64 153Z" fill="#f4df9d" stroke="#20201d" stroke-width="3" stroke-linejoin="round"/><path d="M64 140Q145 182 233 143L230 157Q148 198 64 153Z" fill="#c08b50" stroke="#20201d" stroke-width="2.5"/>${chocolate?'<path d="M63 111Q148 154 239 115L235 134Q146 172 64 131Z" fill="#9b6f51" stroke="#20201d" stroke-width="2"/>':''}<path d="M61 92Q144 126 244 95L236 113Q224 119 218 111Q215 142 203 136Q196 129 197 117Q183 143 176 135L175 120Q143 131 109 121Q104 140 98 129L96 115Q74 109 61 102Z" fill="${flavor.topping}" stroke="#20201d" stroke-width="2.5" stroke-linejoin="round"/><path d="M61 92L148 48 244 95Q158 145 61 92Z" fill="${flavor.topping}" stroke="#20201d" stroke-width="3" stroke-linejoin="round"/><path d="M148 48L146 107 185 124" stroke="#20201d" stroke-width="2.5"/><path d="M148 49L163 93 244 95" stroke="#20201d" stroke-width="2.5" fill="none"/><path d="M88 147l4 3m11 2 4 3m84 2 5-2m15-4 4-2" stroke="#6d492a" stroke-width="3" stroke-linecap="round"/><path d="M82 77l6-3m21-8 5-2m73 9 6 2m-72 20 6 2" stroke="#faf6eb" stroke-opacity=".6" stroke-width="4" stroke-linecap="round"/><path d="M250 52v18m-9-9h18M42 117v12m-6-6h12" stroke="#20201d" stroke-width="2" stroke-linecap="round"/></svg>`;
}
const grid=document.querySelector('#flavor-grid');
function render(filter='all'){
 grid.innerHTML=flavors.filter(f=>filter==='all'||f.category===filter).map(f=>`<article class="flavor-card"><div class="flavor-image" style="--card-color:${f.color}"><span class="flavor-label">${f.tag}</span><span class="flavor-number">Nº ${String(flavors.indexOf(f)+1).padStart(2,'0')}</span>${cakeIllustration(f)}</div><div class="flavor-info"><h3>${f.name}</h3><p>${f.description}</p><div class="flavor-bottom"><span>Por encargo · Consultar</span><button class="flavor-order" data-flavor="${f.id}" aria-label="Consultar un encargo de ${f.name}">La quiero <span aria-hidden="true">↗</span></button></div></div></article>`).join('');
}
render();
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
 document.querySelectorAll('[data-filter]').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button));});render(button.dataset.filter);
}));
const dialog=document.querySelector('#order-dialog');
const select=document.querySelector('#order-flavor');
select.innerHTML='<option value="">Necesito una recomendación</option>'+flavors.map(f=>`<option value="${f.id}">${f.name}</option>`).join('');
let returnFocus;
function openOrder(id=''){returnFocus=document.activeElement;select.value=id;dialog.showModal();}
grid.addEventListener('click',e=>{const b=e.target.closest('[data-flavor]');if(b)openOrder(b.dataset.flavor);});
document.querySelector('#open-size').addEventListener('click',()=>openOrder());
document.querySelectorAll('dialog').forEach(d=>{
 d.querySelector('.dialog-close').addEventListener('click',()=>d.close());
 d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close();}});
 d.addEventListener('close',()=>returnFocus?.focus());
});
document.querySelector('#open-privacy').addEventListener('click',()=>{returnFocus=document.activeElement;document.querySelector('#privacy-dialog').showModal();});
const dateInput=document.querySelector('#order-date');
const today=new Date();dateInput.min=`${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;
document.querySelector('#order-form').addEventListener('submit',e=>{
 e.preventDefault();if(!e.target.reportValidity())return;
 const message=buildOrderMessage({flavor:flavors.find(f=>f.id===select.value)?.name,guests:document.querySelector('#order-guests').value,date:dateInput.value,notes:document.querySelector('#order-notes').value});
 window.open(whatsappUrl(message),'_blank','noopener,noreferrer');
});
document.querySelectorAll('[data-whatsapp]').forEach(a=>a.href=whatsappUrl(a.dataset.whatsapp));
document.querySelector('#year').textContent=new Date().getFullYear();
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target);}}),{threshold:.08});
document.querySelectorAll('.reveal').forEach(e=>observer.observe(e));
const loader=document.querySelector('#loader');
const dismiss=()=>loader.classList.add('done');
if(document.readyState==='complete')dismiss();else window.addEventListener('load',dismiss,{once:true});
setTimeout(dismiss,1600);
