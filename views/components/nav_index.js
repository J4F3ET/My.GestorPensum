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
	localStorage.setItem("notificacion", "logined");
});
