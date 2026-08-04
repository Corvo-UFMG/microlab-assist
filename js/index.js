    function iniciarIdentificacao() {
      const selecionado = document.querySelector('input[name="material"]:checked');
      
      if (!selecionado) {
        alert("Por favor, selecione um tipo de material.");
        return;
      }

      const material = selecionado.parentElement.textContent.trim();
      
      // Salva o material escolhido para usar na próxima tela
      sessionStorage.setItem('materialSelecionado', material);
      
      // Se for urina, ativa o protocolo
      if (selecionado.value === "urina") {

    sessionStorage.setItem("mostrarAssistente", "urina");
}

    // Abre normalmente a investigação
window.location.href = "investigacao.html";
    }
/*
 * Micro Lab Assist
 * Sistema Especialista para Identificação Microbiológica
 *
 * Copyright (C) 2026 Júlio César Martins
 *
 * Licensed under the GNU Affero General Public License v3.0
 *
 * Repositório:
 * https://github.com/Corvo-UFMG/MicroLab-Assist
 */