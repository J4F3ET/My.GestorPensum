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
function bloquear(input) {
	input.value = "";
	input.classList.add("input_bloqueado");
	input.disabled = true;
	input.requiered = false;
}
document.addEventListener("DOMContentLoaded", async () => {
	//Metodo que jerarquiza las materias
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
	const input_materia_requisito = document.querySelector(
		"[data-add-course-requirements]"
	);
	const input_materia_beneficio = document.querySelector(
		"[data-add-course-beneficts]"
	);
	const input_semestre = document.querySelector("[data-add-course-semester]");
	bloquear(input_materia_beneficio);
	bloquear(input_materia_requisito);
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
			const optionsToDeleteBeneficio = Array.from(input_materia_beneficio.options).slice(1);
			const optionsToDeleteRequisito = Array.from(input_materia_requisito.options).slice(1);
			// Eliminamos los options seleccionados
			optionsToDeleteBeneficio.forEach((option) => option.remove());
			optionsToDeleteRequisito.forEach((option) => option.remove());
			for (let i in data) {
				if(parseInt(input_semestre.value) > parseInt(data[i].semestre)){
					let option = document.createElement("option");
					option.value = data[i].id_materia;
					option.text = data[i].materia;
					input_materia_requisito.options.add(option);
				}else if(parseInt(input_semestre.value) < parseInt(data[i].semestre)){
					let option = document.createElement("option");
					option.value = data[i].id_materia;
					option.text = data[i].materia;
					input_materia_beneficio.options.add(option);
				}
			}
			if (input_semestre.value <= 0 ){
				bloquear(input_materia_requisito);
				bloquear(input_materia_beneficio);
			} else if (parseInt(input_semestre.value) == parseInt(semestres[0])){
				habilitar(input_materia_beneficio);
				bloquear(input_materia_requisito);
			} else if (parseInt(input_semestre.value) >= parseInt(semestres[semestres.length - 1])){
				habilitar(input_materia_requisito);
				bloquear(input_materia_beneficio);
			}else{
				habilitar(input_materia_requisito);
				habilitar(input_materia_beneficio);
			}
		});
});
