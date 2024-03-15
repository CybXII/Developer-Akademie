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
    speed = 3;

    currentImage = 0;

    constructor(){
        super().loadImage('img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png');
        this.loadImages(this.Images_Walking);
        this.x = 2500;
        this.y = 100*Math.random();
        this.enemieAnimate();
        this.randomMove();
    }


    enemieAnimate(){
            setInterval(() =>{
            let i = this.currentImage % this.Images_Walking.length
            let path = this.Images_Walking[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 200)
    }

    randomMove(){
        this.movementDown(this.speed);
        this.movementUp(this.speed);
        this.movementLeft(this.speed);
        this.movementRight(this.speed);
        setInterval(() =>{
            console.log('Bossmove')
            let numberX = 10*Math.random()*10;
            let numberY = 10*Math.random()*10;
            if (numberX>=0 && numberX<=50){
                this.swimRight = this.swimRight = true;
                this.swimLeft = this.swimLeft = false;
            } if(numberX>50 && numberX<100){
                this.swimLeft = this.swimLeft = true;
                this.swimRight = this.swimRight = false;
            } if (numberY>=0 && numberY<=50){
                this.swimUp = this.swimUp = true;
                this.swimDown = this.swimDown = false;
            } if(numberY>50 && numberY<100){
                this.swimDown = this.swimDown = true;
                this.swimUp = this.swimUp = false;
            }
        }, 1000)
    }
}