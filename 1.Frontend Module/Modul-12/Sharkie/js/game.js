let canvas;
let ctx;
let world;
let KeyD = false;
let KeyS = false;
let KeyA = false;
let KeyW = false;

window.addEventListener("keydown", (event) => {
    if (event.key === 'd' || event.key === 'ArrowRight') {    
        KeyD = true;
    } else if (event.key === 'a' || event.key === 'ArrowLeft') {    
        KeyA = true;
    } else if (event.key === 'w' || event.key === 'ArrowUp') {  
        KeyW = true;
    } else if (event.key === 's' || event.key === 'ArrowDown') {    
        KeyS = true;
    }
    moveKeyDirection(event);
});

window.addEventListener("keyup", (event) => {
    resetKey(event);
});

function moveKeyDirection(event) {
    if (KeyD) {  
        if (KeyW) {
            setTimeout(moveSharkieRightUp, 100);
        } if (KeyS) {
            setTimeout(moveSharkieRightDown, 100);
        } else {
            setTimeout(moveSharkieRight, 100);
        }
    } else if (KeyA) {
        if (KeyW) {
            setTimeout(moveSharkieLeftUp, 100);
        } else if (KeyS) {
            setTimeout(moveSharkieLeftDown, 100);
        } else {
            setTimeout(moveSharkieLeft, 100);
        }
    }
    else if (KeyS) {  
        if (KeyD) {
            setTimeout(moveSharkieRightDown, 100);
        } else {
            setTimeout(moveSharkieDown, 100);
        }
    } else if (KeyW) {
        if (KeyD) {
            setTimeout(moveSharkieRightUp, 100);
        } else if (KeyA) {
            setTimeout(moveSharkieLeftUp, 100);
        } else {
            setTimeout(moveSharkieLeft, 100);
        }
    }

}

function resetKey(event) {
    if (event.key === 'd' || event.key === 'ArrowRight') {  
        KeyD = false;
    } else if (event.key === 'a' || event.key === 'ArrowLeft') {    
        KeyA = false;
    } else if (event.key === 's' || event.key === 'ArrowDown') {    
        KeyS = false;
    } else if (event.key === 'w' || event.key === 'ArrowUp') {    
        KeyW = false;
    }
}

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas)
}

function moveSharkieRight() {
    clearTimeout(moveSharkieRightUp);
    clearTimeout(moveSharkieRightDown);
    world.characterSwimRight();
}

function moveSharkieRightUp() {
    world.characterSwimRight();
    world.characterSwimUp();
    if(KeyD == false || KeyA == false){
        clearTimeout(moveSharkieRightUp)
        moveKeyDirection()
    }

}

function moveSharkieRightDown(event) {
    if(KeyD == false || KeyS == false){
        clearTimeout(moveSharkieRightDown)
        moveKeyDirection()
        resetKey(event)
    }
    world.characterSwimRight();
    world.characterSwimDown();
}

function moveSharkieLeft() {
    world.characterSwimLeft();
}

function moveSharkieLeftUp() {
    world.characterSwimLeft();
    world.characterSwimUp();
    if(KeyA == false || KeyW == false){
        clearTimeout(moveSharkieLeftUp)
        moveKeyDirection()
    }
}

function moveSharkieLeftDown() {
    world.characterSwimLeftDown();
    world.characterSwimUp();
    if(KeyA == false || KeyS == false){
        clearTimeout(moveSharkieLeftDown)
        moveKeyDirection()
    }
}

function moveSharkieUp() {
    world.characterSwimUp();
}

function moveSharkieDown() {
    world.characterSwimDown();
}
