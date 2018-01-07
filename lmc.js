const computer = {
	memory: new Array(100).fill(0), //Memory array of 100 zeroes
	programCounter: 0,
	cycleCount: 0,
	accumulator: 0,
	inbox: new Array(),
	outbox: new Array(),
	negativeFlag: false,
	endOfProgram: false,

	reset() {
		/* Resets computer to starting state */
		this.memory.fill(0);
		this.programCounter = 0;
		this.cycleCount = 0;
		this.accumulator = 0;
		this.inbox = new Array();
		this.outbox = new Array();
		this.negativeFlag = false;
		this.endOfProgram = false;
	},


	add(index) {
		/* Takes index number as an input and adds value in that memory index to the accumulator */
		const tmp = this.accumulator + this.memory[index];
		try {
			if (tmp > 999) throw "overflow";
		}
		catch(err) {
			console.log(err);
		}

		this.negativeFlag = false;
		this.accumulator = tmp;
	},

	subtract(index) {
		/* Substract value in memory index pointed by input from the accumulator */
		const tmp = this.accumulator - this.memory[index];
		if (tmp < 0) {
			this.negativeFlag = true;
			this.accumulator = 0;
		}

		else {
			this.accumulator = tmp;
		}
	},

	store(index) {
		this.memory[index] = this.accumulator;
	},

	load(index) {
		this.accumulator = this.memory[index];
	},

	branch(index) {
		try {
			if (!Number.isInteger(index)) throw "invalid index";
			if (index > 99) throw "index out of upper bound";
			if (index < 0) throw "index out of lower bound";
		}
		catch(err) {
			console.log(err);
		}
		this.programCounter = index;
	},

	branchIfZero(index) {
		if (this.accumulator == 0) {
			this.branch(index);
		}
	},

	branchIfPositive(index) {
		if (!this.negativeflag) {
			this.branch(index);
		}
	},

	input() {
		const tmp = this.input.shift();
		try {
			if (!Number.isInteger(tmp)) throw "invalid input";
			if (value > 999) throw "input out of upper bound";
			if (value < 0) throw "input out of lower bound";
		}
		catch(err) {
			console.log(err);
		}

		this.accumulator = tmp;
	},

	output() {
		this.outbox.push(this.accumulator);
	},

	halt() {
		this.endOfProgram = true;
	},

	data(value, index) {
		try {
			if (!Number.isInteger(value)) throw "invalid value";
			if (!Number.isInteger(index)) throw "invalid index";
			if (value > 999) throw "value out of upper bound";
			if (value < 0) throw "value out of lower bound";
			if (index > 99) throw "index out of upper bound";
			if (index < 0) throw "index out of lower bound";
		}
		catch(err) {
			console.log(err);
		}

		this.memory[index] = value;
	},

	loadInstructions(instructionArray) {
		/* Loads an array of instrucions (3 digit integers) to memory. Intructions after HALT (000) are considered to be DATA instructions and the values are loaded to next free memory index. */
		try {
			if (Array.isArray(instructionArray)) throw "invalid instructionArray";
			if (instructionArray.length > 100) throw "too many instructions";
		}
		catch(err) {
			console.log(err);
		}
		instructionArray.forEach((value, index) => {
			this.data(value, index);
		});
	},

	test(value, index) {
		console.log("value: " + value + " index: " + index);
		this.memory[0] = 100;
	},

	execute(value) {
		try {
			if (!Number.isInteger(value)) throw "invalid value";
			if (value > 999) throw "value out of upper bound";
			if (value < 0) throw "value out of lower bound";
		}
		catch(err) {
			console.log(err);
		}

		const operation = value / 100;
		const index = value % 100;

		if (value == 0) {

		} else if (operation == 1) {
			this.add(index);
		} else if (operation == 2) {
			this.subtract(index);
		} else if (operation == 3) {
			this.store(index);
		} else if (operation == 5) {
			this.load(index);
		} else if (operation == 6) {
			this.branch(index);
		} else if (operation == 7) {
			this.branchIfZero(index);
		} else if (operation == 8) {
			this.branchIfPositive(index);
		} else if (value == 901) {
			this.input();
		} else if (value == 902) {
			this.output();
		} else {
			console.log("invalid operation");
		}
	},
};
