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
    if (Object.keys(resultados).length === 0) {
        return [];
    }

    // Filtra as bactérias aplicando exclusão absoluta (Gram e Forma errados são eliminados de cara)
    const bacteriasFiltradas = bacterias.filter(bacteria => {
        // Se o usuário informou Gram e ele é totalmente oposto ao da bactéria
        if (resultados["Gram"] && bacteria.caracteristicas["Gram"] && 
            bacteria.caracteristicas["Gram"] !== "Variável" && 
            resultados["Gram"] !== bacteria.caracteristicas["Gram"]) {
            return false; 
        }
        // Se o usuário informou Forma e ela é incompatível
        if (resultados["Forma"] && bacteria.caracteristicas["Forma"] && 
            resultados["Forma"] !== bacteria.caracteristicas["Forma"]) {
            return false;
        }
        return true;
    });

    const hipoteses = bacteriasFiltradas.map(bacteria => {
        const compatibilidade = calcularCompatibilidade(
            resultados,
            bacteria.caracteristicas
        );

        return {
            nome: bacteria.nome,
            grupo: bacteria.grupo,
            importanciaClinica: bacteria.importanciaClinica,
            compatibilidade: compatibilidade,
            caracteristicas: bacteria.caracteristicas
        };
    });

    // Retorna ordenado pela maior porcentagem e ignora quem zerou
    return hipoteses
        .filter(h => h.compatibilidade > 0)
        .sort((a, b) => b.compatibilidade - a.compatibilidade);
}

function calcularCompatibilidade(resultadosUsuario, caracteristicasBacteria) {
    let pontos = 0;
    let pesoTotal = 0;

    Object.keys(resultadosUsuario).forEach(teste => {
        const resultadoUsuario = resultadosUsuario[teste];
        const resultadoBacteria = caracteristicasBacteria[teste];

        // Se o teste não existe no cadastro da bactéria, pula
        if (resultadoBacteria === undefined) {
            return;
        }

        // REVOLUÇÃO: Busca o peso direto do seu catálogo cadastrado no testes.js!
        // Se não achar o teste lá por algum motivo, adota peso padrão 1.
        const dadosDoTeste = typeof window.getTesteByNome === 'function' ? window.getTesteByNome(teste) : null;
        const peso = dadosDoTeste ? dadosDoTeste.peso : 1;

        const resUserNorm = normalizar(resultadoUsuario);
        const resBacNorm = normalizar(resultadoBacteria);

        // Cenário 1: Se o resultado no banco for "não se aplica" ou "variável", 
        // esse teste é ignorado no cálculo de peso desta bactéria específica.
        if (resBacNorm === "não se aplica" || resBacNorm === "variável") {
            return; 
        }

        // Adiciona o peso do teste executado ao totalizador daquela bactéria
        pesoTotal += peso;

        // Cenário 2: Comparação exata de resultados positivos/negativos e reações
        if (resUserNorm === resBacNorm) {
            pontos += peso;
        }
    });

    if (pesoTotal === 0) {
        return 0;
    }

    // Retorna o valor percentual redondo (0 a 100)
    return Math.round((pontos / pesoTotal) * 100);
}

function normalizar(valor) {
    if (!valor) {
        return "";
    }
    return valor
        .toString()
        .trim()
        .toLowerCase();
}

window.gerarHipoteses = gerarHipoteses;