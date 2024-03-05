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
    ground = new Ground();

    constructor(canvas){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
    }

    draw(){
        this.ctx.clearRect( 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.ground.img,this.ground.x,this.ground.y,this.ground.width, this.ground.height);
        this.ctx.drawImage(this.character.img,this.character.x,this.character.y,this.character.width, this.character.height);
        this.enemies.forEach(enemys => {
            this.ctx.drawImage(enemys.img, enemys.x,enemys.y, enemys.width, enemys.height)
        });
        
        // calls Draw 
        let self = this;
        requestAnimationFrame(function(){
            self.draw();
        });
    }
}