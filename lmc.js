const App = {
	/* Store various GUI-elements */
	memTable: document.getElementById("memory-table"),
	codeInput: document.getElementById("code-input"),
	inboxInput: document.getElementById("inbox-input"),
	outboxOutput: document.getElementById("outbox-output"),
	pcOutput: document.getElementById("pc"),
	ccOutput: document.getElementById("cc"),
	acOutput: document.getElementById("ac"),
	memoryCells: new Array(),

	/* Deletes every row in given table. Used for debugging. */
	deleteTable(table) {
		while (table.rows.length > 0) {
			table.deleteRow(0);
		}
	},

	/* Generates table with indexes from an array */
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
	
	/* Updates table with values from an array */
	updateMemTable(memoryArray) {
		memoryArray.forEach((value, index) => {
			this.memoryCells[index].innerHTML = value;
		})
	},

	/* Updates table with values from a cpu object */
	updateRegTable(cpu) {
		this.pcOutput.innerHTML = cpu.programCounter;
		this.ccOutput.innerHTML = cpu.cycleCount;
		this.acOutput.innerHTML = cpu.accumulator;
	},

	/* Enables communication between cpu object and gui */
	loadToInbox(input, cpu) {
		cpu.clearInbox();
		input.split("\n")
			.map((val) => parseInt(val))
			.filter((val) => Number.isInteger(val))
			.forEach((val) => cpu.inbox.push(val));
	},

	/* Runs one cpu cycle and updates corresponding GUI elements */
	cycle() {
		this.loadToInbox(this.inboxInput.value, Computer);
		const tmp = Computer.cycle();
		this.inboxInput.value = Computer.inbox.join("\n");
		this.outboxOutput.value = Computer.outbox.join("\n");
		this.updateMemTable(Computer.memory);
		this.updateRegTable(Computer);
		return tmp
	},

	/* Assembles given code and loads machine code to the cpu */
	onClickAssemble() {
		const instructionArray = Assembler.assemble(this.codeInput.value);
		Computer.reset();
		Computer.loadInstructions(instructionArray);
		this.updateMemTable(Computer.memory);
		this.updateRegTable(Computer);
	},

	onClickCycle() {
		this.cycle();
	},

	/* Runs given program until it is finished */
	onClickRun() {
		let tmp = true;
		while (tmp == true) {
			tmp = this.cycle();
		}
	}
}

App.generateMemTable(Computer.memory, App.memTable); // Generate memory table on load
App.updateRegTable(Computer); // Get reg values on load
