let user = [
  {
    name: "Rocket.inc",
    avatar: "./img/profile.jpg"
  },
  {
    name: "futurexoxo",
    avatar: "./img/avatar2.jpg"
  },
  {
    name: "dogs_on_stocks",
    avatar: "./img/avatar1.jpg"
  },
]


let posts = [
  {
    author: user[0]['name'],
    image: "./img/launch.jpg",
    description: "Raketen Launch voller erfolg für Rockets",
    location: "Germany",
    likes: [120346],
    liked: true,
    coments:[]
  },
  {
    author: user[1]['name'],
    image: "./img/galaxy.jpg",
    description: "In dieser kosmischen Kulisse zeichnet sich die Zukunft der Menschheit ab. Einzelne Lichtpunkte, vielleicht Raumstationen oder Siedlungen auf fernen Planeten, sind als winzige Markierungen in dieser riesigen Galaxie erkennbar. Sie repräsentieren menschliche Vorposten und die Ausdehnung unserer Zivilisation in den Weltraum. Das Bild trägt die Botschaft, dass die Zukunft der Menschheit nicht nur auf der Erde liegt, sondern dass wir bestrebt sind, unsere Existenz über die Grenzen unseres Heimatplaneten hinaus auszudehnen. Es symbolisiert den menschlichen Drang nach Erkundung, Wissen und Fortschritt, während wir uns auf eine Zukunft vorbereiten, die über die Sterne hinausreicht.",
    location: "Somewhere in Space",
    likes: [10689],
    liked: false,
    coments:[]
  },
  {
    author: user[2]['name'],
    image: "./img/aktien.jpg",
    description: "Investoren, die in Raumfahrtaktien interessiert sind, beobachten die Entwicklungen in der Branche, innovative Technologien, Vertragsabschlüsse mit Regierungen oder privaten Partnern und den Erfolg von Raumfahrtmissionen. Der Sektor hat in den letzten Jahren verstärktes Interesse auf sich gezogen, insbesondere durch die Bemühungen von privaten Unternehmen wie SpaceX und Blue Origin.",
    location: "-",
    likes: [0],
    liked: false,
    coments:[]
  }
]


function show() {
  renderPosts();
  renderContacts();
}


function renderPosts(){
  document.getElementById("postcontainer").innerHTML = "";
  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    const newPost = document.getElementById("postcontainer");
    load(post,i)
    renderPostContainer(post,newPost,i);
    renderComents(post,i);
    loadMenu()
    loadLikedButtons(i);
  }
}


function renderPostContainer(post,newPost,i){
  newPost.innerHTML +=`
  <div id="coments${i}" class="post">
  <div class="post_img_container"><img class="postimg"src="${post["image"]}"></div>
  <div class="post_buttons" >
    <div class="likes">
    <div class="author"><h2>Author:</h2> ${post["author"]}</div>
      <h2>Likes:</h2> ${post["likes"]}
      <div id="post${i}"></div>
    </div>
  </div>
  `;
  renderComentContainer(post,i)
}


function renderComentContainer(post,i){
  const content = document.getElementById(`coments${i}`);
  content.innerHTML +=`
  <div>
    <div class="description"><h2>Nachricht:</h2>${post["description"]}</div>
    <div class="location"><h2>Standort:</h2> ${post["location"]}</div>
    <div id="innerContent${i}" class="inner_content"><h2>Kommentare</h2></div>
  </div>
  <button onclick="openNewComent(${i})">Kommentieren</button>
  </div>`;
}


function renderComents(post,i){
  const contentDiv = document.getElementById(`innerContent${i}`);
  for (let y = 0; y < post['coments'].length; y++) {
    const content = post['coments'][y];
    contentDiv.innerHTML+=`
    <div class="user_coments">${content}</div>
    `;
  }
}


function renderContacts(){
  const contacts = document.getElementById('contacts');
  contacts.innerHTML =``;
  for (let i = 0; i < user.length; i++) {
    const users = user[i];
    contacts.innerHTML += `
    <div id="user_menu" class="user_menu">
      <div class="user_div">
        <img id="user_avatar" src="${users['avatar']}" alt="">
        <div class="d_none">${users['name']}</div>
      </div>
    </div>
    `;
  }
}


function loadLikedButtons(index) {
  const post = posts[index];
  if (post["liked"]== true) {
    renderHeart(index,'red');
  } else {
    renderHeart(index,'black');
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


function renderHeart(index,heart) {
    document.getElementById(`post${index}`).innerHTML =``;
    document.getElementById(`post${index}`).innerHTML +=`<img class="liked" src="./img/heart_${heart}.svg" alt="" onclick="removeLike(${index})">`;
}


function removeLike(index) {
  const post = posts[index];
  if (post['liked'] === true) {
      post['liked'] = false;
      post['likes']--
  } else {
      post['liked'] = true;
      post['likes']++
  }
  show()
}


function sendComentButton(index){
  let coment = document.getElementById('newComent').value;
  let post = posts[index]
  post['coments'].push(coment);
  save(post,index);
  abort();
  document.getElementById('newComent').value = ``;
}


function openNewComent(index){
  document.getElementById('pop_up_coments').classList.remove("hide_popup");
  document.getElementById('sendComentButton').setAttribute('onclick',`sendComentButton(${index})`)
}


function abort(){
  document.getElementById('pop_up_coments').classList.add("hide_popup");
}


function save(post,index){
  let toSavedComents = post['coments']
  let comentAsText = JSON.stringify(toSavedComents);
  localStorage.setItem(`coments${index}`, comentAsText);
  show()
}


function load(post,index){
  let comentAsText = localStorage.getItem(`coments${index}`);
  if (comentAsText) {
    post['coments'] = JSON.parse(comentAsText);
  } 
}