class JellyFish extends MoveableObject{
    height = 50;
    width = 100;
    Images_Swim =[
        'img/2.Enemy/2 Jelly fish/Regular damage/Yellow 1.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Yellow 2.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Yellow 3.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Yellow 4.png',
    ]

    Images_Dead =[
        'img/2.Enemy/2 Jelly fish/Dead/Yellow/y1.png',
        'img/2.Enemy/2 Jelly fish/Dead/Yellow/y2.png',
        'img/2.Enemy/2 Jelly fish/Dead/Yellow/y3.png',
        'img/2.Enemy/2 Jelly fish/Dead/Yellow/y4.png',
    ]

    Images_Attacking =[
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Green 1.png',
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 2.png',
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Green 3.png',
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 4.png',
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 1.png',
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Green 2.png',
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 3.png',
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Green 4.png',
    ]

    speed = Math.random()*2;
    currentImage = 0;
    id;
    world;
    endpoint = -400;
    
    constructor(id,characterX){
        super().loadImage('img/2.Enemy/2 Jelly fish/Regular damage/Yellow 1.png');
        this.loadImages(this.Images_Swim);
        this.loadImages(this.Images_Dead);
        this.loadImages(this.Images_Attacking);
        this.x = characterX+600+Math.random()*1400;
        this.y = 350+Math.random() * 10;
        this.speed = 1+Math.random()* 6;
        this.id = id
        this.enemieAnimate();
        this.offsetX = 5;
        this.offsetY = 5;
        this.offsetXMinus = 16;
        this.offsetYMinus = 20;
        this.movementUp(this.speed/2);
        this.movementDown(this.speed/2);
        this.swimInterval();
    }

    randomMove(){
        let number = 1*Math.random()*100;
        if (number>=0 && number<=20){
            movementLeft();
        }else if(number<20 && number>40){
            movementRight();
        }
    }

    enemieAnimate(){
        this.intervalId = setInterval(() =>{
            this.distanceX =(this.x + this.width/2)- (world.character.x+world.character.width/2);  
            this.distanceY =(this.y - this.offsetY)- (world.character.y+world.character.offsetY);  
            if (this.isDead)
                this.animateDead();
            else if (!this.isDead){
                if (this.y < 0){
                    this.swimUp = false;
                    this.swimDown=true;
                }
                if (this.y > 400){
                    this.swimUp = true;
                    this.swimDown=false;
                }
                if (this.isAttacking)
                    this.animateAttack();
                if (!this.isAttacking)
                    this.animateStandartMove()
            }
        }, 200)    
    }

    animateDead(){
        this.swimUp = true;
        this.movementUp(this.speed)
        this.movementLeft(0);
        this.swimLeft = false;
        this.deadAnimation(this.Images_Dead);
    }

    animateAttack(){
        if (this.distanceX<350 &&this.distanceY>-100&& this.distanceY<100)
            this.blow = true;
        else 
            this.isAttacking = false;
        this.playAnimation(this.Images_Attacking); 
    }

    animateStandartMove(){
        if (this.distanceX<350 &&this.distanceY>-100&& this.distanceY<100){
            this.isAttacking = true;
        }
        this.swimLeft = true;
        this.playAnimation(this.Images_Swim)
        this.destroyObject();        
    }

    swimInterval(){
        setInterval(() => {
            if(!this.swimUp){
                this.swimDown = false;
                this.swimUp = true;
            } else {
                this.swimUp = false;
                this.swimDown = true;
            }
        }, 10000);
    }
}
