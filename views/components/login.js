const formulario_login = document.querySelector('[data-form-login]');
const nombre = document.querySelector('[data-input-login-name]');
formulario_login.addEventListener('submit',async (event) => {
    event.preventDefault();
    const nombre = document.querySelector('[data-input-login-name]');
    const pass = document.querySelector('[data-input-login-password]');
    const body_contens = `user=${nombre.value}&password=${pass.value}`;
    let currentUrl = new URL(window.location.href);
    let newUrl = currentUrl.origin + '/login';
    const respuesta = await fetch(newUrl,{
                method: 'POST',
                headers: {
                    "Accept": "*/*",
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body:body_contens
            });
    const data = await respuesta.json();
    if(!respuesta){
        console.error(respuesta);
        throw new Error
    }else if(data.id){
        window.location.href ='/index';
    }else if(data.message){
        Swal.fire({
            icon : 'warning',
            title: 'Opps!',
            timer: 1800,

            text: data.message,
          })
    }
});