let posts =[];
let names =[];
function newPost(){
    let text = document.getElementById('message').value;
    let name = document.getElementById('name').value;
    names.push(name)
    posts.push(text);

    let myposts = document.getElementById('myposts')
    myposts.innerHTML ='';

    for(let i=0; i<posts.length; i++){
  
            myposts.innerHTML += `
            <div class="post">
               <b>Nachricht von ${names[i]}</b><br><br>
                ${posts[i]}
            </div>
            `;

    }
    document.getElementById('message').value ='';
    document.getElementById('name').value ='';

}