const GRAVITY = 0.001;
const SCALE = 4;
const VY_MAX = 1;
const VY_SLOW = 0.1;
const spriteUris =
[
"./img/alpakaOrangeLO.png","./img/alpakaOrangeLU.png","./img/alpakaOrangeLN.png",
"./img/alpakaOrangeRO.png","./img/alpakaOrangeRU.png","./img/alpakaOrangeRN.png"
];
const sprites = [];
for(const uri of spriteUris) {sprites.push(new Sprite(uri,20*SCALE,28*SCALE));}

class Alpaka
{
 constructor(x)
 {
  this.x=x;
  this.y=-100;
  this.vx=Math.random()-0.5;
  this.vy=0;
 }
 
 jump()
 {
  this.vy+=5;
 }

 update(dt)
 {
  this.vy+=GRAVITY*dt;
  this.vy=Math.min(this.vy,VY_MAX);
  this.y+=this.vy*dt;
  if(this.y>620&&this.vy>0)
  {
   this.vy=-1.14*this.vy;
  }
  //this.x+=this.vx*dt;
  //if(vy<0) {vy=0;}
 }

 draw(ctx)
 {
  let spriteNr = 0;
  if(Math.abs(this.vy)<VY_SLOW)
  {
  spriteNr=2;
  }
  else
  {
  if(this.vy>0) {spriteNr = 1;}
  }
  if(this.vx>0) {spriteNr+=3;} // right facing row 
  const sprite = sprites[spriteNr];
 sprite.draw(ctx,this.x,this.y);
 }
}
