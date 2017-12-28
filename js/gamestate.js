const MAX_ALPAKAS = 20;

class GameState
{
 constructor(canvas,ctx)
 {
  this.players = [new Player(0,500),new Player(1,20)];
  this.alpakas=[];
  this.mates=[];
  this.blinks=[];
  this.elapsed=0;
  this.mateElapsed=0;
  this.canvas=canvas;
  this.ctx=ctx;
  this.points=0;
  this.lost=false;
  this.timeTotal=0;
 }

 addPoints(points)
 {
  this.points+=parseInt(points);
  //document.getElementById("score").innerText=this.points;
 }

 update(dt)
 {
  this.timeTotal+=dt;
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
  const aliveAlpakas = [];
  for(const alpaka of this.alpakas)
  {
   alpaka.update(dt);
   if(alpaka.isAlive) {aliveAlpakas.push(alpaka);}
  }
  this.alpakas=aliveAlpakas;
  {
   const aliveBlinks = [];
   for(const blink of this.blinks)
   {
    blink.update(dt);
    if(blink.isAlive) {aliveBlinks.push(blink);}
   }
   this.blinks = aliveBlinks;
  }
  {
   const aliveMates = [];
   for(const mate of this.mates)
   {
    mate.update(dt);
    for(const alpaka of this.alpakas) {mate.collide(alpaka);}
    if(mate.isAlive) {aliveMates.push(mate);}
   }
   this.mates = aliveMates;
  }
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
  for(const blink of this.blinks) {blink.draw(this.ctx);}
 }

 alpakaSpawnRate()
 {
  return 3000.0*20000/(20000+this.timeTotal);
 }

 mateSpawnRate()
 {
  return 5000;
 }
}
