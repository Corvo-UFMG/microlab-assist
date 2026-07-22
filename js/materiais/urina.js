// ===============================
// urina.js
// Protocolo de Urinocultura
// MicroLab Assist
// ===============================

const protocoloUrina = {

    material: "Urina",

    titulo: "Investigação Microbiológica de Urina",

    etapas: [

        {

            id: 1,

            titulo: "Recepção da Amostra",

            descricao:
                "Verifique a qualidade da amostra recebida antes de iniciar o processamento.",

            perguntas: [

                {
                    campo: "tipoColeta",
                    pergunta: "Tipo de coleta",
                    tipo: "lista",

                    opcoes: [

                        "Jato médio",

                        "Sonda vesical",

                        "Punção suprapúbica",

                        "Bolsa coletora infantil",

                        "Outro"

                    ]

                },

                {

                    campo: "volume",

                    pergunta: "Volume recebido (mL)",

                    tipo: "numero"

                },

                {

                    campo: "aspecto",

                    pergunta: "Aspecto da urina",

                    tipo: "lista",

                    opcoes: [

                        "Límpida",

                        "Levemente turva",

                        "Turva",

                        "Purulenta",

                        "Hemática"

                    ]

                },

                {

                    campo: "tempo",

                    pergunta: "Tempo entre coleta e processamento",

                    tipo: "lista",

                    opcoes: [

                        "<2 horas",

                        "Refrigerada",

                        ">2 horas sem refrigeração"

                    ]

                }

            ]

        },

        {

            id: 2,

            titulo: "Procedimentos Recomendados",

            procedimentos: [

                "Realizar coloração de Gram.",

                "Semear em Ágar Sangue.",

                "Semear em MacConkey.",

                "Semear em CLED.",

                "Incubar entre 35°C e 37°C.",

                "Atmosfera ambiente.",

                "Leitura após 18–24 horas."

            ]

        },

        {

            id: 3,

            titulo: "Microscopia",

            descricao:
                "Após a coloração de Gram informe os achados.",

            perguntas: [

                {

                    campo: "gram",

                    pergunta: "Gram",

                    tipo: "lista",

                    opcoes: [

                        "Positivo",

                        "Negativo"

                    ]

                },

                {

                    campo: "forma",

                    pergunta: "Forma",

                    tipo: "lista",

                    opcoes: [

                        "Coco",

                        "Bacilo",

                        "Coccobacilo",

                        "Curvo"

                    ]

                },

                {

                    campo: "arranjo",

                    pergunta: "Arranjo",

                    tipo: "lista",

                    opcoes: [

                        "Isolado",

                        "Diplococos",

                        "Cadeias",

                        "Cachos"

                    ]

                }

            ]

        },

        {

            id: 4,

            titulo: "Leitura das Placas",

            procedimentos: [

                "Avaliar crescimento.",

                "Avaliar hemólise.",

                "Avaliar fermentação da lactose.",

                "Avaliar pigmentação.",

                "Avaliar odor.",

                "Avaliar aspecto colonial."

            ]

        },

        {

            id: 5,

            titulo: "Testes Bioquímicos",

            descricao:
                "Executar apenas os testes necessários conforme os resultados obtidos.",

            testesSugeridos: [

                "Catalase",

                "Oxidase",

                "Indol",

                "Citrato",

                "Motilidade",

                "TSI",

                "SIM",

                "MR",

                "VP",

                "Lisina",

                "Ornitina",

                "Urease"

            ]

        },

        {

            id: 6,

            titulo: "Interpretação",

            procedimentos: [

                "Calcular compatibilidade com a base bacteriana.",

                "Gerar ranking de hipóteses.",

                "Prosseguir para antibiograma."

            ]

        }

    ]

};