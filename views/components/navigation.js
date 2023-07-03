window.addEventListener('hashchange', navegator, false);
window.addEventListener('DOMContentLoaded', navegator, false);

a_nav_icono.addEventListener('click', () => {
    location.href = 'index.html';
});

a_nav_materias.addEventListener('click', () => {
    location.hash = '#materias';
});

a_nav_horario.addEventListener('click', () => {
    location.hash = '#horario';
});

a_nav_estadisticas.addEventListener('click', () => {
    location.hash = '#estadisticas';
});

a_nav_cerrar.addEventListener('click', () => {
    location.hash = '#cerrar';
});

function navegator(){
    document.body.scrollTop = 0;

    location.hash.startsWith('#materias') ?
    page_materias() :
    location.hash.startsWith('#horario') ?
    page_horario() :
    location.hash.startsWith('#estadisticas') ?
    page_estadisticas() :
    location.hash.startsWith('#cerrar') ?
    page_cerrar() :
    page_materias();
}

function page_materias(){
    closeSideBar();
    section_pensum.classList.remove('invisible');
    section_horario.classList.add('invisible');
    section_creditos.classList.add('invisible');
}

function page_horario(){
    closeSideBar();
    section_pensum.classList.add('invisible');
    section_horario.classList.remove('invisible');
    section_creditos.classList.add('invisible');
}

function page_estadisticas(){
    closeSideBar();
    section_pensum.classList.add('invisible');
    section_horario.classList.add('invisible');
    section_creditos.classList.remove('invisible');
}
