let canvas;
let ctx;
let keyboard = new Keyboard();
let world;

window.addEventListener("keydown", (event) => {
    if (event.key === 'd' || event.key === 'ArrowRight') {    
        keyboard.RIGHT = true;
    } else if (event.key === 'a' || event.key === 'ArrowLeft') {    
        keyboard.LEFT = true;
    } else if (event.key === 'w' || event.key === 'ArrowUp') {  
        keyboard.UP = true;
    } else if (event.key === 's' || event.key === 'ArrowDown') {    
        keyboard.DOWN = true;
    }
});

window.addEventListener("keyup", (event) => {
    console.log(event.key+'Reset')
    resetKey(event);
});

function resetKey(event) {
    if (event.key === 'd' || event.key === 'ArrowRight') {  
        keyboard.RIGHT = false;
    } else if (event.key === 'a' || event.key === 'ArrowLeft') {    
        keyboard.LEFT = false;
    } else if (event.key === 's' || event.key === 'ArrowDown') {    
        keyboard.DOWN = false;
    } else if (event.key === 'w' || event.key === 'ArrowUp') {    
        keyboard.UP = false;
    }
}

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas,keyboard)
}