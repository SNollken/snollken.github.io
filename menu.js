// script: menu.js

document.addEventListener('DOMContentLoaded', () => {
    const botaoMenu = document.getElementById('menu-hamburguer');
    const menuNav = document.querySelector('header nav ul');

    if (!botaoMenu || !menuNav) {
        return;
    }

    function atualizarEstadoMenu(estaAberto) {
        botaoMenu.setAttribute('aria-expanded', estaAberto ? 'true' : 'false');
    }

    function fecharMenu() {
        menuNav.classList.remove('ativo');
        atualizarEstadoMenu(false);
    }

    botaoMenu.addEventListener('click', () => {
        const estaAberto = menuNav.classList.toggle('ativo');
        atualizarEstadoMenu(estaAberto);
    });

    menuNav.addEventListener('click', (event) => {
        if (event.target && event.target.tagName === 'A') {
            fecharMenu();
        }
    });

    atualizarEstadoMenu(false);
});
