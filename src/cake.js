import * as THREE from 'three';
import {makeWedge,sliceOffset,TAU} from './geometry.js';

// Deterministic texture/topping generation keeps rerenders visually consistent.
function rng(seed){let x=seed;return()=>{x=(Math.imul(x,1664525)+1013904223)>>>0;return x/4294967296;};}
function foodTexture(color,baked=false){
 const c=document.createElement('canvas');c.width=c.height=256;const ctx=c.getContext('2d');const random=rng(baked?492:83);ctx.fillStyle=color;ctx.fillRect(0,0,256,256);
 for(let i=0;i<4200;i++){const x=random()*256,y=random()*256,r=random()*(baked?13:1.4)+.2;ctx.fillStyle=baked?`rgba(64,25,7,${random()*.15})`:`rgba(${random()>.5?'255,250,220':'90,55,24'},${random()*.13})`;ctx.beginPath();ctx.arc(x,y,r,0,TAU);ctx.fill();}
 if(baked){const g=ctx.createRadialGradient(128,128,50,128,128,180);g.addColorStop(0,'transparent');g.addColorStop(1,'#3c1d1090');ctx.fillStyle=g;ctx.fillRect(0,0,256,256);}
 const texture=new THREE.CanvasTexture(c);texture.colorSpace=THREE.SRGBColorSpace;texture.wrapS=texture.wrapT=THREE.RepeatWrapping;return texture;
}
function material(color,baked=false){return new THREE.MeshStandardMaterial({color:'#ffffff',map:foodTexture(color,baked),roughness:.86,metalness:0});}
function mesh(geometry,mat,parent){const m=new THREE.Mesh(geometry,mat);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m;}
function addToppings(parent,f,index,angle){
 const random=rng(140+index);const brown=new THREE.MeshStandardMaterial({color:'#56301d',roughness:.9});const green=new THREE.MeshStandardMaterial({color:'#78933c',roughness:.9});const tan=new THREE.MeshStandardMaterial({color:'#d3a464',roughness:.95});
 function place(object,r,a,y=.58){object.position.set(Math.cos(a)*r,y,-Math.sin(a)*r);object.rotation.y=a;return object;}
 function chunk(color,r,a,size=.09){const m=mesh(new THREE.DodecahedronGeometry(size,0),new THREE.MeshStandardMaterial({color,roughness:.9}),parent);place(m,r,a,.58+random()*.08);m.scale.set(.8+random(),.5+random(),.8+random());m.rotation.set(random()*2,random()*3,random()*2);}
 if(f.topping==='cookie'||f.topping==='brownie'||f.topping==='chocolate'||f.topping==='pistachio'){
  const n=f.topping==='cookie'?30:f.topping==='pistachio'?22:9;
  for(let i=0;i<n;i++){
   const a=.055+random()*(angle-.11),r=.6+random()*1.1;
   chunk(f.topping==='pistachio'?(i%2?'#6e8135':'#b0b95a'):f.topping==='cookie'?(i%3?'#d4a361':'#a17b46'):'#4c291a',r,a,f.topping==='brownie'?.13:f.topping==='chocolate'?.09:.055+random()*.035);
  }
 }
 if(f.topping==='raisin'||f.topping==='brownie'||f.topping==='cookie'){
  for(let i=0;i<10;i++){const a=i%2?.008:angle-.008,r=.45+random()*1.3;const m=mesh(new THREE.SphereGeometry(.055+random()*.025,8,6),brown,parent);place(m,r,a,-.25+random()*.62);m.scale.set(1,.7,.65);}
 }
 if(f.topping==='cabrales'){
  for(let i=0;i<8;i++)chunk(i%3?'#d6d4b1':'#5a806c',1.2+random()*.5,.06+random()*(angle-.12),.035);
 }
 if(f.topping==='fruit'){
  const red=new THREE.MeshStandardMaterial({color:'#d74636',roughness:.52});const orange=new THREE.MeshStandardMaterial({color:'#f5b631',roughness:.55});
  for(let i=0;i<3;i++){const strawberry=mesh(new THREE.SphereGeometry(.16,12,8),red,parent);place(strawberry,.65+i*.35,.18+i*.065,.67);strawberry.scale.set(.8,1.15,.8);}
  for(let i=0;i<2;i++){const kiwi=mesh(new THREE.CylinderGeometry(.18,.18,.05,18),green,parent);place(kiwi,1.35+i*.3,.4,.64);kiwi.rotation.z=.3;const center=mesh(new THREE.CylinderGeometry(.07,.07,.052,12),tan,kiwi);center.position.y=.001;for(let s=0;s<9;s++){const seed=mesh(new THREE.SphereGeometry(.012,5,4),brown,kiwi);seed.position.set(Math.cos(s*TAU/9)*.12,.03,Math.sin(s*TAU/9)*.12);}}
  for(let i=0;i<2;i++){const fruit=mesh(new THREE.SphereGeometry(.19,12,8),orange,parent);place(fruit,1+i*.5,.27,.69);fruit.scale.set(1,.5,.7);}
 }
 if(f.topping==='hippo'){
  const hippo=new THREE.Group();parent.add(hippo);place(hippo,1.25,angle*.52,.69);hippo.rotation.z=Math.PI/2;const body=mesh(new THREE.CapsuleGeometry(.13,.38,4,10),tan,hippo);body.rotation.x=Math.PI/2;
  const white=new THREE.MeshStandardMaterial({color:'#fff6e4'});for(const x of [-.065,.065]){const eye=mesh(new THREE.SphereGeometry(.045,8,6),white,hippo);eye.position.set(x,.11,.2);const pupil=mesh(new THREE.SphereGeometry(.021,6,5),brown,eye);pupil.position.set(0,.025,.02);}
  for(let i=0;i<12;i++)chunk('#f4e4b5',.8+random()*.8,.06+random()*(angle-.12),.026);
 }
 // Material instances used in this helper are kept with the scene and disposed on teardown.
}

export function createCake(canvas,flavors,{onChoose,reducedMotion=false,onReady}={}){
 let renderer;
 try{renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:true,powerPreference:'high-performance'});}catch{return null;}
 renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.6));renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.3;
 const scene=new THREE.Scene();const camera=new THREE.PerspectiveCamera(34,1,.1,50);camera.position.set(.3,5.3,8.7);camera.lookAt(0,0,0);
 scene.add(new THREE.HemisphereLight('#fff9df','#895e35',2.5));const sun=new THREE.DirectionalLight('#fff5df',4);sun.position.set(-3,7,5);sun.castShadow=true;sun.shadow.mapSize.set(1024,1024);sun.shadow.camera.left=-5;sun.shadow.camera.right=5;sun.shadow.camera.top=5;sun.shadow.camera.bottom=-5;sun.shadow.normalBias=.03;scene.add(sun);
 const fill=new THREE.DirectionalLight('#ffffff',1.2);fill.position.set(5,3,-4);scene.add(fill);
 const root=new THREE.Group();scene.add(root);root.rotation.z=-.05;const cake=new THREE.Group();root.add(cake);
 const n=flavors.length,angle=TAU/n;const wedges=[];
 flavors.forEach((f,i)=>{
  const slice=new THREE.Group();slice.rotation.y=i*angle;cake.add(slice);const stack=new THREE.Group();slice.add(stack);
  mesh(makeWedge(1.86,.15,angle-.012),material(f.crumb),stack).position.y=-.57;
  if(f.topping==='triple'){
   ['#573425','#a47759','#eee0b9'].forEach((color,j)=>mesh(makeWedge(1.86,.29,angle-.012),material(color),stack).position.y=-.42+j*.29);
  }else{mesh(makeWedge(1.86,.87,angle-.012),material(f.filling),stack).position.y=-.42;}
  mesh(makeWedge(1.865,.06,angle-.012),material(f.top,true),stack).position.y=.45;
  addToppings(stack,f,i,angle-.012);stack.userData.index=i;wedges.push({slice,stack,index:i});
 });
 const plate=mesh(new THREE.CylinderGeometry(2.18,2.05,.065,80),new THREE.MeshStandardMaterial({color:'#faf0d9',roughness:.55}),root);plate.position.y=-.68;plate.castShadow=false;
 const rim=mesh(new THREE.TorusGeometry(2.1,.045,8,80),new THREE.MeshStandardMaterial({color:'#e8d6b2',roughness:.5}),root);rim.rotation.x=Math.PI/2;rim.position.y=-.64;
 const plane=mesh(new THREE.PlaneGeometry(14,14),new THREE.ShadowMaterial({opacity:.17}),scene);plane.rotation.x=-Math.PI/2;plane.position.y=-1;plane.castShadow=false;
 let width=0,height=0,active=0,progress=0,hover=-1,visible=true,frame=0,last=0,alive=true;
 function resize(){const r=canvas.getBoundingClientRect();if(r.width===width&&r.height===height)return;width=r.width;height=r.height;if(!width||!height)return;renderer.setSize(width,height,false);camera.aspect=width/height;camera.updateProjectionMatrix();}
 const resizeObserver=new ResizeObserver(resize);resizeObserver.observe(canvas);resize();
 const raycaster=new THREE.Raycaster(),pointer=new THREE.Vector2();
 function hit(e){const rect=canvas.getBoundingClientRect();pointer.set(((e.clientX-rect.left)/rect.width)*2-1,-((e.clientY-rect.top)/rect.height)*2+1);raycaster.setFromCamera(pointer,camera);const hits=raycaster.intersectObjects(wedges.map(w=>w.stack),true);if(!hits.length)return -1;let object=hits[0].object;while(object.parent&&object.userData.index===undefined)object=object.parent;return object.userData.index??-1;}
 const move=e=>{if(e.pointerType==='mouse')hover=hit(e);};const leave=()=>{hover=-1;};let down;
 const pointerDown=e=>{down={x:e.clientX,y:e.clientY};};const pointerUp=e=>{if(down&&Math.hypot(e.clientX-down.x,e.clientY-down.y)<8){const index=hit(e);if(index>=0)onChoose?.(index);}down=null;};
 canvas.addEventListener('pointermove',move);canvas.addEventListener('pointerleave',leave);canvas.addEventListener('pointerdown',pointerDown);canvas.addEventListener('pointerup',pointerUp);
 const visibilityObserver=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;});visibilityObserver.observe(canvas);
 let rotation=-angle/2-Math.PI/2,targetRotation=rotation;
 function render(time){
  if(!alive)return;frame=requestAnimationFrame(render);if(!visible||document.hidden)return;
  const dt=Math.min((time-last)/1000,.05)||.016;last=time;const smooth=reducedMotion?1:1-Math.exp(-dt*6);
  rotation+=(targetRotation-rotation)*smooth;cake.rotation.y=rotation;
  const t=time*.001;root.position.y=reducedMotion?0:Math.sin(t*.7)*.055;root.rotation.z=reducedMotion?-.025:Math.sin(t*.4)*.025-.025;
  wedges.forEach(({slice,index})=>{
   const selected=index===active;const distance=selected?.68+(reducedMotion?0:Math.sin(progress*Math.PI)*.1):.018;
   // slice.rotation.y already rotates local wedge geometry; offsets live in cake coordinates.
   const p=sliceOffset(index,n,distance+(hover===index?.1:0));slice.position.x+=(p.x-slice.position.x)*smooth;slice.position.z+=(p.z-slice.position.z)*smooth;slice.position.y+=((selected?.12:0)-slice.position.y)*smooth;
  });renderer.render(scene,camera);
 }
 frame=requestAnimationFrame(render);onReady?.();
 return {setFlavor(index,local=0){active=index;progress=local;let target=-(index+.5)*angle-Math.PI/2;while(target-targetRotation>Math.PI)target-=TAU;while(target-targetRotation< -Math.PI)target+=TAU;targetRotation=target;},dispose(){alive=false;cancelAnimationFrame(frame);resizeObserver.disconnect();visibilityObserver.disconnect();canvas.removeEventListener('pointermove',move);canvas.removeEventListener('pointerleave',leave);canvas.removeEventListener('pointerdown',pointerDown);canvas.removeEventListener('pointerup',pointerUp);scene.traverse(o=>{o.geometry?.dispose();if(o.material){const materials=Array.isArray(o.material)?o.material:[o.material];materials.forEach(m=>{m.map?.dispose();m.dispose();});}});renderer.dispose();}};
}
