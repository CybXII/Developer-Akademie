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

    draw(ctx){
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        }
    

    drawFrame(ctx){
        if( this instanceof Character || this instanceof Endboss|| this instanceof Enemy){
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
        this.distance = this.x - world.character.x
        if(this.distance<= this.endpoint-world.character.x){
            if (this instanceof Enemy){
                let found = world.enemies.find((element) => element.id == this.id);
                if (found){
                    let isID = (element) => element.id == this.id;
                    world.enemies.splice(`${world.enemies.findIndex(isID)}`,1)
                    this.destroy = true;
                    clearInterval(this.intervalId);
                    this.intervalId= null;        
                }
            }
            }
    }

    isColliding(obj) {
        if(this instanceof Character||this instanceof Enemy|| this instanceof Boss){
            let x = this.x+this.offsetX;
            let width = this.width-this.offsetXMinus;
            let y = this.y+this.offsetY;
            let height = this.height-this.offsetYMinus
            return (x + width) >= obj.x+obj.offsetX && x <= (obj.x + obj.width-obj.offsetXMinus) && 
            (y + height) >= obj.y+obj.offsetY &&
            (y) <= (obj.y+obj.offsetY + obj.height-obj.offsetYMinus)
            // (this.x + this.width) >= obj.x && this.x <= (obj.x + obj.width) && 
            // (this.y + this.offsetY + this.height) >= obj.y &&
            // (this.y + this.offsetY) <= (obj.y + obj.height) && 
            // obj.onCollisionCourse; // Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.
        }
        
    }

}