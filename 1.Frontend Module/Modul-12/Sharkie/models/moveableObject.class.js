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


    moveLeft(){
        this.x = this.x - 5;
    }

    moveRight() {
        this.x = this.x + 5;
    }

    moveUp(){
        this.y = this.y - 5;
    }

    moveDown() {
        this.y = this.y + 5;
    }

}