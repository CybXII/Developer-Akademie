function calc() {
    let number = +document.getElementById('input').value;

    alert(getResultText(number, powerOf2(number)));
}

function powerOf2(x) {
    return x*x;
}

function getResultText(number, result) {
    return `The result of ${number}² is ${result}`;
}