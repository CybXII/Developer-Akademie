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

    constructor(){
        super().loadImage('img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png');
        this.loadImages(this.Images_Walking);
        this.x = 250+Math.random()*450;
        this.y = 350*Math.random();
        this.speed = 0.15+ Math.random()* 0.3 ;
        this.enemieAnimate();
    }

    randomMove(){
        let number = 1*Math.random()*100;
        if (number>=0 && number<=20){
            moveLeft();
        }else if(number<20 && number>40){
            moveRight();
        }
    }

    enemieAnimate(){
        this.moveLeft(this.speed);
        setInterval(() =>{
            let i = this.currentImage % this.Images_Walking.length
            let path = this.Images_Walking[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 200)
    }
}