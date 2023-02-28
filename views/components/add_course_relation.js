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
	for (var i =0 ;i < input.length;i++) {
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
	console.log('Lo que le llago a bloquearV')
	console.log(input);
	for (var i=0 ; i < input.length;i++){
		console.log(i)
		console.log(input[i]);
		input[i].classList.add("input_bloqueado");
		input[i].disabled = true;
		input[i].requiered = false;
	}
}
document.addEventListener("DOMContentLoaded", async () => {
	//Metodo que jerarquiza las materias
	let i_requisito = 1;
	let i_beneficio = 1;
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
	const data = await response.json();
	const input_materia_requisito = document.querySelectorAll(
		"[data-add-course-requirements]"
	);
	const input_materia_beneficio = document.querySelectorAll(
		"[data-add-course-beneficts]"
	);
	const botton_agregar_requerimientos = document.querySelector('#botton_agregar_requerimientos');
	const input_semestre = document.querySelector("[data-add-course-semester]");
	const botton_agregar_beneficio = document.querySelector('#botton_agregar_beneficios');
	bloquearV(input_materia_beneficio);
	bloquear(botton_agregar_beneficio);
	bloquear(botton_agregar_requerimientos);
	bloquearV(input_materia_requisito);
	const semestres = [];
	for (let i in data) {
		if (!semestres.includes(data[i].semestre))
			semestres.push(data[i].semestre);
	}
	semestres.sort((a, b) => {
		return a - b;
	});
	//Metodo que bloquea los inputs de requisito y beneficio y agregar los posibles requisitos y beneficios
	document
		.querySelector("[data-add-course-semester]")
		.addEventListener("change", () => {
			for(var i ;i< input_materia_beneficio.length;i++){
				let optionsToDeleteBeneficio = Array.from(
					input_materia_beneficio[i].options
				).slice(1);
				optionsToDeleteBeneficio.forEach((option) => option.remove());
			}
			for (var i; i < input_materia_requisito.length; i++) {
				let optionsToDeleteRequisito = Array.from(
					input_materia_requisito[i].options
				).slice(1);
				optionsToDeleteRequisito.forEach((option) => option.remove());
			}
			for (let i in data) {
				if(parseInt(input_semestre.value) > parseInt(data[i].semestre)){
					let option = document.createElement("option");
					option.value = data[i].id_materia;
					option.text = data[i].materia;
					for(var y=0;y<input_materia_requisito.length;y++)
						input_materia_requisito[y].options.add(option)
				}else if(parseInt(input_semestre.value) < parseInt(data[i].semestre)){
					let option = document.createElement("option");
					option.value = data[i].id_materia;
					option.text = data[i].materia;
					for (var y = 0; y < input_materia_beneficio.length; y++)
						input_materia_beneficio[y].options.add(option);
				}
			}
			if (input_semestre.value <= 0 ){
				bloquearV(input_materia_requisito);
				bloquearV(input_materia_beneficio);
				bloquear(botton_agregar_beneficio);
				bloquear(botton_agregar_requerimientos);
			} else if (parseInt(input_semestre.value) == parseInt(semestres[0])){
				habilitarV(input_materia_beneficio);
				bloquearV(input_materia_requisito);
				habilitar(botton_agregar_beneficio);
				bloquear(botton_agregar_requerimientos);
			} else if (parseInt(input_semestre.value) >= parseInt(semestres[semestres.length - 1])){
				habilitarV(input_materia_requisito);
				bloquearV(input_materia_beneficio);
				bloquear(botton_agregar_beneficio);
				habilitar(botton_agregar_requerimientos);
			}else{
				habilitarV(input_materia_requisito);
				habilitarV(input_materia_beneficio);
				habilitar(botton_agregar_beneficio);
				habilitar(botton_agregar_requerimientos);
			}
		});
		document.querySelector('#botton_agregar_requerimientos').addEventListener('click', () => {
			const select = crearSelect(data, input_semestre, i_requisito, 0);
			i_requisito++;
			document.querySelector('#botton_agregar_requerimientos').insertAdjacentElement('beforebegin', select);
		});
		document.querySelector("#botton_agregar_beneficios").addEventListener('click', () => {
			const select = crearSelect(data, input_semestre, i_beneficio, 1);
			i_beneficio++;
			document.querySelector('#botton_agregar_beneficios').insertAdjacentElement('beforebegin', select);
		});
});
function crearSelect(data, input_semestre, i,tipoSelect) {
	if(tipoSelect == 0){
		type = "requerimientos_"+i;
		atributo = "data-add-course-requirements";
	}else if(tipoSelect == 1){
		type = "beneficios_" + i;
		atributo = "data-add-course-beneficts";
	}
	let select = document.createElement("select");
	select.classList.add("espacios_especiales");
	select.classList.add("input");
	select.setAttribute(atributo,"");
	select.name = type;
	select.id = type;
	for (let i in data) {
		if ( tipoSelect == 0 && parseInt(input_semestre.value) > parseInt(data[i].semestre)) {
			let option = document.createElement("option");
			option.value = data[i].id_materia;
			option.text = data[i].materia;
			select.options.add(option);
		} else if (tipoSelect == 1 && parseInt(input_semestre.value) < parseInt(data[i].semestre)) {
			let option = document.createElement("option");
			option.value = data[i].id_materia;
			option.text = data[i].materia;
			select.options.add(option);
		}
	}	
	select.required = true;
	return select;
}
