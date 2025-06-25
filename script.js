//espera o conteúdo da página carregar completamente antes de rodar o script
document.addEventListener('DOMContentLoaded', function() {
    
    // logica para o botao de start rolar a pagina
    const startButton = document.getElementById('startButton');
    const sobreMimSection = document.getElementById('sobre-mim');

    if (startButton && sobreMimSection) {
        startButton.addEventListener('click', function() {
            sobreMimSection.scrollIntoView({ behavior: 'smooth' });
        });
    }

});