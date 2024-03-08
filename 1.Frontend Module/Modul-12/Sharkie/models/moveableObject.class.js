class MoveableObject{
    x = 120;
    y = 120;
    img;
    height= 150;
    width= 100;
    imageCache = {};
    speed = 0.15;

    // constructor(x,y) {
    //     this.x = x
    //     this.y = y
    // }

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
        this.x = this.x + this.speedspeed;
    }

    moveUp(speed){
        this.y = this.y - this.speedspeed;
    }

    moveDown(speed) {
        this.y = this.y + this.speedspeed;
    }

    moveLeft(){
        setInterval(() =>{
            this.x -= this.speed;
        }, 1000/60)
    }

}