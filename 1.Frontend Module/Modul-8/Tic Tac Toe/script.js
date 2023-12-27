let fields = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
];

let currentPlayer = 'X'; // Start mit Spieler X

document.addEventListener("DOMContentLoaded", function () {
    render();
});

function render() {
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = ''; // Clear previous content

    const table = document.createElement('table');
    for (let i = 0; i < 3; i++) {
        const row = document.createElement('tr');
        row.setAttribute('data-row', i); // Datenattribut für die Zeilen-Identifikation hinzufügen
        for (let j = 0; j < 3; j++) {
            const index = i * 3 + j;
            const cell = document.createElement('td');
            cell.textContent = fields[index];
            cell.setAttribute('data-index', index); // Datenattribut für die Zellen-Identifikation hinzufügen
            cell.addEventListener('click', () => onCellClick(index));
            row.appendChild(cell);
        }
        table.appendChild(row);
    }

    contentDiv.appendChild(table);
    const winnerCells = checkWinner();
    if (winnerCells) {
        showOverlay(fields[winnerCells[0]]);
        highlightWinningCells(winnerCells);
    }
}

function onCellClick(index) {
    if (!fields[index]) { // Prüfen, ob das Feld bereits belegt ist
        fields[index] = currentPlayer; // Das Symbol des aktuellen Spielers in das Feld setzen
        // Spielerwechsel
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        // Aktive Klasse aktualisieren
        const player1 = document.querySelector('.player1');
        const player2 = document.querySelector('.player2');
        player1.classList.toggle('aktive');
        player2.classList.toggle('aktive');
        render(); // Tabelle neu rendern, um die Änderung anzuzeigen
    }
}

function checkWinner() {
    // Mögliche Gewinnkombinationen (Reihen, Spalten, Diagonalen)
    const winCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontale Reihen
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertikale Reihen
        [0, 4, 8], [2, 4, 6] // Diagonalen
    ];

    // Überprüfe jede Gewinnkombination
    for (const combination of winCombinations) {
        const [a, b, c] = combination;

        // Überprüfe, ob die Felder in der aktuellen Kombination alle das gleiche Symbol haben
        if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
            // Gewinner gefunden
            console.log(`Player ${fields[a]} wins!`);
            return combination; // Rückgabe der gewinnenden Kombination
        }
    }

    // Überprüfe auf ein Unentschieden (alle Felder sind belegt)
    if (fields.every(field => field)) {
        console.log('It\'s a draw!');
        showDrawOverlay(); // Zeige das Overlay für ein Unentschieden an
        return null;
    }

    return null; // Rückgabe null, wenn es keinen Gewinner gibt
}

function showDrawOverlay() {
    // Erstelle das Overlay für ein Unentschieden
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');

    // Erstelle den Overlay-Inhalt
    const overlayContent = document.createElement('div');
    overlayContent.classList.add('overlay-content');

    // Füge den Text für ein Unentschieden hinzu
    const drawText = document.createElement('p');
    drawText.textContent = 'It\'s a draw!';
    overlayContent.appendChild(drawText);

    // Erstelle den "Erneut Spielen"-Button
    const restartButton = document.createElement('button');
    restartButton.textContent = 'Erneut Spielen';
    restartButton.addEventListener('click', () => {
        // Setze das Spiel zurück und verstecke das Overlay
        fields = Array(9).fill(null);
        overlay.remove();
        render();
    });

    // Füge den Button zum Overlay-Inhalt hinzu
    overlayContent.appendChild(restartButton);

    // Füge den Overlay-Inhalt zum Overlay hinzu
    overlay.appendChild(overlayContent);

    // Füge das Overlay zum Body hinzu
    document.body.appendChild(overlay);
}

function showOverlay(winner) {
    // Erstelle das Overlay
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');

    // Erstelle den Overlay-Inhalt
    const overlayContent = document.createElement('div');
    overlayContent.classList.add('overlay-content');

    // Füge den Gewinner-Text hinzu
    const winnerText = document.createElement('p');
    winnerText.textContent = `Player ${winner} wins!`;
    overlayContent.appendChild(winnerText);

    // Erstelle den "Erneut Spielen"-Button
    const restartButton = document.createElement('button');
    restartButton.textContent = 'Erneut Spielen';
    restartButton.addEventListener('click', () => {
        // Setze das Spiel zurück und verstecke das Overlay
        fields = Array(9).fill(null);
        overlay.remove();
        render();
    });

    // Füge den Button zum Overlay-Inhalt hinzu
    overlayContent.appendChild(restartButton);

    // Füge den Overlay-Inhalt zum Overlay hinzu
    overlay.appendChild(overlayContent);

    // Füge das Overlay zum Body hinzu
    document.body.appendChild(overlay);
}

function highlightWinningCells(winningCells) {
    // Markiere alle Zellen in der gewinnenden Zeile visuell
    winningCells.forEach(index => {
        const cell = document.querySelector(`td[data-index="${index}"]`);
        if (cell) {
            cell.classList.add('winning-cell');
        }
    });
}