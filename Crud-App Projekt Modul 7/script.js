let names = ['Erica Mustermann', 'John Doe']
let phoneNumbers = ['015712345678', '015798765432']

function render(){
    let content = document.getElementById('content');
    content.innerHTML = '';
    content.innerHTML += `
    <h1>My Contacts</h1>
    <div class="input" >
        <input id="name" type="text" placeholder="Name">
        <input id="phone" type="number" placeholder="Telefon">
        <button onclick="addContact()">Hinzufügen</button>
    </div>
    `;
    load();
    for (let i = 0; i < names.length; i++) {
        const name = names[i];
        const phoneNumber = phoneNumbers[i];
        
        content.innerHTML += /*html*/ `
        <div class="card">
            <div>
                <b>Name: </b>${name}<br>
                <b>Telefon: </b>${phoneNumber}<br>
            </div>
            <div>
                <button onclick="deleteContact(${i})">Kontakt löschen</button>
            </div>
 
        </div>
        `
    }
}


function addContact(){
    console.log('Läuft!');
    let newName = document.getElementById('name').value;
    let newNumber = document.getElementById('phone').value;
    phoneNumbers.push(newNumber);
    names.push(newName);
    save();
    render();
}


function deleteContact(arrayindex){
    phoneNumbers.splice(arrayindex , 1);
    names.splice(arrayindex , 1);
    save();
    render();
}


function save(){
    let namesAsText = JSON.stringify(names);
    let phoneNumbersAsText = JSON.stringify(phoneNumbers);
    localStorage.setItem('names', namesAsText);
    localStorage.setItem('numbers', phoneNumbersAsText);
}


function load(){
    let namesAsText = localStorage.getItem('names');
    let phoneNumbersAsText = localStorage.getItem('numbers');
    if (namesAsText && phoneNumbersAsText) {
        names = JSON.parse(namesAsText);
        phoneNumbers = JSON.parse(phoneNumbersAsText);
    } 
}