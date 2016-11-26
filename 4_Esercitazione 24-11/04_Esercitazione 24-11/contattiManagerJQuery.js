function Contatto(nome, cognome, telefono, email) {
    this.nome = nome;
    this.cognome = cognome;
    this.telefono = telefono;
    this.email = email;
}

var contatti = [];
var created = false;
var logo = false;

function init() {
	var butAggiungiContatto = $('#addButton');
	butAggiungiContatto.on('click', aggiungiContatto);
	
	var cercaNome = $('#cercaNome');
	cercaNome.on('click', function(){
		var valore = prompt("Inserisci il nome da cercare");
		var contatto = cercaPer("nome", valore);
		mostraContatto(contatto);
	});
	
	var cercaCognome = $('#cercaCognome');
	cercaCognome.on('click', function(){
		var valore = prompt("Inserisci il cognome da cercare");
		var contatto = cercaPer("cognome", valore);
		mostraContatto(contatto);
	});
	
	var cercaTelefono = $('#cercaTelefono');
	cercaTelefono.on('click', function(){
		var valore = prompt("Inserisci il telefono da cercare");
		var contatto = cercaPer("telefono", valore);
		mostraContatto(contatto);
	});
	
	var cercaEmail = $('#cercaEmail');
	cercaEmail.on('click', function(){
		var valore = prompt("Inserisci l'email da cercare");
		var contatto = cercaPer("email", valore);
		mostraContatto(contatto);
	});
	
	var cambiaSfondo = $('#changeBackgroundButton');
	cambiaSfondo.on('click', function() {
		$('#body').css({'background-color' : 'red'});
		if(!created) {
			created = true;
			var back = $('<button></button>');
			back.text("Indietro");
			back.on('click', function() {
				$('#body').css({'background-color' : 'white'});
				td.remove();
				created = false;
			});
			var tr = $('#changeBackgroundTr');
			var td = $('<td></td>');
			td.append(back);
			tr.append(td);
		}
	});
	
	var addLogo = $('#addLogoButton');
	addLogo.on('click', function() {
		if(!logo) {
			logo = true;
			var tr = $('#addLogoTr');
			var tdImg = $('<td></td>');
			var tdBackButton = $('<td></td>');
			var img = $('<img />', {
			    src: 'logo_unical.png',
			});
			
			var back = $('<button />');
			back.text("Elimina Logo");
			back.on('click',function() {
				logo = false;
				tdImg.remove();
				tdBackButton.remove();
			});
			
			tdImg.append(img);
			tdBackButton.append(back);
			tr.append(tdBackButton);
			tr.append(tdImg);
			
		}
	});
}

function cercaPer(attributo, valore){
	for (var i = 0; i < contatti.length; i++)
		if (contatti[i][attributo] === valore)
			return contatti[i];
}

function mostraContatto(contatto){
	alert("Nome: " + contatto.nome + "; Cognome: " + contatto.cognome + "; Telefono: " + contatto.telefono + "; Email:" + contatto.email);
}

function aggiungiContatto(){
	var nuovoContatto = creaContatto();
	contatti.push(nuovoContatto);
	var lastRow = $('#lastRow');
	
	var tr = $('<tr></tr>');
	
	var tdNome = $('<td></td>');
	tdNome.text(nuovoContatto.nome);
	tr.append(tdNome);
	
	var tdCognome = $('<td></td');
	tdCognome.text(nuovoContatto.cognome);
	tr.append(tdCognome);
	
	var tdTelefono = $('<td></td>');
	tdTelefono.text(nuovoContatto.telefono);
	tr.append(tdTelefono);
	
	var tdEmail = $('<td></td>');
	tdEmail.text(nuovoContatto.email);
	tr.append(tdEmail);
	
	var tdAction = $('<td></td>');
	
	var removeButton = $('<button></button>');
	removeButton.text("Rimuovi contatto");
	removeButton.on('click', function(){
		tr.remove();
		contatti = remove(nuovoContatto);
	});
	tdAction.append(removeButton);
	
	var editButton = $('<button> </button>');
	editButton.text("Modifica contatto");
	editButton.on('click', function(){
		var nome = prompt("Inserisci il nuovo nome");
		var cognome = prompt("Inserisci il nuovo cognome");
		var telefono = prompt("Inserisci il nuovo telefono");
		var email = prompt("Inserisci la nuova email");
		nuovoContatto.nome = nome;
		nuovoContatto.cognome = cognome;
		nuovoContatto.telefono = telefono;
		nuovoContatto.email = email;
		
		tdNome.text(nome);
		tdCognome.text(cognome);
		tdTelefono.text(telefono);
		tdEmail.text(email);
	});
	tdAction.append(editButton);
	
	tr.append(tdAction);
	lastRow.before(tr);
}

function remove(nuovoContatto) {
	var tmp = [];
	for (var i = 0; i < contatti.length; ++i){
		if (contatti[i] !== nuovoContatto)
			tmp.push(contatti[i]);
	}
	return tmp;
}

function creaContatto(){
	var inputs = $('#lastRow').find('input');
	var nome = inputs.eq(0).val();
	var cognome = inputs.eq(1).val();
	var telefono = inputs.eq(2).val();
	var email = inputs.eq(3).val();
	var contatto = new Contatto(nome, cognome, telefono, email);
	return contatto;
}

$(document).ready(init);