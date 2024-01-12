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
        <div class="lands" href="${element.url}">
            <h2>${element.name}<br></h2>
            ${element.population}<br>
            <a>${element.url}</a>
        </div>
        `;
    });
}