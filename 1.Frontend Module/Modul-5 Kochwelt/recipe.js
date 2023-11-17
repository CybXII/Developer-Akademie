// Rezept-Tabelle: Default werte falls die Seite nicht keine Werte bekommt
let multiplikator = 1;
let recip_number = 1;

let Titel = `Default`;
let Titelbild = `./img/salad.jpg`;
let Zubereitungszeit = `5 Minuten`;
let Vorbereitungszeit = `5 Minuten`;
let Schwierigkeitsgrad = `simpel`;
let Veröffentlichungsdatum = `25.10.2023`;
let Autor = `Default`;
let Profilbild = "./img/avatar.jpg";
let Zubereitungsanleitung = ``;
let ingredients = [
  "Leer" /*[i=0]*/
  /*[i=1]*/
  /*[i=2]*/
  /*[i=3]*/
  /*[i=4]*/
  /*[i=5]*/
  /*[i=6]*/
  /*[i=7]*/
  /*[i=8]*/
  /*[i=9]*/
];

let amount = [
  1 /*[i=0]*/
  /*[i=1]*/
  /*[i=2]*/
  /*[i=3]*/
  /*[i=4]*/
  /*[i=5]*/
  /*[i=6]*/
  /*[i=7]*/
  /*[i=8]*/
  /*[i=9]*/
];

//Rezeptseite Onload
function loadSite() {
  let number = 1;
  if (localStorage.length == 1) {
    recip_number = 1;
    greekSalad(number);
  } else if (localStorage.length == 2) {
    recip_number = 1;
    greekSalad(number);
  } else if (localStorage.length == 3) {
    recip_number = 2;
    tomatosoup(number);
  } else if (localStorage.length == 4) {
    recip_number = 3;
    fieldSalad(number);
  } else if (localStorage.length == 5) {
    recip_number = 4;
    pilzrisotto(number);
  } else if (localStorage.length == 6) {
    recip_number = 5;
    pizza(number);
  } else if (localStorage.length == 7) {
    recip_number = 6;
    waffles(number);
  } else console.log("failed to load recips onload");
}

document.addEventListener("DOMContentLoaded", function() {
  loadSite();
});

//Zwischen Rezepten hin und her switchen

function switch_recip_forward() {
  if (recip_number == 1) {
    clearTemplate();
    document.getElementById("portions").value = "1";
    multiplikator = 1;
    recip_number = 2;
    tomatosoup(multiplikator);
  } else if (recip_number == 2) {
    clearTemplate();
    document.getElementById("portions").value = "1";
    multiplikator = 1;
    recip_number = 3;
    fieldSalad(multiplikator);
  } else if (recip_number == 3) {
    clearTemplate();
    document.getElementById("portions").value = "1";
    multiplikator = 1;
    recip_number = 4;
    pilzrisotto(multiplikator);
  } else if (recip_number == 4) {
    clearTemplate();
    document.getElementById("portions").value = "1";
    multiplikator = 1;
    recip_number = 5;
    pizza(multiplikator);
  } else if (recip_number == 5) {
    clearTemplate();
    document.getElementById("portions").value = "1";
    multiplikator = 1;
    recip_number = 6;
    waffles(multiplikator);
  } else if (recip_number == 6) {
    clearTemplate();
    document.getElementById("portions").value = "1";
    multiplikator = 1;
    recip_number = 1;
    greekSalad(multiplikator);
  }
}
function switch_recip_backward() {
  if (recip_number == 1) {
    clearTemplate();
    document.getElementById("portions").value = "1";
    multiplikator = 1;
    recip_number = 6;
    waffles(multiplikator);
  } else if (recip_number == 2) {
    clearTemplate();
    document.getElementById("portions").value = "1";
    multiplikator = 1;
    recip_number = 1;
    greekSalad(multiplikator);
  } else if (recip_number == 3) {
    clearTemplate();
    document.getElementById("portions").value = "1";
    multiplikator = 1;
    recip_number = 2;
    tomatosoup(multiplikator);
  } else if (recip_number == 4) {
    clearTemplate();
    document.getElementById("portions").value = "1";
    multiplikator = 1;
    recip_number = 3;
    fieldSalad(multiplikator);
  } else if (recip_number == 5) {
    clearTemplate();
    document.getElementById("portions").value = "1";
    multiplikator = 1;
    recip_number = 4;
    pilzrisotto(multiplikator);
  } else if (recip_number == 6) {
    clearTemplate();
    document.getElementById("portions").value = "1";
    multiplikator = 3;
    recip_number = 5;
    pizza(multiplikator);
  }
}

// Rezept Mengen Rechner mit dem Multiplikator

function calculate() {
  multiplikator = +document.getElementById("portions").value;
  if (recip_number == 1) {
    greekSalad(multiplikator);
  } else if (recip_number == 2) {
    tomatosoup(multiplikator);
  } else if (recip_number == 3) {
    fieldSalad(multiplikator);
  } else if (recip_number == 4) {
    pilzrisotto(multiplikator);
  } else if (recip_number == 5) {
    pizza(multiplikator);
  } else if (recip_number == 6) {
    waffles(multiplikator);
  } else console.log("failed to calculate");
}

// Rezept-Tabelle füllen/reinigungs funktionen:

function addIngredient1(amount, ingredient) {
  document.getElementById("ingredient-table").innerHTML += `
        <div class="ingredient grey-background">${amount} ${ingredient}</div>`;
}

function addIngredient2(amount, ingredient) {
  document.getElementById("ingredient-table").innerHTML += `
        <div class="ingredient">${amount} ${ingredient}</div>`;
}

function clearTemplate() {
  document.getElementById("ingredient-table").innerHTML = ``;
}

function write_ingredients(ingredients, amount, multiplikator) {
  for (let i = 0; i < ingredients.length; i++) {
    document.getElementById(
      "ingredient-table"
    ).innerHTML += `<div class="ingredient"><div id="amount">${amount[i] *
      multiplikator}</div> ${ingredients[i]}</div>`;
    i++;
    if (i < ingredients.length) {
      /*  for (let y = 0; y < 1; y++) */ document.getElementById(
        "ingredient-table"
      ).innerHTML += `<div class="ingredient grey-background"><div id="amount">
            ${amount[i] * multiplikator}</div> ${ingredients[i]}
            </div>`;
    }
  }
}

//Tobis funktion 
function write_ingredients_tobi(ingredients, amount, multiplikator) {
  for (let i = 0; i < ingredients.length; i++){
    if (i % 2 == 0) {
    document.getElementById(
      "ingredient-table"
    ).innerHTML += `<div class="ingredient"><div id="amount">${amount[i] *
      multiplikator}</div> ${ingredients[i]}</div>`;
      i++;
    }
    if (i % 2 !== 0) {
    document.getElementById(
    "ingredient-table"
    ).innerHTML += `<div class="ingredient grey-background"><div id="amount">
        ${amount[i] * multiplikator}</div> ${ingredients[i]}
        </div>`;
    }
  }
}

// Rezept-Info ausfüllen
function recipeInfo(
  Titel,
  Titelbild,
  Zubereitungsanleitung,
  Zubereitungszeit,
  Schwierigkeitsgrad,
  Veröffentlichungsdatum,
  Vorbereitungszeit,
  Zubereitungszeit,
  Autor,
  Profilbild
) {
  document.getElementById("recipe-title").innerHTML = `${Titel}`;
  document.getElementById("recipe-image").src = `${Titelbild}`;
  document.getElementById(
    "instructions"
  ).innerHTML = `${Zubereitungsanleitung}`;

  document.getElementById("cooking-time").innerHTML = `${Zubereitungszeit}`;
  document.getElementById(
    "difficulty-level"
  ).innerHTML = `${Schwierigkeitsgrad}`;
  document.getElementById(
    "publication-date"
  ).innerHTML = `${Veröffentlichungsdatum}`;

  document.getElementById(
    "preparation-time"
  ).innerHTML = `${Vorbereitungszeit}`;
  document.getElementById(
    "total-cooking-time"
  ).innerHTML = `${Zubereitungszeit}`;

  document.getElementById("author-name").innerHTML = `${Autor}`;
  document.getElementById("avatar").src = `${Profilbild}`;
}

////////////////REZEPTE//////////////////////////////////////////////////////////

// REZEPT: GRIECHISCHER SALAT [LUISE]

function greekSalad() {
  clearTemplate();

  let Titel = `Griechischer Salat`;
  let Titelbild = `./img/salad.jpg`;
  let Zubereitungszeit = `15 Minuten`;
  let Vorbereitungszeit = `15 Minuten`;
  let Schwierigkeitsgrad = `simpel`;
  let Veröffentlichungsdatum = `17.10.2023`;
  let Autor = `Luise`;
  let Profilbild = "./img/luise.jpg";
  let Zubereitungsanleitung = `Gurke waschen und ungeschält in dünne Scheiben oder Stücke schneiden.
  Paprika waschen, entkernen und in dünne Streifen schneiden. Tomaten waschen und achteln. Zwiebeln schälen und in feine Ringe schneiden. 
  Schafskäse würfeln und mit Oregano bestreuen. Oliven abgießen und mit Gurke, Paprika, Tomate, Zwiebeln und Schafskäse in eine Schüssel geben.
  Olivenöl, Zitronensaft, Salz und Pfeffer zu einer Soße verrühren und über den Salat gießen. Umrühren.`;

  ingredients = [
    "Salatgurke(n)",
    "Paprikaschote(n), rot",
    "g Tomate(n)",
    "Zwiebel(n)",
    "g Schafskäse",
    "Dose(n) Oliven, schwarze, ca 100g",
    "Prise(n) Salz und Pfeffer",
    "Zitrone(n)",
    "mL Olivenöl",
    "TL Oregano"
  ];
  amount = [0.25, 0.5, 125, 0.5, 50, 0.25, 1, 0.25, 30, 1];
  write_ingredients(ingredients, amount, multiplikator);
  recipeInfo(
    Titel,
    Titelbild,
    Zubereitungsanleitung,
    Zubereitungszeit,
    Schwierigkeitsgrad,
    Veröffentlichungsdatum,
    Vorbereitungszeit,
    Zubereitungszeit,
    Autor,
    Profilbild
  );
}

// REZEPT: TOMATENSUPPE [LUISE]

function tomatosoup() {
  clearTemplate();

  let Titel = `Tomatensuppe`;
  let Titelbild = `./img/tomatosoup.jpg`;
  let Zubereitungszeit = `35 Minuten`;
  let Vorbereitungszeit = `15 Minuten`;
  let Schwierigkeitsgrad = `simpel`;
  let Veröffentlichungsdatum = `20.10.2023`;
  let Autor = `Luise`;
  let Profilbild = "./img/luise.jpg";

  let Zubereitungsanleitung = `Zwiebeln und Knoblauch schälen und in grobe Stücke schneiden.
    Ein Kräutersäckchen (z.B. Teefilter für losen Tee) mit Lorbeerblättern, Thymian und Pfefferkörnern füllen und mit Küchengarn verschließen. 
    Die Zwiebel- und Knoblauch-Würfel in Olivenöl andünsten. Den Zucker darüber streuen und schmelzen lassen.
    Die geschälten Tomaten in den Topf geben und etwas zerdrücken.
    Das Wasser dazugießen, Tomatenmark und Salz einrühren und das Kräutersäckchen dazugeben.
    Kurz aufkochen lassen und mit Deckel bei mittlerer Hitze 20 Minuten köcheln lassen. 
    Die Sahne halbfest schlagen und in den Kühlschrank stellen.
    Nach Ablauf der 20 Minuten die Suppe von der Kochstelle nehmen, das Kräutersäckchen entfernen und die Suppe mit einem Pürierstab
    fein pürieren. Mit Salz, Pfeffer und Zucker abschmecken.
    Mit Basilikumblättern garnieren und mit Sahne verfeinern.`;

  ingredients = [
    "g geschälte Tomaten" /*[i=0]*/,
    "g Zwiebel(n)" /*[i=1]*/,
    "mL Wasser" /*[i=2]*/,
    "Knoblauchzehe(n) " /*[i=3]*/,
    "mL Schlagsahne" /*[i=4]*/,
    "EL Olivenöl" /*[i=5]*/,
    "Prise(n) Salz und Pfeffer" /*[i=6]*/,
    "Blatt Basilikum" /*[i=7]*/,
    "TL Thymian (getrocknet)"
  ];

  amount = [
    200 /*[i=0]*/,
    100 /*[i=1]*/,
    100 /*[i=2]*/,
    1 /*[i=3]*/,
    100 /*[i=4]*/,
    1 /*[i=5]*/,
    1 /*[i=6]*/,
    1 /*[i=7]*/,
    1
  ];

  write_ingredients(ingredients, amount, multiplikator);
  recipeInfo(
    Titel,
    Titelbild,
    Zubereitungsanleitung,
    Zubereitungszeit,
    Schwierigkeitsgrad,
    Veröffentlichungsdatum,
    Vorbereitungszeit,
    Zubereitungszeit,
    Autor,
    Profilbild
  );
}

// REZEPT: FELDSALAT [ALEX]
function fieldSalad(multiplikator) {
  clearTemplate();

  Titel = `Feldsalat`;
  Titelbild = `./img/fieldsalad.jpg`;
  Zubereitungszeit = `5 Minuten`;
  Vorbereitungszeit = `10 Minuten`;
  Schwierigkeitsgrad = `simpel`;
  Veröffentlichungsdatum = `25.10.2023`;
  Autor = `Alex`;
  Profilbild = "./img/alex.jpg";
  Zubereitungsanleitung =       `Feldsalat und Tomaten waschen. Anschließend die Tomaten halbieren und in dünne Scheiben schneiden.
                                Die Speckwürfel in der Pfanne anrösten. Dannach den Speck, die Tomaten und den Feldsalat in eine große
                                Schüssel geben. Für das Dressing die Schlagsahne, Sonnenblumenöl und Weinbrandessig
                                verrühren und mit Salz und Pfeffer abschmecken.Das Dressing zum Feldsalat dazugeben und alles gut umrühren.
                                Guten Appetit!
                                Eine Portion reicht für 4 Personen als Beilage.`;
  ingredients = [
    "g Feldsalat",
    "große Tomate(n)",
    "g Speck",
    "g Schlagsahne",
    "EL Sonnenblumenöl",
    "EL Weinbrandessig",
    "Prise(n) Salz & Pfeffer"
  ];

  amount = [150, 1, 125, 100, 2, 1, 1];

  write_ingredients(ingredients, amount, multiplikator);
  recipeInfo(
    Titel,
    Titelbild,
    Zubereitungsanleitung,
    Zubereitungszeit,
    Schwierigkeitsgrad,
    Veröffentlichungsdatum,
    Vorbereitungszeit,
    Zubereitungszeit,
    Autor,
    Profilbild
  );
}

// REZEPT: PILZRISOTTO [NINA]
function pilzrisotto() {
  clearTemplate();

  let Titel = `Pilzrisotto`;
  let Titelbild = `./img/risotto.jpg`;
  let Zubereitungszeit = `20 Minuten`;
  let Vorbereitungszeit = `20 Minuten`;
  let Schwierigkeitsgrad = `simpel`;
  let Veröffentlichungsdatum = `25.10.2023`;
  let Autor = `Nina`;
  let Profilbild = "./img/autor_nina.JPEG";

  let Zubereitungsanleitung = `Die Pilze putzen, die großen in Würfel schneiden. Die Schalotten und den Knoblauch schälen, 
                              fein hacken und in 1 EL Butter in einem Topf andünsten und den Reis kurz mitdünsten. Mit Weißwein 
                              ablöschen und den Geflügelfond hinzufügen. Den Reis etwa 12 Min. unter ständigem Rühren schwach kochen lassen,
                              danach den Topf vom Herd nehmen. Die restliche Butter und den Parmesan darunter rühren.
                              Das Olivenöl in der Pfanne erhitzen, die zweite Schalotte dazugeben und die Pilze darin etwa 3 Min. andünsten.
                              Die Pilze unter das Risotto heben, alles mit Salz, Muskat und Pfeffer würzen und mit der gehackten Petersilie
                              bestreuen.
                              Tipp: Als Hauptgericht reicht die Menge für 2 Personen, als Beilage für 4 Personen.
                              Dazu passt ein grüner Salat.`;

  ingredients = [
    "g Pilze gemischt (Champignons, Pfifferlinge, Steinpilze" /*[i=0]*/,
    "g Risottoreis" /*[i=1]*/,
    "Schalotte(n)" /*[i=2]*/,
    "Bund Petersilie" /*[i=3]*/,
    "Knoblauchzehe(n)" /*[i=4]*/,
    "g Butter" /*[i=5]*/,
    "mL Weißwein" /*[i=6]*/,
    "mL Hühnerbrühe" /*[i=7]*/,
    "g geriebener Parmesan" /*[i=8]*/,
    "TL Olivenöl" /*[i=9]*/,
    "Prise(n) Salz und Pfeffer" /*[i=10]*/,
    "Prise(n) Muskat" /*[i=11]*/
  ];

  amount = [
    150 /*[i=0]*/,
    100 /*[i=1]*/,
    1 /*[i=2]*/,
    0.5 /*[i=3]*/,
    1 /*[i=4]*/,
    20 /*[i=5]*/,
    50 /*[i=6]*/,
    200 /*[i=7]*/,
    25 /*[i=8]*/,
    10 /*[i=9]*/,
    1 /*[i=10]*/,
    1 /*[i=11]*/
  ];

  write_ingredients(ingredients, amount, multiplikator);
  recipeInfo(
    Titel,
    Titelbild,
    Zubereitungsanleitung,
    Zubereitungszeit,
    Schwierigkeitsgrad,
    Veröffentlichungsdatum,
    Vorbereitungszeit,
    Zubereitungszeit,
    Autor,
    Profilbild
  );
}

// REZEPT: Pizza [Tobias]
function pizza() {
  clearTemplate();
  let Titel = `Pizzateig`;
  let Titelbild = `./img/pizza.jpg`;
  let Zubereitungszeit = `15 Minuten`;
  let Vorbereitungszeit = `2 Tage 30 Minuten`;
  let Schwierigkeitsgrad = `simpel`;
  let Veröffentlichungsdatum = `2.11.2023`;
  let Autor = `Tobias`;
  let Profilbild = "./img/tobias.jpg";
  let Zubereitungsanleitung = `Im lauwarmen Wasser zusammen mit dem Olivenöl die Hefe mit dem Salz und dem Zucker auflösen.
    Dann das Mehl hinzugeben un eine glatten Teig kneten.
    Im Anschluss den Teig eine halbe Stunde an einem warmen Ort gehen lassen.
    Danach nochmals knetenund abgedeckt 2 Tage im Kühlschrank ruhen lassen.
    Das ganze ist für 6 Personen`;
  ingredients = [
    "ml lauwarmes Wasser" /*[i=0]*/,
    "ml Olivenöl" /*[i=1]*/,
    "g Frischhefe" /*[i=2]*/,
    "g Salz" /*[i=3]*/,
    "Prise(n) Zucker" /*[i=4]*/,
    "g feines Mehl" /*[i=5]*/
  ];
  amount = [
    500 /*[i=0]*/,
    25 /*[i=1]*/,
    40 /*[i=2]*/,
    20 /*[i=3]*/,
    1 /*[i=4]*/,
    925 /*[i=5]*/
  ];
  write_ingredients_tobi(ingredients, amount, multiplikator);

  recipeInfo(
    Titel,
    Titelbild,
    Zubereitungsanleitung,
    Zubereitungszeit,
    Schwierigkeitsgrad,
    Veröffentlichungsdatum,
    Vorbereitungszeit,
    Zubereitungszeit,
    Autor,
    Profilbild
  );
}
function waffles() {
  clearTemplate();
  let Titel = `Waffeln`;
  let Titelbild = `./img/waffles.jpg`;
  let Zubereitungszeit = `40 Minuten`;
  let Vorbereitungszeit = `10 Minuten`;
  let Schwierigkeitsgrad = `simpel`;
  let Veröffentlichungsdatum = `2.11.2023`;
  let Autor = `Tobias`;
  let Profilbild = "./img/tobias.jpg";
  let Zubereitungsanleitung = `Die Eier verquirlen und mit dem Zucker und der Margerine verrühren.
    Vanillezucker Mehl und Backpulver hinzugeben und verrühren.
    Jetzt sollte der Teig etwas klebrig sein.
    Zum Schluss noch die Milch unterrühren bis der Teig eine weiche Konsistenz hat.
    Danach kann man im heißen Waffeleisen die Waffeln backen.
    Das ganze ist für 5 Personen`;
  ingredients = [
    "g Zucker" /*[i=0]*/,
    "g flüssige Margerine" /*[i=1]*/,
    "Eier" /*[i=2]*/,
    "Pck. Vanillezucker" /*[i=3]*/,
    "g Mehl" /*[i=4]*/,
    "Liter Milch" /*[i=5]*/,
    "Pck. Backpulver" /*[i=6]*/
  ];
  amount = [
    500 /*[i=0]*/,
    500 /*[i=1]*/,
    10 /*[i=2]*/,
    2 /*[i=3]*/,
    1000 /*[i=4]*/,
    1 /*[i=5]*/,
    1 /*[i=6]*/
  ];
  write_ingredients_tobi(ingredients, amount, multiplikator);
  recipeInfo(
    Titel,
    Titelbild,
    Zubereitungsanleitung,
    Zubereitungszeit,
    Schwierigkeitsgrad,
    Veröffentlichungsdatum,
    Vorbereitungszeit,
    Zubereitungszeit,
    Autor,
    Profilbild
  );
}

// REZEPT: TEMPLATE (Alte Vorlage von Luise)

// function rezeptX() {

//     clearTemplate();

//     let Titel = ``;
//     let Titelbild = ``;
//     let Zubereitungszeit = ``;
//     let Vorbereitungszeit = ``;
//     let Schwierigkeitsgrad = ``;
//     let Veröffentlichungsdatum = ``;
//     let Autor = ``;
//     let Profilbild = '';

//     let Zubereitungsanleitung = ``

//     addIngredient1('', '(n)');
//     addIngredient2('', '(n)');
//     addIngredient1('', '(n)');
//     addIngredient2('', '(n)');
//     addIngredient1('', '(n)');
//     addIngredient2('', '(n)');
//     addIngredient1('', '(n)');
//     addIngredient2('', '(n)');
//     addIngredient1('', '(n)');
//     addIngredient2('', '(n)');
//     addIngredient1('', '(n)');
//     addIngredient2('', '(n)');
//     addIngredient1('', '(n)');
//     // ^ Bis hier hin ausfüllen ^

//     document.getElementById('recipe-title').innerHTML = `${Titel}`;
//     document.getElementById('recipe-image').src = `${Titelbild}`;
//     document.getElementById('instructions').innerHTML = `${Zubereitungsanleitung}`;

//     document.getElementById('cooking-time').innerHTML = `${Zubereitungszeit}`;
//     document.getElementById('difficulty-level').innerHTML = `${Schwierigkeitsgrad}`;
//     document.getElementById('publication-date').innerHTML = `${Veröffentlichungsdatum}`;

//     document.getElementById('preparation-time').innerHTML = `${Vorbereitungszeit}`;
//     document.getElementById('total-cooking-time').innerHTML = `${Zubereitungszeit}`;

//     document.getElementById('author-name').innerHTML = `${Autor}`;
//     document.getElementById('avatar').src = `${Profilbild}`;
// }

/*Schleife zum    
for (let i= 1; i < ingredient.length; i++){
    if (i == [1,3,5,7,9]){
    addIngredient1(number, amount, ingredient)}
    else if (i == [2,4,6,8,10]){
    addIngredient2(number, amount, ingredient)}   
    else console.log(fail)    
}
  */
