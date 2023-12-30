let responseAsJson = ``;
let responseLength = 0;
let maxPokemonRender = 20;
let loadPokemonNumber = 1;
let pokemons =[];

async function loadAPI(index){
    let url = `https://pokeapi.co/api/v2/pokemon?offset=${index}&limit=1400`;
    let response = await fetch(url);
    responseAsJson = await response.json();
    responseLength = responseAsJson['count'];
    loadPokemon(1);
    renderScreenInfos();
}

async function loadPokemon(index){
    let urlPokemon = `https://pokeapi.co/api/v2/pokemon/${index}`;
    let pokemon = await fetch(urlPokemon);
    pokemonAsJson = await pokemon.json();
        pokemons.push(pokemonAsJson)
}

async function renderScreenInfos(){
    renderPokemon(loadPokemonNumber)
}

function loadMore(){
    let index =  loadPokemonNumber + 20;
    loadPokemonNumber = index;
    maxPokemonRender = maxPokemonRender+20
    renderPokemon(loadPokemonNumber)
}

async function renderPokemon(loadPokemonNumber){
    let card = document.getElementById('pokedex_screen');
    let pokeName=``;
    let pokeImg=``;

    for (let i = loadPokemonNumber; i < maxPokemonRender && responseLength ; i++) {
        await loadPokemon(i);
        pokeName = [(responseAsJson['results'][i-1]['name'])];
        pokeImg = pokemonAsJson['sprites']['other']["official-artwork"]["front_default"];
        let pokeTypeLength = pokemonAsJson['types'].length;
        renderCard(card,pokeName,pokeImg,i)
        for (let j = 0; j < pokeTypeLength; j++) {
            let pokeType = pokemonAsJson['types'][j]['type']['name'];
            renderType(pokeType,i);
        }
    }
}

function renderType(pokeType,i){
    let type = document.getElementById(`type${i}`);
    type.innerHTML +=`
    <p>${pokeType}</p>
    `;
}

function renderCard(card,pokeName,pokeImg,i){
    card.innerHTML += `
    <div class="card">
        <img src="${pokeImg}" class="card-img-top" alt="${pokeName}">
        <div class="card-body">
            <h2 class="card-text">${pokeName}</h2>
            <div id="type${i}"></div>
        </div>
    </div>
    `;
}


