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

    Images_Slap =[
        'img/1.Sharkie/4.Attack/Fin slap/1.png',
        'img/1.Sharkie/4.Attack/Fin slap/2.png',
        'img/1.Sharkie/4.Attack/Fin slap/3.png',
        'img/1.Sharkie/4.Attack/Fin slap/4.png',
        'img/1.Sharkie/4.Attack/Fin slap/5.png',
        'img/1.Sharkie/4.Attack/Fin slap/6.png',
        'img/1.Sharkie/4.Attack/Fin slap/7.png',
        'img/1.Sharkie/4.Attack/Fin slap/8.png',
    ];


    keyChecker = keyboard

    attackAnimationEnd = true
    slapActive = false;

    speed = 10;
    world;
    currentImage=0;
    currentAttckingImage = 0;
    currentImageWalking=0;
    swim_sound = new Audio('audio/underwater-movement-whoosh-1-186898.mp3')

    constructor(){
        super().loadImage('img/1.Sharkie/1.IDLE/1.png');
        this.loadImages(this.Images_Walking);
        this.loadImages(this.Images_IDLE);
        this.loadImages(this.Images_Slap);
        this.x = 100;
        this.y = (440-200)*Math.random();
        this.sharkieAnimate();
        // this.applyAir();
        this.sharkieMove();

    }

    jump(){
        
    }

    sharkieAnimate(){
        setInterval(() =>{
            if(this.slap()){
                this.attackAnimation(this.Images_Slap);
            }else{
                this.sharkieMoveAnimations();
            }
        }, 100)
    }

    playAnimation(Images){
        let i = this.currentImage % Images.length
        let path = Images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    attackAnimation(Attack_Images){
        let i = this.currentAttckingImage % Attack_Images.length;
        let path = Attack_Images[i];
        this.img = this.imageCache[path];  
        this.currentAttckingImage++; 
        if(this.currentAttckingImage == Attack_Images.length-1){
            this.attackAnimationEnd = true
            this.slapActive = false
            this.currentAttckingImage = 0
        }
    }

    sharkieMoveAnimations(){
        if (this.swimAnimation()){
            this.playAnimation(this.Images_Walking);
            this.swim_sound.play();
        }
        else if(this.sharkieIdle())
            this.playAnimation(this.Images_IDLE);
        }

    sharkieMove(){
        setInterval(() => {
            this.checkAction()
        }, 1000/30);
    }

    checkAction(){
        if(this.sink())
            if (this.y<329 &&this.attackAnimationEnd) this.y +=this.speed/6;
        if(this.down())
            if (this.y<329) this.y +=this.speed/2;    
        if(this.right())
            this.sharkieSwimRight();
        if(this.left())
            this.sharkieSwimLeft();
        if(this.up())
            if (this.y>-94)this.y -=this.speed;
        if(this.startSlap())
            this.setAttackTrue();
        if(!this.keyChecker.SPACE && this.slapActive && this.attackAnimationEnd) this.slapActive = false ;
    }
    
    setAttackTrue(){
        this.slapActive = true;
        this.attackAnimationEnd = false;
    }

    sharkieSwimRight(){
        this.otherDirection = false;
        if (this.bossStage){
            if (this.x<2490)this.x +=this.speed;
        } else {
            if (this.x<2000){
                this.x +=this.speed;
                this.world.camera_x = -this.x+100;
                this.world.characterSwimRight();
            }else{
                this.bossStage = true;
            }
        }
    }

    sharkieSwimLeft(){
        this.otherDirection = true;
        if (this.bossStage){
            if (this.x >1870 && !this.x<1870 && !this.x <2490)
                this.x -=this.speed; 
            else if (this.x>100&& this.x <=2000&& !this.bossStage){
                    this.x -=this.speed;
                    this.world.camera_x = -this.x+100;
                    this.world.characterSwimLeft();
                } 
            else if(this.x>10&& this.x >2000)
                this.x -=this.speed;
        }
    }

    bossArea(){
        return this.x >1870 && !this.x<1870 && !this.x <2490;
    }

    startSlap(){
        return this.keyChecker.SPACE && !this.slapActive;
    }

    slap(){
        return this.slapActive && !this.attackAnimationEnd;
    }

    sharkieIdle(){
        return this.attackAnimationEnd && !this.slapActive;
    }

    swimAnimation(){
        return this.keyChecker.RIGHT ||this.keyChecker.LEFT ||this.keyChecker.DOWN ||this.keyChecker.UP&& this.attackAnimationEnd && !this.slapActive;
    }

    down(){
        return this.keyChecker.DOWN&&this.attackAnimationEnd;
    }

    up(){
        return this.keyChecker.UP&&this.attackAnimationEnd;
    }

    left(){
        return this.keyChecker.LEFT&&this.attackAnimationEnd;
    }

    right(){
        return this.keyChecker.RIGHT&&this.attackAnimationEnd;
    }

    sink(){
        return !this.keyChecker.RIGHT ||!this.keyChecker.LEFT ||!this.keyChecker.DOWN ||!this.keyChecker.UP
    }
}