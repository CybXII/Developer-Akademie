class MoveableObject{
    x = 120;
    y = 120;
    img;
    height= 150;
    width= 100;
    imageCache = {};
    speed = 0.15;
    speedY = 0;
    acceleration = 1
    bossStage = false
    intervalId;
    distance;
    destroyed= false;
    destroy = false;
    offsetY;
    offsetX;
    offsetXMinus;
    offsetYMinus;
    swimRight;
    swimLeft;
    swimUp;
    swimDown;
    isDead = false;
    isHurt = false;
    deadPlayed;
    isAttacking = false;
    isBubbeld;

    draw(ctx){
        if (this instanceof Endboss && this.isDead){
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        }
        else
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        }
    

    drawFrame(ctx){
        if( this instanceof Character || this instanceof Bubble|| this instanceof Endboss|| this instanceof GreenFish ||this instanceof RedFish|| this instanceof OrangeFish){
            ctx.beginPath();
            ctx.lineWidth = "5";
            ctx.strokeStyle = "red";
            // ctx.rect(this.x+20,this.y+185,this.width-45,this.height-260); Offset adjustmend helper
            ctx.rect(this.x+this.offsetX,this.y+this.offsetY,this.width-this.offsetXMinus,this.height-this.offsetYMinus);
            ctx.stroke();    
        }
    }


    loadImage(path){
        this.img = new Image();
        this.img.src = path;
    }

    playAnimation(Images){
        let i = this.currentImage % Images.length
        let path = Images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    loadImages(arr){
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    moveRight(speed) {
        this.x = this.x + speed;
    }

    moveUp(speed){
        this.y = this.y - speed;
    }

    moveDown(speed) {
        this.y = this.y + speed;
    }

    moveLeft(speed){
        this.x -= speed;
    }

    applyAir(){
        setInterval(()=> {
            this.y -= this.speedY;
            this.speedY += this.acceleration;
        },80);
    }

    movementLeft(speed){
        setInterval(() =>{
            if (this.swimLeft)
                this.x -= speed;
        }, 1000/35)
    }

    movementRight(speed){
        setInterval(() =>{
            if (this.swimRight)
                this.x += speed;
        }, 1000/35)
    }

    movementUp(speed){
        setInterval(() =>{
            if (this.swimUp)
                this.y -= speed;
        }, 1000/35)
    }

    movementDown(speed){
        setInterval(() =>{
            if (this.swimDown)
                this.y += speed;
        }, 1000/35)
    }

    destroyObject(){
        this.distance = this.x - world.character.x
        if(this.x <=this.endpoint|| this.y <= -500){
            if ( this instanceof JellyFish || this instanceof GreenFish || this instanceof RedFish || this instanceof OrangeFish || this instanceof Bubble){
                    this.finalyDestroy(this.intervalId);
            }
        }
    }

    finalyDestroy(){
        if (this instanceof Bubble){
            let found = world.bubbels.find((element) => element.id == this.id);
            if (found){
                
                let isID = (element) => element.intervalId == this.intervalId;
                world.bubbels.splice(`${world.bubbels.findIndex(isID)}`,1)
                this.destroy = true;
                clearInterval(this.intervalId);
                this.intervalId= null;        
            }   
        }else {
            let found = world.enemies.find((element) => element.intervalId == this.intervalId);
            if (found){
                let isID = (element) => element.intervalId == this.intervalId;
                world.enemies.splice(`${world.enemies.findIndex(isID)}`,1)
                this.destroy = true;
                clearInterval(this.intervalId);
                this.intervalId= null;        
            }        
        }
    }

    isColliding(obj) {
        if(this.collisionObjects()){
            let x = this.x+this.offsetX;
            let width = this.width-this.offsetXMinus;
            let y = this.y+this.offsetY;
            let height = this.height-this.offsetYMinus
            return (x + width) >= obj.x+obj.offsetX && x <= (obj.x + obj.width-obj.offsetXMinus) && 
            (y + height) >= obj.y+obj.offsetY &&
            (y) <= (obj.y+obj.offsetY + obj.height-obj.offsetYMinus)
        }
        
    }

    deadAnimation(deadImages){
            this.speed = 0;
            if (this.checkBossDeath()){
                this.currentImage = 0;
            }
            if (this instanceof JellyFish && this.deadPlayed ||this instanceof RedFish && this.deadPlayed || this instanceof GreenFish && this.deadPlayed || this instanceof OrangeFish && this.deadPlayed){
                if (this.currentImage >= deadImages.length && this.deadPlayed){
                    this.currentImage = deadImages.length+1;
                    this.setDeadObject();
                }    
                this.playAnimation(deadImages);
            }
            if(this.enemyLastDeadImg()){
                this.currentImage = 0;
                this.deadPlayed = true;
                this.playAnimation(deadImages);
            }else{
                this.playAnimation(deadImages);
            }
    }

    hurtAnimation(hurtImages){
        if (this instanceof Character){
            this.resetAttack();
        }
        if (this instanceof Endboss){
            this.speed = this.speed + 0.5;
        }
        if(this.currentImage>hurtImages.length*3){
            this.currentImage = 0;
        }
        this.playAnimation(hurtImages)
        this.checkCharHurt(hurtImages);
    }

    checkCharHurt(hurtImages){
        if (this instanceof Character){
            if (this.isPoisoned){
                if (this.currentImage == hurtImages.length){
                    this.stopHurtChecker();
                }   
            } else {
                if (this.currentImage == hurtImages.length*3){
                    this.stopHurtChecker();
                }
            }
        }
    }

    resetAttack(){
        this.bubbleActive = false ;
        this.isAttacking = false;
        this.attackAnimationEnd = true
        this.slapActive = false ;
    }

    stopHurtChecker(){
        this.isHurt = false
        world.enemies.forEach(element => {
            if (this.isColliding(element)){
                this.isHurt = true;
            }
        });
    }

    checkBossDeath(){
        return this instanceof Endboss && !this.deadPlayed && this.currentImage >= this.Images_Dead.length;
    }

    setDeadObject(){
        this.deadPlayed = true;
        if (this instanceof JellyFish||this instanceof GreenFish || this instanceof RedFish || this instanceof OrangeFish)
            setTimeout(() => {this.finalyDestroy();}, 2500);
    }

    outOfFieldChecker(){
            if (this.x<-1000||this.y<-1000||this.y>1000 || this.x >20000){
                console.log(this);
                this.finalyDestroy();
            }
    }


    collisionObjects(){
        return this instanceof JellyFish|| this instanceof Character || this instanceof Bubble || this instanceof GreenFish || this instanceof RedFish || this instanceof Boss || this instanceof OrangeFish;
    }

    enemyLastDeadImg(){
        return this instanceof JellyFish && !this.deadPlayed || this instanceof RedFish && !this.deadPlayed || this instanceof GreenFish&& !this.deadPlayed || this instanceof OrangeFish && !this.deadPlayed;
    }
}
