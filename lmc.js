const table = document.getElementById("memory-table");


const generate = function generateTable(table) {
	for (let i = 0; i < 12; i++) {
		const row = table.insertRow(i);
		for (let j = 0; j < 12; j++) {
			const cell = row.insertCell(j);
			cell.innerHTML = "CELL";
		}
	}
}

generate(table);

const remove = function removeAllRows(table) {
	while(table.hasChildNodes()) {
		table.removeChild(table.firstChild);
	}
}
