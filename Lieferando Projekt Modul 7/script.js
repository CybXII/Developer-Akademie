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
        menüs:[`Salami Pizza`, 'Hawaii Pizza', 'Pizza Speciale'],
        menüInfos:['Bespiel Menü Infos1','Bespiel Menü Infos2','Bespiel Menü Infos3'],
        prices:[6.99, 7.99, 7.49],
        imgs:['salami-pizza.jpg','hawaii-pizza.jpg','speziale-pizza.jpg'],
        logo: 'angelos.jpg',
        restaurantInfo:'Lecker Essen'
    },
    {
        name: 'Ibo`s Döner',
        menüs:['Pommes','Döner','Ibos Dönnerteller'],
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


let basket = [];


function renderSite(input){
    renderCarousel(input);
    renderShoppingSection(input)
}


function renderShoppingSection(input){
    setCarouselSwitchButtons(input);
    renderMenues(input);
    renderBasket();
}


function renderCarousel(input){
    let restaurant = restaurants[input]['logo'];

    for (let i = 0; i < restaurants.length; i++) {
        if (i === 0) {
            renderFirstCarouselItem(input,i,restaurant);
        }
        else if(i !== 0){
            renderOtherCarouselItem(input,i,restaurant);
        }
    }
}


function renderFirstCarouselItem(input,i,restaurant){
    setCarouselSwitchButtons(input)
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


function renderOtherCarouselItem(input,i,restaurant){
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
        let menu = restaurants[input]['menüs'][i];
        document.getElementById('content').innerHTML += `
        <div class="margin_5 card w-80">
            <div class="card-body">
                <div class="d_flex">
                    <h5 class="card-title">${restaurants[input]['menüs'][i]}</h5>
                    <a href="#" onclick="addToBasket(${input},'${menu}')" class="btn btn-primary">+</a>
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
    let addedRestaurants = document.getElementById('restaurants');
    addedRestaurants.innerHTML = ``;
    if (basket.length === 0){
        addedRestaurants.innerHTML += `
        <div class="d_flex center">
            <p>Ihr Warenkorb ist leer</p>
        </div>`;
    }
    else{
        for (let i = 0; i < basket.length; i++) {
            renderBasketRestaurants(addedRestaurants,i)
            renderBasketMenues(i)
        }
    }
}


function renderBasketRestaurants(addedRestaurants,i){
    addedRestaurants.innerHTML +=`
    <div id=restaurants${i}>
        <p>Ihre ausgewählten Menü's bei ${basket[i]['name']}</p>
        <div id="meal_container${i}" class="meal_container p-2">
    </div>`
    ;
}


function renderBasketMenues(i){
    let addedMeals = document.getElementById(`meal_container${i}`);
    for (let j = 0; j < basket[i]['menüs'].length; j++) {
        addedMeals.innerHTML += `
        <div class="d_flex center">
            <p>${basket[i]['menüs'][j]}</p>
            <p>${basket[i]['prices'][j]}€</p>
        </div>
        <div class="d_flexbasket p-2 center border rounded">
            <p>Menge</p>
            <div class="d_flex g-2">
                <button onclick="increaseMeal('${basket[i]['name']}','${basket[i]['menüs'][j]}')" id="increase_amount" type="button" class="btn btn-outline-primary h-50">+</button>
                <p class="amount fs-5 p-1">${basket[i]['amount'][j]}</p>
                <button onclick="decreaseMeal('${basket[i]['name']}','${basket[i]['menüs'][j]}')" id="decrease_amount" type="button" class="btn btn-outline-primary h-50">-</button>
            </div>
        </div>
        `;
    }
}


function addToBasket(input,menü){
    let basketRestaurant = restaurants[input]['name'];
    let indexMenue = restaurants[input]['menüs'].indexOf(menü); 
    let restaurantAdded = basket.findIndex(obj => obj.name== basketRestaurant)
    if (basket.length === 0) {
        addNewRestaurant(input,basketRestaurant,menü,indexMenue)
    }
    else if (restaurantAdded === -1) {  //checken ob restaurant im basket vorhanden ist
        addNewRestaurant(input,basketRestaurant,menü,indexMenue) 
    }
    else if(restaurantAdded !== -1){
        let addedMeal = basket[restaurantAdded]['menüs'].indexOf(menü)
        if (addedMeal === -1) { 
        //checken ob menü im basket vorhanden ist
        addNewMeal(input,basketRestaurant,menü,indexMenue)
        } else {
            increaseMeal(basketRestaurant,menü);
        }
    }
    renderBasket();
}


function increaseMeal(restaurant,menü){
    let checkRestaurant = basket.findIndex(obj => obj.name==restaurant)
    let checkMeal = basket[checkRestaurant]['menüs'] .indexOf(menü)
    basket[checkRestaurant]['amount'][checkMeal]++
    renderBasket();
}


function decreaseMeal(restaurant,menü){
    let checkRestaurant = basket.findIndex(obj => obj.name==restaurant)
    let checkMeal = basket[checkRestaurant]['menüs'] .indexOf(menü)
    if (basket[checkRestaurant]['amount'][checkMeal] === 1){
        basket[checkRestaurant]['amount'].splice(checkMeal)
        basket[checkRestaurant]['prices'].splice(checkMeal)
        basket[checkRestaurant]['menüs'].splice(checkMeal)
        if(basket[checkRestaurant]['menüs'].length===0){
            basket.splice(checkRestaurant)
        }
    }
    else {
        basket[checkRestaurant]['amount'][checkMeal]--
    }

    renderBasket();
}


function addNewMeal(input,restaurant,menü,indexMenue){
    let indexRestaurant = basket.findIndex(obj => obj.name==restaurant);
    let newMeal = basket[indexRestaurant];
    let newPrice = [restaurants[input]['prices'][indexMenue]];
    newMeal['menüs'].push(menü);
    newMeal['prices'].push(newPrice);
    newMeal['amount'].push(1)
}


function addNewRestaurant(input,restaurant,menü,indexMenue){
    let newPush = {
        name: restaurant,
        menüs:[menü],
        prices:[restaurants[input]['prices'][indexMenue]],
        amount:[1]
        }
    basket.push(newPush);
}


function switchCarousel(input){
    if (input < 0){
        renderShoppingSection(restaurants.length)
    }
    else if (input >= restaurants.length){
        renderShoppingSection(0)    
    }
    else {
        renderShoppingSection(input)
    }
}


function switchCarouselForward(input){
    if (input >= restaurants.length){
        renderShoppingSection(0)    
    }
    else {
       renderShoppingSection(input)
    }
}


function switchCarouselBackward(input){
    if (input < 0){
       renderShoppingSection(restaurants.length)
    }
       else {
           renderShoppingSection(input)
       }
   }


function setCarouselSwitchButtons(input){
    if (input <= 0){
        document.getElementById('prev_Button').setAttribute('onclick',`switchCarouselBackward(${restaurants.length-1})`);
        document.getElementById('next_Button').setAttribute('onclick',`switchCarouselForward(${input+1})`);
    }
    else if (input >= restaurants.length-1){
        document.getElementById('prev_Button').setAttribute('onclick',`switchCarouselBackward(${input-1})`);
        document.getElementById('next_Button').setAttribute('onclick',`switchCarouselForward(${0})`);
    }
    else{
        document.getElementById('prev_Button').setAttribute('onclick',`switchCarouselBackward(${input-1})`);
        document.getElementById('next_Button').setAttribute('onclick',`switchCarouselForward(${input+1})`);
    }
}