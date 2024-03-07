let canvas;
let ctx;
let world;

window.addEventListener("keydown", (event) => {
    if (event.isComposing || event.keyCode === 68) {
    return;
    }
    moveSharkieRight ()
})

function init(){

    canvas = document.getElementById('canvas');
    world = new World(canvas)

    console.log('My Character is', world.character)
}


function moveSharkieRight (){
    world.characterSwimRight();
}