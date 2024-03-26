class OrangeFish extends MoveableObject{
    height = 50;
    width = 100;
    Images_Swim =[
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim2.png',        
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim4.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim5.png',
    ]

    Images_Dead =[
        'img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/2.2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/2.3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/2.png',
    ]

    Images_Attacking =[
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim4.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim5.png',
    ]

    Images_Blowing =[
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition4.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition5.png',
    ]

    Images_Blowing_End =[
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition5.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition4.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition1.png',
    ]


    speed = Math.random()*2;
    currentImage = 0;
    id;
    world;
    endpoint = -400;
    blow = false;
    down = false;
    
    constructor(id,characterX){
        super().loadImage('img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png');
        this.loadImages(this.Images_Swim);
        this.loadImages(this.Images_Dead);
        this.loadImages(this.Images_Blowing);
        this.loadImages(this.Images_Attacking);
        this.x = characterX+700+Math.random()*2000;
        this.y = 350*Math.random();
        this.speed = 1+Math.random()* 3;
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
        this.movementLeft(this.speed);
        this.intervalId = setInterval(() =>{
            this.distanceX =(this.x + this.width/2)- (world.character.x+world.character.width/2);  
            this.distanceY =(this.y - this.offsetY)- (world.character.y+world.character.offsetY);  
            if (this.isDead)
                this.animateDead();
            else if (!this.isDead){
                if (this.blow&&!this.isAttacking)
                    this.animateStartAttack();
                if (this.isAttacking)
                    this.animateAttack();
                if (!this.blow)
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

    animateStartAttack(){
        if (this.currentImage>this.Images_Blowing.length && !this.isAttacking){
            this.currentImage= 0;
        }
        this.playAnimation(this.Images_Blowing);
        if (this.currentImage >= this.Images_Blowing.length){
            this.offsetY = 0;
            this.offsetYMinus = 0;
            this.isAttacking = true;
        }    
    }

    animateAttack(){
        if (this.distanceX<350 &&this.distanceY>-100&& this.distanceY<100){
            this.blow = true;
            this.playAnimation(this.Images_Attacking); 
        }
        else 
        this.animateEndAttack();
    }

    animateStandartMove(){
        if (this.distanceX<350 &&this.distanceY>-100&& this.distanceY<100){
            this.blow = true;
        }
        this.swimLeft = true;
        this.playAnimation(this.Images_Swim)
        this.destroyObject();        
    }

    animateEndAttack(){
        if (this.currentImage>=this.Images_Blowing_End.length){
            this.currentImage= 0;
        }
        this.playAnimation(this.Images_Blowing_End);
        if (this.currentImage >= this.Images_Blowing_End.length){
            this.offsetY = 5;
            this.offsetYMinus = 20;
            this.isAttacking = false;
            this.blow = false;
        }    
    }

    swimInterval(){
        setInterval(() => {
            if(!this.swimUp){
                this.swimDown = false;
                this.swimUp = true;
            } else if (this.swimUp&& !this.isDead) {
                this.swimUp = false;
                this.swimDown = true;
            }
        }, 1500);
    }
}