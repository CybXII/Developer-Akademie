function loadrecip(){
    addIngredient1();
    addIngredient2();
    addIngredient3();
}

function addIngredient1() {
    let menge = '250ml';
    let name = 'Eier';
    writeIngredient(menge,name)
}
function addIngredient2() {
    let menge = '2EL';
    let name = 'Zucker';
    writeIngredient(menge,name)
}
function addIngredient3() {
    let menge = '150g';
    let name = 'Mehl';
    writeIngredient(menge,name)
}

function writeIngredient(menge,name){
    document.getElementById('table').innerHTML += `<tr><td id="unit">${menge}</td><td id="label">${name}</td></tr>`;
}