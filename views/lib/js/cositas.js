// Esto es para asegurar que el nav se vea en desktop cuando se cierra en mobile
window.addEventListener('resize', () => {
    closeSideBar();
});

// Para ocultar el nav cuando se hace scroll
window.addEventListener('scroll', () => {
    let prev_scroll_pos = window.scrollY; // Posición del scroll anterior
    const current_scroll_pos = window.scrollY; // Posición actual del scroll
    if (prev_scroll_pos > current_scroll_pos) { // Si la posición anterior es mayor que la actual, se muestra el menú
        openMenuMobile();
    }
    else { // Si la posición anterior es menor que la actual, se oculta el menú
        closeMenuMobile();
    }

});

a_nav_mobile_menu.addEventListener('click', () => {
    section_nav_mobile.classList.add('invisible');
    section_nav_desktop.style.display = 'flex';
    openSideBar();
});

// 280 es el pixelaje del width del nav completo
function openSideBar(){
    section_nav_desktop.style.width = "280px";
}

// Se cierra con 80 porque es el tamaño del nav reducido Path: views\lib\js\navigation.js
function closeSideBar(){
    section_nav_desktop.style.width = "80px";
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

// Se abre el nav mobile
function openMenuMobile(){
    section_nav_mobile.classList.remove('invisible');
}

// Se cierra el nav mobile
function closeMenuMobile(){
    section_nav_mobile.classList.add('invisible');
}