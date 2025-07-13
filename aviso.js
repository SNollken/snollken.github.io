// espera o conteudo da pagina carregar
document.addEventListener('DOMContentLoaded', function() {
  
     // seleciona o header e o banner
  const header = document.querySelector('header');
  const aviso = document.getElementById('aviso-construcao');

  // verifica se os dois elementos existem na pagina
  if (header && aviso) {
    // mede a altura total do header (incluindo padding e bordas)
    const headerHeight = header.offsetHeight;
    
    // define a posicao 'top' do banner para ser exatamente a altura do header
    aviso.style.top = headerHeight + 'px';
  }

  // seleciona os elementos do aviso
  const botaoFechar = document.getElementById('fechar-aviso');

  // verifica se o aviso ja foi fechado antes
  // o 'localStorage' e um pequeno armazenamento no navegador
  if (!localStorage.getItem('avisoConstrucaoFechado')) {
    // se nao foi fechado, mostra o aviso
    aviso.classList.add('visivel');
  }

  // adiciona o evento para o botao de fechar
  botaoFechar.addEventListener('click', function() {
    // esconde o aviso
    aviso.classList.remove('visivel');
    
    // salva no navegador que o aviso foi fechado
    localStorage.setItem('avisoConstrucaoFechado', 'true');
  });

});