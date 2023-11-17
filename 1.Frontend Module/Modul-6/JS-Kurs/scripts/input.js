function greetFromTextField() {
    let name = document.getElementById('namefield').value;
    greet(name);
}

function greet(x) {
    document.getElementById('greeting').innerHTML = `Hallo ${x}, wie geht es dir?`;
}

