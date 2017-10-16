// Task 1
function externalScript() {
	const input = prompt('Please enter a number between 2 and 10:');
	if (input > 10 || input < 2) {
		const error = document.getElementById('error')
		error.innerHTML = 'Your input is ' + input + '. The valid input number is between 2 and 10. Please reload this page and try again.';
	}
	else {
		const output = document.getElementById('output');
		output.innerHTML = 'The number is ' + input;
		// Task 2
		let total = input;
		let counter = 0;
		while (total > 0.000001) {
			total = total/2;
			counter++;
		}
		const result = document.getElementById('result');
		result.innerHTML = 'The number of times to divide the number ' + input + ' by 2 to get a value less than one millionth is ' + counter;
		// Task 3
		for(let row = 0; row < input; row++) {
			for(let column = input-1; column >= row; column--) {
				document.getElementById('stars').innerHTML += ('*');
			}
			document.getElementById('stars').innerHTML += ('<br>');
		}
	}
}