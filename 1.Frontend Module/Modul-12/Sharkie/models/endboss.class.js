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

    Images_Hurt =[
        'img/2.Enemy/3 Final Enemy/Hurt/1.png',
        'img/2.Enemy/3 Final Enemy/Hurt/2.png',
        'img/2.Enemy/3 Final Enemy/Hurt/3.png',
        'img/2.Enemy/3 Final Enemy/Hurt/4.png',
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

    Images_Attack =[
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

    isHurt;

    constructor(){
        super().loadImage('');
        this.loadImages(this.Images_Walking);
        this.loadImages(this.Images_BossSequenz);
        this.loadImages(this.Images_Hurt);
        this.loadImages(this.Images_Attack);
        this.x = 2220;
        this.y = 0;
        this.enemieAnimate();
        this.randomMove();
        this.bossMovement();   
        this.offsetX = 20;
        this.offsetY = 185;
        this.offsetXMinus = 45;
        this.offsetYMinus = 260; 
    }

    enemieAnimate(){
        setInterval(() =>{
        if (this.isHurt)
            this.hurtAnimation();
        if (this.isAttacking && !this.isHurt)
            this.attackAnimation();
        if (this.bossSequensPlayed&&world.character.bossStage && !this.isHurt){
            this.playAnimation(this.Images_Walking)
        }else if (!this.bossSequensPlayed&&world.character.bossStage)
            this.bossSequenz();
        }, 200)   
    }

    randomMove(){
        setInterval(() =>{
            if (this.bossSequensPlayed){
                let numberX = 10*Math.random()*10;
                let numberY = 10*Math.random()*10;
                if (numberX>=0 && numberX<=50)
                    this.leftMovementChecker();
                if(numberX>50 && numberX<100)
                    this.rightMovementChecker();
                if (numberY>=0 && numberY<=50)
                    this.upMovementChecker();
                if(numberY>50 && numberY<100)
                    this.downMovementChecker();
            }
        }, 1000);
    }

    bossSequenz(){
        this.playAnimation(this.Images_BossSequenz);
        if (this.currentImage == this.Images_BossSequenz.length){
            this.bossSequensPlayed = true
            this.speed = 5;
        }
    }

    hurtAnimation(){
        this.speed = this.speed + 0.5;
        if(this.currentImage>this.Images_Hurt.length){
            this.currentImage = 0;
        }
        this.playAnimation(this.Images_Hurt)
        if (this.currentImage == this.Images_Hurt.length)
        this.isHurt = false
    }

    bossMovement(){
        setInterval(() =>{
            if (this.swimLeft)
                this.moveLeft();
            if (this.swimRight)
                this.moveRight();            
            if (this.swimUp)
                this.moveUp();
            if (this.swimDown)
                this.moveDown();
        }, 1000/35)
    }

    leftMovementChecker(){
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
    }

    rightMovementChecker(){
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
    }

    upMovementChecker(){
        if(this.y<-150){
            this.swimUp = this.swimUp = false;
            this.swimDown = this.swimDown = false;    
        } else{
            this.swimUp = this.swimUp = true;
            this.swimDown = this.swimDown = false;    
        }
    }

    downMovementChecker(){
        if (this.y>150){
            this.swimDown = this.swimDown = false;
            this.swimUp = this.swimUp = false;
        }else{
            this.swimDown = this.swimDown = true;
            this.swimUp = this.swimUp = false;    
        }
    }

    moveLeft(){
        if (this.x<1880){}
        else {this.x -= this.speed;}
    }

    moveRight(){
        if (this.x>2340){}
        else{this.x += this.speed;}
    }

    moveUp(){
        if(this.y<-150){}
        else{this.y -= this.speed;}
    }

    moveDown(){
        if(this.y>150){}
        else{this.y += this.speed;}
    }
}