let availableLetters=[];
let lands=[];
let sortedArray=[];

function renderLand(){
    fetch('./bundesland.json')
    .then((response) => response.json())
    .then((json) => {
        lands.push(json);
        test()
    });
    
}

function test(){
    document.getElementById('content').innerHTML=``;
    lands[0].forEach(element => {
        document.getElementById('content').innerHTML+=`
        <div class="lands" href="${element.url}">
            <h2>${element.name}<br></h2>
            ${element.population} Millionen
        </div>
        `;
    });
    checkLetters();
    renderSearchOptions();
}

function search(input) {
    let content = document.getElementById('content');
    content.innerHTML=``;
    let search = input;
    search= search.toLowerCase();
    renderSearch(search,content);
}

function  renderSearch(search,content){
    for (let i = 0; i < lands[0].length; i++) {
        let name = lands[0][i]['name'];
        if (name.toLowerCase().charAt(0).includes(search)){
            content.innerHTML+=`
            <div class="lands" href="${lands[0][i].url}">
            <h2>${name}<br></h2>
            ${lands[0][i].population} Millionen
            </div>
        `;
        }
    }
}




function renderSearchOptions(){
    document.getElementById('category').innerHTML=``;
    availableLetters.forEach(element => {
        document.getElementById('category').innerHTML+=`
            <p onclick="search('${element}')">${element}</p>
        `;
    });
    document.getElementById('category').innerHTML+=`
    <p onclick="test()">...</p>
    `;
}

function checkLetters(){
    lands[0].forEach(element => {
        availableLetters.push(element.name.charAt(0))
    });
    sortedArray = lands[0].sort((a, b) => a.name.substring(0).localeCompare(b.name.substring(0)));
    console.log(sortedArray)
    const uniqueSet = new Set(availableLetters);
    const uniqueArray = Array.from(uniqueSet);
    availableLetters = uniqueArray;
}