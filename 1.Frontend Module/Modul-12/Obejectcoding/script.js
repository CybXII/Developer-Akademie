let contacts =[
    new Contact('Jessica', 'Moldovan' ,'0175521251'),
    new Friend('Erika', 'Mustermann')
];

function addContact(firstName,lastName,phone){
    let myContact = new Contact(firstName,lastName ,phone);
    contacts.push(myContact);
}

addContact('Junus','Ergin','0111111111' );
addContact('Manuel','Thaler','0175521251') 
addContact('Vincent','Vegas','0176436622') 