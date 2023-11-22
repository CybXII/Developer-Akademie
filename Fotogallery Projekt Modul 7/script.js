let images = ['img/1.jpg','img/2.jpg','img/3.jpg','img/4.png','img/5.jpg','img/6.jpg','img/7.jpg','img/8.jpg','img/9.jpg','img/10.jpg','img/11.jpg','img/12.jpg','img/13.jpg','img/14.jpg','img/15.jpg','img/16.jpg','img/17.jpg','img/18.jpg','img/19.jpg','img/20.jpg']

function load() {
    reset()
    for (let i = 0; i < images.length; i++) {
        document.getElementById('foto_board').innerHTML +=`
        <div onclick="openImage(${i})" class="imgcontainer" >
            <img class="imgbox" src="${images[i]}" alt="Bild">
        </div>
        `;
    }
}

function openImage(index){
    document.getElementById('foto_board').innerHTML =`
    <div class="full_screen_container" >
        <div onclick="load()" class="close_button">
            <img class="close_button" src="./img/x.png" onclick="load()"></img>
        </div>
        <div class="foto_container">
            <div>
                <img onclick="switchPicB(${index})" class="arrow_left" src="./img/arrow.png" ></img>
            </div>
            <div>
                <img class="foto_full" src="${images[index]}" alt="Bild"></img>
            </div>
            <div>
                <img onclick="switchPicF(${index})" class="arrow_right" src="./img/arrow.png" ></img>            
            </div>
        </div>
    </div>
    `;
}

function reset(){
    document.getElementById('foto_board').innerHTML =``;
}

function switchPicB(index){
    let newPic= index-1;
    if (newPic==-1){
        newPic=images.length-1;
        openImage(newPic);
    }
    else{
        openImage(newPic);
    }
}

function switchPicF(index){
    let newPic= index+1;
    if (newPic>=images.length){
        newPic=0;
        openImage(newPic);
    }
    else{
        openImage(newPic);
    } 
}