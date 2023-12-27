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


document.addEventListener("DOMContentLoaded", function() {
    render();
});

function render() {
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = ''; // Clear previous content

    const table = document.createElement('table');
    for (let i = 0; i < 3; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < 3; j++) {
            const index = i * 3 + j;
            const cell = document.createElement('td');
            cell.textContent = fields[index];
            cell.addEventListener('click', () => onCellClick(index));
            row.appendChild(cell);
        }
        table.appendChild(row);
    }

    contentDiv.appendChild(table);
}

function onCellClick(index) {
    // Handle cell click logic here
    console.log('Cell clicked:', index);
}