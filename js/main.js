let canvas;
let ctx;

function main()
{
document.write("Calling main.js");
canvas = document.getElementById("gameCanvas");
ctx = canvas.getContext("2d");
draw();
}

function draw(dt)
{
 ctx.fillStyle="rgb(0,0,0)";
 ctx.fillRect(0,0,canvas.width,canvas.height);
 
}

function mainLoop()
{
}
