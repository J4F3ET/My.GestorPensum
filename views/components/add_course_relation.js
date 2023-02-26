document.addEventListener("DOMContentLoaded", async() => {//Metodo que jerarquiza las materias
    const response = await fetch(currentUrl.origin + "/return_materia_requisito", {
        method: "POST",
		headers: {
			accept: "*/*",
			cokkies: getCookie("DataLogin"),
		},
		body: "",
    });


});