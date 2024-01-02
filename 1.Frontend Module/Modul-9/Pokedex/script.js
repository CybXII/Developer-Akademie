let responseAsJson = ``;
let responseLength = 0;
let maxPokemonRender = 21;
let loadedPokemonNumber = 1;
let renderedPokemonNumber = 1;
let pokemonSpeciesAsJson = ``;
let pokemonAsJson =``; 


async function loadAPI(){
    let url = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=1400`;
    let response = await fetch(url);
    responseAsJson = await response.json();
    responseLength = responseAsJson['count'];
    renderScreenInfos()
}


async function loadPokemon(index){
        let urlPokemon = `https://pokeapi.co/api/v2/pokemon/${index}`;
        let pokemon = await fetch(urlPokemon);
        pokemonAsJson = await pokemon.json();
}


async function loadSpecies(index){
        let urlPokemonSpecies = `https://pokeapi.co/api/v2/pokemon-species/${index}`;
        let pokemonsSpecies = await fetch(urlPokemonSpecies);
        pokemonSpeciesAsJson = await pokemonsSpecies.json();
}


function renderScreenInfos(){    
    renderPokemon(renderedPokemonNumber);
}


function loadMore(){
    maxPokemonRender = maxPokemonRender+10
    renderPokemon(renderedPokemonNumber)
}


async function renderPokemon(renderedPokemonNumber){
    for (let i = renderedPokemonNumber; i < maxPokemonRender && responseLength ; i++) {
       await renderCard(i);
       await renderType(i);
       renderedPokemonNumber = renderedPokemonNumber+1;
    }
}


async function renderType(index){
    await loadPokemon(index);
    let pokeTypeLength = pokemonAsJson['types'].length;
    for (let j = 0; j < pokeTypeLength; j++) {
        let pokeType =  pokemonAsJson['types'][j]['type']['name'];
        document.getElementById(`type${index}`).innerHTML +=`
        <p>${pokeType}</p>
        `;
    }
}


async function renderCard(index){
    await loadPokemon(index);
    await loadSpecies(index);
    let card = document.getElementById('pokedex_screen');
    let pokeName = pokemonSpeciesAsJson['names'][5]['name'];
    let pokeImg = pokemonAsJson['sprites']['other']["official-artwork"]["front_default"];
    renderedPokemonNumber = renderedPokemonNumber+1;
    card.innerHTML += `
    <div class="card">
        <img src="${pokeImg}" class="card-img-top" alt="${pokeName}">
        <div class="card-body">
            <h2 class="card-text">${pokeName}</h2>
            <div class="types" id="type${index}"></div>
        </div>
    </div>
    `;
}