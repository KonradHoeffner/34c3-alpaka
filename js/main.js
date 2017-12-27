let canvas;
let ctx;
let timestamp = 0;
let now = time();
let last=time();
let state;
const MIN_TIME=1000.0/10;

function main()
{
 console.log("Starting");
 canvas = document.getElementById("gameCanvas");
// const scale = Math.min(window.innerWidth/canvas.width,window.innerHeight/canvas.height);
// canvas.setAttribute('style','transform: scale('+scale+')');//removes existing style
 ctx = canvas.getContext("2d");
 ctx.webkitImageSmoothingEnabled = false;
 console.log();
 state = new GameState(canvas,ctx);
 mainLoop(time());
}


function mainLoop()
{
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
