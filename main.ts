document.addEventListener('DOMContentLoaded', function () {



    const canvas = <HTMLCanvasElement> document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    const canvas2 = <HTMLCanvasElement> document.getElementById("myCanvas2");
    var ctx2 = canvas2.getContext("2d");
    var imageObj = new Image();
    imageObj.src = 'img/hero3.png';
    var coinimg = new Image();
    coinimg.src = 'img/coins.jpg';
    var animashka:any;
    var fh:Array<number> = new Array(0,64,128,192) // date de axa y in sprite
    var coi:Array<number> = new Array(0,61,122,183,244) // date de axa y in sprite
    var x:number = 120;
    var y:number = 25;
    var pas:number = 3;
    var speed_start:number = 20;
    var speed:number = speed_start;
    var score:number = 0;
    var ingame:boolean = false;
    var coin_delta:number = 1;


    
    var scor = document.querySelector(".score");
    var newgame = document.querySelector("#newg");
    var continu = document.querySelector("#continue");
    var reiting = document.querySelector("#reiting");
    var menu = document.querySelector("#allthethings");

    newgame.addEventListener("click",function(){
        console.log("newg");
        menu.classList.add("unshow");
        ingame = true;
        score = 0;
        speed = speed_start;
        ctx.clearRect(0,0,canvas.width,canvas.height);
        spawn_coin = setInterval(function(){                        
                let coo = new coin(100 ,30,30);
                colist.push(coo);
                //coo = null;        
            },coin_delta);
        //for (let a=0;a<colist.length;a=0){
            //if (colist[a].intersection(x,y,frameHeight,frameWidth)){
                //colist.splice(a,1);
                // console.log('calcat')
            //}
                
        //}
        colist=[];
    })
    continu.addEventListener("click",function(){
        console.log("continue");
        menu.classList.add("unshow");
        ingame = true;
        spawn_coin = setInterval(function(){                        
            let coo = new coin(100 ,30,30);
            colist.push(coo);
            //coo = null;        
        },coin_delta);
    })
    reiting.addEventListener("click",function(){
        console.log("reiting");
        menu.classList.add("unshow");
    })
    function pause(){
        menu.classList.remove("unshow");
        ingame = false;
        clearInterval(spawn_coin);
    }



    // timer
    var countdownNumberEl = document.getElementById('countdown-number');
    var countdown = 100;    
    countdownNumberEl.textContent = countdown.toString();   
    
    timerr(true);
    function timerr(is){
        if(is)
        var timer = setInterval(function() {
            countdown = --countdown <= 0 ? 100 : countdown;   
            countdownNumberEl.textContent = countdown.toString();
        }, 1000);
        else clearInterval(timer);
    }
   
    // var style = document.createElement('style');
    // style.type = 'text/css';
    // var keyFrames = 'animation: countdown A_DYNAMIC_VALUE linear infinite forwards;';
    // style.innerHTML = keyFrames.replace(/A_DYNAMIC_VALUE/g, "50s");




    //classa monetei. ce, unde si cum
    class coin{
        public x:number;
        public y:number;
        public h:number;
        public w:number;
        public score:number;
        constructor(scr,h,w){
            
            this.h = h;
            this.w = w;
            this.x = Math.random()*(canvas.width - this.w);
            this.y = Math.random()*(canvas.height - this.h);
            this.score = scr;
            
            //ctx.beginPath();
            //ctx.rect(this.x,this.y , this.h, this.w);
            
                ctx.drawImage(coinimg, 0, coi[get_coin()], 63, 61, this.x, this.y, this.h, this.w);
            
           // ctx.fillStyle = "red";
           // ctx.fill();
        }
        public intersection(x1,y1,h1,w1){
            if( this.x >= x1 && this.y >= y1 && this.x < x1+w1 && this.y <= y1+h1 
                ||this.x+this.w >= x1 && this.y >= y1 && this.x+this.w <= x1+w1 && this.y <= y1+h1
                ||this.x+this.w >= x1 && this.y+this.h >=y1 && this.x+this.w <= x1+w1 && this.y+this.h <= y1+h1
                ||this.x >= x1 && this.y+this.h >= y1 && this.x <= x1+w1 && this.y+this.h <= y1+h1
                ||x1+w1 >= this.x && x1+w1 <= this.x+this.w && y1+h1 >= this.y &&  y1+h1 <= this.y+this.h
               ||x1 >= this.x && x1 <= this.x+this.h && y1+h1 >= this.y && y1+h1 <= this.y+this.h
               ||x1 >= this.x && x1 <= this.x+this.w && y1 >= this.y && y1 <= this.y+this.h
               ||x1+w1 >= this.x && x1+w1 <= this.x+this.w && y1 >= this.y && y1 <= this.y+this.h
                ){
                    console.log("ggg");
                    ctx.clearRect(this.x, this.y, this.h, this.w);
                    score += this.score;
                    scor.innerHTML =  score.toString();                   
                    return true;
                }
            return false
        }
    
    }
    function get_coin(){
        var n = Math.round(Math.random()*100)
        if (n >= 0 && n<=40)
            return 0
        else if (n >= 41 && n <= 60)
            return 1
        else if (n >= 61 && n <= 75)
            return 2
        else if (n >= 76 && n <= 90)
            return 3
        else if (n >= 90)
            return 4
    }

 




        
    // generarea monetelor, adaugarea acestor in lista
    let colist:Array<coin> = [];
    


    // let coo = new coin(100 ,30,30);
    // colist.push(coo);
    // coo = new coin(100 ,30,30);
    // colist.push(coo);
    var spawn_coin = setInterval(function(){
                        
                            let coo = new coin(100 ,30,30);
                            colist.push(coo);
                            //coo = null;
                        
                    },coin_delta)
      
                    var spawn_coin2 = setInterval(function(){
                        
                        let coo = new coin(100 ,30,30);
                        colist.push(coo);
                        //coo = null;
                    
                },coin_delta) 
                var spawn_coin3 = setInterval(function(){
                        
                    let coo = new coin(100 ,30,30);
                    colist.push(coo);
                    //coo = null;
                
            },coin_delta) 
            var spawn_coin4 = setInterval(function(){
                        
                let coo = new coin(100 ,30,30);
                colist.push(coo);
                //coo = null;
            
        },coin_delta)    
        var spawn_coin5 = setInterval(function(){
                        
            let coo = new coin(100 ,30,30);
            colist.push(coo);
            //coo = null;
        
    },coin_delta) 
    var spawn_coin22 = setInterval(function(){
                        
        let coo = new coin(100 ,30,30);
        colist.push(coo);
        //coo = null;
    
},coin_delta) 
var spawn_coin33 = setInterval(function(){
        
    let coo = new coin(100 ,30,30);
    colist.push(coo);
    //coo = null;

},coin_delta) 
var spawn_coin44 = setInterval(function(){
        
let coo = new coin(100 ,30,30);
colist.push(coo);
//coo = null;

},coin_delta)    
var spawn_coin55 = setInterval(function(){
        
let coo = new coin(100 ,30,30);
colist.push(coo);
//coo = null;

},coin_delta)          
                   // spawn_coin;         
    clearInterval(spawn_coin);


    //coinimg.onload = function(){};



    function move(i:number){
        clearInterval(animashka);
        var shift = 0;          //start pe axa x din sprit
        var h_shift = fh[i];    //start pe axa y din sprit
        var currentFrame = 0;
        animashka = setInterval(function(){
            var frameWidth = 32;    //lung ale sprit
            var frameHeight = 64;   // inaltimea sprit
            var totalFrames = 8;    // nr de cadre in rind
            //desenam miscarea personajului
            ctx2.clearRect(x, y, frameWidth, frameHeight+pas);
            ctx2.drawImage(imageObj, shift, h_shift, frameWidth, frameHeight,    
                x, y, frameWidth, frameHeight);
            shift += frameWidth;
            currentFrame++;
            if (currentFrame == totalFrames) {
                shift = 0;
                h_shift = fh[i];
                currentFrame = 0;
            }
            //miscarea si previne esirea din diapazonu hartii
            if (x>0 && y>0 && x < canvas.width - frameWidth && y < canvas.height - frameHeight)
            switch (i){
                
                case 0 :
                    y -= pas;
                    break;
                case 1:
                    y += pas;
                    break;
                case 2:
                    x += pas;
                    break;
                case 3:
                    x -= pas;
                    break;
            }else{
                if (x <= 0)
                    x += pas;
                if (y <= 0)
                    y += pas;
                if (x >= canvas.width - frameWidth)
                    x -= pas;
                if (y >= canvas.height - frameHeight)
                    y -= pas;
            }
            //console.log(x+":"+y)

            // verifica daca elementele se intersecteaza cu personaj si le sterg din lista
            for (let a=0;a<colist.length;a++){
                if (colist[a].intersection(x,y,frameHeight,frameWidth)){
                    colist.splice(a,1);
                   // console.log('calcat')
                }
                    
            }


/*
            colist.map(function(e){
                if(e.intersection(x,y,frameHeight,frameWidth))
                    delete e;
            })*/
        }, 1000/speed);
    }




    //cadru de repauz
    function stop_cadru(i:number){
        var frameWidth = 32;
        var frameHeight = 64;
        ctx2.clearRect(x, y, frameWidth, frameHeight+pas);
        ctx2.drawImage(imageObj, 0, fh[i], frameWidth, frameHeight,
                      x, y, frameWidth, frameHeight);
    }    
        




    //control WASD(!!engleze!!)
    var prev_vode:number = 0;
    document.querySelector("body").addEventListener("keypress", function(e) {       
        var c:any = e.keyCode;
        //console.log(c);
        // p = 112
        if(ingame)
        if(c == 119 && c != prev_vode)
        {
            //console.log("up");
            move(0)
            prev_vode = c;
        }
        else if(c == 115 && c != prev_vode)
            {
               // console.log("down");
                move(1)
                prev_vode = c;
            }
        else if(c == 100 && c != prev_vode)
        {
               // console.log("right");
                move(2)
                prev_vode = c;
            }
        else if(c == 97 && c != prev_vode)
            {
               // console.log("left")
                move(3)
                prev_vode = c;
            }
        if(c == 96)
        {
            console.log(colist)

        }
    })
    document.querySelector("body").addEventListener("keyup", function(e) {
        var c:any = e.keyCode;
        console.log(c);
        if(ingame)
        if(c == 87)
        {
           // console.log("up-stop");
            clearInterval(animashka);
            stop_cadru(0);
            prev_vode = 0;
        }
        else if(c == 83)
            {
               // console.log("down-stop");
                clearInterval(animashka);
                stop_cadru(1);
                prev_vode = 0;
            }
        else if(c == 68)
            {
               // console.log("right-stop");
                clearInterval(animashka);
                stop_cadru(2);
                prev_vode = 0;
            }
        else if(c == 65)
            {
                //console.log("left-stop")
                clearInterval(animashka);
                stop_cadru(3);
                prev_vode = 0;
            }
            else if(c == 80)
            {
                pause();
            }
    })











    






});











