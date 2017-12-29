function setupInput(players)
{
 document.addEventListener('keydown', function(e) {return onKey(e,players,true);}, false);
 document.addEventListener('keyup', function(e) {return onKey(e,players,false);}, false);
}

function onKey(event,players,pressed)
{
//    event.preventDefault(); //disable page scrolling
    if(event.keyCode == 39) {
        players[0].rightPressed = pressed;
    }
    else if(event.keyCode == 37) {
        players[0].leftPressed = pressed;
    }
    if(event.keyCode == 40) {
    	players[0].downPressed = pressed;
    }
    else if(event.keyCode == 38) {
    	players[0].upPressed = pressed;
    }

    else if((event.key == "d") || (event.key == "D")) {
        players[1].rightPressed = pressed;
    }
    else if((event.key == "a") || (event.key == "A")) {
        players[1].leftPressed = pressed;
    }
    if(event.key== "s") {
    	players[1].downPressed = pressed;
    }
    else if(event.key== "w") {
    	players[1].upPressed = pressed;
    }

}

