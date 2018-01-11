const input = document.getElementById("code-input").value;

const assembler = {
	validInstructions : ["ADD", "SUB", "STA", "LDA", "BRA", "BRZ", "BRP",
		"INP", "OUT", "HLT", "DAT"],

	assemble(input) {
		const parsedInput = this.parseText(input);
		const labels = this.getLabels(parsedInput);
	},

	parseText(textInput) {
		const tmp =  textInput
			.split('\n')
			.filter((row) => !row.startsWith("\\\\"))// Remove rows beginning with comment
			.map((row) => row.split("\\\\")[0]// Remove comments 
				.trim()// Remove whitespace from the start and from the end
				.toUpperCase()// This assembler is not case sensitive
				.split(/\s+/g));// Split at whitespace 
		return tmp
	},

	getLabels(input) {
		const labels = new Map();
		input.forEach((arr, index) => {
			if (!this.validInstructions.includes(arr[0])) {
				labels.set(arr[0], index);
			}
		}
		return labels
	},

	removeLabels(input, labels) {
		const tmp = input.map((arr) => {
			if (labels.has(arr[0])) {
			arr.shift();
			}
		}
		return tmp
	}

	toNumeric(args) {
		const len = args.length();
		if (len == 1) {
			const arg = args[0];
			if (arg == "INP") {
				return 901
			} else if (arg == "OUT") {
				return 902
			else {
				return 000
			}
		} else if (len == 2) {
			//TODO: do stuff to parse args[1] (labels & numbers)
		} else {
			return 000
		}
	}
}
	

