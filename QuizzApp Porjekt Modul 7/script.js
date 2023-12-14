let quizz = [
  {
    type: "HTML",
    info: "Mach dich bereit das HTML Quizz geht sofort los!",
    questions: ["1.Frage", "2", "3", "4", "5", "6", "7"],
    answerOption: [
      ["1Antwort", "test", "3", "4"],
      ["1Antwort", "test", "3", "4"],
      ["1Antwort", "test", "3", "4"],
      ["1Antwort", "test", "3", "4"],
      ["1Antwort", "test", "3", "4"],
      ["1Antwort", "test", "3", "4"],
      ["1Antwort", "test", "3", "4"]
    ],
    rightAnswers: [1, 1, 3, 0, 3, 1, 2]
  },
  {
    type: "CSS",
    info: "Mach dich bereit das CSS Quizz geht sofort los!",
    questions: ["1.Frage", "2", "3", "4", "5", "6", "7"],
    answerOption: [
      ["1Antwort", "2", "3", "4"],
      ["1Antwort", "2", "3", "4"],
      ["1Antwort", "2", "3", "4"],
      ["1Antwort", "2", "3", "4"],
      ["1Antwort", "2", "3", "4"],
      ["1Antwort", "2", "3", "4"],
      ["1Antwort", "2", "3", "4"]
    ],
    rightAnswers: [1, 1, 3, 0, 3, 1, 2]
  },
  {
    type: "Javascript",
    info: "Mach dich bereit das Javascript Quizz geht sofort los!",
    questions: ["1.Frage", "2", "3", "4", "5", "6", "7"],
    answerOption: [
      ["1Antwort", "2", "3", "4"],
      ["1Antwort", "2", "3", "4"],
      ["1Antwort", "2", "3", "4"],
      ["1Antwort", "2", "3", "4"],
      ["1Antwort", "2", "3", "4"],
      ["1Antwort", "2", "3", "4"],
      ["1Antwort", "2", "3", "4"]
    ],
    rightAnswers: [1, 1, 3, 0, 3, 1, 2]
  }
];

let selected = [];

function renderOnload() {
  let headline = document.getElementById("quizz_headline");
  let info = document.getElementById("infoline");
  let quizz_Answers = document.getElementById("startquizz");
  hideAcceptDiv();
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
        <a onclick="renderQuizz(${input},0)" class="list-group-item list-group-item-action w-75" id="list-profile-list"
        data-bs-toggle="list" href="#list-profile" role="tab"
        aria-controls="list-profile">Beginne das Quizz</a>
        `;
}



function renderQuizz(input, question_Number) {
  let quizz_type = quizz[input]["answerOption"];
  let quizz_Answers = document.getElementById("startquizz");
  let info = document.getElementById("infoline");
  let question = quizz[input]["questions"];
  hideAcceptDiv();
  quizz_Answers.innerHTML = ``;
  info.innerHTML = question[question_Number];
  renderAnswers(input, question_Number,quizz_type,quizz_Answers);
}

function renderAnswers(input, question_Number,quizz_type,quizz_Answers){
  for (let i = 0; i < quizz_type[question_Number].length; i++) {
    quizz_Answers.innerHTML += `
    <button id="liveToastBtn${i}" onclick="setSelected(${i},${question_Number},${input})" class="list-group-item list-group-item-action w-75" id="list-home-list"
    data-bs-toggle="list" href="#list-home" role="tab"
    aria-controls="list-home">${quizz_type[question_Number][i]}</button>`;
  }
}

function setSelected(selected_Number, question_Number, input) {
  selected = selected_Number;
  showAcceptDiv(selected_Number, question_Number, input);
}

function showAcceptDiv(selected_Number, question_Number, input) {
  const quizz_head = quizz[input]["answerOption"];
  const next_question_number = question_Number + 1;
  const selected_answer = quizz_head[question_Number][selected_Number];
  document.getElementById("quizz_toaster").setAttribute("class", "show quizz_toaster toast fade ");
  document.getElementById("quizz_toaster_div").setAttribute("class", "toast fade show quizz_toaster_div z_index");
  document.getElementById("selected_answer").innerHTML = `Du hast dich für die folgende Antwort entschieden:<br>${selected_answer}`;
  document.getElementById("accept_button").setAttribute("onclick",`checkAnswer(${selected_Number},${next_question_number},${input})`);
  document.getElementById("accept_button").innerHTML = `Antwort Bestätigen`;
}

function cancelSelected() {
  selected = 0;
  document.getElementById("quizz_toaster").setAttribute("class", " toast");
  document.getElementById("quizz_toaster_div").setAttribute("class", "toast");
}

function resetQuizz() {
  resetAcceptDiv();
  renderOnload();
}

function hideAcceptDiv() {
  document
    .getElementById("quizz_toaster")
    .setAttribute("class", "quizz_toaster toast");
  document
    .getElementById("quizz_toaster_div")
    .setAttribute("class", "quizz_toaster_div");
}


function checkAnswer(selected_Number, next_question_number, input) {
  const checker = quizz[input]["rightAnswers"][next_question_number - 1];
  if (quizz[input]["questions"].length >= next_question_number) {
    if (checker === selected) {
      checkWin(input,next_question_number);
    } 
    else if (checker !== selected) {
      renderFalseButton(selected_Number);
      quizzEndLose(input);
    }
  }
}

function checkWin(input,next_question_number) {
  hideAcceptDiv();
  if (quizz[input]["questions"].length > next_question_number) {
    renderQuizz(input, next_question_number);
  }
  else{
    quizzEnd(input);
  }
}

function restartQuizz(input) {
  resetAcceptDiv();
  hideAcceptDiv();
  renderHeadlines(input)
}

function renderFalseButton(selected_Number) {
  document.getElementById(`liveToastBtn${selected_Number}`).setAttribute("class","list-group-item list-group-item-action w-75 bg-danger");
  document.getElementById(`liveToastBtn${selected_Number}`).setAttribute("aria-selected", "false");
  document.getElementById(`liveToastBtn${selected_Number}`).innerHTML = `Falsch!`;
}

function quizzEnd(input){
  document.getElementById("quizz_toaster").setAttribute("class", "show quizz_toaster toast fade ");
  document.getElementById("quizz_toaster_div").setAttribute("class", "toast fade show quizz_toaster_div z_index");
  document.getElementById("selected_answer").innerHTML = `Du hast es geschafft!!!<br>Das ${quizz[input]['type']} Quizz ist vorbei danke fürs mitmachen!`;
  document.getElementById("accept_button").setAttribute("onclick",`renderOnload()`);
  document.getElementById("accept_button").innerHTML = `Quizz Reset`;
  document.getElementById("cancel_button").setAttribute(`class`,'d_none');
}

function quizzEndLose(input) {
  document.getElementById("quizz_toaster").setAttribute("class", "show quizz_toaster toast fade ");
  document.getElementById("quizz_toaster_div").setAttribute("class", "toast fade show quizz_toaster_div z_index");
  document.getElementById("selected_answer").innerHTML = `Schade leider war das die falsche Antwort!!!<br>Das Quizz ist vorbei danke fürs mitmachen!`;
  document.getElementById("accept_button").setAttribute("onclick",`restartQuizz(${input})`);
  document.getElementById("accept_button").innerHTML = `Erneut Versuchen`;
  document.getElementById("cancel_button").setAttribute(`class`,'d_none');
}

function resetAcceptDiv() {
  document.getElementById("accept_button").innerHTML = `Antwort Bestätigen`;
  document.getElementById("cancel_button").setAttribute(`class`,'btn btn-secondary btn-sm');
}
