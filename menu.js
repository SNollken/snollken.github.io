// script: menu.js

document.addEventListener('DOMContentLoaded', () => {
    const botaoMenu = document.getElementById('menu-hamburguer');
    const menuNav = document.querySelector('header nav ul');

    if (botaoMenu && menuNav) {
        botaoMenu.addEventListener('click', () => {
            // adiciona ou remove a classe 'ativo' da lista <ul>
            menuNav.classList.toggle('ativo');
        });
    }
});