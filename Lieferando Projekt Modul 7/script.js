let restaurants = [
    {
        name: 'Istanbul Grill',
        menüs:['Pommes','Döner','Dönerteller'],
        prices:[3.49, 7.49, 9.99],
        imgs: ['istanbulpommes.jpg','istanbuldoener.jpg','dönerteller.jpg'],
        logo: 'istanbul.jpg',
        restaurantInfo:'Lecker Essen'
    },
    {
        name: 'Angelos Pizza',
        menüs:['Salami Pizza', 'Hawaii Pizza', 'Pizza Speciale'],
        prices:[6.99, 7.99, 7.49],
        imgs:['salami-pizza.jpg','hawaii-pizza.jpg','speziale-pizza.jpg'],
        logo: 'angelos.jpg',
        restaurantInfo:'Lecker Essen'
    },
    {
        name: 'Ibo`s Döner',
        menüs:['Pommes','Döner','Dönerteller'],
        prices:[3.49, 6.99, 9.49],
        imgs:['ibopommes.jpg','ibodoener.jpg','dönerteller.jpg'],
        logo: 'ibos.jpg',
        restaurantInfo:'Lecker Essen'
    },
    {
        name: 'Mythos',
        menüs:['Bauernsalat','Kreta-Platte','Gyros'],
        prices:[9.50, 18.50, 14.50],
        imgs:['bauern-salad.jpg','kretaplatte.jpg','gyros.jpg'],
        logo: 'Mythos.jpg',
        restaurantInfo:'Lecker Essen'
    },
]


function renderCarousel(input){
    let restaurant = restaurants[input]['logo'];

    for (let i = 0; i < restaurants.length; i++) {
        if (i === 0) {
            document.getElementById('carousel_indicator').innerHTML += `
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${i}" class="active" aria-current="true" aria-label="Slide ${i+1}"></button>
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
        else {
            document.getElementById('carousel_indicator').innerHTML += `
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${i}" aria-label="Slide ${i+1}"></button>
            `;
            document.getElementById('carousel_inner').innerHTML += `
            <div class=" carousel-item">
                <img class="food_banner w-100" alt="..." src="./img/${restaurants[i]['logo']}">
                <div class="carousel-caption d-none d-md-block">
                <h5 class="restaurant_info">${restaurants[input]['name']}</h5>
                <p class="restaurant_info">${restaurants[input]['restaurantInfo']}</p>
                </div>  
            </div>
            `;
        }
    }
}