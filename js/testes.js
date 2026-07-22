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
{
    nome: "Gram",
    tipo: "Morfologia",
    resultadosPossiveis: ["Positivo", "Negativo", "Variável"],
    grupo: "Coloração",
    peso: 5,
    descricao: "Coloração de Gram - diferencia bactérias Gram positivas e Gram negativas"
},
{
    nome: "Forma",
    tipo: "Morfologia",
    resultadosPossiveis: ["Coco", "Bacilo", "Coccobacilo", "Espirilo", "Espiroqueta"],
    grupo: "Morfologia",
    peso: 4,
    descricao: "Formato celular bacteriano"
},
{
    nome: "Catalase",
    tipo: "Enzimático",
    resultadosPossiveis: ["Positivo", "Negativo", "Variável"],
    grupo: "Enzimático",
    peso: 3,
    descricao: "Detecção da enzima catalase"
},
{
    nome: "Oxidase",
    tipo: "Enzimático",
    resultadosPossiveis: ["Positivo", "Negativo", "Variável"],
    grupo: "Enzimático",
    peso: 5,
    descricao: "Detecção da citocromo oxidase"
},
{
    nome: "Coagulase",
    tipo: "Enzimático",
    resultadosPossiveis: ["Positivo", "Negativo", "Não se aplica"],
    grupo: "Enzimático",
    peso: 5,
    descricao: "Detecção da enzima coagulase (livre ou ligada), usada principalmente para identificar Staphylococcus aureus"
},
{
    nome: "Motilidade",
    tipo: "Morfologia",
    resultadosPossiveis: ["Positivo", "Negativo", "Variável"], // Ajustado de Móvel/Imóvel para bater com o cadastro
    grupo: "Morfologia",
    peso: 4,
    descricao: "Capacidade de movimento bacteriano"
},
{
    nome: "Fermentacao lactose",
    tipo: "Fermentação",
    resultadosPossiveis: ["Positivo", "Negativo", "Fraco", "Não se aplica"],
    grupo: "Metabolismo",
    peso: 4,
    descricao: "Fermentação da lactose"
},
{
    nome: "Indol",
    tipo: "Bioquímico",
    resultadosPossiveis: ["Positivo", "Negativo", "Variável"],
    grupo: "Metabolismo",
    peso: 3,
    descricao: "Produção de indol a partir do triptofano"
},
{
    nome: "Vermelho de Metila",
    tipo: "Bioquímico",
    resultadosPossiveis: ["Positivo", "Negativo", "Variável"],
    grupo: "Metabolismo",
    peso: 3,
    descricao: "Teste de Vermelho de Metila - via do ácido misto"
},
{
    nome: "Voges-Proskauer",
    tipo: "Bioquímico",
    resultadosPossiveis: ["Positivo", "Negativo", "Variável"],
    grupo: "Metabolismo",
    peso: 3,
    descricao: "Teste de Voges-Proskauer (VP) - produção de acetoína"
},
{
    nome: "Citrato",
    tipo: "Metabolismo",
    resultadosPossiveis: ["Positivo", "Negativo", "Variável"],
    grupo: "Metabolismo",
    peso: 3,
    descricao: "Utilização do citrato como fonte de carbono"
},
{
    nome: "H2S",
    tipo: "Bioquímico",
    resultadosPossiveis: ["Positivo", "Negativo", "Variável"],
    grupo: "Metabolismo",
    peso: 3,
    descricao: "Produção de gás Sulfeto de Hidrogênio"
},
{
    nome: "Urease",
    tipo: "Enzimático",
    resultadosPossiveis: ["Positivo", "Negativo", "Variável"],
    grupo: "Metabolismo",
    peso: 3,
    descricao: "Hidrólise da ureia"
},
{
    nome: "TSI",
    tipo: "Fermentação",
    resultadosPossiveis: ["A/A", "K/A", "K/K", "A/K", "Inerte"], // Adicionado Inerte para bactérias não fermentadoras
    grupo: "Fermentação",
    peso: 4,
    descricao: "Triple Sugar Iron"
},
{
    nome: "SIM",
    tipo: "Bioquímico",
    resultadosPossiveis: ["Positivo", "Negativo", "Variável", "Negativo/Negativo/Negativo"], 
    grupo: "Metabolismo",
    peso: 3,
    descricao: "Sulfeto, Indol e Motilidade"
},
{
    nome: "Hemolise",
    tipo: "Cultura",
    resultadosPossiveis: ["Alfa", "Beta", "Gama"],
    grupo: "Cultura",
    peso: 2,
    descricao: "Padrão de hemólise em ágar sangue"
},
{
    nome: "Respiracao",
    tipo: "Fisiologia",
    resultadosPossiveis: ["Aeróbio obrigatório", "Anaeróbio obrigatório", "Anaeróbio facultativo", "Microaerófilo", "Aerotolerante", "Facultativo", "Capnofílica"],
    grupo: "Metabolismo",
    peso: 3,
    descricao: "Classificação respiratória bacteriana"
},
{
    nome: "Esporos",
    tipo: "Morfologia",
    resultadosPossiveis: ["Ausente", "Presente"], // Ajustado para corresponder ao "Ausente" no objeto da bactéria
    grupo: "Morfologia",
    peso: 2,
    descricao: "Produção de endósporos"
},
{
    nome: "DNase",
    tipo: "Bioquímico",
    resultadosPossiveis: ["Positivo", "Negativo"], 
    grupo: "Metabolismo",
    peso: 4,
    descricao: "Hidrólise do ácido desoxirribonucleico (DNA)"
},
{
    nome: "Bile Esculina",
    tipo: "Bioquímico",
    resultadosPossiveis: ["Positivo", "Negativo", "Não se aplica"],
    grupo: "Metabolismo",
    peso: 4,
    descricao: "Capacidade de crescer e hidrolisar a esculina na presença de bile (Diferencial para Enterococcus)"
  },
  {
    nome: "PYR",
    tipo: "Enzimático",
    resultadosPossiveis: ["Positivo", "Negativo", "Não se aplica"],
    grupo: "Enzimático",
    peso: 4,
    descricao: "Detecção da enzima L-pirrolidonil arylamidase (Positivo em S. pyogenes e Enterococcus)"
  },
  {
    nome: "Lisina",
    tipo: "Bioquímico",
    resultadosPossiveis: ["Positivo", "Negativo", "Variável", "Não se aplica"],
    grupo: "Metabolismo",
    peso: 3,
    descricao: "Descarboxilação da Lisina (LDC)"
  },
  {
    nome: "Ornitina",
    tipo: "Bioquímico",
    resultadosPossiveis: ["Positivo", "Negativo", "Variável", "Não se aplica"],
    grupo: "Metabolismo",
    peso: 3,
    descricao: "Descarboxilação da Ornitina (ODC)"
  },
  {
    nome: "Novobiocina",
    tipo: "Sensibilidade",
    resultadosPossiveis: ["Sensível", "Resistente", "Não se aplica"],
    grupo: "Antimicrobianos",
    peso: 5,
    descricao: "Resistência à Novobiocina (Diferencial para Staphylococcus saprophyticus)"
  },
  {
    nome: "Optoquina",
    tipo: "Sensibilidade",
    resultadosPossiveis: ["Sensível", "Resistente", "Não se aplica"],
    grupo: "Antimicrobianos",
    peso: 5,
    descricao: "Sensibilidade à Optoquina (Diferencial para Streptococcus pneumoniae)"
  },
{
    nome: "Maltose",
    tipo: "Bioquímico",
    resultadosPossiveis: ["Positivo", "Negativo", "Não se aplica"],
    grupo: "Metabolismo",
    peso: 3,
    descricao: "Teste de acidificação/fermentação da maltose. Essencial para diferenciar Neisseria meningitidis (+) de Neisseria gonorrhoeae (-)."
}
];

function getTesteByNome(nome){
    return testesMicrobiologicos.find(
        teste => teste.nome === nome
    );
}

function getTestesDisponiveis(){
    return testesMicrobiologicos;
}

function getTestesPorGrupo(grupo){
    return testesMicrobiologicos.filter(
        teste => teste.grupo === grupo
    );
}

window.testesMicrobiologicos = testesMicrobiologicos;
window.getTesteByNome = getTesteByNome;
window.getTestesDisponiveis = getTestesDisponiveis;
window.getTestesPorGrupo = getTestesPorGrupo;