a_nav_mobile_menu.addEventListener('click', () => {
    section_nav_mobile.classList.add('invisible');
    section_nav_desktop.style.display = 'flex';
    openSideBar();
});

function openSideBar(){
    section_nav_desktop.style.width = "280px";
}

function closeSideBar(){
    section_nav_desktop.style.width = "80px";
}
