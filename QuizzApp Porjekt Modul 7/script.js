let quizz = [
  {
    type: "HTML",
    info: "Mach dich bereit das HTML Quizz geht sofort los!",
    questions: [
      ["1", "2", "3", "4", "5", "6", "7"],
      ["1", "2", "3", "4", "5", "6", "7"],
      ["1", "2", "3", "4", "5", "6", "7"],
      ["1", "2", "3", "4", "5", "6", "7"],
      ["1", "2", "3", "4", "5", "6", "7"],
      ["1", "2", "3", "4", "5", "6", "7"],
      ["1", "2", "3", "4", "5", "6", "7"]
    ],
    answers: [
      ["1", "2", "3", "4"],
      ["1", "2", "3", "4"],
      ["1", "2", "3", "4"],
      ["1", "2", "3", "4"],
      ["1", "2", "3", "4"],
      ["1", "2", "3", "4"],
      ["1", "2", "3", "4"]
    ],
    options: [[2], [0], [0], [0], [0], [0], [0]]
  },
  {
    type: "CSS",
    info: "Mach dich bereit das CSS Quizz geht sofort los!",
    questions: [
      ["1", "2", "3", "4", "5", "6", "7"],
      ["1", "2", "3", "4", "5", "6", "7"],
      ["1", "2", "3", "4", "5", "6", "7"],
      ["1", "2", "3", "4", "5", "6", "7"],
      ["1", "2", "3", "4", "5", "6", "7"],
      ["1", "2", "3", "4", "5", "6", "7"],
      ["1", "2", "3", "4", "5", "6", "7"]
    ],
    answers: [
      ["1", "2", "3", "4"],
      ["1", "2", "3", "4"],
      ["1", "2", "3", "4"],
      ["1", "2", "3", "4"],
      ["1", "2", "3", "4"],
      ["1", "2", "3", "4"],
      ["1", "2", "3", "4"]
    ],
    options: [[2], [0], [0], [0], [0], [0], [0]]
  },
  {
    type: "Javascript",
    info: "Mach dich bereit das Javascript Quizz geht sofort los!",
    questions: [
      ["1", "2", "3", "4", "5", "6", "7"],
      ["1", "2", "3", "4", "5", "6", "7"],
      ["1", "2", "3", "4", "5", "6", "7"],
      ["1", "2", "3", "4", "5", "6", "7"],
      ["1", "2", "3", "4", "5", "6", "7"],
      ["1", "2", "3", "4", "5", "6", "7"],
      ["1", "2", "3", "4", "5", "6", "7"]
    ],
    answers: [
      ["1", "2", "3", "4"],
      ["1", "2", "3", "4"],
      ["1", "2", "3", "4"],
      ["1", "2", "3", "4"],
      ["1", "2", "3", "4"],
      ["1", "2", "3", "4"],
      ["1", "2", "3", "4"]
    ],
    options: [[2], [0], [0], [0], [0], [0], [0]]
  }
];

let selected = 0;

function renderOnload() {
  let headline = document.getElementById("quizz_headline");
  let info = document.getElementById("infoline");
  let quizz_Answers = document.getElementById("startquizz");

  headline.innerHTML = `
   Herzlich Willkommen bei Alexanders QuizzApp<br>
   `;
  info.innerHTML = `
   Suche dir eine Quizz Kategorie aus und dann kann es schon direkt los gehen!!!
   `;
  document.getElementById("startquizz");
  quizz_Answers.innerHTML = `
   Sobald du eine Kategorie ausgewählt hast kannste du eine von 4 Antworten zu eine Frage wählen und mit dem Bestätigen Button zur nächsten Frage springen. Am Ende des Quizz's bekommst du dein Ergebnis!
   <br>
   <br>
   <br>

   Viel Erfolg 
   `;
}

function renderHeadlines(input) {
  const quizz_type = quizz[input]["type"];
  let headline = document.getElementById("quizz_headline");
  let info = document.getElementById("infoline");
  let start = document.getElementById("startquizz");

  headline.innerHTML = `
        ${quizz_type} Quizz
        `;
  info.innerHTML = `
        Mach dich bereit das ${quizz_type} Quizz geht sofort los.
        `;
  start.innerHTML = `
        <a onclick="renderQuizz(${input})" class="list-group-item list-group-item-action w-75" id="list-profile-list"
        data-bs-toggle="list" href="#list-profile" role="tab"
        aria-controls="list-profile">Beginne das Quizz</a>
        `;
}

function renderQuizz(input) {
  const quizz_type = quizz[input]["type"];
  let quizz_Answers = document.getElementById("startquizz");
  let info = document.getElementById("infoline");
  let question = quizz[input]["questions"];

  info.innerHTML = question[0];

  quizz_Answers.innerHTML = `
    <button id="liveToastBtn" onclick="setSelected(1)" class="list-group-item list-group-item-action active w-75" id="list-home-list"
    data-bs-toggle="list" href="#list-home" role="tab"
    aria-controls="list-home">Antwort1</button>
    <button id="liveToastBtn" onclick="setSelected(2)" class="list-group-item list-group-item-action w-75" id="list-profile-list"
    data-bs-toggle="list" href="#list-profile" role="tab"
    aria-controls="list-profile">Antwort2</button>
    <button id="liveToastBtn" onclick="setSelected(3)" class="list-group-item list-group-item-action w-75" id="list-messages-list"
    data-bs-toggle="list" href="#list-messages" role="tab"
    aria-controls="list-messages">Antwort3</button>
    <button id="liveToastBtn" onclick="setSelected(4)" class="list-group-item list-group-item-action w-75" id="list-settings-list"
    data-bs-toggle="list" href="#list-settings" role="tab"
    aria-controls="list-settings">Antwort4</button>
    `;
}

function setSelected(selected_Number) {
  selected = selected_Number;
  document.getElementById('quizz_toaster').setAttribute('class','show quizz_toaster toast fade ')
  document.getElementById('quizz_toaster_div').setAttribute('class','toast fade show quizz_toaster_div z_index')
}

function cancelSelected() {
    selected = 0;
    document.getElementById('quizz_toaster').setAttribute('class',' toast  ')
    document.getElementById('quizz_toaster_div').setAttribute('class','toast')
  
}

function resetQuizz() {
  renderOnload();
}
