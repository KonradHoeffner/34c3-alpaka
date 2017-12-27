const MAX_ALPAKAS = 10;

class GameState
{
 constructor(canvas,ctx)
 {
  this.players=[];
  this.alpakas=[];
  this.elapsed=0;
  this.canvas=canvas;
  this.ctx=ctx;
 }

 update(dt)
 {
  this.elapsed+=dt;
  const rate = this.alpakaSpawnRate();
  if(this.alpakas.length<MAX_ALPAKAS&&this.elapsed>rate)
  {
   this.elapsed-=rate;
   this.alpakas.push(new Alpaka(Math.floor(Math.random()*this.canvas.width))); 
  }
  for(const alpaka of this.alpakas)
  {
   alpaka.update(dt);
  }
 }

 draw()
 {
  this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
  for(const alpaka of this.alpakas)
  {
   alpaka.draw(this.ctx);
  }
 }

 alpakaSpawnRate()
 {
  return 1000;
 }
}
