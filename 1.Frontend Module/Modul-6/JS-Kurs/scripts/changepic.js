let images = [`./img/pork.png`, `./img/disziplin.png`, `./img/focus.png`] //Array für Bilder
let i = 0;
let timer = 3000
function image1() {
    document.getElementById('image').src = images[0]; //ruft Bild 1 aus dem Array
}

function image2() {
    document.getElementById('image').src = images[1];
}
function image3() {
    document.getElementById('image').src = images[2];
}

function start_img_run() {
    document.getElementById('image').src =  images[i];// i hat Wert 0 deshalb wird Bild 1 aus Array abgerufen
    i++; 
    if(i == 3) {
        i = 0;
    }                                             // i wird um 1 erhöht mit ++
    setTimeout (start_img_run2,3000);
}

function start_img_run2() { 
    document.getElementById('image').src = images[i];// i hat Wert 1 deshalb wird Bild 2 aus Array abgerufen
    i++;   
    if(i == 3) {
        i = 0;
    }                                          // i wird um 1 erhöht mit ++
    setTimeout (start_img_run3,3000);
}

function start_img_run3() {
    document.getElementById('image').src = images[i];// i hat Wert 2 deshalb wird Bild 3 aus Array abgerufen
    i=0;  
    if(i == 3) {
        i = 0;
    }                                           // i wird auf 0 gesetzt.
    setTimeout (start_img_run,3000);
}

function start_algo() {

    showImage(i);
    i++;

    if(i == 3) {
        i = 0;
    }
    setTimeout(start_algo, timer)
}

function showImage(i) {
    document.getElementById('image').src = images[i];// i hat Wert 2 deshalb wird Bild 3 aus Array abgerufen

}
function set_timer() {
    let timer = +document.getElementById('set_timer').value*1000;
    start_algo(timer)
}
