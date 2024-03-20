class Enemy extends MoveableObject{
    height = 50;
    width = 100;
    Images_Walking =[
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim2.png',        
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim4.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim5.png',
    ]
    speed = Math.random()*2;
    currentImage = 0;
    id;
    world;
    endpoint = 250

    constructor(id,characterX){
        super().loadImage('img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png');
        this.loadImages(this.Images_Walking);
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
            this.swimLeft = true;
            this.movementLeft(this.speed);
            this.intervalId = setInterval(() =>{
                this.playAnimation(this.Images_Walking)
                this.destroyObject();
            }, 100)    
    }
}