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
    const modalConteudo = modal.querySelector(".modal-conteudo");
    const modalImagem = modal.querySelector(".modal-imagem");
    const modalTitulo = modal.querySelector(".modal-titulo");
    const modalDescricao = modal.querySelector(".modal-descricao");
    const tagsContainer = modal.querySelector(".modal-tags-container");
    const linkBotao = modal.querySelector(".modal-link-site");

    function preencherModal(card) {
      const imagemSrc = card.dataset.imagem;
      const titulo = card.dataset.titulo || "";
      const descricao = card.dataset.descricaoLonga || "";
      const tagsString = card.dataset.tags;
      const urlSite = card.dataset.linkSite;

      modalTitulo.textContent = titulo;
      modalDescricao.textContent = descricao;

      if (imagemSrc) {
        modalImagem.src = imagemSrc;
        modalImagem.alt = "Imagem do projeto " + titulo;
        modalImagem.style.display = "block";
      } else {
        modalImagem.removeAttribute("src");
        modalImagem.alt = "";
        modalImagem.style.display = "none";
      }

      if (tagsContainer) {
        tagsContainer.innerHTML = "";
        if (tagsString) {
          const tagsArray = tagsString.split(" ");
          tagsArray.forEach((tag) => {
            const tagElemento = document.createElement("span");
            tagElemento.className = "modal-tag";
            tagElemento.textContent = tag;
            tagsContainer.appendChild(tagElemento);
          });
        }
      }

      if (linkBotao) {
        if (urlSite) {
          linkBotao.href = urlSite;
          linkBotao.style.display = "inline-block";
        } else {
          linkBotao.style.display = "none";
          linkBotao.removeAttribute("href");
        }
      }
    }

    function abrirModal(card) {
      preencherModal(card);
      modal.classList.add("visivel");
      modal.setAttribute("aria-hidden", "false");

      if (modalConteudo) {
        modalConteudo.focus();
      }
    }

    // funcao para abrir o modal
    botoesVerDetalhes.forEach((botao) => {
      botao.addEventListener("click", function (event) {
        event.preventDefault(); // impede que o link '#' faca a pagina pular para o topo

        // pega o card pai do botao clicado
        const card = botao.closest(".card-projeto");
        if (card) {
          abrirModal(card);
        }
      });
    });

    // funcao para fechar o modal
    function fecharModal() {
      modal.classList.remove("visivel");
      modal.setAttribute("aria-hidden", "true");
    }

    // adiciona eventos de clique para fechar
    if (botaoFechar) {
      botaoFechar.addEventListener("click", fecharModal);
    }
    if (modalFundo) {
      modalFundo.addEventListener("click", fecharModal);
    }

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && modal.classList.contains("visivel")) {
        fecharModal();
      }
    });
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
