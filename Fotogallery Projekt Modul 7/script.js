let images = ['img/1.jpg','img/2.jpg','img/3.jpg','img/4.png','img/5.jpg','img/6.jpg','img/7.jpg','img/8.jpg','img/9.jpg','img/10.jpg','img/11.jpg']

function load() {
    for (let i = 0; i < images.length; i++) {
        document.getElementById('foto_board').innerHTML +=`
        <div onclick="openImage(${i})" class="imgcontainer" >
            <img class="imgbox" src="${images[i]}" alt="Bild">
        </div>
        `;
    }

}