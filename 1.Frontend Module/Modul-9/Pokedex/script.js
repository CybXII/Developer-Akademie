let responseAsJson;
let responseLength = 0;
let loadedPokemonNumber = 1;
let renderedPokemonNumber = 1;
let pokemonSpecies = [];
let pokemonAsJson; 
let maxRender = 75;
let pokemons= [];
let pokemonsUrl=[];

let fetchPokemons={
    'name':[],
    'id':[],
    'img':[],
    'type':[]
}
/*async function loadAPI() {
    let url = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=1400`;
    let response = await fetch(url);
    responseAsJson = await response.json();
    responseLength = responseAsJson['count'] + 1;

    // Versuche die init-Funktion auszuführen
    try {
        await init();
        // Überprüfe, ob alle Daten korrekt geladen wurden
        if (
            fetchPokemons['name'].length !== responseLength - 1 ||
            fetchPokemons['id'].length !== responseLength - 1 ||
            fetchPokemons['img'].length !== responseLength - 1 ||
            fetchPokemons['type'].length !== responseLength - 1
        ) {
            throw new Error('Daten nicht vollständig geladen.');
        }
        else {
                    // Wenn die Daten korrekt geladen wurden, warte 2 Sekunden und rufe renderPokemon auf
        setTimeout(() => {
            renderPokemon(renderedPokemonNumber);
        }, 2000);
        }
    } 
    catch (x) {
        // Wenn ein Fehler auftritt (Daten nicht vollständig geladen), rufe loadAPI erneut auf
        fetchPokemons = {
            'name': [],
            'id': [],
            'img': [],
            'type': []
        };        
        loadAPI();
    }
}*/


async function loadAPI() {
    let url = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=1400`;
    let response = await fetch(url);
    responseAsJson = await response.json();
    responseLength = responseAsJson['count'] -289;
    const fetchPromises = [];
    fetchPromises.push(await init());
    await Promise.all(fetchPromises);
    stoploadingBar();
}


//Mein alter Code 
/*async function init(){
    for (let i = renderedPokemonNumber; i < responseLength; i++) {
        await loadPokemon(responseAsJson['results'][i-1],i-1);
        renderPokemon(loadedPokemonNumber)
        fetchedPokemons++
    }
}*/
//Mein Code von ChatGPT Optimiert
async function init() {
    const batchSize = 100;
    for (let i = renderedPokemonNumber; i < responseLength; i += batchSize) {
        const batchPromises = [];
        // Lade 50 Pokemon asynchron
        for (let j = 0; j < batchSize && i + j < responseLength; j++) {
            batchPromises.push(loadPokemon(responseAsJson['results'][i + j - 1], i + j - 1));
        }
        // Warte, bis alle 50 Pokemon geladen sind
        await Promise.all(batchPromises);
        // Warte 10 ms, bevor der nächste Batch geladen wird
        await new Promise((resolve) => setTimeout(resolve, 10));
        if(fetchPokemons['name'].length>50){
            renderPokemon(renderedPokemonNumber)
            stopLoadingScreen();
        }
    }
}


function stopLoadingScreen(){
    document.getElementById('loading_screen').classList.remove(`screen_loader`);
}

function stoploadingBar(){
    document.getElementById('loading_process').classList.remove(`loader`);
    document.getElementById('loading_process').classList.add(`loader_stop`);
}

//Mein Code von ChatGPT Optimiert
/*async function init(){
    const fetchPromises = [];
    for (let i = renderedPokemonNumber; i < responseLength; i++) {
        fetchPromises.push(loadPokemon(responseAsJson['results'][i-1], i-1));
    }
    await Promise.all(fetchPromises);
}*/
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


//Mein alter Code 
/*async function loadPokemon(index,i){
    let pokemonUrl = await fetch(index.url);
    let pokemonAsJson = await pokemonUrl.json();
    let speciesFetch = await fetch(pokemonAsJson.species.url);
    let speciesAsJson = await speciesFetch.json();
    let names = speciesAsJson['names'][5]['name'];
    fetchPokemons.name.push(names);
}*/
//Mein Code von ChatGPT Optimiert
function loadMore(){
        maxRender= maxRender+100;
        if (maxRender< responseLength){
            renderPokemon(renderedPokemonNumber);
        } else{
            maxRender=responseLength
            document.getElementById('pokedex_screen').setAttribute('onscroll','')
            document.getElementById('pokedex_screen').setAttribute('onscroll','')
            renderPokemon(renderedPokemonNumber)
        }
}


function renderPokemon(input){
    for (let i = input; i < maxRender; i++ & renderedPokemonNumber++) {
        renderCard(i);
        renderType(i);
        }
}


function openCard(index){
    showPokemonCard(index);
    fillCardInfos(index);
    stopLoadingScreen();
}


function showCards(){
    hideBigCard();
    for (let i = 1; i < renderedPokemonNumber; i++) {
        const id = i;
        document.getElementById(`card${id}`).classList.remove('d_none');
        document.getElementById(`card${id}`).classList.remove('card_closed');
    }
}


function hideCards(){
            document.getElementById(`pokemonCard`).classList.remove('d_none');
}


function showPokemonCard(index){
    let pokemonIndex = fetchPokemons['id'].indexOf(index)
    let card = document.getElementById('pokemonCard');
    let img = fetchPokemons['img'][pokemonIndex]
    let pokeName = fetchPokemons['name'][pokemonIndex];
    renderBigCard(index,pokemonIndex,card,img,pokeName)
}


function hideBigCard(){
    document.getElementById('pokemonCard').classList.add('d_none');
}


function renderType(index){    
    let pokemonIndex = fetchPokemons['id'].indexOf(index)
    let img = document.getElementById(`img${pokemonIndex}`)
    let imgs = fetchPokemons['img'][pokemonIndex];
    let typeLength = fetchPokemons['type'][pokemonIndex].length;
    img.setAttribute(`src`,`${imgs}`)
    for (let j = 0; j < typeLength; j++) {
        if (j==0){
            let pokeType =  fetchPokemons['type'][pokemonIndex][j]['type']['name'];
            document.getElementById(`type${pokemonIndex}`).innerHTML +=`
            <div class="${pokeType} test"><span>${pokeType}</span></div>
            `;
            document.getElementById(`img${pokemonIndex}`).classList.add(`box-shadow-${pokeType}`)

        }else{
            let pokeType =  fetchPokemons['type'][pokemonIndex][j]['type']['name'];
            document.getElementById(`type${pokemonIndex}`).innerHTML +=`
            <div class="${pokeType} test"><span>${pokeType}</span></div>
            `;
        }

    }
}


function renderCard(index){
    let pokemonIndex = fetchPokemons['id'].indexOf(index)
    let card = document.getElementById('pokedex_screen');
    let pokeName = fetchPokemons['name'][pokemonIndex];
    card.innerHTML += `
    <div id="card${index}" onclick="openCard(${index})" class="card">
        <img id="img${pokemonIndex}" src="" class="card-img-top " alt="${pokeName}">
        <div class="card-body card_Infos">
            <h2 class="card-text">${pokeName}</h2>
            <div class="types" id="type${pokemonIndex}"></div>
        </div>
    </div>
    `;
}


function renderBigCard(index,pokemonIndex,card,img,pokeName){
    card.innerHTML = `
    <div onclick="showCards()" class="fixed">
        <div class=CardBackground>
            <div id="card_Big" class="bigCard">
                <div>
                    <div class="card_Big">
                        <p class="ID">#${index}</p>
                        <img id="img${pokemonIndex}" src="${img}" class="bigImg " alt="${pokeName}">
                        <div class="sideInfos">
                            <h2 class="big_headline">${pokeName}</h2>
                            <div id="typeBigCard" class="typeBigCard"></div>
                            <div class="types" id="type${pokemonIndex}"></div>
                        </div>
                    </div>
                </div>
                <div class="test2">
                </div>
            </div>
        </div>
    </div>
    `;
}


function fillCardInfos(index){
    let pokemonIndex = fetchPokemons['id'].indexOf(index);
    let typeLength = fetchPokemons['type'][pokemonIndex].length;
    for (let j = 0; j < typeLength; j++) {
        if (j==0){
            let pokeType =  fetchPokemons['type'][pokemonIndex][j]['type']['name'];
            document.getElementById('pokemonCard').classList.remove('d_none');
            document.getElementById('card_Big').classList.add(`box-shadow-${pokeType}`);
            document.getElementById(`typeBigCard`).innerHTML +=`
            <div class="${pokeType} test"><span>${pokeType}</span></div>
            `;
        }else{
            let pokeType =  fetchPokemons['type'][pokemonIndex][j]['type']['name'];
            document.getElementById(`typeBigCard`).innerHTML +=`
            <div class="${pokeType} test"><span>${pokeType}</span></div>
            `;
        }
    }
}