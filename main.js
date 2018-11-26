document.addEventListener('DOMContentLoaded', function () {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    var canvas2 = document.getElementById("myCanvas2");
    var ctx2 = canvas2.getContext("2d");
    var imageObj = new Image();
    imageObj.src = 'img/hero3.png';
    var coinimg = new Image();
    coinimg.src = 'img/coins.jpg';
    var animashka;
    var fh = new Array(0, 64, 128, 192); // date de axa y in sprite
    var coi = new Array(0, 61, 122, 183, 244); // date de axa y in sprite
    var x = 120;
    var y = 25;
    var pas = 3;
    var speed_start = 20;
    var speed = speed_start;
    var score = 0;
    var ingame = false;
    var coin_delta = 5000;
    var scor = document.querySelector(".score");
    var newgame = document.querySelector("#newg");
    var continu = document.querySelector("#continue");
    var reiting = document.querySelector("#reiting");
    var menu = document.querySelector("#allthethings");
    newgame.addEventListener("click", function () {
        console.log("newg");
        menu.classList.add("unshow");
        ingame = true;
        score = 0;
        speed = speed_start;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        spawn_coin = setInterval(function () {
            var coo = new coin(100, 30, 30);
            colist.push(coo);
            //coo = null;        
        }, coin_delta);
        //for (let a=0;a<colist.length;a=0){
        //if (colist[a].intersection(x,y,frameHeight,frameWidth)){
        //colist.splice(a,1);
        // console.log('calcat')
        //}
        //}
        colist = [];
        svg_tim("9");
    });
    continu.addEventListener("click", function () {
        console.log("continue");
        menu.classList.add("unshow");
        ingame = true;
        spawn_coin = setInterval(function () {
            var coo = new coin(100, 30, 30);
            colist.push(coo);
            //coo = null;        
        }, coin_delta);
        svg_tim("1");
    });
    reiting.addEventListener("click", function () {
        console.log("reiting");
        menu.classList.add("unshow");
        //svg_tim("1");
    });
    function pause() {
        menu.classList.remove("unshow");
        ingame = false;
        clearInterval(spawn_coin);
    }
    // timer
    var countdownNumberEl = document.getElementById('countdown-number');
    var countdown_start = 20; //limitele secundomerului
    var countdown = countdown_start;
    countdownNumberEl.textContent = countdown.toString();
    var timer;
    timerr(false);
    function timerr(is) {
        if (is)
            timer = setInterval(function () {
                countdown = --countdown <= 0 ? countdown_start : countdown;
                countdownNumberEl.textContent = countdown.toString();
            }, 1000);
        else
            clearInterval(timer);
    }
    //setarea animatiei css
    //var style_anim = ;
    document.querySelector(".style_d").innerHTML = '.animated1{animation: countdown ' + countdown_start.toString() + 's linear infinite forwards;}';
    var secundamer = document.querySelector("#timer circle");
    secundamer.classList.add("animated1");
    secundamer.style.animationPlayState = "paused";
    //secundamer.classList.remove("animated1");secundamer.classList.add("animated1");
    // secundamer.style.animationPlayState = "paused";
    //oprirea, inceperea animatiei svg timer
    // var timer1 = document.querySelector(".s_t");
    // let i = 1;
    function svg_tim(what) {
        switch (what) {
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
                secundamer.style.animationPlayState = "running";
                setTimeout(function () {
                    secundamer.classList.add("animated1");
                }, 1);
                timerr(true);
                break;
        }
    }
    ;
    /*
        timer1.addEventListener("click",function(){
            if(i==0){
                secundamer.style.animationPlayState = "paused";
                timerr(false);
                i++;
            }
            else{
                secundamer.style.animationPlayState = "running";
                timerr(true);
                i=0;
            }
            //console.log("rabotaet");
        });*/
    //timer.pauseAnimations();
    //trei.traiincaodata//dupa inchidere/superю
    //classa monetei. ce, unde si cum
    var coin = /** @class */ (function () {
        function coin(scr, h, w) {
            this.h = h;
            this.w = w;
            this.x = Math.random() * (canvas.width - this.w);
            this.y = Math.random() * (canvas.height - this.h);
            this.score = scr;
            //ctx.beginPath();
            //ctx.rect(this.x,this.y , this.h, this.w);
            ctx.clearRect(this.x, this.y, this.h, this.w);
            this.x += 1;
            this.y += 1;
            ctx.drawImage(coinimg, 0, coi[get_coin()], 63, 61, this.x, this.y, this.h, this.w);
            // ctx.fillStyle = "red";
            // ctx.fill();
        }
        coin.prototype.intersection = function (x1, y1, h1, w1) {
            if (this.x >= x1 && this.y >= y1 && this.x < x1 + w1 && this.y <= y1 + h1
                || this.x + this.w >= x1 && this.y >= y1 && this.x + this.w <= x1 + w1 && this.y <= y1 + h1
                || this.x + this.w >= x1 && this.y + this.h >= y1 && this.x + this.w <= x1 + w1 && this.y + this.h <= y1 + h1
                || this.x >= x1 && this.y + this.h >= y1 && this.x <= x1 + w1 && this.y + this.h <= y1 + h1
                || x1 + w1 >= this.x && x1 + w1 <= this.x + this.w && y1 + h1 >= this.y && y1 + h1 <= this.y + this.h
                || x1 >= this.x && x1 <= this.x + this.h && y1 + h1 >= this.y && y1 + h1 <= this.y + this.h
                || x1 >= this.x && x1 <= this.x + this.w && y1 >= this.y && y1 <= this.y + this.h
                || x1 + w1 >= this.x && x1 + w1 <= this.x + this.w && y1 >= this.y && y1 <= this.y + this.h) {
                console.log("ggg");
                ctx.clearRect(this.x, this.y, this.h, this.w);
                score += this.score;
                scor.innerHTML = score.toString();
                return true;
            }
            return false;
        };
        return coin;
    }());
    function get_coin() {
        var n = Math.round(Math.random() * 100);
        if (n >= 0 && n <= 40)
            return 0;
        else if (n >= 41 && n <= 60)
            return 1;
        else if (n >= 61 && n <= 75)
            return 2;
        else if (n >= 76 && n <= 90)
            return 3;
        else if (n >= 90)
            return 4;
    }
    // generarea monetelor, adaugarea acestor in lista
    var colist = [];
    // let coo = new coin(100 ,30,30);
    // colist.push(coo);
    // coo = new coin(100 ,30,30);
    // colist.push(coo);
    var spawn_coin = setInterval(function () {
        var coo = new coin(100, 30, 30);
        colist.push(coo);
        //coo = null;
    }, coin_delta);
    // spawn_coin;         
    clearInterval(spawn_coin);
    //coinimg.onload = function(){};
    function move(i) {
        clearInterval(animashka);
        var shift = 0; //start pe axa x din sprit
        var h_shift = fh[i]; //start pe axa y din sprit
        var currentFrame = 0;
        animashka = setInterval(function () {
            var frameWidth = 32; //lung ale sprit
            var frameHeight = 64; // inaltimea sprit
            var totalFrames = 8; // nr de cadre in rind
            //desenam miscarea personajului
            ctx2.clearRect(x, y, frameWidth, frameHeight + pas);
            ctx2.drawImage(imageObj, shift, h_shift, frameWidth, frameHeight, x, y, frameWidth, frameHeight);
            shift += frameWidth;
            currentFrame++;
            if (currentFrame == totalFrames) {
                shift = 0;
                h_shift = fh[i];
                currentFrame = 0;
            }
            //miscarea si previne esirea din diapazonu hartii
            if (x > 0 && y > 0 && x < canvas.width - frameWidth && y < canvas.height - frameHeight)
                switch (i) {
                    case 0:
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
                }
            else {
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
            for (var a = 0; a < colist.length; a++) {
                if (colist[a].intersection(x, y, frameHeight, frameWidth)) {
                    colist.splice(a, 1);
                    // console.log('calcat')
                }
            }
            /*
                        colist.map(function(e){
                            if(e.intersection(x,y,frameHeight,frameWidth))
                                delete e;
                        })*/
        }, 1000 / speed);
    }
    //cadru de repauz
    function stop_cadru(i) {
        var frameWidth = 32;
        var frameHeight = 64;
        ctx2.clearRect(x, y, frameWidth, frameHeight + pas);
        ctx2.drawImage(imageObj, 0, fh[i], frameWidth, frameHeight, x, y, frameWidth, frameHeight);
    }
    //control WASD(!!engleze!!)
    var prev_vode = 0;
    document.querySelector("body").addEventListener("keypress", function (e) {
        var c = e.keyCode;
        //console.log(c);
        // p = 112
        if (ingame)
            if (c == 119 && c != prev_vode) {
                //console.log("up");
                move(0);
                prev_vode = c;
            }
            else if (c == 115 && c != prev_vode) {
                // console.log("down");
                move(1);
                prev_vode = c;
            }
            else if (c == 100 && c != prev_vode) {
                // console.log("right");
                move(2);
                prev_vode = c;
            }
            else if (c == 97 && c != prev_vode) {
                // console.log("left")
                move(3);
                prev_vode = c;
            }
        if (c == 96) {
            console.log(colist);
        }
    });
    document.querySelector("body").addEventListener("keyup", function (e) {
        var c = e.keyCode;
        console.log(c);
        if (ingame)
            if (c == 87) {
                // console.log("up-stop");
                clearInterval(animashka);
                stop_cadru(0);
                prev_vode = 0;
            }
            else if (c == 83) {
                // console.log("down-stop");
                clearInterval(animashka);
                stop_cadru(1);
                prev_vode = 0;
            }
            else if (c == 68) {
                // console.log("right-stop");
                clearInterval(animashka);
                stop_cadru(2);
                prev_vode = 0;
            }
            else if (c == 65) {
                //console.log("left-stop")
                clearInterval(animashka);
                stop_cadru(3);
                prev_vode = 0;
            }
            else if (c == 80) {
                pause();
                svg_tim("0");
            }
    });
});
