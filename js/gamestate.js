const MAX_ALPAKAS = 10;

class GameState
{
 constructor(canvas,ctx)
 {
  this.players = [new Player(0,20),new Player(1,500)];
  this.alpakas=[];
  this.mates=[];
  this.elapsed=0;
  this.mateElapsed=0;
  this.canvas=canvas;
  this.ctx=ctx;
  this.points=0;
  this.lost=false;
 }

 addPoints(points)
 {
  this.points+=parseInt(points);
  document.getElementById("score").innerText=this.points;
 }

 update(dt)
 {
  this.elapsed+=dt;
  this.mateElapsed+=dt;
  const mateRate = this.mateSpawnRate();
  if(this.mateElapsed>mateRate)
  {
   this.mateElapsed-=mateRate;
   const mate = new Mate(
   	Math.floor(Math.random()*this.canvas.width),
	Math.floor(Math.random()*this.canvas.height/2)
	);
   this.mates.push(mate);
  }
  const rate = this.alpakaSpawnRate();
  if(this.alpakas.length<MAX_ALPAKAS&&this.elapsed>rate)
  {
   this.elapsed-=rate;
   this.alpakas.push(new Alpaka(this,Math.floor(Math.random()*this.canvas.width))); 
  }
  for(const alpaka of this.alpakas) {alpaka.update(dt);}
 
  const aliveMates = [];
  for(const mate of this.mates)
  {
   mate.update(dt);
   for(const alpaka of this.alpakas) {mate.collide(alpaka);}
   if(mate.isAlive) {aliveMates.push(mate);}
  }
  this.mates = aliveMates;

  for(const player of this.players)
  {
   player.update(dt);
   for(const alpaka of this.alpakas) {player.bounce(alpaka);}
  }
 }

 draw()
 {
  this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
  for(const player of this.players)
  {
   player.draw(this.ctx);
  }
  for(const alpaka of this.alpakas) {alpaka.draw(this.ctx);}
  for(const mate of this.mates) {mate.draw(this.ctx);}
 }

 alpakaSpawnRate()
 {
  return 2000;
 }

 mateSpawnRate()
 {
  return 5000;
 }
}
