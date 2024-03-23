class World{
    character = new Character(2.5);
    enemies = [];
    boss = new Endboss();
    bubbels =[];
    gameOver
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
        this.checkCollisions();
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
        this.addObjectsToMap(this.bubbels);
        this.addToMap(this.boss);
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x,0);
        let self = this;
        requestAnimationFrame(function(){
            self.draw();
        });
    }

    createBubble(){
        this.bubbels = new Bubble;
    }



    addObjectsToMap(objects){
        objects.forEach(o =>{
            this.addToMap(o);
        })
    }

    addToMap(mo){
        if(mo.otherDirection){
            this.ctx.save();
            this.flipImage(mo);        
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx)
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
                let generateEnemie = new GreenFish(i,this.character.x);
                this.enemies.push(generateEnemie);
                generateEnemie = new RedFish(i,this.character.x);
                this.enemies.push(generateEnemie);
                generateEnemie = new OrangeFish(i,this.character.x);
                this.enemies.push(generateEnemie);
            }
    }

    checkCollisions(){
        setInterval(() => {
            if(this.character.bossStage){
                    if(this.character.isColliding(this.boss)){
                        console.log('Collision with Character ', this.boss)
                    }
            } else{
                this.enemies.forEach(enemy => {
                    if (world.bubbels.length != 0){
                        this.bubbels.forEach(bubble => {
                            if (bubble.isColliding(enemy)){
                                enemy.isDead=true;
                                bubble.finalyDestroy()
                                console.log('Collision with bubble ', enemy)
                            }
                        }); 
                    }
                    if(this.character.isColliding(enemy)){
                        if (enemy instanceof GreenFish|| enemy instanceof RedFish|| enemy instanceof OrangeFish){
                            this.character.isHurt = true;
                            this.character.isPoisoned = true;
                        }
                    }
                });    
            }
        }, 100);
    }
}

