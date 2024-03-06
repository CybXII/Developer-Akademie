class World{
    character = new Character();
    enemies = [
        new Enemy(),
        new Enemy(),
        new Enemy(),
        new Enemy()
    ];
    canvas;
    ctx;
    background = [
        new Background('img/3. Background/Layers/2. Floor/D1.png' , 0,0,480,1000 ),
        new Background('img/3. Background/Layers/2. Floor/D2.png', 1000, 0, 480,1000 ),
    ]
    constructor(canvas){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
    }

    draw(){
        this.ctx.clearRect( 0, 0, this.canvas.width, this.canvas.height);
        this.addObjectsToMap(this.background);
        this.addObjectsToMap(this.enemies);
        this.addToMap(this.character);

        // calls Draw 
        let self = this;
        requestAnimationFrame(function(){
            self.draw();
        });
    }

    addObjectsToMap(objects){
        objects.forEach(o =>{
            this.addToMap(o);
        })
    }

    addToMap(mo){
        this.ctx.drawImage(mo.img, mo.x,mo.y, mo.width, mo.height)
    }

    characterSwimRight(){
        this.character.moveRight();
        this.background.forEach(o => {
            o.moveLeft();
        });
        this.enemies.forEach(o => {
            o.moveLeft();
        });
    }

    characterSwimUp(){
        this.character.moveUp();
    }

    characterSwimDown(){
        this.character.moveDown();
    }
}