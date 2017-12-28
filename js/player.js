const playerSpriteUris =
[
"./img/ufo_01.png","./img/ufo_02.png","./img/ufo_03.png"
];
const playerSprites = [];
for(const uri of playerSpriteUris) {playerSprites.push(new Sprite(uri,512,256));}

const SPEED = 5;
let spriteNr = 0;

class Player
{
 constructor(x,y)
 {
  this.x=x;
  this.y=y;
  this.rightPressed = false;
  this.leftPressed = false;
  this.upPressed = false;
  this.downPressed = false;
 }
 
 update(dt)
 {
  if(this.leftPressed)  {this.x-= SPEED;}
  if(this.rightPressed) {this.x+=SPEED;}
 }

 draw(ctx)
 {
  const sprite = playerSprites[spriteNr];
  sprite.draw(ctx,this.x,this.y);
 }

}
