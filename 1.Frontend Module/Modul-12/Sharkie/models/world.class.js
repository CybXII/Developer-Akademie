class World{
    character = new Character(2.5);
    enemies = [
    ];
    boss = new Endboss();

    canvas;
    ctx;
    camera_x = 0
    level = level1;

    constructor(canvas, keyboard){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.generateEnemies();
    }

    enemyIntervalID=[];

    setWorld(){
        this.character.world = this;
    }

    draw(){
        this.ctx.clearRect( 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0)
        this.addObjectsToMap(this.level.water);
        this.addObjectsToMap(this.level.farBackground);
        this.addObjectsToMap(this.level.background);
        this.addObjectsToMap(this.level.ground);
        this.addObjectsToMap(this.enemies);
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x,0);
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
        this.ctx.save();
        if(mo.otherDirection){
            this.flipImage(mo);        
        }
        this.ctx.drawImage(mo.img, mo.x,mo.y, mo.width, mo.height);
        if(mo.otherDirection){
            this.flipImageBack(mo)
        }
    }

    characterSwimRight(){
        this.level.ground.forEach(o => {
            o.moveLeft(2);
        });

        this.level.farBackground.forEach(o => {
            o.moveLeft(1);
        });

        this.level.background.forEach(o => {
            o.moveLeft(1.5);
        });

        this.enemies.forEach(o => {
            o.moveLeft(0.02);
        });
    }

    characterSwimLeft(){
        this.otherDirection = true;
        this.level.ground.forEach(o => {
            o.moveRight(2);
        });

        this.level.background.forEach(o => {
            o.moveRight(1.5);
        });

        this.level.farBackground.forEach(o => {
            o.moveRight(1);
        });

        this.enemies.forEach(o => {
            o.moveRight(0.02);
        });
    }

    flipImage(mo){
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1,1);
        mo.x = mo.x * -1
    }

    flipImageBack(mo){
        mo.x = mo.x * -1
        this.ctx.restore();
    }

    generateEnemies(){
        let newEnemies = 1+Math.random()* 5;
        for (let i = 0; i < newEnemies; i++) {
            let generateEnemie = new Enemy(i,this.character.x);
            this.enemies.push(generateEnemie, )      
        }
    }
}

