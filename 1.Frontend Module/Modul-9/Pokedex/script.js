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
    responseLength = responseAsJson['count'];
    init();
}

async function init(){
    for (let i = renderedPokemonNumber; i < responseLength; i++) {
        await loadPokemon(responseAsJson['results'][i-1],i-1);
        renderPokemon(loadedPokemonNumber)
        fetchedPokemons++
    }
}


async function loadPokemon(index,i){
    let pokemonUrl = await fetch(index.url);
    let pokemonAsJson = await pokemonUrl.json();
    let speciesFetch = await fetch(pokemonAsJson.species.url);
    let speciesAsJson = await speciesFetch.json();
    pokemonsUrl.push(pokemonUrl);
    pokemonSpecies.push(speciesAsJson);
    let names = speciesAsJson['names'][5]['name'];
    fetchPokemons.name.push(names);
    fetchPokemons.id.push(i+1);
/*    let imgs = pokemonAsJson['sprites']['other']['official-artwork']['front_default'];
    let types = pokemonAsJson['types'];
    fetchPokemons.img.push(imgs);
    fetchPokemons.type.push(types);
*/
}


async function testFetch(pokemonUrl){
    let responseUrl = await fetch(pokemonUrl);
    return responseUrl
}


async function loadSpecies(index){
    let PokemonSpeciesName = index.species.url;
    pokemonSpecies.push(PokemonSpeciesName[5]['name'])
}


function renderScreenInfos(){   
    renderPokemon();
}


async function loadMore(){
 maxRender= maxRender+25;
 console.log(loadedPokemonNumber+25)
 console.log(renderedPokemonNumber+25)
 renderPokemon(loadedPokemonNumber);
}


function renderPokemon(input){
    if (fetchedPokemons>loadedPokemonNumber+50 && maxRender+50){
        for (let i = input; loadedPokemonNumber < maxRender; i++) {
            renderCard(i);
            loadedPokemonNumber++ 
        }
    }else {
        setTimeout((x) => {
            renderPokemon(input)
        }, 5000);
     }
}


async function fetchImg(index){
    let pokemonUrl = await fetch(responseAsJson['results'][index-1].url);
    let pokemonAsJson = await pokemonUrl.json();
    let imgs = await  pokemonAsJson.sprites.other["official-artwork"].front_default;
    let types = await pokemonAsJson['types'];
    let img = document.getElementById(`img${index-1}`);
    let typeLength = pokemonAsJson['types'].length
    img.setAttribute(`src`,`${imgs}`)
    for (let j = 0; j < typeLength; j++) {
        let pokeType =  types[j]['type']['name'];
        document.getElementById(`type${index-1}`).innerHTML +=`
        <p>${pokeType}</p>
        `;
    }
}


function renderCard(index){
    let card = document.getElementById('pokedex_screen');
    let pokeName = fetchPokemons['name'][index-1];
    let pokeImg = fetchPokemons['img'][index-1];
    renderedPokemonNumber = renderedPokemonNumber+1;
    card.innerHTML += `
    <div class="card">
        <img id="img${index-1}" src="" class="card-img-top" alt="${pokeName}">
        <div class="card-body">
            <h2 class="card-text">${pokeName}</h2>
            <div class="types" id="type${index-1}"></div>
        </div>
    </div>
    `;
    fetchImg(index);
}