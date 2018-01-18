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
			this.memoryCells[index].classList.remove("hlon");
		});
		this.memoryCells[Computer.programCounter].classList.add("hlon");
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
	},

	onClickLoad() {
		let code = ""
		let inbox = ""
		const tmp = document.getElementById("selector").value;
		if (tmp == "io") {
			code = "// Get a value from inbox and then output it to the outbox \nINP \nOUT \nHLT";
			inbox = "506";
		} else if (tmp == "add") {
			code = "// Get two values from inbox, add them together and then output the result \nINP \nSTA tmp \nINP \nADD tmp \nOUT \nHLT \ntmp DAT";
			inbox = "506\n360";

		} else if (tmp == "multi") {
			code = "// Get two values, multiply first value by second and then output the result \nINP \nSTA tmp1 \nINP \nloop BRZ op \nSUB one \nSTA tmp2 \nLDA tmp3 \nADD tmp1 \nSTA tmp3 \nLDA tmp2 \nBRA loop \nop LDA tmp3 \nOUT \nHLT \ntmp1 DAT \ntmp2 DAT \ntmp3 DAT \none DAT 1";
			inbox = "41\n18";
		} else if (tmp == "max") {
			code = "//First input amount of numbers to check and then the numbers. Outputs the largest number \nINP \nnext BRZ end \nSUB one \nSTA count \nINP \nSTA tmp \nSUB max \nBRP isGreater \nBRA skip \nisGreater LDA tmp \nSTA max \nskip LDA count \nBRA next \nend LDA max \nOUT \nHLT \ncount DAT \none DAT 1 \nmax DAT 0 \ntmp DAT";
			inbox = "256\n455\n506\n888\n456";
		}
		this.codeInput.value = code;
		this.inboxInput.value = inbox;
	}
		
}

App.generateMemTable(Computer.memory, App.memTable); // Generate memory table on load
App.updateRegTable(Computer); // Get reg values on load
