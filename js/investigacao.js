    let resultados = {};
    let currentStep = 0;
    let casoAtual = {};
    let testeEmEdicao = null;
    let testeSugeridoAtual = "";

    // ==================== WIZARD DE URINA ====================
    const urinaSteps = [
      {
        titulo: "Etapa 1 — Recepção da Amostra",
        html: `
          <div class="step-title">Dados da Coleta</div>
          <div class="form-group">
            <label>Tipo de Coleta</label>
            <div class="radio-group">
              <label><input type="radio" name="coleta" value="Jato Médio"> Jato Médio</label>
              <label><input type="radio" name="coleta" value="Sonda"> Sonda</label>
            </div>
          </div>
          <div class="form-group">
            <label>Aspecto</label>
            <div class="radio-group">
              <label><input type="radio" name="aspecto" value="Límpida"> Límpida</label>
              <label><input type="radio" name="aspecto" value="Turva"> Turva</label>
              <label><input type="radio" name="aspecto" value="Hemática"> Hemática</label>
            </div>
          </div>
        `
      },
      {
        titulo: "Etapa 2 — Protocolo Recomendado",
        html: `
          <div class="step-title">Próximos Procedimentos</div>
          <p><strong>Realizar:</strong></p>
          <ul style="margin:15px 0; line-height:1.8; padding-left: 20px;">
            <li>✔ Coloração de Gram</li>
            <li>✔ Semeadura em Ágar Sangue, MacConkey e CLED</li>
          </ul>
          <p><strong>Incubação:</strong> 35–37°C por 18–24h</p>
        `
      },
      {
        titulo: "Etapa 3 — Coloração de Gram",
        html: `
          <div class="step-title">Resultado do Gram</div>
          <div class="form-group">
            <label>Gram</label>
            <div class="radio-group">
              <label><input type="radio" name="gram" value="Positivo"> Positivo</label>
              <label><input type="radio" name="gram" value="Negativo"> Negativo</label>
            </div>
          </div>
          <div class="form-group">
            <label>Morfologia</label>
            <div class="radio-group">
              <label><input type="radio" name="forma" value="Bacilo"> Bacilo</label>
              <label><input type="radio" name="forma" value="Coco"> Coco</label>
            </div>
          </div>
        `
      }
    ];

    function iniciarWizardUrina() {
      currentStep = 0;
      casoAtual = { material: "Urina" };
      document.getElementById("assistenteModal").style.display = "flex";
      renderWizardStep();
    }

    function renderWizardStep() {
      const step = urinaSteps[currentStep];
      document.getElementById("wizardTitulo").textContent = step.titulo;
      document.getElementById("stepContent").innerHTML = step.html;
      document.getElementById("progressBar").style.width = `${((currentStep + 1) / urinaSteps.length) * 100}%`;

      document.getElementById("btnAnterior").style.visibility = currentStep === 0 ? "hidden" : "visible";
      document.getElementById("btnProximo").textContent = currentStep === urinaSteps.length - 1 ? "Finalizar" : "Próximo";
    }

    function proximoStep() {
      if (currentStep < urinaSteps.length - 1) {
        currentStep++;
        renderWizardStep();
      } else {
        finalizarWizard();
      }
    }

    function anteriorStep() {
      if (currentStep > 0) {
        currentStep--;
        renderWizardStep();
      }
    }

    function finalizarWizard() {
      const coleta = document.querySelector('input[name="coleta"]:checked')?.value;
      const aspecto = document.querySelector('input[name="aspecto"]:checked')?.value;
      const gram = document.querySelector('input[name="gram"]:checked')?.value;
      const forma = document.querySelector('input[name="forma"]:checked')?.value;

      if (coleta) resultados["Tipo de Coleta"] = coleta;
      if (aspecto) resultados["Aspecto"] = aspecto;
      if (gram) resultados["Gram"] = gram;
      if (forma) resultados["Forma"] = forma;

      atualizarResultadosNaTela();
      atualizarHipoteses();

      document.getElementById("assistenteModal").style.display = "none";
      alert("✅ Protocolo de Urina concluído!\nOs resultados foram adicionados automaticamente.");
    }

    function fecharAssistente() {
      if (confirm("Deseja sair do protocolo? Os dados desta etapa não serão salvos.")) {
        document.getElementById("assistenteModal").style.display = "none";
      }
    }

    // ==================== BACTÉRIAS CADASTRADAS ====================
    function abrirBacteriasCadastradas() {
      const modal = document.getElementById("modalBacteriasCadastradas");
      const container = document.getElementById("listaBacteriasContainer");
      const perfilContainer = document.getElementById("perfilBacteriaContainer");
      const tituloQtd = document.getElementById("tituloQtdBacterias");

      container.innerHTML = "";
      perfilContainer.innerHTML = `
        <div style="color: #64748b; font-style: italic; text-align: center; margin-top: 40px;">
          Passe o mouse sobre uma bactéria para visualizar o Perfil Bacteriano.
        </div>`;

      let listaBacterias = (typeof bacterias !== "undefined" && Array.isArray(bacterias))
        ? [...bacterias]
        : [];

      listaBacterias.sort((a, b) => {
        const nomeA = (a.nome || "").toLowerCase();
        const nomeB = (b.nome || "").toLowerCase();
        return nomeA.localeCompare(nomeB, "pt-BR");
      });

      tituloQtd.textContent = `Existem ${listaBacterias.length} Bactérias Cadastradas até o momento...`;

      if (listaBacterias.length === 0) {
        container.innerHTML = '<div class="empty">Nenhuma bactéria encontrada no arquivo de dados.</div>';
        modal.style.display = "flex";
        return;
      }

      listaBacterias.forEach(bac => {
        const itemDiv = document.createElement("div");
        itemDiv.className = "bacteria-item-linha";
        itemDiv.textContent = bac.nome || "Espécie Desconhecida";

        itemDiv.addEventListener("mouseenter", () => {
          let htmlPerfil = `<h4>Perfil Bacteriano</h4>`;
          htmlPerfil += `<p><strong>Nome:</strong> ${bac.nome || "N/I"}</p>`;
          htmlPerfil += `<p><strong>Grupo:</strong> ${bac.grupo || "N/I"}</p>`;

          const car = bac.caracteristicas || {};
          htmlPerfil += `<p><strong>Gram:</strong> ${car.Gram || "N/I"}</p>`;
          htmlPerfil += `<p><strong>Forma:</strong> ${car.Forma || "N/I"}</p>`;
          htmlPerfil += `<p><strong>Respiração:</strong> ${car.Respiracao || "N/I"}</p>`;
          htmlPerfil += `<p><strong>Atmosfera:</strong> ${car.Atmosfera || "N/I"}</p>`;
          htmlPerfil += `<p><strong>Temperatura:</strong> ${car["Temperatura de Crescimento"] || "N/I"}</p>`;
          htmlPerfil += `<p><strong>TSI:</strong> ${car.TSI || "N/I"}</p>`;

          for (let chave in car) {
            const chaveLower = chave.toLowerCase();
            if (["gram", "forma", "respiracao", "atmosfera", "temperatura de crescimento", "tsi"].includes(chaveLower)) {
              continue;
            }
            const valor = car[chave];
            if (typeof valor === "string") {
              const valLower = valor.toLowerCase();
              if (valLower === "positivo" || valLower === "negativo") {
                htmlPerfil += `<p><strong>${chave}:</strong> ${valor}</p>`;
              }
            }
          }

          perfilContainer.innerHTML = htmlPerfil;
        });

        container.appendChild(itemDiv);
      });

      modal.style.display = "flex";
    }

    function fecharBacteriasCadastradas() {
      document.getElementById("modalBacteriasCadastradas").style.display = "none";
    }

    // ==================== FUNÇÕES PRINCIPAIS ====================
    function carregarMaterial() {
      const material = sessionStorage.getItem("materialSelecionado") || "Não informado";
      document.getElementById("material").textContent = material;
    }

    function iniciarNovoExame() {
      const material = document.getElementById("material").textContent;
      if (material === "Urina") {
        iniciarWizardUrina();
      } else {
        alert(`Iniciando investigação direta para ${material}.\nVocê pode adicionar os resultados manualmente.`);
      }
    }

    function escapeHtml(str) {
      return String(str).replace(/[&<>"']/g, s =>
        ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[s])
      );
    }

    function atualizarResultadosNaTela() {
      const container = document.getElementById("resultadosContainer");
      container.innerHTML = "";

      if (Object.keys(resultados).length === 0) {
        container.innerHTML = '<div class="empty" id="emptyMessage">Nenhum resultado informado.</div>';
        return;
      }

      Object.keys(resultados).forEach(teste => {
        const div = document.createElement("div");
        div.className = "result-item";

        const left = document.createElement("div");
        left.innerHTML = `<strong>${escapeHtml(teste)}:</strong> ${escapeHtml(resultados[teste])}`;

        const right = document.createElement("div");
        right.style.display = "flex";
        right.style.gap = "6px";

        const editBtn = document.createElement("button");
        editBtn.type = "button";
        editBtn.style.cssText = "background:#3b82f6; padding:5px 9px; border:none; border-radius:5px; color:white; cursor:pointer;";
        editBtn.textContent = "✏";
        editBtn.title = "Editar";
        editBtn.setAttribute("aria-label", `Editar ${teste}`);
        editBtn.addEventListener("click", () => editarResultado(teste));

        const delBtn = document.createElement("button");
        delBtn.type = "button";
        delBtn.style.cssText = "background:#ef4444; padding:5px 9px; border:none; border-radius:5px; color:white; cursor:pointer;";
        delBtn.textContent = "🗑";
        delBtn.title = "Excluir";
        delBtn.setAttribute("aria-label", `Excluir ${teste}`);
        delBtn.addEventListener("click", () => excluirResultado(teste));

        right.appendChild(editBtn);
        right.appendChild(delBtn);
        div.appendChild(left);
        div.appendChild(right);
        container.appendChild(div);
      });
    }

    // ==================== HIPÓTESES E SUGESTÃO DE DESEMPATE ====================
    function atualizarHipoteses() {
      const container = document.getElementById("hipotesesContainer");
      const hipoteses = (typeof window.gerarHipoteses === "function")
        ? window.gerarHipoteses(resultados)
        : [];

      container.innerHTML = "";

      if (!hipoteses || hipoteses.length === 0) {
        container.innerHTML = '<div class="empty" id="emptyHipoteses">Aguardando resultados laboratoriais.</div>';
        return;
      }

      hipoteses.slice(0, 3).forEach(h => {
        const div = document.createElement("div");
        div.className = "hipotese-item";

        const fotoUrl = h.imagem || `img/${(h.nome || "").toLowerCase().replace(/ /g, "_")}.jpg`;
        const fallbackFoto = "https://via.placeholder.com/60/0f172a/22d3ee?text=Micro";

        div.innerHTML = `
          <div class="hipotese-info">
            <strong style="font-size: 1.05rem;">${escapeHtml(h.nome || "Desconhecida")}</strong>
            <small style="color: #94a3b8;">${escapeHtml(h.grupo || "")}</small>
            <span class="compatibilidade" style="margin-top: 4px;">${h.compatibilidade || 0}% de compatibilidade</span>
          </div>
          <img src="${fotoUrl}" alt="${escapeHtml(h.nome || "")}" class="hipotese-foto"
               onerror="this.onerror=null; this.src='${fallbackFoto}';">
        `;
        container.appendChild(div);
      });

      // Executa a verificação inteligente de desempate
      verificarESugerirDesempate(hipoteses, resultados);
    }

    function verificarESugerirDesempate(hipoteses, resultadosAtuais) {
      if (!hipoteses || hipoteses.length < 2) {
        fecharModalSugestao();
        return;
      }

      // 1. Filtra APENAS as bactérias que atingiram 100% de compatibilidade
      const candidatas100 = hipoteses.filter(h => h.compatibilidade === 100);

      // 🛑 REGRA DE OURO: O assistente só age se houver EXATAMENTE DUAS bactérias empatadas em 100%.
      // Se houver 3 ou mais (início de triagem) ou apenas 1 (já definido), ele silencia.
      if (candidatas100.length !== 2) {
        fecharModalSugestao();
        return;
      }

      const h1 = candidatas100[0];
      const h2 = candidatas100[1];

      const bac1 = (typeof bacterias !== "undefined") ? bacterias.find(b => b.nome === h1.nome) : null;
      const bac2 = (typeof bacterias !== "undefined") ? bacterias.find(b => b.nome === h2.nome) : null;

      if (!bac1 || !bac2) return;

      const car1 = bac1.caracteristicas || {};
      const car2 = bac2.caracteristicas || {};

      let testeSugerido = null;
      let resBac1 = "";
      let resBac2 = "";

      const testesChave = ["Lisina", "Novobiocina", "Optoquina", "Coagulase", "Bile Esculina", "PYR", "DNase", "Citrato", "Indol", "Urease", "Cápsula", "Motilidade"];

      for (let teste of testesChave) {
        if (!resultadosAtuais[teste]) {
          let val1 = car1[teste] || car1[teste === "Lisina" ? "LDC" : teste];
          let val2 = car2[teste] || car2[teste === "Lisina" ? "LDC" : teste];

          if (val1 && val2 && val1 !== val2 && val1 !== "Não se aplica" && val2 !== "Não se aplica") {
            testeSugerido = teste;
            resBac1 = val1;
            resBac2 = val2;
            break;
          }
        }
      }

      // Varredura de fallback caso não esteja na lista de testes chave
      if (!testeSugerido) {
        for (let teste in car1) {
          if (!resultadosAtuais[teste]) {
            const val1 = car1[teste];
            const val2 = car2[teste];
            if (val1 && val2 && val1 !== val2 && val1 !== "Não se aplica" && val2 !== "Não se aplica") {
              testeSugerido = teste;
              resBac1 = val1;
              resBac2 = val2;
              break;
            }
          }
        }
      }

      if (testeSugerido) {
        exibirModalSugestao(h1.nome, h2.nome, testeSugerido, resBac1, resBac2);
      } else {
        fecharModalSugestao();
      }
    }

    function exibirModalSugestao(bac1, bac2, teste, res1, res2) {
      testeSugeridoAtual = teste;
      document.getElementById("sugestaoBac1").textContent = bac1;
      document.getElementById("sugestaoBac2").textContent = bac2;
      document.getElementById("nomeTesteSugerido").textContent = teste;
      document.getElementById("detalheEspecies").innerHTML = `
        <em>${bac1}</em>: <strong>${res1}</strong> | <em>${bac2}</em>: <strong>${res2}</strong>
      `;
      document.getElementById("modalSugestao").style.display = "flex";
    }

    function fecharModalSugestao() {
      document.getElementById("modalSugestao").style.display = "none";
    }

    function aplicarTesteSugerido() {
      fecharModalSugestao();
      adicionarResultado();
      const selectTeste = document.getElementById("tipoTeste");
      if (selectTeste) {
        selectTeste.value = testeSugeridoAtual;
        atualizarResultadosPossiveis();
      }
    }

    // ==================== MODAL DE RESULTADOS ====================
    function atualizarOpcoesModal(testeEmEdicaoParam = null) {
      const select = document.getElementById("tipoTeste");
      select.innerHTML = '<option value="">Selecione um teste...</option>';

      const listaTestes = (typeof obterTestesRelevantes === "function")
        ? obterTestesRelevantes(resultados)
        : (typeof testesMicrobiologicos !== "undefined" ? testesMicrobiologicos : []);

      listaTestes.forEach(t => {
        if (!resultados[t.nome] || t.nome === testeEmEdicaoParam) {
          const option = document.createElement("option");
          option.value = t.nome;
          option.textContent = t.nome;
          select.appendChild(option);
        }
      });
    }

    function atualizarResultadosPossiveis() {
      const testeSelecionado = document.getElementById("tipoTeste").value;
      const selectResultado = document.getElementById("resultadoTeste");
      selectResultado.innerHTML = "";

      if (!testeSelecionado) {
        selectResultado.innerHTML = '<option value="">Selecione um teste primeiro...</option>';
        return;
      }

      let test = null;
      if (typeof getTesteByNome === "function") {
        test = getTesteByNome(testeSelecionado);
      } else if (typeof testesMicrobiologicos !== "undefined") {
        test = testesMicrobiologicos.find(t => t.nome === testeSelecionado);
      }

      if (test && Array.isArray(test.resultadosPossiveis)) {
        test.resultadosPossiveis.forEach(res => {
          const option = document.createElement("option");
          option.value = res;
          option.textContent = res;
          selectResultado.appendChild(option);
        });
      } else {
        selectResultado.innerHTML = '<option value="">Sem opções disponíveis</option>';
      }
    }

    function adicionarResultado() {
      testeEmEdicao = null;
      document.getElementById("tipoTeste").disabled = false;
      atualizarOpcoesModal();
      document.getElementById("resultadoTeste").innerHTML = '<option value="">Selecione um teste primeiro...</option>';
      document.getElementById("modalResultado").style.display = "flex";
    }

    function fecharModal() {
      document.getElementById("modalResultado").style.display = "none";
      testeEmEdicao = null;
    }

    function salvarResultado() {
      const teste = document.getElementById("tipoTeste").value;
      const resultado = document.getElementById("resultadoTeste").value;

      if (!teste) {
        alert("Selecione um tipo de teste!");
        return;
      }
      if (!resultado) {
        alert("Selecione um resultado!");
        return;
      }

      if (testeEmEdicao && testeEmEdicao !== teste) {
        delete resultados[testeEmEdicao];
      }

      resultados[teste] = resultado;
      atualizarResultadosNaTela();
      atualizarHipoteses();
      fecharModal();
    }

    function editarResultado(teste) {
      testeEmEdicao = teste;
      atualizarOpcoesModal(teste);

      const selectTeste = document.getElementById("tipoTeste");
      selectTeste.value = teste;
      selectTeste.disabled = true;

      atualizarResultadosPossiveis();

      const selectResultado = document.getElementById("resultadoTeste");
      selectResultado.value = resultados[teste] || "";

      document.getElementById("modalResultado").style.display = "flex";
    }

    function excluirResultado(teste) {
      if (confirm(`Deseja excluir o teste "${teste}"?`)) {
        delete resultados[teste];
        atualizarResultadosNaTela();
        atualizarHipoteses();
      }
    }

    function novaInvestigacao() {
      if (confirm("Deseja iniciar uma nova investigação?\nTodos os dados atuais serão perdidos.")) {
        window.location.href = "index.html";
      }
    }

    // ==================== SALVAR / ABRIR CASO ====================
    function salvarCaso() {
      const caso = {
        material: document.getElementById("material").textContent,
        resultados: { ...resultados },
        paciente: document.getElementById("inputNomePaciente").value.trim(),
        pedido: document.getElementById("inputNumeroPedido").value.trim(),
        data: new Date().toISOString()
      };

      try {
        localStorage.setItem("microlab_caso_atual", JSON.stringify(caso));
        alert("✅ Caso salvo com sucesso!");
      } catch (e) {
        alert("Erro ao salvar o caso. Verifique se o armazenamento local está disponível.");
      }
    }

    function abrirCaso() {
      try {
        const salvo = localStorage.getItem("microlab_caso_atual");
        if (!salvo) {
          alert("Nenhum caso salvo encontrado.");
          return;
        }

        const caso = JSON.parse(salvo);
        resultados = caso.resultados || {};
        document.getElementById("inputNomePaciente").value = caso.paciente || "";
        document.getElementById("inputNumeroPedido").value = caso.pedido || "";
        document.getElementById("material").textContent = caso.material || "Não informado";

        atualizarResultadosNaTela();
        atualizarHipoteses();
        alert("✅ Caso carregado com sucesso!");
      } catch (e) {
        alert("Erro ao abrir o caso. O arquivo pode estar corrompido.");
      }
    }

    function imprimirRelatorio() {
      const nomePaciente = document.getElementById("inputNomePaciente").value.trim() || "Não informado";
      const numeroPedido = document.getElementById("inputNumeroPedido").value.trim() || "Não informado";

      sessionStorage.setItem("resultadosInvestigacao", JSON.stringify(resultados));
      sessionStorage.setItem("nomePaciente", nomePaciente);
      sessionStorage.setItem("numeroPedido", numeroPedido);

      window.open("relatorio.html", "_blank");
    }

    // ==================== EVENTOS GLOBAIS ====================
    document.addEventListener("DOMContentLoaded", () => {
      carregarMaterial();
      atualizarResultadosNaTela();
      atualizarHipoteses();

      const selectTeste = document.getElementById("tipoTeste");
      if (selectTeste) {
        selectTeste.addEventListener("change", atualizarResultadosPossiveis);
      }

      const protocolo = sessionStorage.getItem("mostrarAssistente");
      if (protocolo === "urina") {
        iniciarWizardUrina();
        sessionStorage.removeItem("mostrarAssistente");
      }

      const actions = document.querySelector(".actions");
      if (actions) {
        const novoBtn = document.createElement("button");
        novoBtn.className = "btn";
        novoBtn.textContent = "Novo Exame";
        novoBtn.type = "button";
        novoBtn.onclick = iniciarNovoExame;
        actions.prepend(novoBtn);
      }
    });

    // Fecha modais com ESC
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        document.getElementById("modalResultado").style.display = "none";
        document.getElementById("modalBacteriasCadastradas").style.display = "none";
        fecharModalSugestao();
        const assistente = document.getElementById("assistenteModal");
        if (assistente.style.display === "flex") {
          fecharAssistente();
        }
      }
    });