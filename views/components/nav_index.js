document.addEventListener("DOMContentLoaded", async() => {
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
});
