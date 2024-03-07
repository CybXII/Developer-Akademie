class Character extends MoveableObject{
    height= 200;
    width= 160;

    constructor(){
        super().loadImage('img/1.Sharkie/1.IDLE/1.png');
        this.x = 10;
        this.y = (440-200)*Math.random();
    }

    jump(){

    }
}