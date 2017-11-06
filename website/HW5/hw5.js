var p = document.getElementById('output');

var messages = [
	'Message 01',
	'Message 02',
	'Message 03',
	'Message 04',
	'Message 05'
],
	ol = document.createElement('ol');
	
const input = prompt('1: Show messages \n2: Add a message\n3: Delete a message\n0: Quit');

switch(input) {
	case "1":
		break;
	case "2":
		const input2 = prompt('Enter message to add: ');
		messages.push(input2);
		break;
	case "3":
		const input3 = prompt('Enter message to delete: ');
		if (!(input3-1 in messages)) {
			const error = document.getElementById('error')
			error.innerHTML = 'Your input is invalid. Please reload this page and try again.';
			exit();
		}
		else {
			messages.splice(input3-1, 1);
			break;
		}
	case "0":
		p.innerHTML = 'Good Bye';
		exit();
	default:
		const error = document.getElementById('error')
		error.innerHTML = 'Your input is invalid. Please reload this page and try again.';
		exit();
}

for(var i in messages) {
	var li = document.createElement('li'),
		content = document.createTextNode(messages[i]);
	li.appendChild(content);
	ol.appendChild(li);
}

p.appendChild(ol);