// testes.js
// Catálogo de Testes Microbiológicos
// MicroLab Assist
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
const testesMicrobiologicos = [

/* ============================
   MORFOLOGIA (ELIMINATÓRIOS)
============================ */

{
    nome: "Gram",
    tipo: "Morfologia",
    grupo: "Coloração",
    resultadosPossiveis: ["Positivo", "Negativo", "Variável"],
    descricao: "Coloração de Gram",
    peso: 100,
    nivel: 1,
    modo: "eliminatorio",
    aplicavelPara: "todos"
},

{
    nome: "Forma",
    tipo: "Morfologia",
    grupo: "Morfologia",
    resultadosPossiveis: ["Coco", "Bacilo", "Coccobacilo", "Espirilo", "Espiroqueta"],
    descricao: "Formato celular",
    peso: 90,
    nivel: 1,
    modo: "eliminatorio",
    aplicavelPara: "todos"
},

{
    nome: "Esporos",
    tipo: "Morfologia",
    grupo: "Morfologia",
    resultadosPossiveis: ["Presente", "Ausente"],
    descricao: "Pesquisa de endósporos",
    peso: 70,
    nivel: 1,
    modo: "filtragem",
    // Mais relevante para Bacilos Gram-positivos (Bacillus, Clostridium)
    aplicavelPara: { gram: "Positivo", forma: "Bacilo" }
},

{
    nome: "Respiracao",
    tipo: "Fisiologia",
    grupo: "Metabolismo",
    resultadosPossiveis: [
        "Aeróbio obrigatório",
        "Anaeróbio obrigatório",
        "Anaeróbio facultativo",
        "Microaerófilo",
        "Aerotolerante",
        "Facultativo",
        "Capnofílica"
    ],
    descricao: "Tipo respiratório",
    peso: 60,
    nivel: 1,
    modo: "filtragem",
    aplicavelPara: "todos"
},

/* ============================
   TESTES RÁPIDOS
============================ */

{
    nome: "Oxidase",
    tipo: "Enzimático",
    grupo: "Enzimático",
    resultadosPossiveis: ["Positivo", "Negativo", "Variável"],
    descricao: "Citocromo oxidase",
    peso: 50,
    nivel: 2,
    modo: "filtragem",
    aplicavelPara: "todos" // Fundamental tanto para Cocos (Neisseria) quanto Bacilos (Pseudomonas, Enterobacterias)
},

{
    nome: "Catalase",
    tipo: "Enzimático",
    grupo: "Enzimático",
    resultadosPossiveis: ["Positivo", "Negativo", "Variável"],
    descricao: "Catalase",
    peso: 30,
    nivel: 2,
    modo: "filtragem",
    aplicavelPara: "todos" // Diferencia Staphylococcus de Streptococcus e Bacillus de Clostridium
},

{
    nome: "Coagulase",
    tipo: "Enzimático",
    grupo: "Enzimático",
    resultadosPossiveis: ["Positivo", "Negativo", "Não se aplica"],
    descricao: "Coagulase",
    peso: 60,
    nivel: 2,
    modo: "filtragem",
    // Teste chave para Staphylococcus
    aplicavelPara: { gram: "Positivo", forma: "Coco" }
},

{
    nome: "Hemolise",
    tipo: "Cultura",
    grupo: "Cultura",
    resultadosPossiveis: ["Alfa", "Beta", "Gama"],
    descricao: "Hemólise em Ágar Sangue",
    peso: 10,
    nivel: 2,
    modo: "confirmatorio",
    aplicavelPara: "todos"
},

/* ============================
   METABOLISMO
============================ */

{
    nome: "Fermentacao lactose",
    tipo: "Fermentação",
    grupo: "Metabolismo",
    resultadosPossiveis: ["Positivo", "Negativo", "Fraco", "Não se aplica"],
    descricao: "Fermentação da lactose",
    peso: 45,
    nivel: 3,
    modo: "filtragem",
    aplicavelPara: { gram: "Negativo", forma: ["Bacilo", "Coccobacilo"] }
},

{
    nome: "Motilidade",
    tipo: "Morfologia",
    grupo: "Morfologia",
    resultadosPossiveis: ["Positivo", "Negativo", "Variável"],
    descricao: "Motilidade",
    peso: 35,
    nivel: 3,
    modo: "pontuacao",
    aplicavelPara: { gram: "Negativo", forma: ["Bacilo", "Coccobacilo"] }
},

{
    nome: "Indol",
    tipo: "Bioquímico",
    grupo: "Metabolismo",
    resultadosPossiveis: ["Positivo", "Negativo", "Variável"],
    descricao: "Produção de Indol",
    peso: 35,
    nivel: 3,
    modo: "pontuacao",
    aplicavelPara: { gram: "Negativo", forma: ["Bacilo", "Coccobacilo"] }
},

{
    nome: "Citrato",
    tipo: "Metabolismo",
    grupo: "Metabolismo",
    resultadosPossiveis: ["Positivo", "Negativo", "Variável"],
    descricao: "Utilização de Citrato",
    peso: 35,
    nivel: 3,
    modo: "pontuacao",
    aplicavelPara: { gram: "Negativo", forma: ["Bacilo", "Coccobacilo"] }
},

{
    nome: "Urease",
    tipo: "Enzimático",
    grupo: "Metabolismo",
    resultadosPossiveis: ["Positivo", "Negativo", "Variável"],
    descricao: "Hidrólise da Ureia",
    peso: 30,
    nivel: 3,
    modo: "pontuacao",
    aplicavelPara: { gram: "Negativo", forma: ["Bacilo", "Coccobacilo"] }
},

{
    nome: "TSI",
    tipo: "Fermentação",
    grupo: "Fermentação",
    resultadosPossiveis: ["A/A", "K/A", "K/K", "A/K", "Inerte"],
    descricao: "Triple Sugar Iron",
    peso: 45,
    nivel: 3,
    modo: "pontuacao",
    aplicavelPara: { gram: "Negativo", forma: ["Bacilo", "Coccobacilo"] }
},

{
    nome: "H2S",
    tipo: "Bioquímico",
    grupo: "Metabolismo",
    resultadosPossiveis: ["Positivo", "Negativo", "Variável"],
    descricao: "Produção de H₂S",
    peso: 30,
    nivel: 3,
    modo: "pontuacao",
    aplicavelPara: { gram: "Negativo", forma: ["Bacilo", "Coccobacilo"] }
},

{
    nome: "Vermelho de Metila",
    tipo: "Bioquímico",
    grupo: "Metabolismo",
    resultadosPossiveis: ["Positivo", "Negativo", "Variável"],
    descricao: "MR",
    peso: 20,
    nivel: 4,
    modo: "confirmatorio",
    aplicavelPara: { gram: "Negativo", forma: ["Bacilo", "Coccobacilo"] }
},

{
    nome: "Voges-Proskauer",
    tipo: "Bioquímico",
    grupo: "Metabolismo",
    resultadosPossiveis: ["Positivo", "Negativo", "Variável"],
    descricao: "VP",
    peso: 20,
    nivel: 4,
    modo: "confirmatorio",
    aplicavelPara: { gram: "Negativo", forma: ["Bacilo", "Coccobacilo"] }
},

{
    nome: "Lisina",
    tipo: "Bioquímico",
    grupo: "Metabolismo",
    resultadosPossiveis: ["Positivo", "Negativo", "Variável", "Não se aplica"],
    descricao: "LDC",
    peso: 25,
    nivel: 4,
    modo: "confirmatorio",
    aplicavelPara: { gram: "Negativo", forma: ["Bacilo", "Coccobacilo"] }
},

{
    nome: "Ornitina",
    tipo: "Bioquímico",
    grupo: "Metabolismo",
    resultadosPossiveis: ["Positivo", "Negativo", "Variável", "Não se aplica"],
    descricao: "ODC",
    peso: 25,
    nivel: 4,
    modo: "confirmatorio",
    aplicavelPara: { gram: "Negativo", forma: ["Bacilo", "Coccobacilo"] }
},

{
    nome: "DNase",
    tipo: "Bioquímico",
    grupo: "Metabolismo",
    resultadosPossiveis: ["Positivo", "Negativo"],
    descricao: "DNase",
    peso: 15,
    nivel: 4,
    modo: "confirmatorio",
    // Utilizado em Staphylococcus e Serratia
    aplicavelPara: "todos"
},

{
    nome: "Bile Esculina",
    tipo: "Bioquímico",
    grupo: "Metabolismo",
    resultadosPossiveis: ["Positivo", "Negativo", "Não se aplica"],
    descricao: "Bile Esculina",
    peso: 35,
    nivel: 4,
    modo: "pontuacao",
    // Teste chave para Cocos Gram-positivos (Enterococcus / Streptococcus Grupo D)
    aplicavelPara: { gram: "Positivo", forma: "Coco" }
},

{
    nome: "PYR",
    tipo: "Enzimático",
    grupo: "Enzimático",
    resultadosPossiveis: ["Positivo", "Negativo", "Não se aplica"],
    descricao: "PYR",
    peso: 35,
    nivel: 4,
    modo: "pontuacao",
    // Diferencial para Enterococcus e Streptococcus pyogenes
    aplicavelPara: { gram: "Positivo", forma: "Coco" }
},

/* ============================
   ANTIMICROBIANOS
============================ */

{
    nome: "Novobiocina",
    tipo: "Sensibilidade",
    grupo: "Antimicrobianos",
    resultadosPossiveis: ["Sensível", "Resistente", "Não se aplica"],
    descricao: "Novobiocina",
    peso: 70,
    nivel: 5,
    modo: "pontuacao",
    // Diferencial para Staphylococcus saprophyticus
    aplicavelPara: { gram: "Positivo", forma: "Coco" }
},

{
    nome: "Optoquina",
    tipo: "Sensibilidade",
    grupo: "Antimicrobianos",
    resultadosPossiveis: ["Sensível", "Resistente", "Não se aplica"],
    descricao: "Optoquina",
    peso: 70,
    nivel: 5,
    modo: "pontuacao",
    // Diferencial para Streptococcus pneumoniae
    aplicavelPara: { gram: "Positivo", forma: "Coco" }
},

{
    nome: "Maltose",
    tipo: "Bioquímico",
    grupo: "Metabolismo",
    resultadosPossiveis: ["Positivo", "Negativo", "Não se aplica"],
    descricao: "Fermentação da Maltose",
    peso: 40,
    nivel: 5,
    modo: "pontuacao",
    // Utilizado na diferenciação de Neisseria spp. (Cocos Gram-negativos)
    aplicavelPara: { gram: "Negativo", forma: "Coco" }
}

];

/* =====================================================
   FUNÇÃO AUXILIAR DE FILTRAGEM DINÂMICA PARA A INTERFACE
===================================================== */

/**
 * Retorna apenas os testes relevantes com base no Gram e Forma já selecionados.
 * @param {Object} resultadosAtuais - Objeto com os testes preenchidos (ex: { Gram: "Positivo", Forma: "Coco" })
 * @returns {Array} Lista de testes recomendados para exibir ao usuário.
 */
function obterTestesRelevantes(resultadosAtuais) {
    if (!resultadosAtuais) return testesMicrobiologicos;

    const gramAtual = resultadosAtuais["Gram"];
    const formaAtual = resultadosAtuais["Forma"];

    return testesMicrobiologicos.filter(teste => {
        // Testes iniciais ou universais sempre aparecem
        if (teste.aplicavelPara === "todos" || !teste.aplicavelPara) {
            return true;
        }

        // Se o usuário ainda não definiu Gram ou Forma, exibe os testes universais e de nível 1
        if (!gramAtual || !formaAtual) {
            return teste.nivel === 1;
        }

        const regra = teste.aplicavelPara;

        // Valida se o Gram bate
        const gramBate = !regra.gram || regra.gram === gramAtual;

        // Valida se a Forma bate (aceita string única ou array)
        let formaBate = true;
        if (regra.forma) {
            formaBate = Array.isArray(regra.forma)
                ? regra.forma.includes(formaAtual)
                : regra.forma === formaAtual;
        }

        return gramBate && formaBate;
    });
}

// Exporta a função para ser consumida no frontend
window.testesMicrobiologicos = testesMicrobiologicos;
window.obterTestesRelevantes = obterTestesRelevantes;
