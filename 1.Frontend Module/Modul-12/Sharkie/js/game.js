let canvas;
let ctx;
let world;
let right = false;
let left = false;
let down = false;
let up = false;
let space = false;
let keyboard = new Keyboard();

window.addEventListener("keydown", (event) => {
    if (event.key === 'd' || event.key === 'ArrowRight') {    
        right = true;
    } else if (event.key === 'a' || event.key === 'ArrowLeft') {    
        left = true;
    } else if (event.key === 'w' || event.key === 'ArrowUp') {  
        up = true;
    } else if (event.key === 's' || event.key === 'ArrowDown') {    
        down = true;
    }
    setKeyboard();
});

window.addEventListener("keyup", (event) => {
    resetKey(event);
});

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
    setKeyboard();
}

function setKeyboard(){
    keyboard.push(right,left,down,up,space);
}


function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas)
}

