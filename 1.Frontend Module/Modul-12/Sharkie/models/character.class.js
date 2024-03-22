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

    Images_Swim =[
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

    Images_Poison =[
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/1.png',
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/2.png',
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/3.png',
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/4.png',
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/5.png',
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/6.png',
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/7.png',
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/8.png',
    ]

    Images_Standart_attack =[
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/1.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/2.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/3.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/4.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/5.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/6.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/7.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/8.png',
    ]

    Images_Poison_Hurt =[
        'img/1.Sharkie/5.Hurt/1.Poisoned/1.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/2.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/3.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/4.png',
    ]

    Images_Shocked_Hurt =[
        'img/1.Sharkie/5.Hurt/2.Electric shock/1.png',
        'img/1.Sharkie/5.Hurt/2.Electric shock/2.png',
        'img/1.Sharkie/5.Hurt/2.Electric shock/3.png',
    ]

    keyChecker = keyboard

    attackAnimationEnd = true
    slapActive = false;
    bubbleActive = false;
    speed = 10;
    world;
    currentImage=0;
    currentAttckingImage = 0;
    currentBubbleImage = 0;

    isPoisoned;
    isShocked;
    currentImageWalking=0;
    swim_sound = new Audio('audio/underwater-movement-whoosh-1-186898.mp3')

    constructor(){
        super().loadImage('img/1.Sharkie/1.IDLE/1.png');
        this.loadImages(this.Images_Swim);
        this.loadImages(this.Images_IDLE);
        this.loadImages(this.Images_Slap);
        this.loadImages(this.Images_Standart_attack);
        this.loadImages(this.Images_Poison);
        this.loadImages(this.Images_Shocked_Hurt);
        this.loadImages(this.Images_Poison_Hurt);
        this.x = 100;
        this.y = (440-200)*Math.random();
        this.sharkieAnimate();
        this.sharkieMove();
        this.offsetX = 35;
        this.offsetY = 100;
        this.offsetXMinus = 65;
        this.offsetYMinus = 145;
    }
    
    jump(){
        
    }

    sharkieAnimate(){
        setInterval(() =>{  
            if(this.isHurt && !this.slap() && !this.bubble()){
                if (this.isPoisoned){
                    this.hurtAnimation(this.Images_Poison_Hurt);
                } else if (this.isShocked){
                    this.hurtAnimation(this.Images_Shocked_Hurt);
                }
            }  
            if(this.slap()&&!this.isHurt){
                this.attackAnimation(this.Images_Slap);
            }
            if (this.bubble() && !this.isHurt){
                if (this.bossStage){
                    this.attackAnimation(this.Images_Poison);
                }else{
                    this.attackAnimation(this.Images_Standart_attack);
                }
            }
            else if (!this.isHurt){
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
        if (this.bubbleActive){
            this.playBubbleAnimation(Attack_Images);
        }else {
            this.playSlapAnimation(Attack_Images);
        }
    }

    playBubbleAnimation(Attack_Images){
        let i = this.currentBubbleImage % Attack_Images.length;
        let path = Attack_Images[i];
        this.img = this.imageCache[path];  
        this.currentBubbleImage++;
        if(this.currentBubbleImage == Attack_Images.length-1){
            this.attackAnimationEnd = true
            this.bubbleActive = false
            this.currentBubbleImage = 0
            this.world.bubbels.push(new Bubble())
        }    
    }

    playSlapAnimation(Attack_Images){
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
            this.playAnimation(this.Images_Swim);
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
        if(this.startBubble())
            this.setBubbleTrue();
        if(!this.keyChecker.SLAP && this.slapActive && this.attackAnimationEnd) this.slapActive = false ;
    }
    
    setAttackTrue(){
        this.slapActive = true;
        this.attackAnimationEnd = false;
    }

    setBubbleTrue(){
        this.bubbleActive = true;
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
        }else{
            if (this.x>100&& this.x <=2000){
                this.x -=this.speed;
                this.world.camera_x = -this.x+100;
                this.world.characterSwimLeft();
            } else if (this.x>10&& this.x >2000)
                this.x -=this.speed;
        }
    }

    bossArea(){
        return this.x >1870 && !this.x<1870 && !this.x <2490;
    }

    startSlap(){
        return this.keyChecker.SLAP && !this.slapActive;
    }
    startBubble(){
        return this.keyChecker.BUBBLE && !this.bubbleActive;
    }

    bubble(){
        return this.bubbleActive && !this.attackAnimationEnd;
    }

    slap(){
        return this.slapActive && !this.attackAnimationEnd;
    }

    sharkieIdle(){
        return this.attackAnimationEnd && !this.slapActive;
    }

    swimAnimation(){
        return this.keyChecker.RIGHT ||this.keyChecker.LEFT ||this.keyChecker.DOWN ||this.keyChecker.UP&& this.attackAnimationEnd && !this.slapActive &&!this.bubbleActiveActive;
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