let canvas;
let ctx;
let timestamp = 0;
let now = time();
let last;
let state;

function main()
{
 console.log("Starting");
 canvas = document.getElementById("gameCanvas");
// const scale = Math.min(window.innerWidth/canvas.width,window.innerHeight/canvas.height);
// canvas.setAttribute('style','transform: scale('+scale+')');//removes existing style
 ctx = canvas.getContext("2d");
 state = new GameState(canvas);
 mainLoop(time());
}


function mainLoop()
{
 last = now;
 now = time();
 state.update(now-last);
 state.draw();
 requestAnimationFrame(mainLoop);
}

function time()
{
 return new Date().getTime();
}
