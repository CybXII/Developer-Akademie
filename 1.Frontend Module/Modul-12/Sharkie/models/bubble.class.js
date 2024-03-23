class Bubble extends MoveableObject{
    height = 50;
    width = 50;
    speed = 25;
    speedY = 0.1;

    Images_Standart =[
        'img/1.Sharkie/4.Attack/Bubble trap/Bubble.png',
    ];

    Images_Poison =[
        'img/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png',
    ]

    constructor(x,speed){
        if (!world.character.bossStage){
            super().loadImage('img/1.Sharkie/4.Attack/Bubble trap/Bubble.png');
        }else{
            super().loadImage('img/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png');
        }
        this.loadImages(this.Images_Standart);
        this.loadImages(this.Images_Poison);
        this.x= world.character.x+x;
        this.y= world.character.y+100;
        this.bubbleShot();
        this.applyAir();
        this.offsetX = 0;
        this.offsetY = 0;
        this.offsetXMinus = 0;
        this.offsetYMinus = 0;
        this.speed = speed
    }



    bubbleShot(){
        this.intervalId = setInterval(() => {
            this.x += this.speed;
            this.speed -= this.acceleration;
            this.outOfFieldChecker();
        }, 80);
    }
}
