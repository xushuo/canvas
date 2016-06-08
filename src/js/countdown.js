/**
 * Created by hadoop on 2016/6/8.
 */

var WINDOW_WIDTH = 1024;
var WINDOW_HEIGHT = 500;
var RADIUS=8;
var MARGIN_TOP = 60;
var MARGIN_LEFT = 30;
var  endTime = new Date();
endTime.setTime(endTime.getTime()+10000*1000);
var curShowTimeSeconds = 0;
var balls =[];
const colors = ["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"]

window.onload = function () {
    WINDOW_HEIGHT= document.documentElement.clientHeight;
    WINDOW_WIDTH=document.documentElement.clientWidth;
    console.log("WINDOW_HEIGHT:"+WINDOW_HEIGHT);
    console.log("WINDOW_WIDTH:"+WINDOW_WIDTH);

    MARGIN_LEFT=Math.round(WINDOW_WIDTH/10);
    RADIUS=Math.round(WINDOW_WIDTH*4/5/108)-1;
    MARGIN_TOP=Math.round(WINDOW_HEIGHT/5);

    var canvas = document.getElementById("canvas");
    canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGHT;

    var context = canvas.getContext('2d');
    console.log(context);
    if (context) {
        /* context.beginPath();
         context.moveTo(100,100);
         context.lineTo(300,300);
         context.lineTo(200,500);
         context.lineTo(100,100);
         context.fillStyle="red";
         context.fill();
         context.closePath();

         context.beginPath();
         context.moveTo(700,700);
         context.lineTo(400,400);
         context.lineTo(100,800);
         context.lineTo(700,700);
         context.fillStyle="green";
         context.fill();
         context.closePath();*/

        /* context.beginPath();
         context.lineWidth=3;
         context.strokeStyle="red";
         context.arc(300,300,200,0,1.5*Math.PI,true);//300 300 圆心，200半径， 0到0.5pi;true逆时针
         context.closePath();//自动封闭路径
         context.stroke();

         context.fill();*/
        curShowTimeSeconds=getCurShowTimeSeconds();

        setInterval(function(){
            render(context);
            update();
        },50);

    } else {
        alert("该浏览器不支持canvas.");
    }

}

function update(){
    var nextShowTimeSeconds = getCurShowTimeSeconds();
    var nextHour=parseInt(nextShowTimeSeconds/3600);
    var nextMinutes=parseInt((nextShowTimeSeconds-nextHour*3600)/60);
    var nextSeconds=nextShowTimeSeconds%60;

    var curHour=parseInt(curShowTimeSeconds/3600);
    var curMinutes=parseInt((curShowTimeSeconds-curHour*3600)/60);
    var curSeconds=curShowTimeSeconds%60;

    if(nextSeconds!=curSeconds){
        if(parseInt(nextHour/10)!=parseInt(curHour/10)){
            addBalls(MARGIN_LEFT,MARGIN_TOP,parseInt(curHour/10));
        }
        if(parseInt(nextHour%10)!=parseInt(curHour%10)){
            addBalls(MARGIN_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt(curHour%10));
        }
        if(parseInt(curMinutes/10)!=parseInt(nextMinutes/10)){
            addBalls(MARGIN_LEFT+39*(RADIUS+1),MARGIN_TOP,parseInt(curMinutes/10));
        }
        if(parseInt(curMinutes%10)!=parseInt(nextMinutes%10)){
            addBalls(MARGIN_LEFT+54*(RADIUS+1),MARGIN_TOP,parseInt(curMinutes%10));
        }
        if(parseInt(curSeconds/10)!=parseInt(nextSeconds/10)){
            addBalls(MARGIN_LEFT+78*(RADIUS+1),MARGIN_TOP,parseInt(curSeconds/10));
        }
        if(parseInt(curSeconds%10)!=parseInt(nextSeconds%10)){
            addBalls(MARGIN_LEFT+93*(RADIUS+1),MARGIN_TOP,parseInt(curSeconds%10));
        }
        curShowTimeSeconds=nextShowTimeSeconds;
    }
    updateBalls();
}

function getCurShowTimeSeconds(){
    var curTime = new Date();
    var ret = endTime.getTime()-curTime.getTime();
    //console.log(ret);
    ret = Math.round(ret/1000);
    return ret>=0?ret:0;
}

function render(cxt) {

    cxt.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);//刷新

    var hour=parseInt(curShowTimeSeconds/3600);
    var minutes=parseInt((curShowTimeSeconds-hour*3600)/60);
    var seconds=curShowTimeSeconds%60;

    renderDigit(MARGIN_LEFT,MARGIN_TOP,parseInt(hour/10),cxt);
    renderDigit(MARGIN_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt(hour%10),cxt);

    renderDigit(MARGIN_LEFT+30*(RADIUS+1),MARGIN_TOP,10,cxt);

    renderDigit(MARGIN_LEFT+39*(RADIUS+1),MARGIN_TOP,parseInt(minutes/10),cxt);
    renderDigit(MARGIN_LEFT+54*(RADIUS+1),MARGIN_TOP,parseInt(minutes%10),cxt);

    renderDigit(MARGIN_LEFT+69*(RADIUS+1),MARGIN_TOP,10,cxt);

    renderDigit(MARGIN_LEFT+78*(RADIUS+1),MARGIN_TOP,parseInt(seconds/10),cxt);
    renderDigit(MARGIN_LEFT+93*(RADIUS+1),MARGIN_TOP,parseInt(seconds%10),cxt);


    /*renderDigit(260,50,10,cxt);

     renderDigit(340,50,parseInt(minutes/10),cxt);
     renderDigit(480,50,parseInt(minutes%10),cxt);

     renderDigit(600,50,10,cxt);

     renderDigit(680,50,parseInt(seconds/10),cxt);
     renderDigit(820,50,parseInt(seconds%10),cxt);*/

    for(var i=0,len=balls.length; i<len; i++){
        cxt.fillStyle=balls[i].color;
        cxt.beginPath();
        cxt.arc(balls[i].x,balls[i].y,RADIUS,0,2*Math.PI);
        cxt.closePath();
        cxt.fill();
    }
}
function renderDigit(x,y,num,cxt){
    cxt.fillStyle="blue";
    for(var i=0;i<digit[num].length; i++){
        for(var j=0; j<digit[num][i].length; j++){
            //console.log(digit[num][i][j]);
            if(digit[num][i][j]==1){
                cxt.beginPath();
                /*cxt.arc(x+(16*(j+1)),y+(16*(i+1)),7,0,2*Math.PI);*/
                cxt.arc(x+j*2*(RADIUS+1)+(RADIUS+1),y+i*2*(RADIUS+1)+(RADIUS+1),RADIUS,0,2*Math.PI);
                cxt.closePath();
                cxt.fill();
            }else{

            }
        }
    }
}
function addBalls(x,y,num){
    for(var i=0;i<digit[num].length; i++){
        for(var j=0; j<digit[num][i].length; j++){
            if(digit[num][i][j]==1){
                var aball={
                    x:x+j*2*(RADIUS+1)+(RADIUS+1),
                    y:y+i*2*(RADIUS+1)+(RADIUS+1),
                    g:1.5+Math.random(),
                    vx:Math.pow(-1,Math.ceil(Math.random()*1000))*4,
                    vy:-1,
                    color:colors[Math.floor(Math.random()*colors.length)]
                };
                balls.push(aball);
            }else{

            }
        }
    }
}
function updateBalls(){
    for(var i=0; i<balls.length; i++){
        balls[i].x += balls[i].vx;
        balls[i].y += balls[i].vy;
        balls[i].vy += balls[i].g;
        if(balls[i].y>=WINDOW_HEIGHT-RADIUS){
            balls[i].y = WINDOW_HEIGHT-RADIUS;
            balls[i].vy = -balls[i].vy*0.75;
        }
    }
    var cnt=0;
    for(var i=0,len=balls.length; i<len; i++){
        if(balls[i].x+RADIUS>0&&balls[i].x-RADIUS<WINDOW_WIDTH){
            balls[cnt++]=balls[i];
        }
    }
    while (balls.length>cnt){
        balls.pop();
    }
    console.log(balls.length);
}
