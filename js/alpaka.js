const GRAVITY = 1.0;

class Alpaka
{
 constructor()
 {
  this.x=0;
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

}
