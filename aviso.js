// controla o aviso de construção e compensa header fixo
document.addEventListener('DOMContentLoaded', function() {
  const header = document.querySelector('header');
  const aviso = document.getElementById('aviso-construcao');
  if (!aviso) return;

  function atualizarPosicaoAviso() {
    if (!aviso.classList.contains('visivel')) {
      document.body.classList.remove('aviso-visivel');
      document.body.style.removeProperty('--aviso-h');
      return;
    }
    // banner fixo no topo; header desce para baixo dele
    aviso.style.top = '0px';
    const avisoH = aviso.offsetHeight || 0;
    document.body.style.setProperty('--aviso-h', avisoH + 'px');
    document.body.classList.add('aviso-visivel');
    if (header) {
      header.style.top = avisoH + 'px';
    }
  }

  if (!localStorage.getItem('avisoConstrucaoFechado')) {
    aviso.classList.add('visivel');
  }

  atualizarPosicaoAviso();
  window.addEventListener('resize', atualizarPosicaoAviso);

  const botaoFechar = document.getElementById('fechar-aviso');
  if (botaoFechar) {
    botaoFechar.addEventListener('click', function() {
      aviso.classList.remove('visivel');
      if (header) header.style.top = '0px';
      document.body.classList.remove('aviso-visivel');
      document.body.style.removeProperty('--aviso-h');
      localStorage.setItem('avisoConstrucaoFechado', 'true');
    });
  }
});
