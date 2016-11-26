function Contatto(nome, cognome, telefono, email) {
    this.nome = nome;
    this.cognome = cognome;
    this.telefono = telefono;
    this.email = email;
}

var contatti = [];

function init(){
	var butAggiungiContatto = document.getElementById("addButton");
	butAggiungiContatto.addEventListener('click', aggiungiContatto);
	
	var cercaNome = document.getElementById("cercaNome");
	cercaNome.addEventListener('click', function(){
		var valore = prompt("Inserisci il nome da cercare");
		var contatto = cercaPer("nome", valore);
		mostraContatto(contatto);
	});
	var cercaCognome = document.getElementById("cercaCognome");
	cercaCognome.addEventListener('click', function(){
		var valore = prompt("Inserisci il cognome da cercare");
		var contatto = cercaPer("cognome", valore);
		mostraContatto(contatto);
	});
	var cercaTelefono = document.getElementById("cercaTelefono");
	cercaTelefono.addEventListener('click', function(){
		var valore = prompt("Inserisci il telefono da cercare");
		var contatto = cercaPer("telefono", valore);
		mostraContatto(contatto);
	});
	var cercaEmail = document.getElementById("cercaEmail");
	cercaEmail.addEventListener('click', function(){
		var valore = prompt("Inserisci l'email da cercare");
		var contatto = cercaPer("email", valore);
		mostraContatto(contatto);
	});
}

function cercaPer(attributo, valore){
	for (var i = 0; i < contatti.length; i++){
		if (contatti[i][attributo] === valore){
			return contatti[i];
		}
	}
}

function mostraContatto(contatto){
	alert("Nome: " + contatto.nome + "; Cognome: " + contatto.cognome + "; Telefono: " + contatto.telefono + "; Email:" + contatto.email);
}

function aggiungiContatto(){
	var nuovoContatto = creaContatto();
	contatti.push(nuovoContatto);
	var tBody = document.getElementById("tBody");
	var lastRow = document.getElementById("lastRow");
	
	var tr = document.createElement("tr");
	
	var tdNome = document.createElement("td");
	tdNome.textContent = nuovoContatto.nome;
	tr.appendChild(tdNome);
	
	var tdCognome = document.createElement("td");
	tdCognome.textContent = nuovoContatto.cognome;
	tr.appendChild(tdCognome);
	
	var tdTelefono = document.createElement("td");
	tdTelefono.textContent = nuovoContatto.telefono;
	tr.appendChild(tdTelefono);
	
	var tdEmail = document.createElement("td");
	tdEmail.textContent = nuovoContatto.email;
	tr.appendChild(tdEmail);
	
	var tdAction = document.createElement("td");
	
	var removeButton = document.createElement("button");
	removeButton.textContent = "Rimuovi contatto";
	removeButton.addEventListener('click', function(){
		tbody.removeChild(tr);
	});
	tdAction.appendChild(removeButton);
	
	var editButton = document.createElement("button");
	editButton.textContent = "Modifica contatto";
	editButton.addEventListener('click', function(){
		var nome = prompt("Inserisci il nuovo nome");
		var cognome = prompt("Inserisci il nuovo cognome");
		var telefono = prompt("Inserisci il nuovo telefono");
		var email = prompt("Inserisci la nuova email");
		nuovoContatto.nome = nome;
		nuovoContatto.cognome = cognome;
		nuovoContatto.telefono = telefono;
		nuovoContatto.email = email;
		
		tdNome.textContent = nome;
		tdCognome.textContent = cognome;
		tdTelefono.textContent = telefono;
		tdEmail.textContent = email;
	});
	tdAction.appendChild(editButton);
	
	tr.appendChild(tdAction);
	
	tbody.insertBefore(tr, lastRow);
}

function creaContatto(){
	var nome = document.getElementById("nome").value;
	var cognome = document.getElementById("cognome").value;
	var telefono = document.getElementById("telefono").value;
	var email = document.getElementById("email").value;
	var contatto = new Contatto(nome, cognome, telefono, email);
	return contatto;
}

window.addEventListener('load', init);
