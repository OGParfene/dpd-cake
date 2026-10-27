import * as THREE from 'three';
export const TAU=Math.PI*2;
export function makeWedge(radius,height,angle,segments=32){
 if(radius<=0||height<=0||angle<=0||angle>TAU)throw new RangeError('Invalid cake dimensions');
 const s=new THREE.Shape();s.moveTo(0,0);s.lineTo(radius,0);s.absarc(0,0,radius,0,angle,false);s.lineTo(0,0);
 const geometry=new THREE.ExtrudeGeometry(s,{depth:height,bevelEnabled:true,bevelThickness:.014,bevelSize:.012,bevelSegments:1,curveSegments:segments});
 geometry.rotateX(-Math.PI/2);return geometry;
}
export function sliceOffset(index,count,distance){
 const center=(index+.5)*TAU/count;
 return {x:Math.cos(center)*distance,z:-Math.sin(center)*distance};
}
