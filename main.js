let myLeads = [];

let inputEl = document.getElementById("input-el");

let btnEl = document.getElementById("input-btn");

let tabBtn = document.querySelector("#save-tab");

let deleteEl = document.querySelector("#delete-btn");

const ulEl = document.querySelector("#ul-el");

let leadsFromLocalStorage = JSON.parse(localStorage.getItem(myLeads));

if (leadsFromLocalStorage) {
	myLeads = leadsFromLocalStorage;
	render(myLeads);
}

tabBtn.addEventListener("click", function () {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		myLeads.push(tabs[0].url);

		localStorage.setItem("myLeads", JSON.stringify(myLeads));
	
		render(myLeads);
	});
})

function render(leads) {
	let listItems = "";

	for (let i = 0; i < leads.length; i++) {
		listItems += `<li>
		<a target='_blank' href= ${leads[i]}>${leads[i]}</a>
		</li>`;
	}

	ulEl.innerHTML = listItems;
}

btnEl.addEventListener("click", function() { 
	myLeads.push(inputEl.value);

	inputEl.value = "";

	localStorage.setItem("myLeads", JSON.stringify(myLeads));

	render(myLeads);
})

deleteEl.addEventListener("dblclick", function() {
	localStorage.clear();
	myLeads = [];
	render(myLeads);
})
