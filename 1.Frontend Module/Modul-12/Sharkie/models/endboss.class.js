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

    // swimRight;
    // swimLeft;
    // swimUp;
    // swimDown;

    currentImage = 0;

    constructor(){
        super().loadImage('img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png');
        this.loadImages(this.Images_Walking);
        this.x = 250+Math.random()*400;
        this.y = 100*Math.random();
        this.enemieAnimate();
        this.randomMove();
        // this.swimRightBoss()
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
        setInterval(() =>{
            let number = 10*Math.random()*10;
            console.log(number)
            if (number>=0 && number<=50){
                this.swimRight = !this.swimRight;
                this.swimLeft = !this.swimLeft;
                this.moveRight(this.speed/2);
            }else if(number>50 && number<100){
                this.swimLeft = !this.swimLeft;
                this.swimRight = !this.swimRight;
                this.movementLeft(this.speed);
            }    
        }, 1000)
    }

    // swimRightBoss(){
    //         console.log('check')
    //         if (this.swimRight){

    //             this.moveRight(this.speed/2);
    //         }if (this.swimLeft){

    //         // }if (this.swimRight){
    //         //     this.moveUP(this.speed/2);
    //         // }
    //         // if (this.swimRight){
    //         //     this.moveDown(this.speed/2);
    //         }
    // }
}