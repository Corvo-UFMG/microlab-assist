// js/interpretador.js
// Motor de comparação microbiológica - MicroLab Assist
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
function gerarHipoteses(resultados) {
    if (!resultados || Object.keys(resultados).length === 0) {
        return [];
    }

    // 1 - FILTRAGEM INICIAL (Filtra eliminatórios sem derrubar variáveis)
    let candidatas = aplicarFiltros(resultados);

    // 2 - CALCULA COMPATIBILIDADE PONDERADA
    let hipoteses = candidatas.map(bacteria => {
        let analise = calcularCompatibilidade(resultados, bacteria.caracteristicas);

        return {
            nome: bacteria.nome,
            grupo: bacteria.grupo,
            importanciaClinica: bacteria.importanciaClinica,
            compatibilidade: analise.percentual,
            acertos: analise.acertos,
            erros: analise.erros,
            detalhes: analise.detalhes,
            caracteristicas: bacteria.caracteristicas
        };
    });

    // 3 - ORDENAÇÃO E FILTRO DE EXIBIÇÃO
    return hipoteses
        .filter(h => h.compatibilidade > 0)
        .sort((a, b) => b.compatibilidade - a.compatibilidade);
}

// =====================================================
// FILTRAGEM MICROBIOLÓGICA
// =====================================================
function aplicarFiltros(resultados) {
    let lista = bacterias;

    Object.keys(resultados).forEach(teste => {
        let dadosTeste = typeof getTesteByNome === "function" ? getTesteByNome(teste) : null;
        if (!dadosTeste) return;

        let modo = dadosTeste.modo || "pontuacao";

        // Aplica filtro rigoroso apenas em testes marcados como "eliminatorio" ou "filtragem"
        if (modo === "eliminatorio" || modo === "filtragem") {
            lista = lista.filter(bacteria => {
                let esperado = bacteria.caracteristicas[teste];
                let recebido = resultados[teste];

                // Se a ficha não tem a propriedade, ou se é Variável/Não se aplica, NÃO elimina!
                if (!esperado || 
                    normalizar(esperado) === "variável" || 
                    normalizar(esperado) === "não se aplica" ||
                    normalizar(recebido) === "não se aplica") {
                    return true;
                }

                // Trata variação de "Facultativo" vs "Anaeróbio facultativo"
                if (teste === "Respiracao") {
                    if (normalizar(esperado).includes("facultativ") && normalizar(recebido).includes("facultativ")) {
                        return true;
                    }
                }

                return normalizar(esperado) === normalizar(recebido);
            });
        }
    });

    return lista;
}

// =====================================================
// CÁLCULO DE COMPATIBILIDADE (SCORE)
// =====================================================
function calcularCompatibilidade(resultadosUsuario, caracteristicasBacteria) {
    let pontos = 0;
    let pesoTotal = 0;
    let acertos = [];
    let erros = [];
    let detalhes = [];

    Object.keys(resultadosUsuario).forEach(teste => {
        let resultadoUsuario = resultadosUsuario[teste];
        let resultadoBacteria = caracteristicasBacteria[teste];

        if (resultadoBacteria === undefined) return;

        let dadosTeste = typeof getTesteByNome === "function" ? getTesteByNome(teste) : null;
        let peso = dadosTeste ? dadosTeste.peso : 1;

        let normBacteria = normalizar(resultadoBacteria);
        let normUsuario = normalizar(resultadoUsuario);

        // Se o teste for "Não se aplica" na ficha ou no teste, desconsidera do peso total
        if (normBacteria === "não se aplica" || normUsuario === "não se aplica") {
            return;
        }

        pesoTotal += peso;

        // Regra para perfil "Variável" na ficha
        if (normBacteria === "variável") {
            pontos += peso; // Aceita como compatível e soma a pontuação
            acertos.push(teste);
            detalhes.push({ teste, resultado: resultadoUsuario, status: "compatível (variável)" });
        } 
        // Variações do termo "Facultativo" na Respiração
        else if (teste === "Respiracao" && normBacteria.includes("facultativ") && normUsuario.includes("facultativ")) {
            pontos += peso;
            acertos.push(teste);
            detalhes.push({ teste, resultado: resultadoUsuario, status: "compatível" });
        }
        // Match exato
        else if (normUsuario === normBacteria) {
            pontos += peso;
            acertos.push(teste);
            detalhes.push({ teste, resultado: resultadoUsuario, status: "compatível" });
        } 
        // Incompatível
        else {
            erros.push(teste);
            detalhes.push({ teste, esperado: resultadoBacteria, encontrado: resultadoUsuario, status: "incompatível" });
        }
    });

    let percentual = pesoTotal > 0 ? Math.round((pontos / pesoTotal) * 100) : 0;

    return { percentual, acertos, erros, detalhes };
}

function normalizar(valor) {
    if (!valor) return "";
    return valor.toString().trim().toLowerCase();
}

window.gerarHipoteses = gerarHipoteses;
