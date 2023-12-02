let posts = [
    {
        'author': 'Tagesschau',
        'image': './img/img1.jpg',
        'description': 'Text 1 2 3 ',
        'location': ''
    },
    {
        'author': 'Tagesschau',
        'image': './img/img2.jpg',
        'description': 'Text 3 2 1 ',
        'location': ''
    },
]

function show(params){
    document.getElementById('postcontainer').innerHTML +='';


    for (let i = 0; i < posts.length; i++) {
        const post = posts[i];
        document.getElementById('postcontainer').innerHTML +=`
        <div class="post">
            <img src="${post['image']}">
            <div>${post['author']} </div>
            <div>${post['description']}</div>
            <div>${post['location']}</div>
        </div>
        `
    }
}

