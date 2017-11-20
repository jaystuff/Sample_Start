/*var deleteHandler = function() {
    $(this).parent().remove();
}

$(document).ready(function(){
	
	$("#create").on("click", function() {
		var ip = prompt("Enter name:");
		if(ip) {
			var $deleteIp = $("<a />", {"class": "delete"})
				.text("X")
				.click(deleteHandler);
			$("<li />")
				.text(ip)
				.append($deleteIp)
				.appendTo("#list");
		}
	
	return false;
});*/

function addRow() {
	var deleteHandler = function() {
		$(this).parent().remove();
	}
   "use strict";

    var table = document.getElementById("table");
    
    var row= document.createElement("tr");
    console.log(row);
    var td1 = document.createElement("td");
    var td2 = document.createElement("td");
    var td3 = document.createElement("td");    


    td1.innerHTML = document.getElementById("candidate").value;
	td2.innerHTML = "<span>0</span><input type='button' value='Like' onclick='increaseValue(this)' class='like'></input>";
	td3.innerHTML = "<input type='button' value='Delete' onclick='removeRow(this)' class='remove'></input>";

    row.appendChild(td1);
    row.appendChild(td2);
	row.appendChild(td3);

    table.children[0].appendChild(row);
};

function removeRow(del) {
	var p = del.parentNode.parentNode;
		p.parentNode.removeChild(p);
};

function increaseValue(current) {
	var number = current.previousSibling.innerHTML;
	number++;
	current.previousSibling.innerHTML = number;
}

