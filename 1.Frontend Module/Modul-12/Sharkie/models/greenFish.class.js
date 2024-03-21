class GreenFish extends MoveableObject{
    height = 50;
    width = 100;
    Images_Walking =[
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim2.png',        
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim4.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim5.png',
    ]

    Images_Dead =[
        'img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 1 (can animate by going up).png',
        'img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 2 (can animate by going down to the floor after the Fin Slap attack).png',
        'img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 3 (can animate by going down to the floor after the Fin Slap attack).png',
    ]

    Images_Attacking =[
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim4.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim5.png',
    ]

    Images_Blowing =[
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition4.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition5.png',
    ]

    speed = Math.random()*2;
    currentImage = 0;
    id;
    world;
    endpoint = -300;
    blow = false;
    
    constructor(id,characterX){
        super().loadImage('img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png');
        this.loadImages(this.Images_Walking);
        this.loadImages(this.Images_Dead);
        this.loadImages(this.Images_Blowing);
        this.loadImages(this.Images_Attacking);
        this.x = characterX+700+Math.random()*10;
        this.y = 350*Math.random();
        this.speed = 3+Math.random()* 2;
        this.id = id
        this.enemieAnimate();
        this.offsetX = 5;
        this.offsetY = 5;
        this.offsetXMinus = 16;
        this.offsetYMinus = 20;
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
            if (this.isDead){
                this.swimUp = true;
                this.movementUp(this.speed)
                this.movementLeft(0);
                this.swimLeft = false;
                this.currentImage = 0;
                this.deadAnimation();
            }
            else{
                if (this.blow&&!this.isAttacking){
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
                if (this.isAttacking){
                    this.playAnimation(this.Images_Attacking); 
                }
                else if (!this.blow){
                    this.distanceX =this.x - world.character.x;  
                    // this.distanceY =this.y - world.character.y;  
                    if (this.distanceX<400){
                        this.blow = true;
                    }         
                    this.swimLeft = true;
                    this.playAnimation(this.Images_Walking)
                    this.destroyObject();        
                }
            }
        }, 200)    
    }
}