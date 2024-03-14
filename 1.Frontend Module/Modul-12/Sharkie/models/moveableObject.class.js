class MoveableObject{
    x = 120;
    y = 120;
    img;
    height= 150;
    width= 100;
    imageCache = {};
    speed = 0.15;

    swimRight;
    swimLeft;
    swimUp;
    swimDown;



    loadImage(path){
        this.img = new Image();
        this.img.src = path;
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

    movementLeft(speed){
        setInterval(() =>{
            if (this.swimLeft){
                this.x -= speed;
            }
        }, 1000/35)
    }
    
    moveLeft(speed){
        this.x -= speed;
    }
}