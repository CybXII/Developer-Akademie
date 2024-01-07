let responseAsJson;
let responseLength = 0;
let loadedPokemonNumber = 1;
let renderedPokemonNumber = 1;
let pokemonSpecies = [];
let pokemonAsJson; 
let maxRender = 75;
let pokemons= [];
let pokemonsUrl=[];
let namesStats= []

let numbersStats = [[65], [59], [90], [81], [56], [55], [40]];


let fetchPokemons={
    'name':[],
    'id':[],
    'img':[],
    'type':[],
    'ability':[],
    'descr':[],
    'weight':[],
    'height':[],
    'stats':[],
    'namesStats': ['HP', 'Attack', 'Defense', 'Special-Attack', 'Special-Defense', 'Speed']
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


//Mein Code von ChatGPT Optimiert
/*async function init(){
    const fetchPromises = [];
    for (let i = renderedPokemonNumber; i < responseLength; i++) {
        fetchPromises.push(loadPokemon(responseAsJson['results'][i-1], i-1));
    }
    await Promise.all(fetchPromises);
}*/
//Mein Code von ChatGPT Optimiert nach meinen Vorgaben
async function init() {
    const batchSize = 100;
    for (let i = renderedPokemonNumber; i < responseLength; i += batchSize) {
        const batchPromises = [];
        loadBatch(batchSize,batchPromises,i);
        // Warte, bis alle batchSize Pokemon geladen sind
        await Promise.all(batchPromises);
        // Warte 10 ms, bevor der nächste Batch geladen wird
        await new Promise((resolve) => setTimeout(resolve, 10));
        if(fetchPokemons['name'].length>50){
            renderPokemon(renderedPokemonNumber)
            stopLoadingScreen();
        }
    }
}


function loadBatch(batchSize,batchPromises,i){
    for (let j = 0; j < batchSize && i + j < responseLength; j++) {
        batchPromises.push(loadPokemon(responseAsJson['results'][i + j - 1], i + j - 1));
    }
}


function stopLoadingScreen(){
    document.getElementById('loading_screen').classList.remove(`screen_loader`);
}


function stoploadingBar(){
    document.getElementById('loading_process').classList.remove(`loader`);
    document.getElementById('loading_process').classList.add(`loader_stop`);
}


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
    await loadPokeInfos(pokemonAsJson,speciesAsJson);
}


async function loadPokeInfos(pokemonAsJson,speciesAsJson){
    const ability = pokemonAsJson['abilities'];
    const descr = speciesAsJson['flavor_text_entries']
    const weight = pokemonAsJson['weight'];
    const height = pokemonAsJson['height'];
    const stats = pokemonAsJson['stats'];

    fetchPokemons.ability.push(ability);
    fetchPokemons.descr.push(descr);
    fetchPokemons.weight.push(weight);
    fetchPokemons.height.push(height);
    fetchPokemons.stats.push(stats);

}


function loadMore(){
    maxRender= maxRender+50;
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
    renderCardInfos(index);
    stopLoadingScreen();
    renderInfos(index);
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
    let pokemonIndex = fetchPokemons['id'].indexOf(index);
    let card = document.getElementById('pokemonCard');
    let pokeName = fetchPokemons['name'][pokemonIndex];
    renderBigCard(index,card,pokeName);
}


function hideBigCard(){
    document.getElementById('pokemonCard').classList.add('d_none');
}


function switchPokemon(index,operator){
    if(operator==='-'){
        getPrevious(index);
    }
    if(operator==='+'){
        getNext(index);
    }
}


function getPrevious(index){
    let newIndex=index-1;
    if (newIndex<=0){
        if (fetchPokemons['name'].length === responseLength-1){
            newIndex = responseLength-1;
            openCard(newIndex);
        }else{
            console.log('Es wurden noch nicht alle Pokemon fertig geladen um das letzte an zu zeigen warte einen Augenblick bitte!');
        }
    }else if(newIndex>0){
        openCard(newIndex);
    }
}


function getNext(index){
    let newIndex=index+1;
    if (newIndex>=responseLength){
        newIndex = 1;
        openCard(newIndex);
    }
    openCard(newIndex);
}


function checkDescription(pokemonIndex){
    function filterPokemonData(dataArray, languageFilter, versionFilter) {
        let filteredData = dataArray.filter((pokemon) => {
            return pokemon.language.name === languageFilter && pokemon.version.name === versionFilter;
        });
        if (filteredData.length > 0) {
            return filteredData.map((pokemon) => pokemon.flavor_text);
        } 
        else {
            return "Leider gibt es zu diesem Pokemon keine näheren Daten.";
        }
        }
        let result = filterPokemonData(fetchPokemons['descr'][pokemonIndex], "de", "x");
       return result
}