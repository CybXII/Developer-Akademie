function insertDoors() {
    for (let i = 1; i < 25; i++ ) {
        document.getElementById('testbody1').innerHTML += `
        <div class="box">
            <div>
            <button class="button" onclick="show('${i}')">${i}</button>
            </div>
        </div>`;
        document.getElementById('testbody2').innerHTML += `
        <div>
            <div id="${i}" onclick="hide('${i}')" class="door"></div>
        </div>`;
    }
}


function show(id){

        document.getElementById(id).classList.remove('d-none');

}

function hide(id){
    document.getElementById(id).classList.add('d-none');
}
