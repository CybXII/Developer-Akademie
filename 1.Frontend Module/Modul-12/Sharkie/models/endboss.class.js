class Endboss extends MoveableObject{

    height = 400;
    width = 300;
    Images_Walking =[
        'img/2.Enemy/3 Final Enemy/2.floating/1.png',
        'img/2.Enemy/3 Final Enemy/2.floating/2.png',
        'img/2.Enemy/3 Final Enemy/2.floating/3.png',
        'img/2.Enemy/3 Final Enemy/2.floating/4.png',
        'img/2.Enemy/3 Final Enemy/2.floating/5.png',
        'img/2.Enemy/3 Final Enemy/2.floating/6.png',
        'img/2.Enemy/3 Final Enemy/2.floating/7.png',
        'img/2.Enemy/3 Final Enemy/2.floating/8.png',
        'img/2.Enemy/3 Final Enemy/2.floating/9.png',
        'img/2.Enemy/3 Final Enemy/2.floating/10.png',
        'img/2.Enemy/3 Final Enemy/2.floating/11.png',
        'img/2.Enemy/3 Final Enemy/2.floating/12.png',
        'img/2.Enemy/3 Final Enemy/2.floating/13.png',

    ]

    Images_BossSequenz =[
        'img/2.Enemy/3 Final Enemy/1.Introduce/1.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/2.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/3.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/4.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/5.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/6.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/7.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/8.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/9.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/10.png',
    ]
    bossSequensPlayed = false;
    speed = 0;

    currentImage = 0;

    constructor(){
            super().loadImage('');
            this.loadImages(this.Images_Walking);
            this.loadImages(this.Images_BossSequenz);
            this.x = 2320;
            this.y = 0;
            this.enemieAnimate();
            this.randomMove();
            this.bosstLeft();    
    }


    enemieAnimate(){
        setInterval(() =>{
        if (this.bossSequensPlayed&&world.character.bossStage){
                let i = this.currentImage % this.Images_Walking.length
                let path = this.Images_Walking[i];
                this.img = this.imageCache[path];
                this.currentImage++;
        }else if (!this.bossSequensPlayed&&world.character.bossStage) {
            let i = this.currentImage % this.Images_BossSequenz.length
            let path = this.Images_BossSequenz[i];
            this.img = this.imageCache[path];
            this.currentImage++;
            if (this.currentImage == this.Images_BossSequenz.length){
                this.bossSequensPlayed = true
                this.speed = 5;
            }
        }
        }, 200)   
    }

    randomMove(){
        setInterval(() =>{
            if (this.bossSequensPlayed){
                console.log('Bossmove')
                let numberX = 10*Math.random()*10;
                let numberY = 10*Math.random()*10;
                if (numberX>=0 && numberX<=50){
                    if (this.x >2340){
                        this.swimRight = this.swimRight = false;
                        this.swimLeft = this.swimLeft = false;
                    }else{
                        if (this.speed>0){
                            this.otherDirection = true;
                        }
                        this.swimRight = this.swimRight = true;
                        this.swimLeft = this.swimLeft = false;    
                    }
                } if(numberX>50 && numberX<100){
                    if (this.x<1880){
                        this.swimLeft = this.swimLeft = false;
                        this.swimRight = this.swimRight = false;
                    }else{
                        if (this.speed>0){
                            this.otherDirection = false;
                        }
                        this.swimLeft = this.swimLeft = true;
                        this.swimRight = this.swimRight = false;    
                    }
                } if (numberY>=0 && numberY<=50){
                    if(this.y<-150){
                        this.swimUp = this.swimUp = false;
                        this.swimDown = this.swimDown = false;    
                    } else{
                        this.swimUp = this.swimUp = true;
                        this.swimDown = this.swimDown = false;    
                    }
                } if(numberY>50 && numberY<100){
                    if (this.y>150){
                        this.swimDown = this.swimDown = false;
                        this.swimUp = this.swimUp = false;
                    }else{
                        this.swimDown = this.swimDown = true;
                        this.swimUp = this.swimUp = false;    
                    }
                }
            }
        }, 1000);
    }

    bosstLeft(){
        setInterval(() =>{
            if (this.swimLeft){
                if (this.x<1880){
                }else{
                    this.x -= this.speed;
                }
            }
            if (this.swimRight){
                if (this.x>2340){
                }else{
                    this.x += this.speed;
                }
            }
            if (this.swimUp){
                if(this.y<-150){
                }else{
                    this.y -= this.speed;
                }
            }
            if (this.swimDown){
                if(this.y>150){
                }else{
                this.y += this.speed;}
            }
        }, 1000/35)
    }
}
