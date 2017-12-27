class GameState
{
 constructor()
 {
  this.players=[];
  this.alpakas=[];
  this.elapsed=0;
 }

 update(dt)
 {
  this.elapsed+=dt;
  const rate = this.alpakaSpawnRate();
  if(this.elapsed>rate)
  {
   this.elapsed-=rate;
   this.alpakas.push(new Alpaka()); 
  }
  for(const alpaka of this.alpakas)
  {
   alpaka.update(dt);
  }
 }

 draw()
 {
  ctx.clearRect(0,0,canvas.width,canvas.height);
 }

 alpakaSpawnRate()
 {
  return 1000;
 }
}
