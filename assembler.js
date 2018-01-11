const input = document.getElementById("code-input");

const assembler = {
	assemble(textInput) {
		console.log(textInput.value);
		const instructions = new Array();
		let rows = textInput.value.split('\n');
		rows = rows
			.filter(row => !row.startsWith("\\\\"))// Remove rows beginning with comment
			.map(row => row.split("\\\\")[0]);
		return rows;
	}
}

