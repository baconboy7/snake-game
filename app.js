window.onload=function() {
    canvas=document.getElementById("gamecanvas");
    context=canvas.getContext("2d");
    document.addEventListener("keydown",keyPush);
    setInterval(game,1000/10);
};

highScore = 0;
currentScore = 0;
playerX=playerY=10;
gridSize=tileCount=20;
appleX=appleY=15;
xVelocity=yVelocity=0;
trail=[];
tail = 5;

function game() {
    playerX+=xVelocity;
    playerY+=yVelocity;
    if(playerX<0) {
        playerX= tileCount-1;
    }
    if(playerX>tileCount-1) {
        playerX= 0;
    }
    if(playerY<0) {
        playerY= tileCount-1;
    }
    if(playerY>tileCount-1) {
        playerY= 0;
    }
    context.fillStyle="black";
    context.fillRect(0,0,canvas.width,canvas.height);

    context.fillStyle="lime";
    for(var i=0;i<trail.length;i++) {
        context.fillRect(trail[i].x*gridSize,trail[i].y*gridSize,gridSize-2,gridSize-2);
        if(trail[i].x==playerX && trail[i].y==playerY) {
            tail = 5;
            currentScore = 0;
            document.getElementById('score').innerText = currentScore;
            window.navigator.vibrate(500);
        }
    }
    trail.push({x:playerX,y:playerY});
    while(trail.length>tail) {
        trail.shift();
    }

    if(appleX==playerX && appleY==playerY) {
        tail++;
        currentScore++;
        if (currentScore > highScore) {
           highScore++;
            document.getElementById('highscore').innerText = highScore;
        }
        document.getElementById('score').innerText = currentScore;
        appleX=Math.floor(Math.random()*tileCount);
        appleY=Math.floor(Math.random()*tileCount);
    }
    context.fillStyle="red";
    context.fillRect(appleX*gridSize,appleY*gridSize,gridSize-2,gridSize-2);
}
function keyPush(evt) {
    switch(evt.keyCode) {
        case 37:
            xVelocity=-1;yVelocity=0;
            break;
        case 38:
            xVelocity=0;yVelocity=-1;
            break;
        case 39:
            xVelocity=1;yVelocity=0;
            break;
        case 40:
            xVelocity=0;yVelocity=1;
            break;
    }
}

document.getElementById('up').addEventListener('click', function () {
    xVelocity=0;yVelocity=-1;
});

document.getElementById('right').addEventListener('click', function () {
    xVelocity=1;yVelocity=0;
});

document.getElementById('down').addEventListener('click', function () {
    xVelocity=0;yVelocity=1;
});

document.getElementById('left').addEventListener('click', function () {
    xVelocity=-1;yVelocity=0;
});