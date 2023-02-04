document.addEventListener("DOMContentLoaded", () => {
	if (localStorage.getItem("notificacion")) return;
	const Toast = Swal.mixin({
		toast: true,
		position: "top-end",
		showConfirmButton: false,
		timer: 2500,
		timerProgressBar: true,
		didOpen: (toast) => {
			toast.addEventListener("mouseenter", Swal.stopTimer);
			toast.addEventListener("mouseleave", Swal.resumeTimer);
		},
	});
	Toast.fire({
		icon: "success",
		title: "Iniciado sesión con éxito",
	});
});
document.addEventListener("DOMContentLoaded", async () => {
	localStorage.setItem("notificacion", "logined");
	let currentUrl = new URL(window.location.href);
	const respuesta = await fetch(currentUrl.origin + "/horario_materias", {
		method: "POST",
		headers: {
			accept: "*/*",
			cokkies: getCookie("DataLogin"),
		},
		body: "",
	});
	if (!respuesta) console.log("error");
	const data = await respuesta.json();
	localStorage.setItem("materias", JSON.stringify(data));
	const response = await fetch(currentUrl.origin + "/pensum_materias", {
		method: "POST",
		headers: {
			accept: "*/*",
			cokkies: getCookie("DataLogin"),
		},
		body: "",
	});
	if (!response) console.log("error");
	const datos = await response.json();
	if (!datos[0].id) return;
	let semestres = [];
	for (let i in datos) {
		if (!semestres.includes(datos[i].semestre))
			semestres.push(datos[i].semestre);
	}
	semestres.sort((a, b) => {
		return a - b;
	});
	/*
	<!-- ESTRUCTURA DEL SEMESTRE -->
	<div class="semestre">
		<!-- ESTRUCTURA DE UNA MATERIA -->
		<div class="materia" data-materia="$id_materia">
			<button id="$id_materia" class="materia_opcion1">Nombre de la materia Nombre de la materia</button>
		</div>
		<!-- FIND E ESTRUCTURA DE UNA MATERIA -->
<!-- FIN DE ESTRUCTURA DEL SEMESTRE -->
	 */
	const pensum_container = document.querySelector("[data-container-pensum]");
	console.log(datos);
	semestres.forEach((element) => {
		let semestre_html = document.createElement("div");
		semestre_html.classList.add("semestre");
		for (let i in datos) {
			if (
				datos[i].semestre == element &&
				!document.getElementById(datos[i].id)
			) {
				const materia_html = document.createElement("div");
				materia_html.classList.add("materia");
				const button_html = document.createElement("button");
				button_html.classList.add("materia_opcion1");
				button_html.innerHTML = datos[i].nombre;
				button_html.id = datos[i].id;
				materia_html.appendChild(button_html);
				semestre_html.appendChild(materia_html);
			}
			pensum_container.appendChild(semestre_html);
		}
	});
});
