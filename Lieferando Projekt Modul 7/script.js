let restaurants = [
    {
        name: 'Istanbul Grill',
        menüs:['Pommes','Döner','Dönerteller'],
        menüInfos:['Bespiel Menü Infos1','Bespiel Menü Infos2','Bespiel Menü Infos3'],
        prices:[3.49, 7.49, 9.99],
        imgs: ['istanbulpommes.jpg','istanbuldoener.jpg','dönerteller.jpg'],
        logo: 'istanbul.jpg',
        restaurantInfo:'Lecker Essen'
    },
    {
        name: 'Angelos Pizza',
        menüs:['Salami Pizza', 'Hawaii Pizza', 'Pizza Speciale'],
        menüInfos:['Bespiel Menü Infos1','Bespiel Menü Infos2','Bespiel Menü Infos3'],
        prices:[6.99, 7.99, 7.49],
        imgs:['salami-pizza.jpg','hawaii-pizza.jpg','speziale-pizza.jpg'],
        logo: 'angelos.jpg',
        restaurantInfo:'Lecker Essen'
    },
    {
        name: 'Ibo`s Döner',
        menüs:['Pommes','Döner','Dönerteller'],
        menüInfos:['Bespiel Menü Infos1','Bespiel Menü Infos2','Bespiel Menü Infos3'],
        prices:[3.49, 6.99, 9.49],
        imgs:['ibopommes.jpg','ibodoener.jpg','dönerteller.jpg'],
        logo: 'ibos.jpg',
        restaurantInfo:'Lecker Essen'
    },
    {
        name: 'Mythos',
        menüs:['Bauernsalat','Kreta-Platte','Gyros'],
        menüInfos:['Bespiel Menü Infos1','Bespiel Menü Infos2','Bespiel Menü Infos3'],
        prices:[9.50, 18.50, 14.50],
        imgs:['bauern-salad.jpg','kretaplatte.jpg','gyros.jpg'],
        logo: 'Mythos.jpg',
        restaurantInfo:'Lecker Essen'
    },
]


let basket = [
    { // Restaurant 0 = Istanbul Grill
    addedMenues:[],
    menuePrices:[],
    menueAmount:[],
    },
]


function renderSite(input){
    renderCarousel(input);
    renderMenues(input);
    renderBasket();
}

function renderCarousel(input){
    let restaurant = restaurants[input]['logo'];

    for (let i = 0; i < restaurants.length; i++) {
        if (i === 0) {
            renderFirstCarouselItem(input,i,restaurant)
        }
        else {
            renderOtherCarouselItem(input,i,restaurant)
        }
    }
}


function renderFirstCarouselItem(input,i,restaurant){
    document.getElementById('carousel_indicator').innerHTML += `
    <button onclick="switchCarousel(${i})" id="switchCarousel${i}" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${i}" class="active" aria-current="true" aria-label="Slide ${i+1}"></button>
    `;
    document.getElementById('carousel_inner').innerHTML += `
    <div class=" carousel-item active">
        <img class="food_banner w-100" alt="..." src="./img/${restaurant}" >
        <div class="carousel-caption d-none d-md-block">
            <h5 class="restaurant_info">${restaurants[input]['name']}</h5>
            <p class="restaurant_info">${restaurants[input]['restaurantInfo']}</p>
        </div>        
    </div>
    `;
}


function renderOtherCarouselItem(i){
    document.getElementById('carousel_indicator').innerHTML += `
    <button onclick="switchCarousel(${i})" id="switchCarousel${i}" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${i}" aria-label="Slide ${i+1}"></button>
    `;
    document.getElementById('carousel_inner').innerHTML += `
    <div class=" carousel-item">
        <img class="food_banner w-100" alt="..." src="./img/${restaurants[i]['logo']}">
        <div class="carousel-caption d-none d-md-block">
        <h5 class="restaurant_info">${restaurants[i]['name']}</h5>
        <p class="restaurant_info">${restaurants[i]['restaurantInfo']}</p>
        </div>  
    </div>
    `;
}


function renderMenues(input){
    document.getElementById('content').innerHTML = ``;
    for (let i = 0; i < restaurants[input]['menüs'].length; i++) {
        document.getElementById('content').innerHTML += `
        <div class="margin_5 card w-80">
            <div class="card-body">
                <div class="d_flex">
                    <h5 class="card-title">${restaurants[input]['menüs'][i]}</h5>
                    <a href="#" onclick=addToBasket(${input},${i}) class="btn btn-primary">+</a>
                </div>
                <div class="d_flex mt-3">
                    <div>
                        <p class="card-text">${restaurants[input]['menüInfos'][i]}</p>
                        <p class="card-text">${restaurants[input]['prices'][i]}€</p>
                    </div>
                    <img src="./img/${restaurants[input]['imgs'][i]}" class="w-25 card-img-top" alt="...">
                </div>
            </div>
        </div>
        `;
    }
}

function renderBasket(){
    document.getElementById('meal_container').innerHTML = ``;

    for (let i = 0; i < basket[0]['addedMenues'].length; i++) {
        document.getElementById('meal_container').innerHTML += `
        <div class="d_flex center">
            <p>${basket[0]['addedMenues'][i]}</p>
            <p>${basket[0]['menuePrices'][i]}€</p>
        </div>
        <div class="d_flexbasket p-2 center border rounded">
            <p>Menge</p>
            <div class="d_flex g-2">
                <button onclick="increaseAmount()" id="increase_amount" type="button" class="btn btn-outline-primary h-50">+</button>
                <p class="amount fs-5 p-1">${basket[0]['menueAmount'][i]}</p>
                <button onclick="decreaseAmount()" id="decrease_amount" type="button" class="btn btn-outline-primary h-50">-</button>
            </div>
        </div>
        `;
    }
}


function addToBasket(input,menüId){
        basket[input]['menuePrices'].push(restaurants[input]['prices'][menüId]);
        basket[input]['addedMenues'].push(restaurants[input]['menüs'][menüId]);
        basket[input]['menueAmount'].push(1);
        renderBasket();
}

function switchCarousel(input){
renderMenues(input);
renderBasket();
}