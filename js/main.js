let canvas;
let ctx;
let timestamp = 0;
let now = time();
let last;
const state = new GameState();

function main()
{
 console.log("Starting");
 canvas = document.getElementById("gameCanvas");
 ctx = canvas.getContext("2d");
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
