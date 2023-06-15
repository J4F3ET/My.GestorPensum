// No olvides poner los puntitos para evitar dolores de cabeza por fa
const $ = (id) => document.querySelector(id);

// nav completo
const section_nav_completo = $('.nav_completo');

// se crea un array porque se realiza la misma accion en los 3 casos
const a_nav_icono = document.querySelectorAll('.nav_icono');
const a_nav_materias = document.querySelectorAll('.nav__materias');
const a_nav_horario = document.querySelectorAll('nav__horario');
const a_nav_estadisticas = document.querySelectorAll('nav_estadisticas');
const a_nav_cerrar = document.querySelectorAll('nav_cerrar');

// nav desktop
const section_nav_desktop = $('.nav_desktop');

// nav mobile
const section_nav_mobile = $('.nav_mobile');
const a_nav_mobile_menu = $('.nav_mobile__menu');
