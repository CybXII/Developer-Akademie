let responseAsJson = ``;
let responseLength = 0;
let loadedPokemonNumber = 1;
let renderedPokemonNumber = 1;
let pokemonSpecies = [];
let pokemonAsJson =``; 
let maxRender = 50;
let fetchedPokemons = 0;

let fetchPokemons={
    'name':[],
    'id':[],
    'img':[],
    'type':[]
}

let pokemons= [];

let pokemonsUrl=[];

async function loadAPI(){
    let url = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=1400`;
    let response = await fetch(url);
    responseAsJson = await response.json();
    responseLength = responseAsJson['count']+1;
    await init();
    setTimeout((x) => {
        renderPokemon(renderedPokemonNumber);
}, 3000);
}


//Mein Code 
/*async function init(){
    for (let i = renderedPokemonNumber; i < responseLength; i++) {
        await loadPokemon(responseAsJson['results'][i-1],i-1);
        renderPokemon(loadedPokemonNumber)
        fetchedPokemons++
    }
}*/

//Mein Code 
/*async function loadPokemon(index,i){
    let pokemonUrl = await fetch(index.url);
    let pokemonAsJson = await pokemonUrl.json();
    let speciesFetch = await fetch(pokemonAsJson.species.url);
    let speciesAsJson = await speciesFetch.json();
    let names = speciesAsJson['names'][5]['name'];
    fetchPokemons.name.push(names);
}*/

//Mein Code von ChatGPT Optimiert
async function init(){
    const fetchPromises = [];

    for (let i = renderedPokemonNumber; i < responseLength; i++) {
        fetchPromises.push(loadPokemon(responseAsJson['results'][i-1], i-1));
    }

    await Promise.all(fetchPromises);
}

//Mein Code von ChatGPT Optimiert
async function loadPokemon(index, i){
    const pokemonUrl = await fetch(index.url);
    const pokemonAsJson = await pokemonUrl.json();
    const speciesFetch = await fetch(pokemonAsJson.species.url);
    const speciesAsJson = await speciesFetch.json();
    const names = speciesAsJson['names'][5]['name'];
    const imgs = await  pokemonAsJson.sprites.other["official-artwork"].front_default;
    const types = await  pokemonAsJson.types;
    fetchPokemons.name.push(names);
    fetchPokemons.id.push(i+1);
    fetchPokemons.img.push(imgs);
    fetchPokemons.type.push(types);
}


function loadMore(){
        maxRender= maxRender+25;
        console.log(loadedPokemonNumber+25)
        console.log(renderedPokemonNumber+25)
        renderPokemon(renderedPokemonNumber);
}


function renderPokemon(input){
    for (let i = input; i < maxRender; i++ & renderedPokemonNumber++) {
        renderCard(i);
        renderType(i);
    }

}


function renderType(index){    
    let pokemonIndex = fetchPokemons['id'].indexOf(index)
    let img = document.getElementById(`img${pokemonIndex}`)
    let imgs = fetchPokemons['img'][pokemonIndex];
    let typeLength = fetchPokemons['type'][pokemonIndex].length;
    img.setAttribute(`src`,`${imgs}`)
    for (let j = 0; j < typeLength; j++) {
        let pokeType =  fetchPokemons['type'][pokemonIndex][j]['type']['name'];
        document.getElementById(`type${pokemonIndex}`).innerHTML +=`
        <p>${pokeType}</p>
        `;
    }
}


function renderCard(index){
    let pokemonIndex = fetchPokemons['id'].indexOf(index)
    let card = document.getElementById('pokedex_screen');
    let pokeName = fetchPokemons['name'][pokemonIndex];
    card.innerHTML += `
    <div class="card">
        <img id="img${pokemonIndex}" src="" class="card-img-top" alt="${pokeName}">
        <div class="card-body">
            <h2 class="card-text">${pokeName}</h2>
            <div class="types" id="type${pokemonIndex}"></div>
        </div>
    </div>
    `;
}