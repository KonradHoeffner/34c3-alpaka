class GameState
{
 constructor(canvas)
 {
  this.players=[];
  this.alpakas=[];
  this.elapsed=0;
  this.canvas=canvas;
 }

 update(dt)
 {
  this.elapsed+=dt;
  const rate = this.alpakaSpawnRate();
  if(this.elapsed>rate)
  {
   this.elapsed-=rate;
   this.alpakas.push(new Alpaka(Math.random(this.canvas.width))); 
  }
  for(const alpaka of this.alpakas)
  {
   alpaka.update(dt);
  }
 }

 draw()
 {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  for(const alpaka of this.alpakas)
  {
   alpaka.draw(canvas);
  }
 }

 alpakaSpawnRate()
 {
  return 1000;
 }
}
