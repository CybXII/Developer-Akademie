function renderBigCard(index,card,pokeName){
    card.innerHTML = `
    <div onclick="showCards()" class="fixed">
    </div>
    <div class=CardBackground>
        <div onclick="" id="card_Big" class="bigCard">
            <div class="cardContainer">
                <p class="ID_big">#${index}</p>
                <h2 class="big_headline">${pokeName}</h2>
                <div class="card_Big">
                    <div id="sideInfos" class="sideInfos">
                        <div id="typeBigCard" class="typeBigCard"></div>
                    </div>
                </div>
            </div>
            <div class="infoContainer">
                <div class="state">
                    <div class="base-state-container" id="infoContainer">
                    </div>
                </div>
                <div class="bar">
                <div onclick="switchPokemon(${index},'-')" class="switch"><-</div>
                <div class="flex">
                    <div onclick="renderChart(${index})" id="pokestats" class="option_left aktive">Stats</div>
                    <div onclick="renderInfos(${index})" id="pokeinfos" class="options">Infos</div>
                    <div onclick="renderAbilitys(${index})" id="pokeabilitys" class="option_right">Abilitys</div>
                </div>
                <div onclick="switchPokemon(${index},'+')" class="switch">-></div>
            </div>
            </div>
        </div>
    </div>
    `;
}


function renderCard(index){
    let pokemonIndex = fetchPokemons['id'].indexOf(index)
    let card = document.getElementById('pokedex_screen');
    let pokeName = fetchPokemons['name'][pokemonIndex];
    card.innerHTML += `
    <div id="card${index}" onclick="openCard(${index})" class="card">
        <p class="ID">#${index}</p>
        <img id="img${index}" src="" class="card-img-top " alt="${pokeName}">
        <div class="card-body card_Infos">
            <h2 class="card-text">${pokeName}</h2>
            <div class="types" id="type${index}"></div>
        </div>
    </div>
    `;
}


function renderType(index){    
    let pokemonIndex = fetchPokemons['id'].indexOf(index)
    let img = document.getElementById(`img${index}`)
    let imgs = fetchPokemons['img'][pokemonIndex];
    let typeLength = fetchPokemons['type'][pokemonIndex].length;
    img.setAttribute(`src`,`${imgs}`)
    for (let j = 0; j < typeLength; j++) {
        let pokeType =  fetchPokemons['type'][pokemonIndex][j]['type']['name'];
        if (j==0){
            document.getElementById(`type${index}`).innerHTML +=`
            <div class="${pokeType} type_container"><img class='${pokeType}' src="./img/${pokeType}.svg" alt=""></div>
            `;
            document.getElementById(`card${index}`).classList.add(`box-shadow-${pokeType}`)
        }else{
            document.getElementById(`type${index}`).innerHTML +=`
            <div class="${pokeType} type_container"><img class='${pokeType}' src="./img/${pokeType}.svg" alt=""></div>
            `;
        }
    }
}


function renderCardInfos(index){
    let pokemonIndex = fetchPokemons['id'].indexOf(index);
    let typeLength = fetchPokemons['type'][pokemonIndex].length;
    let img = fetchPokemons['img'][pokemonIndex];
    for (let j = 0; j < typeLength; j++) {
        if (j==0){
            let pokeType =  fetchPokemons['type'][pokemonIndex][j]['type']['name'];
            document.getElementById('pokemonCard').classList.remove('d_none');
            document.getElementById('card_Big').classList.add(`box-shadow-${pokeType}`);
            document.getElementById(`typeBigCard`).innerHTML +=`
            <div class="${pokeType} type_container"><img class='${pokeType}' src="./img/${pokeType}.svg" alt=""></div>
            `;
        }else{
            let pokeType =  fetchPokemons['type'][pokemonIndex][j]['type']['name'];
            document.getElementById(`typeBigCard`).innerHTML +=`
            <div class="${pokeType} type_container"><img class='${pokeType}' src="./img/${pokeType}.svg" alt=""></div>
            `;
        }
    }
    document.getElementById(`sideInfos`).innerHTML +=`
    <div class="types" id="type${index}">
        <img id="img${pokemonIndex}" src="${img}" class="bigImg " alt="">
    </div>
    `;
}


function renderInfos(index){
    let pokemonIndex = fetchPokemons['id'].indexOf(index);
    let height = fetchPokemons['height'][pokemonIndex];
    let weight = fetchPokemons['weight'][pokemonIndex];
    let gerdescIndex = fetchPokemons['descr'][pokemonIndex].indexOf('de');
    let descr = checkDescription(pokemonIndex,gerdescIndex);
    document.getElementById('pokestats').classList.remove('aktive');
    document.getElementById('pokeinfos').classList.add('aktive');
    document.getElementById('pokeabilitys').classList.remove('aktive');
    document.getElementById('infoContainer').innerHTML=`
    <div>
        <div>
            Größe: ${height/10} Meter
            Gewicht: ${weight/10} Kg
        </div>
        <div>
            ${descr}
        </div>
    </div>
    `;
}



function checkDescription(pokemonIndex,gerdescIndex){
    // if(gerdescIndex=== -1){
    //     descr = "Es liegen keine Daten vor zu diesem Pokemon"
    // }
    // else if(gerdescIndex){
        function filterPokemonData(dataArray, languageFilter, versionFilter) {
            const filteredData = dataArray.filter((pokemon) => {
                return pokemon.language.name === languageFilter && pokemon.version.name === versionFilter;
            });
        
            if (filteredData.length > 0) {
                return filteredData.map((pokemon) => pokemon.flavor_text);
            } else {
                return "Leider gibt es zu diesem Pokemon keine näheren Daten.";
            }
        }
        // Beispielaufruf
        const result = filterPokemonData(fetchPokemons['descr'][pokemonIndex], "de", "x");
       return result
        // descr= fetchPokemons['descr'][pokemonIndex][gerdescIndex]
    // }
}


function renderAbilitys(index){
    let pokemonIndex = fetchPokemons['id'].indexOf(index);
    document.getElementById('pokestats').classList.remove('aktive');
    document.getElementById('pokeinfos').classList.remove('aktive');
    document.getElementById('pokeabilitys').classList.add('aktive');
    document.getElementById('infoContainer').innerHTML= `<div id="ability"></div>`;
    fetchPokemons.ability[pokemonIndex].forEach(element => {
        document.getElementById('ability').innerHTML += `<div>${element.ability['name']}</div>`;
    });
}