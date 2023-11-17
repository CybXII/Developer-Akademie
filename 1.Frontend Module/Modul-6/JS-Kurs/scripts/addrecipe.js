function addIngredient() {
    let name = document.getElementById('ingredients_new').value;
    let menge = document.getElementById('ingredients_amount').value;
    let unit = document.getElementById('ingredients_unit').value;
    let recipe = document.getElementById('recipenew').value;
    add_new_recipe_(name,menge,unit,)
}

function add_new_recipe_(menge,name,unit) {
        document.getElementById('newtable').innerHTML += `<tr><td id="unit">${menge}${unit}</td><td id="label">${name}</td></tr>`;
}
