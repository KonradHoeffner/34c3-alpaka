const GRAVITY = 1.0;
const alpakaSprite = new Sprite("./img/background_01.jpg",20,20);

class Alpaka
{
 constructor(x)
 {
  this.x=x;
  this.y=0;
  this.vx=0;
  this.vy=0;
 }
 
 jump()
 {
  this.vy+=5;
 }

 update(dt)
 {
  this.vy-=GRAVITY*dt;
  this.y+=this.vy*dt;
  this.x+=this.vx*dt;
  //if(vy<0) {vy=0;}
 }

 draw()
 {

 }
}
