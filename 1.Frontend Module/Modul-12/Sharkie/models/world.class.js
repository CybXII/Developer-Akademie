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
    ground = [
        new Ground('img/3. Background/Layers/2. Floor/D1.png' , 0,0,480,1001 ),
        new Ground('img/3. Background/Layers/2. Floor/D2.png', 1000, 0, 480,1001 ),
        new Ground('img/3. Background/Layers/2. Floor/D.png', 2000, 0, 480,2001 ),
        new Ground('img/3. Background/Layers/2. Floor/D1.png' ,4000,0,480,1001 ),
        new Ground('img/3. Background/Layers/2. Floor/D2.png', 5000, 0, 480,1001 ),
        new Ground('img/3. Background/Layers/2. Floor/D.png', 6000, 0, 480,2001 ),
    ]

    water = [
        new Ground('img/3. Background/Layers/5. Water/D1.png' , 0,0,480,1001 ),
        new Ground('img/3. Background/Layers/5. Water/D2.png' , 1000,0,480,1001 ),
        new Ground('img/3. Background/Layers/5. Water/D1.png' , 2000,0,480,1001 ),
        new Ground('img/3. Background/Layers/5. Water/D2.png' , 3000,0,480,1001 ),


    ]


    background = [
        new Background('img/3. Background/Layers/3.Fondo 1/D1.png', 0, 0, 480,1001 ),
        new Background('img/3. Background/Layers/3.Fondo 1/D2.png' , 1000,0,480,1001 ),
        new Background('img/3. Background/Layers/3.Fondo 1/D.png' , 2000,0,480,2001 ),
        new Background('img/3. Background/Layers/3.Fondo 1/D1.png', 4000, 0, 480,1001 ),
        new Background('img/3. Background/Layers/3.Fondo 1/D2.png' , 5000,0,480,1001 ),
        new Background('img/3. Background/Layers/3.Fondo 1/D.png' , 6000,0,480,2001 ),
    ]   

    farBackground = [
        new FarBackground('img/3. Background/Layers/4.Fondo 2/D1.png', -500, 0, 480,1001 ),
        new FarBackground('img/3. Background/Layers/4.Fondo 2/D2.png' , 500,0,480,1001 ),
        new FarBackground('img/3. Background/Layers/4.Fondo 2/D.png' , 2000,0,480,2001 ),
        new FarBackground('img/3. Background/Layers/4.Fondo 2/D1.png', 4000, 0, 480,1001 ),
        new FarBackground('img/3. Background/Layers/4.Fondo 2/D2.png' , 5000,0,480,1001 ),
        new FarBackground('img/3. Background/Layers/4.Fondo 2/D.png' , 6000,0,480,2001 ),
    ]   

    constructor(canvas){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
    }

    draw(){
        this.ctx.clearRect( 0, 0, this.canvas.width, this.canvas.height);
        this.addObjectsToMap(this.water);
        this.addObjectsToMap(this.farBackground);
        this.addObjectsToMap(this.background);
        this.addObjectsToMap(this.ground);
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
        // this.character.moveRight(5);
        this.ground.forEach(o => {
            o.moveLeft(5);
        });

        this.farBackground.forEach(o => {
            o.moveLeft(1.25);
        });

        this.water.forEach(o => {
            o.moveLeft(5);
        });

        this.background.forEach(o => {
            o.moveLeft(2.5);
        });

        this.enemies.forEach(o => {
            o.moveLeft(5);
        });
    }

    characterSwimUp(){
        this.character.moveUp(2.5);
    }

    characterSwimDown(){
        this.character.moveDown(2.5);
    }

    characterSwimLeft(){
        // this.character.moveRight(5);
        this.ground.forEach(o => {
            o.moveRight(5);
        });

        this.background.forEach(o => {
            o.moveRight(2.5);
        });

        this.farBackground.forEach(o => {
            o.moveRight(1.2);
        });

        this.enemies.forEach(o => {
            o.moveRight(5);
        });
    }

}