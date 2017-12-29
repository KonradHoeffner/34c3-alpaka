/*const GRAVITY = 0.00015;
const VY_MAX = 2;
const VY_SLOW = 0.3;
const SCALE = 4;*/
const spriteUrisPink =
[
"./img/alpakaPinkLO.png","./img/alpakaPinkLU.png","./img/alpakaPinkLN.png",
"./img/alpakaPinkRO.png","./img/alpakaPinkRU.png","./img/alpakaPinkRN.png"
];
const alpakaSpritesPink = [];
for(const uri of spriteUrisPink) {alpakaSpritesPink.push(new Sprite(uri,20*SCALE,28*SCALE));}

class AlpakaPink
{
 constructor(state,x)
 {
  this.x=x;
  this.y=-100;
  this.vx=Math.random()-0.5;
  this.vy=0;
  this.state=state;
  this.isAlive=true;
 }

 update(dt)
 {
  if(!this.isAlive) {return;}
  this.vy+=GRAVITY*dt;
  this.vy=Math.min(this.vy,VY_MAX);
  this.y+=this.vy*dt;
    
  if(this.y>780)
  {
   state.lost=true;
  }
  /*
  // bounce at the bottom
  if(this.y>620&&this.vy>0)
  {
   this.vy=-1.14*this.vy;
  }
  */
  this.x+=this.vx*dt;
  if(this.x<0&&this.vx<0) {this.vx=-this.vx;}
  if(this.x>1200&&this.vx>0) {this.vx=-this.vx;}
  // in ship?
  if(this.vy<0&&this.y<30)
  {
   if(this.x>400&&this.x<840)
   {
    this.rescue();
   } else
   {
    this.vy=-this.vy;
   }
  }
 }

 rescue()
 {
  state.addPoints(1);
  this.isAlive=false;
  state.blinks.push(new Blink(this.x-70,this.y-70));
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
  const sprite = alpakaSpritesPink[spriteNr];
  sprite.draw(ctx,this.x,this.y);
 }
}
