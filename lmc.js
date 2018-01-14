const App = {
	memTable: document.getElementById("memory-table"),
	codeInput: document.getElementById("code-input"),
	inboxInput: document.getElementById("inbox-input"),
	memoryCells: new Array(),

	deleteTable(table) {
		while (table.rows.length > 0) {
			table.deleteRow(0);
		}
	},
	
	generateMemTable(memoryArray, table) {
		let currentHeaderRow = table.insertRow(-1);
		let currentValueRow = table.insertRow(-1);
		memoryArray.forEach((value, index) => {
			if (index != 0 && index % 10 == 0) {
				currentHeaderRow = table.insertRow(-1);
				currentValueRow = table.insertRow(-1);
			}
			const headerCell = currentHeaderRow.insertCell(-1);
			const valueCell = currentValueRow.insertCell(-1);
			headerCell.innerHTML = index;
			valueCell.innerHTML = value;
			this.memoryCells.push(valueCell);
		})
	},
	
	updateMemTable(memoryArray) {
		memoryArray.forEach((value, index) => {
			this.memoryCells[index].innerHTML = value;
		})
	},

	loadToInbox(input, inbox) {
		input.split("\n")
			.map((val) => parseInt(val))
			.filter((val) => Number.isInteger(val))
			.forEach((val) => inbox.push(val));
	},

		

	onClickAssemble() {
		const instructionArray = Assembler.assemble(this.codeInput.value);
		Computer.reset();
		Computer.loadInstructions(instructionArray);
		this.updateMemTable(Computer.memory);
		this.loadToInbox(this.inboxInput.value, Computer.inbox);
	},

	onClickCycle() {
		Computer.cycle();
		this.updateMemTable(Computer.memory);
	}
}

App.generateMemTable(Computer.memory, App.memTable);
