let restaurants = [
    {
        name: 'Istanbul Grill',
        menüs:['Pommes','Döner','Dönerteller'],
        prices:[3.49, 7.49, 9.99],
        imgs: ['istanbulpommes.jpg','istanbuldoener.jpg','dönerteller.jpg']
    },
    {
        name: 'Angelos Pizza',
        menüs:['Salami Pizza', 'Hawaii Pizza', 'Pizza Speciale'],
        prices:[6.99, 7.99, 7.49],
        imgs:['salami-pizza.jpg','hawaii-pizza.jpg','speziale-pizza.jpg']
    },
    {
        name: 'Ibo`s Döner',
        menüs:['Pommes','Döner','Dönerteller'],
        prices:[3.49, 6.99, 9.49],
        imgs:['ibopommes.jpg','ibodoener.jpg','dönerteller.jpg']
    },
    {
        name: 'Mythos',
        menüs:['Bauernsalat','Kreta-Platte','Gyros'],
        prices:[9.50, 18.50, 14.50],
        imgs:['bauern-salad.jpg','kretaplatte.jpg','gyros.jpg']
    },
]


function renderCarousel(input){
    let restaurant = restaurants[input]['imgs'];

    for (let i = 0; i < restaurants[input]['imgs'].length; i++) {
        if (i === 0) {
            document.getElementById('carousel_inner').innerHTML = `
            <div class="carousel-item active">
                <img src="./img/${restaurant[i]}" class="d-block w-100" alt="...">
            </div>
            `;
        }
        else {
            document.getElementById('carousel_inner').innerHTML = `
            <div class="carousel-item">
                <img src="./img/${restaurant[i]}" class="d-block w-100" alt="...">
            </div>
            `;
        }

        
    }

}