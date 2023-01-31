const modal = document.querySelector("#modal_horario");
const horario_nombre_materia = document.querySelector("#buscador_input");
function openModalHorario() {
	let lista = localStorage.getItem("materias");
	lista = JSON.parse(lista);
	if (!lista[0].Materia) {
		Swal.fire({
			icon: "error",
			title: "No se encontraron materias registradas",
			footer:
				'<a href="/add_course"> ¿Quieres inscribir una materia? Clik aquí</a>',
		});
	} else {
		const data_list = document.getElementById("buscador_materias");
		lista.forEach((element) => {
			const option = document.createElement("option");
			option.value = element.Materia;
			data_list.appendChild(option);
		});
		modal.showModal();
	}
}
function cerrarModalHorario() {
	const data_list = document.getElementById("buscador_materias");
	while (data_list.firstChild) {
		data_list.removeChild(data_list.firstChild);
	}
	modal.close();
}
function agregarMateriaHorario() {
	console.log("llega");
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
function getCookie(name) {
	var value = "; " + document.cookie;
	var parts = value.split("; " + name + "=");
	if (parts.length == 2) return parts.pop().split(";").shift();
}

horario_nombre_materia.addEventListener("change", async () => {
	const input_dia = document.querySelector("#dia_horario_input");
	const input_hora = document.querySelector("#hora_horario_input");
	const btn_enviar = document.querySelector("#btn_enviar_horario");
	let lista = JSON.parse(localStorage.getItem("materias"));
	let existe = false;
	for (let i in lista) {
		if (lista[i].Materia.includes(horario_nombre_materia.value)) {
			existe = true;
			break;
		} else existe = false;
	}
	if (!existe || horario_nombre_materia.value == "") {
		bloquear(input_dia);
		bloquear(input_hora);
	} else {
		habilitar(input_dia);
		habilitar(input_hora);
		// AGREGAR METODO Y BACKEND DE ESTE INMPUT
		btn_enviar.addEventListener("submit", () => {
			horario_nombre_materia.value = "";
			bloquear(input_dia);
			bloquear(input_hora);
		});
	}
});

window.openModalHorario = openModalHorario;
window.cerrarModalHorario = cerrarModalHorario;
window.agregarMateriaHorario = agregarMateriaHorario;
