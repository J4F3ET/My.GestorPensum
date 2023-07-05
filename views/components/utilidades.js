// Esto es para asegurar que el nav se vea en desktop cuando se cierra en mobile
window.addEventListener('resize', () => {
    closeSideBar();
});

let prev_scroll_pos = window.scrollY;

window.addEventListener('scroll', () => {
    let current_scroll_pos = window.scrollY;

    if (prev_scroll_pos > current_scroll_pos) {
        openMenuMobile();
        section_nav_mobile.classList.add('nav-fade');
    } else {
        closeMenuMobile();
        section_nav_mobile.classList.remove('nav-fade');
    }

    prev_scroll_pos = current_scroll_pos;
});

a_nav_mobile_menu.addEventListener('click', () => {
    section_nav_mobile.classList.add('invisible');
    section_nav_desktop.style.display = 'flex';
    section_nav_desktop.style.width = "80%";
});

// Se cierra con 80 porque es el tamaño del nav reducido Path: views\lib\js\navigation.js
function closeSideBar(){
    // Para mobile
    if(window.innerWidth <= 425){
        section_nav_mobile.classList.remove('invisible');
        section_nav_desktop.style.display = 'none';
    }
    else{
        // Para desktop
        section_nav_mobile.classList.add('invisible');
        section_nav_desktop.style.display = 'flex';
    }
}

function openMenuMobile() {
    // Muestra el menú y elimina la clase de ocultamiento
    section_nav_mobile.classList.remove('nav-hidden');
}

function closeMenuMobile() {
    // Oculta el menú añadiendo la clase de ocultamiento
    section_nav_mobile.classList.add('nav-hidden');
}
