const MAX_ALPAKAS = 20;
const MAX_ALPAKASPINK = 2;
const MAX_ALPAKASBLAU = MAX_ALPAKASPINK;

class GameState
{
 constructor(canvas,ctx)
 {
  this.players = [new Player(0,924),new Player(1,100)];
  this.alpakas=[];
  this.alpakasPink = [];
  this.mates=[];
  this.blinks=[];
  this.elapsed=0;
  this.elapsedPink = 0;
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
  this.elapsedPink+=dt;
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
   //this.alpakas.push(new AlpakaPink(this,Math.floor(Math.random()*this.canvas.width))); 
  }
  const aliveAlpakas = [];
  for(const alpaka of this.alpakas)
  {
   alpaka.update(dt);
   if(alpaka.isAlive) {aliveAlpakas.push(alpaka);}
  }
  this.alpakas=aliveAlpakas;
  
  const ratePink = this.alpakaPinkSpawnRate();
  if(this.alpakasPink.length<MAX_ALPAKASPINK&&this.elapsedPink>ratePink)
  {
   this.elapsedPink-=ratePink;
   this.alpakasPink.push(new AlpakaPink(this,Math.floor(Math.random()*this.canvas.width))); 
  }
  const aliveAlpakasPink = [];
  for(const alpakaPink of this.alpakasPink)
  {
   alpakaPink.update(dt);
   if(alpakaPink.isAlive) {aliveAlpakasPink.push(alpakaPink);}
  }
  this.alpakasPink=aliveAlpakasPink;
  
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
    for(const alpakaPink of this.alpakasPink) {mate.collide(alpakaPink);}
    if(mate.isAlive) {aliveMates.push(mate);}
   }
   this.mates = aliveMates;
  }
  
  //for(const player of this.players)
  for(let i = 0; i<this.players.length; i++)
  {
   const player = this.players[i];
   player.update(dt);
   
   for(const alpakaPink of this.alpakasPink) {player.bounce(alpakaPink);}
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
  for(const alpakaPink of this.alpakasPink) {alpakaPink.draw(this.ctx);}
  for(const mate of this.mates) {mate.draw(this.ctx);}
  for(const blink of this.blinks) {blink.draw(this.ctx);}
 }

 alpakaSpawnRate()
 {
  return 30000.0*20000/(20000+this.timeTotal);
 }
 
 alpakaPinkSpawnRate()
 {
  return 3000.0*20000/(20000+this.timeTotal);
 }

 mateSpawnRate()
 {
  return 5000;
 }
}
