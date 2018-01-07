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


	add(slot) {
		/* Takes slot number as an input and adds value in that memory slot to the accumulator */
		const tmp = this.accumulator + this.memory[slot];
		try {
			if (tmp > 999) throw "overflow";
		}
		catch(err) {
			console.log(err);
		}

		this.negativeFlag = false;
		this.accumulator = tmp;
	},

	subtract(slot) {
		/* Substract value in memory slot pointed by input from the accumulator */
		const tmp = this.accumulator - this.memory[slot];
		if (tmp < 0) {
			this.negativeFlag = true;
			this.accumulator = 0;
		}

		else {
			this.accumulator = tmp;
		}
	},

	store(slot) {
		this.memory[slot] = this.accumulator;
	},

	load(slot) {
		this.accumulator = this.memory[slot];
	},

	branch(slot) {
		try {
			if (!Number.isInteger(slot)) throw "invalid slot";
			if (slot > 99) throw "slot out of upper bound";
			if (slot < 0) throw "slot out of lower bound";
		}
		catch(err) {
			console.log(err);
		}
		this.programCounter = slot;
	},

	branchIfZero(slot) {
		if (this.accumulator == 0) {
			this.branch(slot);
		}
	},

	branchIfPositive(slot) {
		if (!this.negativeflag) {
			this.branch(slot);
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
	}

	halt() {
		this.endOfProgram = true;
	},

	data(value, slot) {
		try {
			if (!Number.isInteger(value)) throw "invalid value";
			if (!Number.isInteger(slot)) throw "invalid slot";
			if (value > 999) throw "value out of upper bound";
			if (value < 0) throw "value out of lower bound";
			if (slot > 99) throw "slot out of upper bound";
			if (slot < 0) throw "slot out of lower bound";
		}
		catch(err) {
			console.log(err);
		}

		this.memory[slot] = value;
	},

	loadInstructions(instructionArray) {
		/* Loads an array of instrucions (3 digit integers) to memory. Intructions after HALT (000) are considered to be DATA instructions and the values are loaded to  next free memory slot. */
		try {
			if (instructionArray.constructor === Array) throw "invalid instructionArray";
			if (instructionArray.length > 100) throw "too many instructions";
		}
		catch(err) {
			console.log(err);
		}
		instructionArray.forEach(this.data);
	}

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
		const slot = value % 100;

		if (value == 0) {
			
		} else if (operation == 1) {
			this.add(slot);
		} else if (operation == 2) {
			this.subtract(slot);
		} else if (operation == 3) {
			this.store(slot);
		} else if (operation == 5) {
			this.load(slot);
		} else if (operation == 6) {
			this.branch(slot);		
		} else if (operation == 7) {
			this.branchIfZero(slot);
		} else if (operation == 8) {
			this.branchIfPositive(slot);
		} else if (value == 901) {
			this.input();
		} else if (value == 902) {
			this.output();
		} else {
			console.log("invalid operation");
		}
	},
	


};
