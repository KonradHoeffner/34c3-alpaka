const missedSpriteUris =
[
"./img/blink_missed_01.png","./img/blink_missed_02.png","./img/blink_missed_03.png","./img/blink_missed_04.png","./img/blink_missed_05.png","./img/blink_missed_06.png","./img/blink_missed_07.png","./img/blink_missed_08.png","./img/blink_missed_09.png","./img/blink_missed_10.png"
];
const missedSprites= [];
for(const uri of missedSpriteUris) {missedSprites.push(new Sprite(uri,256,256));}
const MISSED_FRAME_TIME = 50;

class Missed
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
  if(this.elapsed>MISSED_FRAME_TIME)
  {
   this.elapsed-=MISSED_FRAME_TIME;
   this.spriteNr++;
  }
  if(this.spriteNr>=missedSprites.length)
  {
   this.isAlive=false;
  }
 }

 draw(ctx)
 {
  if(!this.isAlive) {return;}
  const sprite = missedSprites[this.spriteNr];
  sprite.draw(ctx,this.x,this.y);
 }
}
