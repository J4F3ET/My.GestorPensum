a_nav_mobile_menu.addEventListener('click', () => {
    section_nav_mobile.classList.add('invisible');
    section_nav_desktop.style.display = 'flex';
    openSideBar();
});

// 280 es el pixelaje del width del nav completo
function openSideBar(){
    section_nav_desktop.style.width = "280px";
}

// Esto es para asegurar que el nav se vea en desktop cuando se cierra en mobile
window.addEventListener('resize', () => {
    closeSideBar();
});

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