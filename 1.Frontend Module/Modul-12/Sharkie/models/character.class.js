class Character extends MoveableObject{
    height= 200;
    width= 160;
    Images_Walking =[
        'img/1.Sharkie/1.IDLE/1.png',
        'img/1.Sharkie/1.IDLE/2.png',
        'img/1.Sharkie/1.IDLE/3.png',
        'img/1.Sharkie/1.IDLE/4.png',
        'img/1.Sharkie/1.IDLE/5.png',
        'img/1.Sharkie/1.IDLE/6.png',
        'img/1.Sharkie/1.IDLE/7.png',
        'img/1.Sharkie/1.IDLE/8.png',
        'img/1.Sharkie/1.IDLE/9.png',
        'img/1.Sharkie/1.IDLE/10.png',
        'img/1.Sharkie/1.IDLE/11.png',
        'img/1.Sharkie/1.IDLE/12.png',
        'img/1.Sharkie/1.IDLE/13.png',
        'img/1.Sharkie/1.IDLE/14.png',
        'img/1.Sharkie/1.IDLE/15.png',
        'img/1.Sharkie/1.IDLE/16.png',
        'img/1.Sharkie/1.IDLE/17.png',
        'img/1.Sharkie/1.IDLE/18.png'
    ]

    speed = 5;

    world;
    currentImage=0;

    constructor(){
        super().loadImage('img/1.Sharkie/1.IDLE/1.png');
        this.loadImages(this.Images_Walking);
        this.x = 10;
        this.y = (440-200)*Math.random();

        this.sharkieAnimate();
        this.sharkieSink();
        this.sharkieSwimRight(this.speed);
        this.sharkieSwimLeft(this.speed);
        this.sharkieSwimUP(this.speed);
        this.sharkieSwimDown(this.speed)
    }

    jump(){

    }

    sharkieAnimate(){
        setInterval(() =>{
            let keyChecker = this.world.keyboard
            if (keyChecker.RIGHT ||keyChecker.LEFT ||keyChecker.DOWN ||keyChecker.UP){
                let i = this.currentImage % this.Images_Walking.length
                let path = this.Images_Walking[i];
                this.img = this.imageCache[path];
                this.currentImage++;
            }
        }, 200)
    }

    sharkieSink(){
        setInterval(() =>{
            if (!this.world.keyboard.RIGHT&&!this.world.keyboard.LEFT&&!this.world.keyboard.DOWN&&!this.world.keyboard.UP){
                console.log('sink')
                if (this.y < 330)
                this.y += 2;
            }
        }, 200)
    }

    sharkieSwimRight(speed){
        setInterval(() =>{
            if (this.world.keyboard.RIGHT){
                console.log('right');
                this.x += speed;
            }
        }, 50)
    }

    sharkieSwimLeft(speed){
        setInterval(() =>{
            if (this.world.keyboard.LEFT){
            console.log('left');
            this.x -= speed;
            }
        }, 50)
    }

    sharkieSwimUP(speed){
        setInterval(() =>{
            if (this.world.keyboard.UP){
                console.log('up');
                this.y -= speed;
            }
        }, 50)
    }

    sharkieSwimDown(speed){
        setInterval(() =>{
            if (this.world.keyboard.DOWN){
                console.log('down');
                this.y += speed;
            }
        }, 50)
    }
}