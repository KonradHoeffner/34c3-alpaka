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

 move(dt)
 {
  this.vy-=GRAVITY*dt;
  this.y+=this.vy*this.dt;
  this.x+=this.vx*this.dt;
  //if(vy<0) {vy=0;}
 }
}
