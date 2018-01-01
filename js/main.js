let canvas;
let ctx;
let timestamp = 0;
let now = time(); // all times are in milliseconds
let last = time();
let state;
const MAX_FPS=120;
const MIN_TIME=1000.0/MAX_FPS;

function main()
{
 canvas = document.getElementById("gameCanvas");
// const scale = Math.min(window.innerWidth/canvas.width,window.innerHeight/canvas.height);
// canvas.setAttribute('style','transform: scale('+scale+')');//removes existing style
 ctx = canvas.getContext("2d");
 ctx.imageSmoothingEnabled = false;
 ctx.webkitImageSmoothingEnabled = false;
 state = new GameState(canvas,ctx);
 setupInput(state.players);
 mainLoop(time());
}


function mainLoop()
{
 if(state.lost)
 {
  document.getElementById("lostScreen").style.visibility="visible";
  state.points=Math.max(0,state.points);
  highScore = parseInt(document.cookie);
  if(!highScore) {highScore=0;}
  document.cookie=highScore;
  let m = "<div style='text-align:center;font-size:9vmin;'>"+state.points+"</div><div style='text-align:center;margin-top:-2vmin;margin-left:-5vmin;'>";
  if(state.points>highScore)
  {
   m+="NEW HIGHSCORE!";
   document.cookie=state.points;
  }
  else {m+="Highscore "+highScore;}
  m+="</div>";
  document.getElementById("lostScreenScore").innerHTML=m;
  return;
 }
 if((time()-last)>MIN_TIME)
 {
  last = now;
  now = time();
  state.update(now-last);
  state.draw();
 } else
 {
  setTimeout(wait,Math.min(10,MIN_TIME-(time()-last)+1));
  return;
 }
 requestAnimationFrame(mainLoop);
}

function wait()
{
 requestAnimationFrame(mainLoop);
}

function time()
{
 return new Date().getTime();
}
