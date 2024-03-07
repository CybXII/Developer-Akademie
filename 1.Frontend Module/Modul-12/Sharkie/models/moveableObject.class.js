class MoveableObject{
    x = 120;
    y = 120;
    img;
    height= 150;
    width= 100;

    // constructor(x,y) {
    //     this.x = x
    //     this.y = y
    // }

    loadImage(path){
        this.img = new Image();
        this.img.src = path;
    }

    moveLeft(speed){
        this.x = this.x - speed;
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

}