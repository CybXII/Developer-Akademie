let todos = ['Einkaufen', 'Putzen', 'Kochen', 'Spazieren'];

function showTodos() { //cleaning shown arrays & writing all arrays
    document.getElementById('mylist').innerHTML = '';
    for (let i= 0; i < todos.length; i++){
        document.getElementById('mylist').innerHTML += `<li>${todos[i]} <a href="#" onclick="deleteTodo(${i})">X</a></li>`;
    };
}

function addTodo() { //Add new Array to todos
    

    let todo = document.getElementById('myinput').value;
    todos.push(todo);
    document.getElementById('myinput').value = '';

    showTodos();
}

function deleteTodo(position) {
    todos.splice(position, 1)
    showTodos();

}