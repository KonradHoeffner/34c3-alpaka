const blinkSpriteUris =
[
"./img/blink_01.png","./img/blink_02.png","./img/blink_03.png","./img/blink_04.png","./img/blink_05.png"
];
const blinkSprites= [];
for(const uri of blinkSpriteUris) {blinkSprites.push(new Sprite(uri,256,256));}
const FRAME_TIME = 50;

class Blink 
{
 constructor(x,y)
 {
  this.x=x;
  this.y=y;
  this.spriteNr=0;
  this.elapsed=0;
  this.isAlive=true;
 }
 
 update(dt)
 {
  this.elapsed+=dt;
  if(this.elapsed>FRAME_TIME)
  {
   this.elapsed-=FRAME_TIME;
   this.spriteNr++;
  }
  if(this.spriteNr>=blinkSprites.length)
  {
   this.isAlive=false;
  }
 }

 draw(ctx)
 {
  if(!this.isAlive) {return;}
  const sprite = blinkSprites[this.spriteNr];
  sprite.draw(ctx,this.x,this.y);
 }
}
