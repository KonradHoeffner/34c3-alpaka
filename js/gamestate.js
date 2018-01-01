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
  this.alpakasBlau = [];
  this.mates=[];
  this.blinks=[];
  this.missedBlinks=[];
  this.elapsed=0;
  this.elapsedPink = 0;
  this.elapsedBlau = 14000;
  this.mateElapsed=0;
  this.canvas=canvas;
  this.ctx=ctx;
  this.points=0;
  this.lost=false;
  this.timeTotal=0;
  // spawn one Alpaka at the start if not playing for the first time
  if(document.cookie)
  {
   this.alpakas.push(new Alpaka(this,Math.floor(Math.random()*this.canvas.width)));
  }
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
  this.elapsedBlau+=dt;
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

  const rateBlau = this.alpakaBlauSpawnRate();
  if(this.alpakasBlau.length<MAX_ALPAKASBLAU&&this.elapsedBlau>rateBlau)
  {
   this.elapsedBlau-=rateBlau;
   this.alpakasBlau.push(new AlpakaBlau(this,Math.floor(Math.random()*this.canvas.width)));
  }
  const aliveAlpakasBlau = [];
  for(const alpakaBlau of this.alpakasBlau)
  {
   alpakaBlau.update(dt);
   if(alpakaBlau.isAlive) {aliveAlpakasBlau.push(alpakaBlau);}
  }
  this.alpakasBlau=aliveAlpakasBlau;

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
  const aliveMissedBlinks = [];
   for(const missedBlink of this.missedBlinks)
   {
    missedBlink.update(dt);
    if(missedBlink.isAlive) {aliveMissedBlinks.push(missedBlink);}
   }
   this.missedBlinks = aliveMissedBlinks;
  }

  {
   const aliveMates = [];
   for(const mate of this.mates)
   {
    mate.update(dt);
    for(const alpaka of this.alpakas) {mate.collide(alpaka);}
    for(const alpakaPink of this.alpakasPink) {mate.collide(alpakaPink);}
	  for(const alpakaBlau of this.alpakasBlau) {mate.collide(alpakaBlau);}
    if(mate.isAlive) {aliveMates.push(mate);}
   }
   this.mates = aliveMates;
  }

  // test for same colored ship first in case they overlap
  for(const alpakaPink of this.alpakasPink) {this.players[1].bounce(alpakaPink);}
  for(const alpakaBlau of this.alpakasBlau) {this.players[0].bounce(alpakaBlau);}

  for(let i = 0; i<this.players.length; i++)
  {
   const player = this.players[i];
   player.update(dt);
   for(const alpakaPink of this.alpakasPink) {player.bounce(alpakaPink);}
   for(const alpakaBlau of this.alpakasBlau) {player.bounce(alpakaBlau);}
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
  for(const alpakaBlau of this.alpakasBlau) {alpakaBlau.draw(this.ctx);}
  for(const mate of this.mates) {mate.draw(this.ctx);}
  for(const blink of this.blinks) {blink.draw(this.ctx);}
  for(const missedBlink of this.missedBlinks) {missedBlink.draw(this.ctx);}
 }

 alpakaSpawnRate()
 {
  return 5000.0*20000/(20000+this.timeTotal);
 }

 alpakaPinkSpawnRate()
 {
  return 40000.0*20000/(20000+this.timeTotal);
 }

 alpakaBlauSpawnRate()
 {
  return 40000.0*20000/(20000+this.timeTotal);
 }

 mateSpawnRate()
 {
  return 5000;
 }
}
