class Enemy extends MoveableObject{
    height = 50;
    width = 100;
    Images_Walking =[
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim2.png',        
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim4.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim5.png',
    ]
    speed = Math.random()*2;
    destroy = false;
    currentImage = 0;
    id;
    distance;
    world;

    endpoint = -300

    constructor(id,characterX){
        super().loadImage('img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png');
        this.loadImages(this.Images_Walking);
        this.x = characterX+700+Math.random()*10;
        this.y = 350*Math.random();
        this.speed = 3+Math.random()* 2;
        this.id = id
        this.enemieAnimate();
    }

    randomMove(){
        let number = 1*Math.random()*100;
        if (number>=0 && number<=20){
            movementLeft();
        }else if(number<20 && number>40){
            movementRight();
        }
    }

    enemieAnimate(){
            this.swimLeft = true;
            this.movementLeft(this.speed);
            setInterval(() =>{
                this.playAnimation(this.Images_Walking)
                this.destroyObject();
            }, 100)    
    }

    destroyObject(){
        this.distance = this.x - world.character.x
            if(this.distance<= [this.endpoint-this.endpoint]){
                this.destroy = true;
            }
            if(this.destroy== true){
                
                // world.enemies.splice(indexOf(`${this.ID}`),0)
                this.destroy = false;
            }
    }
}