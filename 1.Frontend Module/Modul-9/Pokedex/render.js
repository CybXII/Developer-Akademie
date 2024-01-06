function renderBigCard(index,pokemonIndex,card,img,pokeName){
    card.innerHTML = `
    <div onclick="showCards()" class="fixed">
    </div>
    <div class=CardBackground>
        <div onclick="" id="card_Big" class="bigCard">
            <div class="cardContainer">
            <p class="ID">#${index}</p>
            <h2 class="big_headline">${pokeName}</h2>
                <div class="card_Big">

                    <div class="sideInfos">
     
                        <div id="typeBigCard" class="typeBigCard"></div>
                        
                        <div class="types" id="type${pokemonIndex}"></div>
                    </div>
                </div>
            </div>
            <div class="infoContainer">
                <div class="">
                    <div class="bar">
                        <p onclick="switchPokemon(${index},'-')" class="switch"><-</p>
                        Pokemon Stats
                        <p onclick="switchPokemon(${index},'+')" class="switch">-></p>
                    </div>
                    <div class="base-state-container" id="infoContainer">
                        <canvas  id="myChart" width="100%" height="50%">
                    </div>
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
        <img id="img${pokemonIndex}" src="" class="card-img-top " alt="${pokeName}">
        <div class="card-body card_Infos">
            <h2 class="card-text">${pokeName}</h2>
            <div class="types" id="type${pokemonIndex}"></div>
        </div>
    </div>
    `;
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
            <div class="${pokeType} type_container"><img class='${pokeType}' src="./img/${pokeType}.svg" alt=""></div>
            `;
            document.getElementById(`img${pokemonIndex}`).classList.add(`box-shadow-${pokeType}`)
        }else{
            let pokeType =  fetchPokemons['type'][pokemonIndex][j]['type']['name'];
            document.getElementById(`type${pokemonIndex}`).innerHTML +=`
            <div class="${pokeType} type_container"><img class='${pokeType}' src="./img/${pokeType}.svg" alt=""></div>
            `;
        }
    }
}


function fillCardInfos(index){
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
            <img id="img${pokemonIndex}" src="${img}" class="bigImg " alt="">
            `;
        }else{
            let pokeType =  fetchPokemons['type'][pokemonIndex][j]['type']['name'];
            document.getElementById(`typeBigCard`).innerHTML +=`
            <div class="${pokeType} type_container"><img class='${pokeType}' src="./img/${pokeType}.svg" alt=""></div>
            `;
        }
    }
}