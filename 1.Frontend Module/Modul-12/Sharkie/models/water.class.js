class Water extends MoveableObject{
    x = 0;
    y = 0;
    height = 480;
    width = 2000;
    speed = 0.3;
    
    constructor(imagePath, x, y,height,width,speed){
        super().loadImage(imagePath, x, y)
        this.x = x;
        this.y = 480 - this.height;
        this.height = height;
        this.width = width;
        this.animate();
        this.speed = speed;
    }

    animate(){
        this.moveLeft(this.speed);
    }
}