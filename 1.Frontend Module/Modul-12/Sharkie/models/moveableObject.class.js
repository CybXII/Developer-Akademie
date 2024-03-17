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

    swimRight;
    swimLeft;
    swimUp;
    swimDown;

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
            this.y += this.speedY;
            this.speedY += this.acceleration;
        },1000/25);
    }

    movementLeft(speed){
        setInterval(() =>{
            if (this.swimLeft){
                this.x -= speed;
            }
        }, 1000/35)
    }

    movementRight(speed){
        setInterval(() =>{
            if (this.swimRight){
                this.x += speed;
            }
        }, 1000/35)
    }

    movementUp(speed){
        setInterval(() =>{
            if (this.swimUp){
                this.y -= speed;
            }
        }, 1000/35)
    }

    movementDown(speed){
        setInterval(() =>{
            if (this.swimDown){
                this.y += speed;
            }
        }, 1000/35)
    }

    destroyObject(){
        if (distance>-600){

        }
    }
}