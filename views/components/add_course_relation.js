var data;
var semestres = [];
let i_requisito = 1;
let i_beneficio = 1;
const input_semestre = document.querySelector("[data-add-course-semester]");
var selectR = document.querySelector(".select_input_requisito");
var selectB = document.querySelector(".select_input_beneficio");
var btnRemoveM_V = document.querySelectorAll(".btn_select_remove");
function getCookie(name) {
	var value = "; " + document.cookie;
	var parts = value.split("; " + name + "=");
	if (parts.length == 2) return parts.pop().split(";").shift();
}
function habilitar(input) {
	input.classList.remove("input_bloqueado");
	input.requiered = true;
	input.disabled = false;
}
function habilitarV(input) {
	for (var i = 0; i < input.length; i++) {
		input[i].classList.remove("input_bloqueado");
		input[i].requiered = true;
		input[i].disabled = false;
	}
}
function bloquear(input) {
	input.classList.add("input_bloqueado");
	input.disabled = true;
	input.requiered = false;
}
function bloquearV(input) {
	for (var i = 0; i < input.length; i++) {
		input[i].classList.add("input_bloqueado");
		input[i].disabled = true;
		input[i].requiered = false;
	}
}
function clearSelect(select){
	let optionsToRemove = Array.from(select.options);
	optionsToRemove.forEach(option => select.remove(option));
}
function updateListBtnRemoveM() {
	btnRemoveM_V = document.querySelectorAll(".btn_select_remove");
	btnRemoveM_V.forEach((element) => {
		//cuando se pasa el mouse por encima del boton se cambia el texto
		element.addEventListener("mouseenter", () => {});
		//cuando se hace click en el boton se elimina el input y se agrega al select
		element.addEventListener("click", () => {
			btnRemoveM_Delete(element);
		});
	});
}
function btnRemoveM_Delete(div){
	let id_materia = div.getAttribute("data-id_materia");
	let name_materia = div.innerHTML;
	let option = document.createElement("option");
	let semestrediv = div.getAttribute("data-semestre-div");
	option.value = id_materia;
	option.text = name_materia;
	option.setAttribute("data-semestre-option", semestrediv);
	let input = document.querySelector(`input[value="${id_materia}"]`);
	input.remove();
	div.remove();
	//True = requisito , False = beneficio
	input_semestre.value > semestrediv
		? selectR.options.add(option)
		: selectB.options.add(option);
}
function addMateriaRelacion(relacion, id_materia, name_materia, semestre) {
	var divHidden = document.querySelector(".contenedor_input_hidden");
	var input = document.createElement('input')
	input.hidden = true
	input.name = "materiaRelacion[]"
	input.type = 'text'
	input.setAttribute('value', id_materia)
	divHidden.appendChild(input)
	var div = document.createElement("div");
	div.classList.add("btn_select_remove");
	div.classList.add("btn");
	div.setAttribute("data-semestre-div", semestre)
	div.setAttribute("data-id_materia", id_materia)
	div.innerHTML = `${name_materia}`;
	//True = requisito , False = beneficio
	relacion
		?document
			.querySelector(".div_form_requisito")
			.insertAdjacentElement("beforeend", div)
		:document
			.querySelector(".div_form_beneficio ")
			.insertAdjacentElement("beforeend", div)
		;
	updateListBtnRemoveM();
}
// Peticion para saber las materias del usuario
document.addEventListener("DOMContentLoaded", async () => {
	let currentUrl = new URL(window.location.href);
	const response = await fetch(
		currentUrl.origin + "/return_materia_requisito",
		{
			method: "POST",
			headers: {
				accept: "*/*",
				cokkies: getCookie("DataLogin"),
			},
			body: "",
		}
	);
	data = await response.json();
	data.forEach((materia) =>
		!semestres.includes(materia.semestre)
			? semestres.push(materia.semestre)
			: null
	);
	semestres.sort((a, b) => {
		return a - b;
	});
});
//Metodo que bloquea los inputs de requisito y beneficio y agregar los posibles requisitos y beneficios
input_semestre.addEventListener("change", () => {
	//Reset permiso
	bloquear(selectR);
	bloquear(selectB);
	//Reset de los selects
	clearSelect(selectB)
	clearSelect(selectR)

	//Seccion que reparte las materias en los selects
	for (let i in data) {
		let option = document.createElement("option");
		option.value = data[i].id_materia;
		option.text = data[i].materia;
		option.setAttribute("data-semestre-option", data[i].semestre);
		input_semestre.value > data[i].semestre
			? selectR.options.add(option)
			: selectB.options.add(option);
	}

	//Dar permisos
	if (input_semestre.value == semestres[0]){
		habilitar(selectB);
	}else if(input_semestre.value >= semestres[-1]){
		habilitar(selectR);
	}else{
		habilitar(selectR);
		habilitar(selectB);
	}
});
//Metodo que ermite agregar la materia seleccionada a la lista de materias
selectR.addEventListener("change", () => {
		addMateriaRelacion(
			true,
			selectR.options[selectR.selectedIndex].value,
			selectR.options[selectR.selectedIndex].text,
			selectR.options[selectR.selectedIndex].getAttribute("data-semestre-option")
		);
		selectR.remove(selectR.options[selectR.selectedIndex]);
	});
selectB.addEventListener("change", () => {
		addMateriaRelacion(
			false,
			selectB.options[selectB.selectedIndex].value,
			selectB.options[selectB.selectedIndex].text
		);
		selectB.remove(selectB.options[selectB.selectedIndex]);
});
