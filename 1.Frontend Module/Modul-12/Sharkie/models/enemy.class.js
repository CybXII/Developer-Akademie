class Enemy extends MoveableObject{
    height = 50;
    width = 100;

    constructor(){
        super().loadImage('img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png')
        this.x = 250+Math.random()*450;
        this.y = 350*Math.random()
    }

    randomMove(){
        let number = 1*Math.random()*100;
        if (number>=0 && number<=20){
            moveLeft();
        }else if(number<20 && number>40){
            moveRight();
        }
    }
}