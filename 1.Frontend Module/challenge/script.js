let categorys = [ 
    {
        "comments": ['categorys0-item0','categorys0-item1','categorys0-item2','categorys0-item3','categorys0-item4',]
    },
    {
        "comments": ['categorys1-item0','categorys1-item1','categorys1-item2','categorys1-item3','categorys1-item4',]
    },
    {
        "comments": ['categorys2-item0','categorys2-item1','categorys2-item2','categorys2-item3','categorys2-item4',]
    },
    {
        "comments": ['categorys3-item0','categorys3-item1','categorys3-item2','categorys3-item3','categorys3-item4',]
    },
];

let stopItemsEnd;
let stopCategorysEnd;

function init(categoryID,itemID){
    let item=categorys[categoryID]['comments'][itemID]
    let content = document.getElementById('category_container');
    content.innerHTML = `
    <div class="item_objekt">
        Das ist ein Test ${item}
    </div>
    `;
    document.getElementById(`arrow_up`).setAttribute('onclick',`switchCategorys(${categoryID},'up')`);
    document.getElementById(`arrow_down`).setAttribute('onclick',`switchCategorys(${categoryID},'down')`);
    document.getElementById(`arrow_left`).setAttribute('onclick',`switchItems(${categoryID},${itemID},'left')`);
    document.getElementById(`arrow_rigth`).setAttribute('onclick',`switchItems(${categoryID},${itemID},'rigth')`);
}

function switchCategorys(categoryID,handler){
    let newID;
    if (handler === 'up'){
        if(!stopCategorysEnd){
            if (categoryID == 0){
                newID = categorys.length-1
            }
            else{
                newID = categoryID-1
            }
        }
        init(newID,0)
    }
    if (handler === 'down'){
        if(!stopCategorysEnd){
            if (categoryID >=categorys.length-1){
                newID = 0
            }
            else{
                newID = categoryID+1
            }
        }
        init(newID,0)
    }
}


function switchItems(categoryID,itemID,handler){
    let newID;
    if (handler === 'left'){
        if(!stopItemsEnd){
            if (itemID == 0){
                newID = categorys[categoryID]['comments'].length-1
            }
            else{
                newID = itemID-1
            }
        }
        init(categoryID,newID)
    }
    if (handler === 'rigth'){
        if(!stopItemsEnd){
            if (itemID >=categorys[categoryID]['comments'].length-1){
                newID = 0
            }
            else{
                newID = itemID+1
            }
        }
        init(categoryID,newID)
    }
}

function setChecker(){
    let checker = document.getElementById('jump_checker');
    if(checker.checked){
        stopItemsEnd = true;
        stopCategorysEnd = true;
    } else{
        stopItemsEnd = false;
        stopCategorysEnd = false;
    }
}

