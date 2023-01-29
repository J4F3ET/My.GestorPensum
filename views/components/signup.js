const formulario_login = document.querySelector("[data-form-signup]");

formulario_login.addEventListener("submit", async (event) => {
	event.preventDefault();
	const nombre = document.querySelector("[data-input-signup-name]");
	const pass = document.querySelector("[data-input-signup-password]");
	if (nombre.value == "" || pass.value == "") {
		Swal.fire({
			icon: "error",
			title: "Opps!",
			text: "Introduzca un nombre y contraseña",
		});
		return;
	}
	const body_contens = `user=${nombre.value}&password=${pass.value}`;
	let currentUrl = new URL(window.location.href);
	const respuesta = await fetch(currentUrl.origin + "/register", {
		method: "POST",
		headers: {
			Accept: "*/*",
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: body_contens,
	});
	const data = await respuesta.json();
	if (!respuesta) {
		throw new Error();
	} else if (data.message) {
		Swal.fire({
			icon: "error",
			title: "Opps!",
			timer: 2000,
			text: data.message,
		});
		return;
	} else window.location.href = "/index";
});
