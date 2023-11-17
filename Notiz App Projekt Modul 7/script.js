let newArchiv = [];
let titels = [];
let newTrash = [];
let pinnedNotice = [];
let archived = `<div class="card_board" id="card_board"></div>`;
let inputfield = `
<div class="inputTitel" >
    <input class="titel" id="titel" type="text" placeholder="Titel">
    <textarea class="notice" id="notice" type="text" placeholder="Notiz"></textarea>
    <button onclick="addNotice('notice')">Hinzufügen</button>
</div>
<div class="card_board" id="card_board"></div>
`;


function render(input) {
  load();
  let render = input;
  let content = document.getElementById("content");
  content.innerHTML = "";
  if (render == "notice") {
    content.innerHTML += inputfield;
    let cards = document.getElementById("card_board");
    cards.innerHTML = "";
    cardRender(titels, pinnedNotice);
  }
  if (render == "archiv") {
    if (newArchiv == undefined) {
      consol.log("Archiv ist leer");
    } else if (newArchiv !== undefined) {
      cardRenderArchiv();
    }
  }
  if (render == "trash") {
    if (newTrash == undefined) {
      consol.log("Papierkorb ist leer");
    } else if (newTrash !== undefined) {
      cardRenderTrash();
    }
  }
}

function cardRender(inputTitels, inputPinned) {
    for (let i = 0; i < titels.length; i++) {
        const titel = inputTitels[i];
        const pinnedNotices = inputPinned[i];
        let cards = document.getElementById("card_board");

        if (i % 2 !== 0) {
        cards.innerHTML += /*html*/ `
            <div id="card${i}" class="card_red">
              <div>
                    <div class="notice_header">
                    <div><img id="pin${i}" class="pin_end" src="./img/pin.png" alt=""></div>
                    <button id="addArchiv${i}" class="delete_notice" onclick="addTrashedFromNotice(${i})">x</button>
                </div>
                <div><b id="getTitel">${titel}</b><br></div>
                <div  id="getNotice">
                    ${pinnedNotices}
                </div>
              </div>
              <div class="notice_footer">
                <div><img id="toArchived${i}"src="./img/archiv.png" alt="" onclick="addArchiv(${i})"></div>
              </div>
            </div>`;
            }
        else {
            cards.innerHTML += /*html*/ `
            <div id="card${i}"  class="card_purple">
              <div>
                <div class="notice_header">
                    <div><img id="pin${i}" class="pin_end" src="./img/pin.png" alt=""></div>
                    <button id="addArchiv${i}" class="delete_notice" onclick="addTrashedFromNotice(${[i]})"></button>
                </div>
                <div ><b id="getTitel">${titel}</b><br></div>
                <div id="getNotice">
                    ${pinnedNotices}
                </div>
              </div>
              <div id="notice_menu" class="notice_footer">
                  <div><img id="toArchived${i}"src="./img/archiv.png" alt="" onclick="addArchiv(${i})"></div>
              </div>
            </div>`;
        }
    }
}

function cardRenderArchiv() {
    content.innerHTML += archived;
    let cards = document.getElementById("card_board");
    if (newArchiv.length == 0){
      cards.innerHTML += 'Das Archiv ist Leer!'
    }
    else{
      for (let i = 0; i < newArchiv.length; i++) {
      if (i % 2 !== 0) {
          let index = i;
          generateArchivedRed(cards,index);
        }
      else 
      if (i % 2 == 0) {
        let index = i;
        generateArchivedPurple(cards,index);
      }
    }
  }
}

function cardRenderTrash() {
  content.innerHTML += archived;
  let cards = document.getElementById("card_board");
  if (newTrash.length == 0){
    cards.innerHTML += 'Der Papierkorb ist Leer!'
  }
  else{
    for (let i = 0; i < newTrash.length; i++) {
    if (i % 2 !== 0) {
      let index = i;
      generateTrashedRed(cards,index);
      }
    else 
    if (i % 2 == 0) {
      let index = i;
      generateTrashedPurple(cards,index)
    }
  }
}
}

function generateNotice(linkdirection,arrayindex){
  if (linkdirection == 'notice'){
    let newTitel = document.getElementById("titel").value;
    let newNotice = document.getElementById("notice").value;
    pinnedNotice.push(newNotice);
    titels.push(newTitel);
  }
  else if (linkdirection == 'archiv'){
    let archivChange = newArchiv.splice(arrayindex,1);
    localStorage.setItem("archivCard", `${archivChange}`);
    let newTitel = document.getElementById("getTitel").innerHTML;
    let newNotice = document.getElementById("getNotice").innerHTML;
    pinnedNotice.push(newNotice);
    titels.push(newTitel);
  }
  else if (linkdirection == 'trash'){
    let newTrashed = newTrash.splice(arrayindex,1);
    localStorage.setItem('trash', `${newTrashed}`);
    let newTitel = document.getElementById("getTitel").innerHTML;
    let newNotice = document.getElementById("getNotice").innerHTML;
    pinnedNotice.push(newNotice);
    titels.push(newTitel);
  }
}

function generateArchivedRed(cards,i){
  cards.innerHTML += /*html*/ `${newArchiv[i]}`;
  document.getElementById(`archived`).id = `archiv${i}`;
  document.getElementById(`archiv${i}`).setAttribute("class", `card_red`);
  document.getElementById(`addArchived`).setAttribute("onclick", `addTrashedFromArchiv(${i})`);
  document.getElementById(`addArchived`).id = `addArchived${i}`;
  document.getElementById(`toArchived`).setAttribute("onclick",`moveToNotice('archiv*,${i})`);
  document.getElementById(`toArchived`).setAttribute("src","./img/notice.png");
  document.getElementById(`toArchived`).id = `toNoticed${i}`;
  let newArchived = document.getElementById(`archiv${i}`).outerHTML;
  console.log(newArchived);
}

function generateArchivedPurple(cards,i){
  cards.innerHTML += /*html*/ `${newArchiv[i]}`;
  document.getElementById(`archived`).id = `archiv${i}`;
  document.getElementById(`archiv${i}`).setAttribute("class", `card_purple`);
  document.getElementById(`addArchived`).setAttribute("onclick", `addTrashedFromArchiv(${i})`);
  document.getElementById(`addArchived`).id = `addArchived${i}`;
  document.getElementById('toArchived').setAttribute("onclick",`moveToNotice('archiv',${i})`);
  document.getElementById('toArchived').setAttribute("src","./img/notice.png");
  document.getElementById(`toArchived`).id = `toNoticed${i}`;
  let newArchived = document.getElementById(`archiv${i}`).outerHTML;
  console.log(newArchived);
}

function generateTrashedRed(cards,i){
  cards.innerHTML += /*html*/ `${newTrash[i]}`;
  document.getElementById(`trashed`).id = `trash${i}`;
  document.getElementById(`trash${i}`).setAttribute("class", `card_red`);
  document.getElementById(`trashed`).setAttribute("onclick", `trashIt(${i})`);
  document.getElementById(`trashed`).id = `trashIt${i}`;
  document.getElementById(`toTrashed`).setAttribute("onclick",`moveToNotice('trash',${i})`);
  document.getElementById(`toTrashed`).setAttribute("src","./img/notice.png");
  document.getElementById(`toTrashed`).id = `toNoticed${i}`;
}

function generateTrashedPurple(cards,i){
  cards.innerHTML += /*html*/ `${newTrash[i]}`;
  document.getElementById(`trashed`).id = `trash${i}`;
  document.getElementById(`trash${i}`).setAttribute("class", `card_purple`);
  document.getElementById(`trashed`).setAttribute("onclick", `trashIt(${i})`);
  document.getElementById(`trashed`).id = `trashIt${i}`;
  document.getElementById(`toTrashed`).setAttribute("onclick",`moveToNotice('trash',${i})`);
  document.getElementById(`toTrashed`).setAttribute("src","./img/notice.png");
  document.getElementById(`toTrashed`).id = `toNoticed${i}`;
}

function addNotice(linkdirection) {
  if (linkdirection == 'notice'){  
    generateNotice(linkdirection);
    save();
    render("notice");
    pinmove(titels.length - 1);
  }
  else if (linkdirection == 'archiv'){
    generateNotice(linkdirection);
    save();
    render("archiv");
  }
  else if (linkdirection == 'trash'){
    generateNotice(linkdirection);
    save();
    render("trash");}
}

function addArchiv(i) {
  document.getElementById(`card${i}`).id = `archived`;
  document.getElementById(`addArchiv${i}`).id = `addArchived`;
  document.getElementById(`toArchived${i}`).id = `toArchived`;
  let newArchived = document.getElementById(`archived`).outerHTML;
  newArchiv.push(newArchived);
  deleteContact(i);
  save();
  render("notice");
}

function addTrashedFromNotice(i) {
  document.getElementById(`card${i}`).id = `trashed`;
  document.getElementById(`addArchiv${i}`).setAttribute("onclick", `trashIt(${i})`);
  document.getElementById(`addArchiv${i}`).id = `trashed`;
  document.getElementById(`toArchived${i}`).id = `toTrashed`;
  let newTrashed = document.getElementById(`trashed`).outerHTML;
  newTrash.push(newTrashed);
  deleteContact(i)
  save();
  render("notice");
}

function addTrashedFromArchiv(i) {
  document.getElementById(`archiv${i}`).id = `trashed`;
  document.getElementById(`addArchived${i}`).setAttribute("onclick", `trashIt(${i})`);
  document.getElementById(`addArchived${i}`).id = `trashed`;
  document.getElementById(`toNoticed${i}`).setAttribute("onclick",`moveToNotice('trash',${i})`);
  document.getElementById(`toNoticed${i}`).id = `toTrashed`;
  let newTrashed = document.getElementById(`trashed`).outerHTML;
  newTrash.push(newTrashed);
  newArchiv.splice(i,1);
  save();
  render("archiv");
}

function moveToNotice(linkdirection,i) {
  generateNotice(linkdirection,i)
  save();
  render(linkdirection);
}


function trashIt(arrayindex) {
  let newTrashed = newTrash.splice(arrayindex,1);
  localStorage.setItem('trash', `${newTrashed}`);
  save();
  render("trash");
}

function deleteContact(arrayindex) {
  pinnedNotice.splice(arrayindex, 1);
  titels.splice(arrayindex, 1);
}

function save() {
  let titelsAsText = JSON.stringify(titels);
  let pinnedNoticeAsText = JSON.stringify(pinnedNotice);
  let newArchived = JSON.stringify(newArchiv);
  let newTrashed = JSON.stringify(newTrash);
  localStorage.setItem("titels", titelsAsText);
  localStorage.setItem("numbers", pinnedNoticeAsText);
  localStorage.setItem("archivCard", `${newArchived}`);
  localStorage.setItem('trash', `${newTrashed}`);
}

function load() {
  let newCardsAsText = localStorage.getItem("archivCard");
  let trashedCardsAsText = localStorage.getItem("trash");
  let titelsAsText = localStorage.getItem("titels");
  let pinnedNoticeAsText = localStorage.getItem("numbers");
  if (titelsAsText && pinnedNoticeAsText && trashedCardsAsText&&newCardsAsText) {
    newArchiv = JSON.parse(newCardsAsText);
    titels = JSON.parse(titelsAsText);
    pinnedNotice = JSON.parse(pinnedNoticeAsText);
    newTrash = JSON.parse(trashedCardsAsText);
  }
}

function showmenu() {
  document.getElementById("button_container").classList.add("button_container_show");
  document.getElementById("button_container1").classList.add("button_container_show");
  document.getElementById("button_container2").classList.add("button_container_show");
  document.getElementById("button_container3").classList.remove("d-none");
  document.getElementById("trash").classList.remove("d-none");
  document.getElementById("archiv").classList.remove("d-none");
  document.getElementById("idea").classList.remove("d-none");
  document.getElementById("button_container3").classList.remove("d-none");
  document.getElementById("button_container3").classList.remove("d-none");
  document.getElementById("menu_buttons").classList.add("menu_buttons_show");
  document.getElementById("menu_buttons1").classList.add("menu_buttons_show");
  document.getElementById("menu_buttons2").classList.add("menu_buttons_show");
  document.getElementById("seperator").classList.add("main_menu_show");
}

function closemenu() {
  document.getElementById("button_container").classList.remove("button_container_show");
  document.getElementById("button_container1").classList.remove("button_container_show");
  document.getElementById("button_container2").classList.remove("button_container_show");
  document.getElementById("button_container3").classList.add("d-none");
  document.getElementById("trash").classList.add("d-none");
  document.getElementById("archiv").classList.add("d-none");
  document.getElementById("idea").classList.add("d-none");
  document.getElementById("menu_buttons").classList.remove("menu_buttons_show");
  document.getElementById("menu_buttons1").classList.remove("menu_buttons_show");
  document.getElementById("menu_buttons2").classList.remove("menu_buttons_show");
  document.getElementById("seperator").classList.remove("main_menu_show");
}

function pinmove(i) {
  if (i == titels.length - 1) {
    document.getElementById(`pin${i}`).classList.remove("pin_end");
    document.getElementById(`pin${i}`).classList.add("pin");
    setTimeout(() => {
      document.getElementById(`pin${i}`).classList.remove("pin");
      document.getElementById(`pin${i}`).classList.add("pin_end");
    }, 100);
  }
}
