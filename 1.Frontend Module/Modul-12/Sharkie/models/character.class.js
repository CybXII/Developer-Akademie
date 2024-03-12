class Character extends MoveableObject{
    height= 200;
    width= 160;
    Images_IDLE =[
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
    ];

    Images_Walking =[
        'img/1.Sharkie/3.Swim/1.png',
        'img/1.Sharkie/3.Swim/2.png',
        'img/1.Sharkie/3.Swim/3.png',
        'img/1.Sharkie/3.Swim/4.png',
        'img/1.Sharkie/3.Swim/5.png',
        'img/1.Sharkie/3.Swim/6.png',
    ];


    speed = 5;

    world;
    currentImage=0;
    currentImageWalking=0;

    constructor(){
        super().loadImage('img/1.Sharkie/1.IDLE/1.png');
        this.loadImages(this.Images_Walking);
        this.loadImages(this.Images_IDLE);
        this.x = 10;
        this.y = (440-200)*Math.random();
        this.sharkieAnimate();
        this.sharkieSink();
        this.sharkieSwimRight();
        this.sharkieSwimUP();
        this.sharkieSwimLeft();
        this.sharkieStop();
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
            else  {
                let i = this.currentImage % this.Images_IDLE.length
                let path = this.Images_IDLE[i];
                this.img = this.imageCache[path];
                this.currentImage++;
            }
        }, 100)
    }

    sharkieSink(){
        setInterval(() => {
            if(!this.world.keyboard.RIGHT ||!this.world.keyboard.LEFT ||!this.world.keyboard.DOWN ||!this.world.keyboard.UP){
                if (this.y<329){
                    this.y +=this.speed/2    
                }
            }
            if(this.world.keyboard.DOWN){
                if (this.y<329){
                    this.y +=this.speed/2;
                }    
            }

        }, 1000/60);
    }

    sharkieSwimRight(){
        setInterval(() => {
            if(this.world.keyboard.RIGHT){
                // if (this.x>200){
                //     this.world.characterSwimRight();
                //     clearInterval();
                //     }
                // else{
                    this.x +=this.speed;
                // }
            }
        }, 1000/60);
    }

    sharkieSwimLeft(){
        setInterval(() => {
            if(this.world.keyboard.LEFT){
                this.x -=this.speed;
            }
        }, 1000/60);
    }

    sharkieSwimUP(){
        setInterval(() => {
            if(this.world.keyboard.UP){
                if (this.y>-94){
                    this.y -=this.speed    
                }
            }
        }, 1000/60);
    }

    sharkieStop(){
        setInterval(() => {
            if(!this.world.keyboard.RIGHT ||!this.world.keyboard.LEFT ||!this.world.keyboard.DOWN ||!this.world.keyboard.UP){
                clearInterval()
            }
        },1)
    }    
}