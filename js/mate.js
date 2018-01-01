const mateSpriteUris =
[
"./img/mate0.png","./img/mate1.png","./img/mate2.png","./img/mate3.png","./img/mate4.png"
];
const mateSprites= [];
for(const uri of mateSpriteUris) {mateSprites.push(new Sprite(uri,32*ALPAKA_SCALE,32*ALPAKA_SCALE));}
const MATE_ARRIVAL_TIME = 180;
const MATE_FADE_TIME_1 = 3700;
const MATE_FADE_TIME_2 = 3850;
const MATE_MAX_ALIVE = 4000;

class Mate
{
 constructor(x,y)
 {
  this.x=x;
  this.y=y;
  this.spriteNr=0;
  this.elapsed=0;
  this.timeAlive=0;
  this.isAlive=true;
 }

 update(dt)
 {
  this.timeAlive+=dt;
  if(this.timeAlive>MATE_MAX_ALIVE)
  {
   this.isAlive=false;
   return;
  }
  this.elapsed+=dt;
  if((this.elapsed>(MATE_ARRIVAL_TIME*0.5))&&this.spriteNr<2)
  {
   this.elapsed-=MATE_ARRIVAL_TIME*0.5;
   this.spriteNr++;
  }
  if(this.timeAlive>MATE_FADE_TIME_1) {this.spriteNr=3;}
  if(this.timeAlive>MATE_FADE_TIME_2) {this.spriteNr=4;}
 }

 draw(ctx)
 {
  if(!this.isAlive) {return;}
  const sprite = mateSprites[this.spriteNr];
  sprite.draw(ctx,this.x,this.y);
 }

 collide(alpaka)
 {
  const cx = this.x+mateSprites[0].width/2;
  const cy = this.y+mateSprites[0].height/2;
  const acx = alpaka.x+alpakaSprites[0].width/2;
  const acy = alpaka.y+alpakaSprites[0].height/2;
  const xdist = acx-cx;
  const ydist = acy-cy;
  const dist = Math.sqrt(xdist*xdist+ydist*ydist);
  if(dist<80 && this.timeAlive > MATE_ARRIVAL_TIME*3)
  {
   this.isAlive=false;
   alpaka.rescue();
  }
 }

}
