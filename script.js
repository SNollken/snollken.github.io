//espera o conteúdo da página carregar completamente antes de rodar o script
document.addEventListener('DOMContentLoaded', function() {

    const startButton = document.getElementById('startButton');

    const sobreMimSection = document.getElementById('sobre-mim');

    //verificar se ambos os elementos foram encontrados
    //isso é uma boa prática para evitar erros caso os IDs mudem ou não existam.
    if (startButton && sobreMimSection) {

        startButton.addEventListener('click', function() {
            //quando o botão for clicado, pedir para a seção "sobre-mim"
            //rolar suavemente para a vista.
            sobreMimSection.scrollIntoView({ behavior: 'smooth' });
        });

    } else {
        console.warn("Botão 'Start' ou seção 'Sobre Mim' não encontrados. Verifique os IDs no HTML.");
    }

});