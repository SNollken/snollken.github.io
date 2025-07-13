// script: projetos.js

// espera o conteudo da pagina carregar completamente
document.addEventListener("DOMContentLoaded", function () {
  // seleciona todos os elementos necessarios
  const botoesFiltro = document.querySelectorAll(".tag-filtro");
  const projetos = document.querySelectorAll(".card-projeto");

  // funcao para filtrar os projetos
  function filtrarProjetos(tag) {
    // primeiro, atualiza o estado visual dos botoes
    botoesFiltro.forEach((botao) => {
      if (botao.dataset.tag === tag) {
        botao.classList.add("ativo"); // adiciona a classe 'ativo' no botao selecionado
      } else {
        botao.classList.remove("ativo"); // remove de todos os outros
      }
    });

    // agora, percorre todos os projetos para mostrar ou esconder
    projetos.forEach((projeto) => {
      const tagsDoProjeto = projeto.dataset.tags.split(" "); // pega as tags do projeto e transforma em um array

      // se a tag selecionada for 'todos' ou se o projeto contem a tag, mostra o projeto
      if (tag === "todos" || tagsDoProjeto.includes(tag)) {
        projeto.classList.remove("escondido");
      } else {
        // senao, esconde o projeto
        projeto.classList.add("escondido");
      }
    });
  }

  // --- logica para o carregamento da pagina ---

  // pega os parametros da url
  const urlParams = new URLSearchParams(window.location.search);
  const tagDaUrl = urlParams.get("tag"); // pega o valor da 'tag' (ex: 'js')

  // se uma tag veio pela url, filtra por ela. senao, mostra todos.
  if (tagDaUrl) {
    filtrarProjetos(tagDaUrl);
  } else {
    filtrarProjetos("todos");
  }

  // --- logica para os cliques nos botoes de filtro ---

  // adiciona um evento de clique para cada botao
  botoesFiltro.forEach((botao) => {
    botao.addEventListener("click", function () {
      const tagSelecionada = botao.dataset.tag;
      filtrarProjetos(tagSelecionada);
    });
  });

  const modal = document.getElementById("modal-projeto");
  const botoesVerDetalhes = document.querySelectorAll(".learn-more");

  // so executa se o modal existir na pagina
  if (modal) {
    const modalFundo = modal.querySelector(".modal-fundo");
    const botaoFechar = modal.querySelector(".fechar-modal");
    const modalImagem = modal.querySelector(".modal-imagem");
    const modalTitulo = modal.querySelector(".modal-titulo");
    const modalDescricao = modal.querySelector(".modal-descricao");

    // funcao para abrir o modal
    botoesVerDetalhes.forEach((botao) => {
      botao.addEventListener("click", function (event) {
        event.preventDefault(); // impede que o link '#' faca a pagina pular para o topo

        // pega o card pai do botao clicado
        const card = botao.closest(".card-projeto");

        // pega os dados do card usando os atributos 'data-*'
        const imagemSrc = card.dataset.imagem;
        const titulo = card.dataset.titulo;
        const descricao = card.dataset.descricaoLonga;

        // preenche o modal com os dados
        modalImagem.src = imagemSrc;
        modalImagem.alt = "Imagem do projeto " + titulo;
        modalTitulo.textContent = titulo;

        modalDescricao.textContent = descricao;


        //seleciona o botao dentro do modal
        const linkBotao = modal.querySelector(".modal-link-site");

        //pega a url do atributo data-link-site do card
        const urlSite = card.dataset.linkSite;

        //verifica se a url existe
        if (urlSite) {
          //se existir, define o href do botao e o torna visivel
          linkBotao.href = urlSite;
          linkBotao.style.display = "inline-block";
        } else {
          //se nao existir, esconde o botao
          linkBotao.style.display = "none";
        }
        // mostra o modal
        modal.classList.add("visivel");
        
      });
    });

    // funcao para fechar o modal
    function fecharModal() {
      modal.classList.remove("visivel");
    }

    // adiciona eventos de clique para fechar
    botaoFechar.addEventListener("click", fecharModal);
    modalFundo.addEventListener("click", fecharModal);
  }
  const paramsUrl = new URLSearchParams(window.location.search);
  const projetoId = paramsUrl.get("projeto"); // pega o valor do parametro 'projeto'

  if (projetoId) {
    const projetoParaAbrir = document.getElementById(projetoId);

    if (projetoParaAbrir) {
      // Rola a pagina ate o projeto para o usuario ver onde ele esta
      projetoParaAbrir.scrollIntoView({ behavior: "smooth", block: "center" });

      // Simula um clique no botao "Ver Detalhes" daquele projeto especifico
      // Usamos um pequeno timeout para garantir que a rolagem aconteca primeiro
      setTimeout(function () {
        const botaoDetalhes = projetoParaAbrir.querySelector(".learn-more");
        if (botaoDetalhes) {
          botaoDetalhes.click(); // Abre o modal automaticamente!
        }
      }, 500); // espera 500ms (meio segundo)
    }
  }
});
