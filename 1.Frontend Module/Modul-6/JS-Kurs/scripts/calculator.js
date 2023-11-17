function add() {
    let firstnumber = +document.getElementById('number1').value;
    let secondnumber = +document.getElementById('number2').value;
    let result1 = firstnumber + secondnumber;
    document.getElementById('result').innerHTML = `Das Ergebnis ist ${result1}`;
}