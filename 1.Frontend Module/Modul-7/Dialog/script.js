function openDialog(){
    document.getElementById('dialog').classList.remove(`d_none`);

}

function closeDialog(){
    document.getElementById('dialog').classList.add(`d_none`);
}

function sendMessage(){
    let text = document.getElementById('text').value;
    document.getElementById('dialog_message').innerHTML +=`<div>${text}</div>`;

}