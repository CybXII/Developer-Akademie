let responseAsJson = ``;
let responseLength = 0;
let loadPokemonNumber = 0;

async function loadAPI(index){
    let url = `https://pokeapi.co/api/v2/pokemon?offset=${index}&limit=60`;
    let response = await fetch(url);
    responseAsJson = await response.json();
    console.log(responseAsJson);
    responseLength = responseAsJson['count'];
    renderScreenInfos()
}

function renderScreenInfos(){
    let responseLength = responseAsJson['count']
    let test= [];
    for (let i = 0; i < responseLength ; i++) {
        test = [(responseAsJson['results'][i]['name'])];
        console.log(test);
        document.getElementById('pokedex_screen').innerHTML += `<div>${test}\n</div>`;
    }
}

function loadMore(){
    let index =  loadPokemonNumber + 20;
    loadAPI(index)
}


