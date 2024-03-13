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
        this.sharkieMove();
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

    sharkieMove(){
        setInterval(() => {
            if(!this.world.keyboard.RIGHT ||!this.world.keyboard.LEFT ||!this.world.keyboard.DOWN ||!this.world.keyboard.UP){
                if (this.y<329){
                    this.y +=this.speed/2;
                }
            }
            if(this.world.keyboard.DOWN){
                if (this.y<329){
                    this.y +=this.speed/2;
                }    
            }
            if(this.world.keyboard.RIGHT){
                this.otherDirection = false;
                if (this.x<2000){
                    this.x +=this.speed;
                    this.world.camera_x = -this.x
                    this.world.characterSwimRight()
                }else{
                    if (this.x<2590){
                        this.x +=this.speed;
                    }
                }
            }
            if(this.world.keyboard.LEFT){
                this.otherDirection = true;
                if (this.x>10&& this.x <=2000){
                    this.x -=this.speed;
                    this.world.camera_x = -this.x
                    this.world.characterSwimLeft();
                } else if (this.x>10&& this.x >2000){
                    this.x -=this.speed;
                }
            }
            if(this.world.keyboard.UP){
                if (this.y>-94){
                    this.y -=this.speed    
                }
            }
        }, 1000/30);
    }
}