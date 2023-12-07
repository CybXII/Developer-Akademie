
let user = [
  {
    name: "Rocket.inc",
    avatar: "./img/profile.jpg"
  },
  {
    name: "futurexoxo",
    avatar: "./img/profile.jpg"
  },
  {
    name: "test",
    avatar: "./img/profile.jpg"
  },
];

let posts = [
  {
    author: user[0]['name'],
    image: "./img/launch.jpg",
    description: "Raketen Launch voller erfolg für Rockets",
    location: "Germany",
    likes: [120346],
    liked: true
  },
  {
    author: user[1]['name'],
    image: "./img/galaxy.jpg",
    description: "In dieser kosmischen Kulisse zeichnet sich die Zukunft der Menschheit ab. Einzelne Lichtpunkte, vielleicht Raumstationen oder Siedlungen auf fernen Planeten, sind als winzige Markierungen in dieser riesigen Galaxie erkennbar. Sie repräsentieren menschliche Vorposten und die Ausdehnung unserer Zivilisation in den Weltraum. Das Bild trägt die Botschaft, dass die Zukunft der Menschheit nicht nur auf der Erde liegt, sondern dass wir bestrebt sind, unsere Existenz über die Grenzen unseres Heimatplaneten hinaus auszudehnen. Es symbolisiert den menschlichen Drang nach Erkundung, Wissen und Fortschritt, während wir uns auf eine Zukunft vorbereiten, die über die Sterne hinausreicht.",
    location: "Somewhere in Space",
    likes: [10689],
    liked: false
  },
  {
    author: user[2]['name'],
    image: "./img/galaxy.jpg",
    description: "In dieser kosmischen Kulisse zeichnet sich die Zukunft der Menschheit ab. Einzelne Lichtpunkte, vielleicht Raumstationen oder Siedlungen auf fernen Planeten, sind als winzige Markierungen in dieser riesigen Galaxie erkennbar. Sie repräsentieren menschliche Vorposten und die Ausdehnung unserer Zivilisation in den Weltraum. Das Bild trägt die Botschaft, dass die Zukunft der Menschheit nicht nur auf der Erde liegt, sondern dass wir bestrebt sind, unsere Existenz über die Grenzen unseres Heimatplaneten hinaus auszudehnen. Es symbolisiert den menschlichen Drang nach Erkundung, Wissen und Fortschritt, während wir uns auf eine Zukunft vorbereiten, die über die Sterne hinausreicht.",
    location: "-",
    likes: [0],
    liked: false
  }
];


function show() {
  renderPosts();

}


function renderPosts(){
  document.getElementById("postcontainer").innerHTML = "";

  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];

    document.getElementById("postcontainer").innerHTML += `
        <div class="post">
        <div class="post_img_container"><img class="postimg"src="${post["image"]}"></div>
        <div class="post_buttons" >
        <div class="likes"><h2>Likes:</h2> ${post["likes"]}</div>
        <div id="post${i}"></div>
        </div>
        <div>
            <div class="author"><h2>Erstellt von:</h2> ${post["author"]} </div>
            <div class="description"><h2>Nachricht:</h2>${post["description"]}</div>
            <div class="location"><h2>Standort:</h2> ${post["location"]}</div>
        </div>
        </div>
        `;
    loadLikedButtons(i);
    loadMenu()
  }
}

function loadLikedButtons(index) {
  const post = posts[index];
  if (post["liked"]== true) {
    renderRedHeart(index);
  } else {
    renderBlackHeart(index);
  }
}

function loadMenu(){
  document.getElementById(`menuContainer`).innerHTML =`
  <img src="./img/main.svg" alt="">
  <img src="./img/rocket.svg" alt="">
  <img src="./img/navigation.svg" alt="">
  <img src="./img/heart_red.svg" alt="">
  <img class="profile" src="${user[0]['avatar']}" alt="">
  `;
}

function renderRedHeart(index) {
    document.getElementById(`post${index}`).innerHTML =``;
    document.getElementById(`post${index}`).innerHTML +=`<img class="liked" src="./img/heart_red.svg" alt="" onclick="removeLike(${index})">`;
}

function renderBlackHeart(index) {
    document.getElementById(`post${index}`).innerHTML =``;
    document.getElementById(`post${index}`).innerHTML +=`<img class="liked" src="./img/heart_black.svg" alt="" onclick="removeLike(${index})">`;
}

function removeLike(index) {
  const post = posts[index];
  
  if (post['liked'] === true) {
      post['liked'] = false;
      post['likes']--;
  } else {
      post['liked'] = true;
      post['likes']++;
  }
  
  show();
}
