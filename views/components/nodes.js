// No olvides poner los puntitos para evitar dolores de cabeza por fa
const $ = (id) => document.querySelector(id);

const main_html = document.querySelector('main')

// nav completo
const section_nav_desktop = $('.nav_desktop');
const a_nav_icono = $('.nav__icono');
const a_nav_materias = $('.nav__materias');
const a_nav_horario = $('.nav__horario');
const a_nav_estadisticas = $('.nav__estadisticas');
const a_nav_cerrar = $('.snav_cerrar');

// nav mobile
const section_nav_mobile = $('.nav_mobile');
const a_nav_mobile_menu = $('.nav_mobile__menu');

// seccion pensum
const section_pensum = $('.container_pensum');
const div_contenedor_semestres = $('.container_semestres');

// seccion horario
const section_horario = $('.container_horario');
const div_contenedor_horario = $('.container_tabla');

// seccion creditos
const section_creditos = $('.container_creditos');
const div_container_tabla = $('.container_tabla')

// seccion agregar nueva materia
