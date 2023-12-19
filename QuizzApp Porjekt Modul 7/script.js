let quizz = [
  {
    type: "HTML",
    info: "Mach dich bereit das HTML Quizz geht sofort los!",
    questions: [
      "1.Frage: Was bedeutet HTML?",
      "2.Frage: Welches HTML-Element wird verwendet, um einen Absatz zu erstellen?",
      "3.Frage: Welches Attribut wird verwendet, um einen Link in einem neuen Fenster zu öffnen?",
      "4.Frage: Wie wird ein Kommentar in HTML geschrieben?",
      "5.Frage: Welches HTML-Element wird für die strukturierte Liste verwendet?",
      "6.Frage: Welche der folgenden ist keine gültige HTML-Farbcodierung?",
      "7.Frage: Welches HTML-Element wird verwendet, um eine Tabelle zu erstellen?"
    ],
    answerOption: [
      [
        "HighTech Modern Language",
        "HyperText Markup Language",
        "HyperTransfer Markup Language",
        "HyperText Modulation Language"
      ],
      [
        "para",
        "p",
        "text",
        "paragraph"
      ],
      [
        "href='_new'",
        "link='new'",
        "window='_open'",
        "target='_blank'"
      ],
      [
        "!-- Dies ist ein Kommentar -->",
        "// Dies ist ein Kommentar>",
        " /* Dies ist ein Kommentar */>",
        " # Dies ist ein Kommentar>"
      ],
      [
        "o",
        "li",
        "list",
        "ul"
      ],
      [
        "#FF0000",
        "yellow",
        "rgb(255, 0, 0)",
        "hsl(120, 100%, 50%)"
      ],
      [
        "tab",
        "tbl",
        "table",
        "tr"
      ]
    ],
    rightAnswers: [1, 1, 3, 0, 3, 1, 2],
    rightAnswerChecker: []
  },
  {
    type: "CSS",
    info: "Mach dich bereit das CSS Quizz geht sofort los!",
    questions: [
      "1.Frage: Wie wird in CSS die Hintergrundfarbe einer Seite festgelegt?",
      "2.Frage: Welche Einheit wird in CSS für die Größe von Schrift verwendet?",
      "3.Frage: Welches CSS-Selektorzeichen wird verwendet, um alle Elemente auszuwählen?",
      "4.Frage: Wie wird in CSS ein externes Stylesheet eingebunden?",
      "5.Frage: Welche Eigenschaft wird in CSS verwendet, um Text in Großbuchstaben umzuwandeln?",
      "6.Frage: Welches CSS-Element wird verwendet, um einen Schatten um ein Element zu erzeugen?",
      "7.Frage: Wie zentriert man ein Blockelement horizontal in CSS?"
    ],
    answerOption: [
      [
        "color-background",
        "background-color",
        "page-color",
        "bgcolor"
      ],
      [
        "em",
        "px",
        "%size",
        "sp"
      ],
      [
        "#",
        ".",
        "$",
        "*"
      ],
      [
        "link rel='stylesheet' type='text/css' href='external.css'",
        "style>external.css</style",
        "css src='external.css'></css",
        "include stylesheet='external.css'"
      ],
      [
        
        "text-style: uppercase;",
        "transform: text-uppercase;",
        "uppercase: true;",
        "text-transform: uppercase;"
      ],
      [
        "shadow-effect",
        "box-shadow",
        "element-shadow",
        "style-shadow"
      ],
      [
        "center-align: horizontal;",
        "align: center;",
        "margin: auto;",
        "horizontal: center;"
      ]
    ],
    rightAnswers: [1, 1, 3, 0, 3, 1, 2],
    rightAnswerChecker: []
  },
  {
    type: "Javascript",
    info: "Mach dich bereit das Javascript Quizz geht sofort los!",
    questions: [
      "1.Frage: Wie deklariert man eine Variable in JavaScript?",
      "2.Frage: Welches Schlüsselwort wird verwendet, um eine Funktion in JavaScript zu definieren?",
      "3.Frage: Wie vergleicht man den Wert und den Typ zweier Variablen in JavaScript?",
      "4.Frage: Welches Ereignis wird ausgelöst, wenn ein HTML-Formular abgeschickt wird?",
      "5.Frage: Wie fügt man ein Element am Ende eines Arrays in JavaScript hinzu?",
      "6.Frage: Wie ruft man die Anzahl der Elemente in einem Array ab?",
      "7.Frage: "
    ],
    answerOption: [
      [
        "variable myVar;",
        "var myVar;",
        "v myVar;",
        "let myVar;"
      ],
      [
        "func",
        "function",
        "def",
        "method"
      ],
      [
        "==",
        "=",
        "!==",
        "==="
      ],
      [
        "onsubmit",
        "onsend",
        "onform",
        "onsubmitting"
      ],
      [
        "array.insertEnd()",
        "array.append()",
        "array.addToEnd()",
        "array.push()"
      ],
      [
        "array.size",
        "array.length",
        "array.count",
        "array.elements"
      ],
      [
        "Math.randomInt(1, 10)",
        "random(1, 10)",
        "Math.floor(Math.random() * 10) + 1",
        "randomInt(1, 10)"
      ]
    ],
    rightAnswers: [1, 1, 3, 0, 3, 1, 2],
    rightAnswerChecker: []
  }
];


let selected = [];
let AUDIO_SUCCES = new Audio('./sounds/succes.mp3');
let AUDIO_FAIL = new Audio('./sounds/fail.mp3');


function renderOnload() {
  let headline = document.getElementById("quizz_headline");
  let info = document.getElementById("infoline");
  let quizz_Answers = document.getElementById("startquizz");
  hideAcceptDiv();
  clearProgressbar() 
  renderCard(headline,info,quizz_Answers)
}


function renderCard(headline,info,quizz_Answers) {
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
  renderProgressbar(input,0);
  renderInfos(headline,info,start,quizz_type,input);
}


function renderInfos(headline,info,start,quizz_type,input) {
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
  renderProgressbar(input,question_Number);
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
  document.getElementById("quizz_toaster").setAttribute("class", "quizz_toaster toast");
  document.getElementById("quizz_toaster_div").setAttribute("class", "quizz_toaster_div");
}


function checkAnswer(selected_Number, next_question_number, input) {
  const checker = quizz[input]["rightAnswers"][next_question_number - 1];
  if (quizz[input]["questions"].length >= next_question_number) {
    if (checker === selected) {
      quizz[input]['rightAnswerChecker'].push(1)
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
    renderProgressbar(input,next_question_number);
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
  let question = quizz[input]['questions'].length;
  document.getElementById("quizz_toaster").setAttribute("class", "show quizz_toaster toast fade ");
  document.getElementById("quizz_toaster_div").setAttribute("class", "toast fade show quizz_toaster_div z_index");
  document.getElementById("accept_button").setAttribute("onclick",`renderOnload()`);
  document.getElementById("accept_button").innerHTML = `Quizz Reset`;
  document.getElementById("cancel_button").setAttribute(`class`,'d_none');
  document.getElementById("selected_answer").innerHTML = `
  Du hast es geschafft!!!<br>
  Das ${quizz[input]['type']} Quizz ist vorbei danke fürs mitmachen!<br>
  Du hast ${quizz[input]['rightAnswerChecker'].length} von ${question} richtig beantwortet
  <img class="align_right" src="./img/tropy.png" alt="">
  `;
  AUDIO_SUCCES.play();
}


function quizzEndLose(input) {
  let question = quizz[input]['questions'].length;
  document.getElementById("quizz_toaster").setAttribute("class", "show quizz_toaster toast fade ");
  document.getElementById("quizz_toaster_div").setAttribute("class", "toast fade show quizz_toaster_div z_index");
  document.getElementById("accept_button").setAttribute("onclick",`restartQuizz(${input})`);
  document.getElementById("accept_button").innerHTML = `Erneut Versuchen`;
  document.getElementById("cancel_button").setAttribute(`class`,'d_none');
  document.getElementById("selected_answer").innerHTML = `Schade leider war das die falsche Antwort!!!<br>
  Du hast ${quizz[input]['rightAnswerChecker'].length} von ${question} richtig beantwortet.<br>
  Das Quizz ist vorbei danke fürs mitmachen!`;
  AUDIO_FAIL.play();
}


function resetAcceptDiv() {
  document.getElementById("accept_button").innerHTML = `Antwort Bestätigen`;
  document.getElementById("cancel_button").setAttribute(`class`,'btn btn-secondary btn-sm');
}


function renderProgressbar(input,question_Number) {
  let progress = Math.round((question_Number/quizz[input]['questions'].length)*100);
  document.getElementById('progress_container').innerHTML=`
  <div> ${question_Number} von ${quizz[input]['questions'].length}</div>
  <div class="progress" role="progressbar" aria-label="Example with label" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
    <div class="progress-bar" style="width:${progress}%">${progress} %</div>
  </div>
  `;
}


function clearProgressbar() {
  document.getElementById('progress_container').innerHTML=``;
}