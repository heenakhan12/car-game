const score=document.querySelector(".score");
const startScreen=document.querySelector(".startScreen");
const gameArea=document.querySelector(".gameArea");

const keys={
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
}


startScreen.addEventListener("click",start)
document.addEventListener("keydown",pressOn)
document.addEventListener("keyup",pressOff)

let player={speed:5}


function moveLines(){
    let lines=document.querySelectorAll(".line");
    lines.forEach(function(item){
        console.log(item.y);
        if(item.y>=1500){
            item.y-=1500;
        }
        item.y +=player.speed;
        item.style.top=item.y+"px";
    })
}
function moveEnemy(car){
    let ene=document.querySelectorAll(".enemy");
    ene.forEach(function(item){
        // console.log(item.y);
        if(isCollide(car,item)){
            console.log("HIT");
        }
        if(item.y>=1500){
            item.y=-600;
            item.style.left=Math.floor(Math.random()*150)+"px";
        }
        item.y +=player.speed;
        item.style.top=item.y+"px"; 
    })
}

function playGame(){
    // console.log("let's Play..");
    
    let road=gameArea.getBoundingClientRect();
    let car=document.querySelector(".car");
    moveLines();
    moveEnemy(car);
    // console.log(road);
    // console.log(player.x);
    if(player.start){
        if(keys.ArrowUp && player.y > road.top){
            player.y -= player.speed
        }
        if(keys.ArrowDown && player.y < road.bottom){
            player.y += player.speed
        }
        if(keys.ArrowLeft && player.x > 0){
            player.x -= player.speed
        }
        if(keys.ArrowRight && player.x < road.width-55){
            player.x += player.speed
        }
        car.style.left =player.x + "px";
        car.style.top =player.y + "px";

       window.requestAnimationFrame(playGame);
    }
}
function pressOn(e){
    //    console.log(e.key + " is pressed");
    e.preventDefault();
    keys[e.key]=true;
    console.log(keys);
}


function pressOff(e){
    // console.log(e.key + " is released");
    e.preventDefault();
    keys[e.key]=false;
    console.log(keys);
}

function isCollide(a,b){
    let aRec=a.getBoundingClientRect();
    let bRec=b.getBoundingClientRect();

    return !(
        (aRec.bottom < bRec.top)||(aRec.top>bRec.bottom)
         ||(aRec.right<bRec.left)||(aRec.left>bRec.right)
    );
}


function start(){
    startScreen.classList.add("hide")
    gameArea.classList.remove("hide")
    // console.log("start");
    player.start=true;

    //display lines on road
    for(let x=0;x<10;x++){
        let div=document.createElement("div");
        div.classList.add("line");
        div.y=x*150;
        div.style.top=(x*150) +"px";
        gameArea.appendChild(div);
    }
     window.requestAnimationFrame(playGame);
    // //https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
    let car=document.createElement("div");
    car.setAttribute("class","car");
    car.innerText="car";
    gameArea.appendChild(car);
    player.x=car.offsetLeft;
    player.y=car.offsetTop;
    // console.log(player);
    
    for(let x=0;x<4;x++){
     let enemy=document.createElement("div");
     enemy.classList.add("enemy");
     enemy.y=(x+1)*600*-1;
     enemy.style.top=enemy.y + "px";
     enemy.style.left=parseInt(Math.random()*150) +"px";
     enemy.style.backgroundColor="red";
     gameArea.appendChild(enemy);
     
    }
}