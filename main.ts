document.addEventListener('DOMContentLoaded', function () {

    var monete: any = `{    "1":[0,100],
                            "2":[61,200],
                            "3":[122,300],
                            "4":[183,400],
                            "5":[244,0] `+ //speed moneta
                        `}`;


    var obj = JSON.parse(monete);
    const canvas = <HTMLCanvasElement> document.getElementById("myCanvas");     //canvas pentru monete
    var ctx = canvas.getContext("2d");
    const canvas2 = <HTMLCanvasElement> document.getElementById("myCanvas2");   //canvas pentru erou
    var ctx2 = canvas2.getContext("2d");
    var imageObj = new Image();
    imageObj.src = 'img/hero3.png';                  // sprite eroului
    var coinimg = new Image();
    coinimg.src = 'img/coins.jpg';                   // sprite monetelor
    var animashka:any;                               // functia desinarii animatiei eroului
    var fh:Array<number> = new Array(0,64,128,192)   // date de pe axa y in sprite a eroului
    var x:number = 1;                                //pozitia start x a  eroului
    var y:number = 1;                                //pozitia start y a  eroului
    var pas:number = 3;                              // pasul eroului in px
    var coin_delta:number = 5000;                    // interval de timp a spavnului monetelor
    var speed_start:number = 20;                     //speed Default
    var speed:number = speed_start;                  // speed in timp real
    var score:number = 0;                            //scor new game
    var ingame:boolean = false;                      //intrerupatorul butoanelor de control
    let colist:Array<coin> = [];                     // lista de obiecte "monete"
    var countdown_start = 15;                        //limitele secundomerului
    var timer;                                       // functia pentru timer
    var viteza_up;                                   // functia schimbarii vitezei mentru "moneta speed"
    var directiaanimatiei;                           // memorarea directiei animatiei
    var spawn_coin;                                  // functia pentru spawn monetelor cu interval de timp
 

    
    var scor = document.querySelector(".score");
    var newgame = document.querySelector("#newg");
    var continu = document.querySelector("#continue");
    var reiting = document.querySelector("#reiting");
    var menu = document.querySelector("#allthethings");
    var menu1_2 = document.querySelector("#allthethings1");
    var menu2_2 = document.querySelector("#allthethings2");
    var menuvid = document.querySelector(".exitvideo");
    var ok = document.querySelector(".ok");
    var exitraport = document.querySelector(".exitraport");
    var raport = document.querySelector(".raportb");
    
    //comande la clic pe interface
    newgame.addEventListener("click",function(){
        console.log("newg");
        menu.classList.add("unshow");
        ingame = true;
        score = 0;
        speed = speed_start;
        ctx.clearRect(0,0,canvas.width,canvas.height);
        spawn_coin = setInterval(function(){    
                let whatmoney = get_coin();                    
                let coo = new coin(obj[whatmoney][1] ,30,30,whatmoney);
                colist.push(coo);
            },coin_delta);
        colist=[];
        svg_tim("9");
        playstart();
    })
    continu.addEventListener("click",function(){
        console.log("continue");
        menu.classList.add("unshow");
        ingame = true;
        spawn_coin = setInterval(function(){ 
            let whatmoney = get_coin(); 
            let coo = new coin(obj[whatmoney][1] ,30,30,whatmoney);
            colist.push(coo);
        },coin_delta);
        svg_tim("1");
        playstart();
    })
    reiting.addEventListener("click",function(){
        console.log("reiting");
        menu1_2.classList.add("unshow");
        menu2_2.classList.remove("unshow");
    })
    menuvid.addEventListener("click",function(){
        console.log("reiting");
        menu2_2.classList.add("unshow");
        menu1_2.classList.remove("unshow");
        var xx = document.getElementById("vidioshka"); 
        xx.pause();
    })
    ok.addEventListener("click",function(){
        console.log("fdgfh")
        pauseg(false);
    })
    exitraport.addEventListener("click",function(){
        document.querySelector(".container").classList.remove("unshow");
        document.querySelector(".raport").classList.add("unshow");
    })
    raport.addEventListener("click",function(){
        document.querySelector(".container").classList.add("unshow");
        document.querySelector(".raport").classList.remove("unshow");
    })

    // schimbarea meniurilor game over si miniu standart
    function pauseg(g_o){
        if(g_o){
            document.querySelector("#allthethings3").classList.remove("unshow");
            menu.classList.add("unshow");
            stop_cadru(directiaanimatiei);
        }else{
            menu.classList.remove("unshow");
            document.querySelector("#allthethings3").classList.add("unshow");
        }
        ingame = false;
        clearInterval(spawn_coin);
        pausestart();
        clearInterval(animashka);
    }



    // timer
    var countdownNumberEl = document.getElementById('countdown-number');
    var countdown = countdown_start;     
    countdownNumberEl.textContent = countdown.toString(); 

    //timerr(false);
    function timerr(is){
        if(is)
        timer = setInterval(function() {
            if (countdown-1 <= 0){
               gameover();
            }
            countdown = --countdown <= 0 ? countdown_start : countdown;   
            countdownNumberEl.textContent = countdown.toString();
            
        }, 1000);
        else clearInterval(timer);
    }
    


    // actiunile in timpul cind timer = 0
    function gameover(){
        pauseg(true);
        playstop();
        countdownNumberEl.textContent = "0";
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx2.clearRect(0,0,canvas.width,canvas.height);
        colist = [];
        svg_tim("0");
        score = 0;
        scor.innerHTML = "0";
        x = 1; y = 1;
        
    }

    //setarea animatiei css
    document.querySelector(".style_d").innerHTML = '.animated1{animation: countdown '+ countdown_start.toString() +'s linear infinite forwards;}';



    var secundamer:HTMLElement = document.querySelector("#timer circle");
    secundamer.classList.add("animated1");
    secundamer.style.animationPlayState = "paused";

    //lucru cu animatia svg/keyframe
    function svg_tim(what){
        switch (what){
            case "0":
                secundamer.style.animationPlayState = "paused";
                timerr(false);
                break;
            case "1":
                secundamer.style.animationPlayState = "running";
                timerr(true);
                break;
            case "9":
                timerr(false);
                countdown = countdown_start;
                countdownNumberEl.textContent = countdown.toString();
                secundamer.classList.remove("animated1");
                
                setTimeout(function(){
                    secundamer.classList.add("animated1");
                },10);
                secundamer.style.animationPlayState = "running";
                timerr(true);
                console.log("svgtim9");
                break;
        }       
    };



    
    //classa monetei. ce, unde si cum
    class coin{
        public x:number;
        public y:number;
        public h:number;
        public w:number;
        public score:number;
        public whatmoney;
        constructor(scr,h,w,what){
            
            this.h = h;
            this.w = w;
            this.x = Math.random()*(canvas.width - this.w);
            this.y = Math.random()*(canvas.height - this.h);
            this.score = scr;
            this.whatmoney = what;
            ctx.clearRect( this.x, this.y, this.h, this.w);
            this.x += 1;
            this.y += 1;
            ctx.drawImage(coinimg, 0, obj[this.whatmoney][0], 63, 61, this.x, this.y, this.h, this.w);

        }
        // verifica daca suprafata personajului se intersecteaza cu moneta -> true/false
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
                    svg_tim("9");
                    ctx.clearRect(this.x, this.y, this.h, this.w);
                    score += this.score;
                    if (this.score == 0)
                    {
                        setviteza(false);
                        setTimeout(function(){
                            setviteza(true);
                        },1)
                        
                    }                
                    scor.innerHTML =  score.toString(); 
                    return true;
                }
            return false
        }
    
    }




    function get_coin(){
        var n = Math.round(Math.random()*100)
        if (n >= 0 && n<=40)
            return 1                    //40% moneta 1
        else if (n >= 41 && n <= 60)
            return 2                    //20% moneta 2
        else if (n >= 61 && n <= 75)
            return 3                    //15% moneta 3
        else if (n >= 76 && n <= 90)
            return 4                    //15% moneta 4
        else if (n > 90)
            return 5                    //10% moneta 5
    }

 
    

    function setviteza(is){
        if(is){
            speed = 40;
            stop_cadru(directiaanimatiei);
            move(directiaanimatiei);
            viteza_up = setTimeout(function(){
                speed=speed_start;
                stop_cadru(directiaanimatiei);
                move(directiaanimatiei);
            },10000)
        }else{
            clearTimeout(viteza_up);
    
        }

    }





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
                if (y <= 0) ``      
                    y += pas;
                if (x >= canvas.width - frameWidth)
                    x -= pas;
                if (y >= canvas.height - frameHeight)
                    y -= pas;
            }

            // verifica daca monetele se intersecteaza cu personaj, true -> le sterg din lista
            for (let a=0;a<colist.length;a++){
                if (colist[a].intersection(x,y,frameHeight,frameWidth)){
                    colist.splice(a,1);
                }       
            }
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
        if(ingame)
        if(c == 119 && c != prev_vode) // miscarea sus
        {
            move(0)
            directiaanimatiei=0;
            prev_vode = c;
        }
        else if(c == 115 && c != prev_vode) //miscarea jos
            {
                move(1)
                directiaanimatiei=1;
                prev_vode = c;
            }
        else if(c == 100 && c != prev_vode) //miscarea dreapta
        {
                move(2)
                directiaanimatiei=2;
                prev_vode = c;
            }
        else if(c == 97 && c != prev_vode) //miscarea stinga
            {
                move(3)
                directiaanimatiei=3;
                prev_vode = c;
            }
    })



    //oprirea miscarii personajului si setara cadrului de repaus
    document.querySelector("body").addEventListener("keyup", function(e) {
        var c:any = e.keyCode;
        if(ingame)
        if(c == 87) // stoparea cu fata in sus
        {
            clearInterval(animashka);
            stop_cadru(0);
            prev_vode = 0;
        }
        else if(c == 83) // stoparea cu fata in jos
            {
                clearInterval(animashka);
                stop_cadru(1);
                prev_vode = 0;
            }
        else if(c == 68) // stoparea cu fata in dreapta
            {
                clearInterval(animashka);
                stop_cadru(2);
                prev_vode = 0;
            }
        else if(c == 65) // stoparea cu fata in stinga
            {
                clearInterval(animashka);
                stop_cadru(3);
                prev_vode = 0;
            }
            else if(c == 80) //aprinderea pause pe litera "p"
            {
                pauseg(false);
                svg_tim("0");
            }
    })

    //setarile pentru audio, muzica in timpul jocului
    var xx = document.getElementById("audiostart"); 
    function playstart() {  xx.play(); }
    function pausestart() {  xx.pause(); }

    //setarile pentru audio, sunetul "Game Over"
    var yy = document.getElementById("audiostop"); 
    function playstop() { yy.play(); }

});












