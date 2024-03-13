class World{
    character = new Character(2.5);
    enemies = [
        new Enemy(),
        new Enemy(),
        new Enemy(),
        new Enemy()
    ];
    canvas;
    ctx;
    camera_x = 0
    ground = [
        new Ground('img/3. Background/Layers/2. Floor/D1.png' , 0,0,480,1001 ),
        new Ground('img/3. Background/Layers/2. Floor/D2.png', 1000, 0, 480,1001 ),
        new Ground('img/3. Background/Layers/2. Floor/D.png', 2000, 0, 480,2001 ),
        new Ground('img/3. Background/Layers/2. Floor/D1.png' ,4000,0,480,1001 ),
        new Ground('img/3. Background/Layers/2. Floor/D2.png', 5000, 0, 480,1001 ),
        new Ground('img/3. Background/Layers/2. Floor/D.png', 6000, 0, 480,2001 )
    ]

    water = [
        new Water('img/3. Background/Layers/5. Water/D1.png' , 0,0,480,1001 ),
        new Water('img/3. Background/Layers/5. Water/D2.png' , 1000,0,480,1001 ),
        new Water('img/3. Background/Layers/5. Water/D1.png' , 2000,0,480,1001 ),
        new Water('img/3. Background/Layers/5. Water/D2.png' , 3000,0,480,1001 )
    ]


    background = [
        new Background('img/3. Background/Layers/3.Fondo 1/D1.png', 0, 0, 480,1001 ),
        new Background('img/3. Background/Layers/3.Fondo 1/D2.png' , 1000,0,480,1001 ),
        new Background('img/3. Background/Layers/3.Fondo 1/D.png' , 2000,0,480,2001 ),
        new Background('img/3. Background/Layers/3.Fondo 1/D1.png', 4000, 0, 480,1001 ),
        new Background('img/3. Background/Layers/3.Fondo 1/D2.png' , 5000,0,480,1001 ),
        new Background('img/3. Background/Layers/3.Fondo 1/D.png' , 6000,0,480,2001 )
    ]   

    farBackground = [
        new FarBackground('img/3. Background/Layers/4.Fondo 2/D1.png', -500, 0, 480,1001 ),
        new FarBackground('img/3. Background/Layers/4.Fondo 2/D2.png' , 500,0,480,1001 ),
        new FarBackground('img/3. Background/Layers/4.Fondo 2/D.png' , 2000,0,480,2001 ),
        new FarBackground('img/3. Background/Layers/4.Fondo 2/D1.png', 4000, 0, 480,1001 ),
        new FarBackground('img/3. Background/Layers/4.Fondo 2/D2.png' , 5000,0,480,1001 ),
        new FarBackground('img/3. Background/Layers/4.Fondo 2/D.png' , 6000,0,480,2001 )
    ]   

    constructor(canvas, keyboard){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
    }

    setWorld(){
        this.character.world = this;
    }


    draw(){
        this.ctx.clearRect( 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0)
        this.addObjectsToMap(this.water);
        this.addObjectsToMap(this.farBackground);
        this.addObjectsToMap(this.background);
        this.addObjectsToMap(this.ground);
        this.addObjectsToMap(this.enemies);
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x,0)
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
        this.ground.forEach(o => {
            o.movementLeft(2);
        });

        this.farBackground.forEach(o => {
            o.movementLeft(1);
        });



        this.background.forEach(o => {
            o.movementLeft(1.5);
        });

        this.enemies.forEach(o => {
            o.movementLeft(0.02);
        });
}

    characterSwimLeft(){
        this.otherDirection = true;
        this.ground.forEach(o => {
            o.moveRight(2);
        });

        this.background.forEach(o => {
            o.moveRight(1.5);
        });

        this.farBackground.forEach(o => {
            o.moveRight(1);
        });

        this.enemies.forEach(o => {
            o.moveRight(0.02);
        });
    }

    flipImage(mo){
        this.ctx.translate(mo.img.width-640, 0);
        this.ctx.scale(-1,1);
        mo.x = mo.x * -1
    }

    flipImageBack(mo){
        mo.x = mo.x * -1
        this.ctx.restore();
    }
}

