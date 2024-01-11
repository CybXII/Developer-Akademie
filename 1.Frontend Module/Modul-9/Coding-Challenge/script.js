function renderLand(){
    let data = fetch('./bundesland.json')
    .then((response) => response.json())
    .then((json) => {
        console.log(json)
        test(json);
    });
}

function test(json){
    json.forEach(element => {
        document.getElementById('content').innerHTML+=`
        <div>
            ${element.name}
        </div>
        `;
    });
}