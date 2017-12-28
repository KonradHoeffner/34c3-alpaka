const playerSpriteUris =
[
"./img/ufo_01.png","./img/ufo_02.png","./img/ufo_03.png"
];
const playerSprites = [];
for(const uri of playerSpriteUris) {playerSprites.push(new Sprite(uri,512/2,256/2));}

const SPEED = 5;

class Player
{
 constructor(x)
 {
  this.x=x;
  this.y=585;
  this.rightPressed = false;
  this.leftPressed = false;
  this.upPressed = false;
  this.downPressed = false;
  this.elapsed = 0;
  this.spriteNr = 0;
  this.faceRight = true;
 }
  
 spriteChangeTime()
 {
  if(this.leftPressed||this.rightPressed) {return 50;}
  return 300;
 }

 update(dt)
 {
  if(this.leftPressed)  {this.x-= SPEED;this.faceRight=false;}
  if(this.rightPressed) {this.x+=SPEED;this.faceRight=true;}
  this.elapsed+=dt;
  if(this.elapsed>this.spriteChangeTime())
  {
   this.elapsed-=this.spriteChangeTime();
   this.spriteNr=(this.spriteNr+1)%3;
  }

 }

 draw(ctx)
 {
  const sprite = playerSprites[this.spriteNr];
  if(this.faceRight)
  {
   ctx.save(); 
   ctx.scale(-1,1);
   sprite.draw(ctx,-this.x-sprite.width,this.y);
   ctx.restore();
  } else
  {
   sprite.draw(ctx,this.x,this.y);
  }
 }

}
