const playerSpriteUris =
[
"./img/ufo_01.png","./img/ufo_02.png","./img/ufo_03.png",
"./img/ufo_p2_01.png","./img/ufo_p2_02.png","./img/ufo_p2_03.png"
];
const playerSprites = [];
for(const uri of playerSpriteUris) {playerSprites.push(new Sprite(uri,512/2,256/2));}

const SPEED = 20;

class Player
{
 constructor(nr,x)
 {
  this.nr=nr;
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
  if(this.x<-20) {this.x=-20;}
  if(this.x>1040) {this.x=1040;}
 }

 draw(ctx)
 {
  const sprite = playerSprites[3*this.nr+this.spriteNr];
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

 bounce(alpaka)
 {
  const cx = this.x+playerSprites[0].width/2;
  const acx = alpaka.x+alpakaSprites[0].width/2;
  const xdist = acx-cx;
  const ydist = this.y-alpaka.y;
  if((Math.abs(xdist)<150)&&(ydist>0)&&(ydist<100))
  {
   const av = Math.sqrt(alpaka.vx*alpaka.vx+alpaka.vy*alpaka.vy); // speed up on bounce
   const angle = (xdist*0.3-90)*Math.PI/180;
   alpaka.vy=av*Math.sin(angle);
   alpaka.vx=av*Math.cos(angle);
   if(this.leftPressed) alpaka.vx-=0.2;
   if(this.rightPressed) alpaka.vx+=0.2;
   if(this.nr == 0 && alpaka.getColour() == 1){alpaka.missed();}	//rosa Alpaka ist auf Blaues Trampolin
   if(this.nr == 1 && alpaka.getColour() == 2){alpaka.missed();}	//blaues Alpaka ist auf rosa Trampolin
  }
  
  
  
 }
 
 

}
