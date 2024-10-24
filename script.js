// script.js

// Importar jsPDF
const { jsPDF } = window.jspdf;

document.addEventListener("DOMContentLoaded", function () {
    let respostas = [];
    let esquemas = {
        'Abandono': [],
        'Desconfiança/Abuso': [],
        'Privação Emocional': [],
        'Imperfeição/Vergonha': [],
        'Isolamento Social/Alienação': [],
        'Dependência/Incompetência': [],
        'Vulnerabilidade ao Perigo': [],
        'Emaranhamento': [],
        'Subjugação': [],
        'Autossacrifício': [],
        'Inibição Emocional': [],
        'Padrões Inflexíveis': [],
        'Direito/Grandiosidade': [],
        'Autocontrole Insuficiente': [],
        'Busca de Aprovação': [],
        'Pessimismo': [],
        'Punição': []
    };

    function validarEntrada(input) {
        const valor = parseInt(input.value, 10);
        if (isNaN(valor) || valor < 1 || valor > 6) {
            input.setAttribute('aria-invalid', 'true');
            if (input.nextElementSibling) {
                input.nextElementSibling.textContent = "Valor inválido. Digite um número entre 1 e 6.";
            }
            const pergunta = input.dataset.pergunta ? ` para a questão ${input.dataset.pergunta}` : "";
            emitirAlertaAcessivel(`Valor inválido${pergunta}. Digite um número entre 1 e 6.`);
            input.focus();
            return false;
        } else {
            input.setAttribute('aria-invalid', 'false');
            if (input.nextElementSibling) {
                input.nextElementSibling.textContent = "";
            }
            return true;
        }
    }

    function verificarPreenchimento(input) {
        if (input.value.trim() === "") {
            input.setAttribute('aria-invalid', 'true');
            if (input.nextElementSibling) {
                input.nextElementSibling.textContent = "Campo obrigatório.";
            }
            const pergunta = input.dataset.pergunta ? ` para a questão ${input.dataset.pergunta}` : "";
            emitirAlertaAcessivel(`Campo obrigatório${pergunta}.`);
            input.focus();
            return false;
        } else {
            input.setAttribute('aria-invalid', 'false');
            if (input.nextElementSibling) {
                input.nextElementSibling.textContent = "";
            }
            return true;
        }
    }

    function validarFormulario() {
        const inputs = document.querySelectorAll('input[type="number"]:not(#idade)');
        for (const input of inputs) {
            if (!verificarPreenchimento(input) || !validarEntrada(input)) {
                return false;
            }
        }
        return true;
    }

    function adicionarFocoInicial() {
        const primeiroCampo = document.getElementById('nome');
        if (primeiroCampo) {
            primeiroCampo.focus();
        }
    }

    function emitirAlertaAcessivel(mensagem) {
        alert(mensagem); // O alerta será reproduzido pelo leitor de tela
    }

    function gerarRelatorio() {
        if (!validarFormulario()) {
            return;
        }

        const resultadoDiv = document.getElementById("resultado");
        const relatorioSecao = document.getElementById("relatorio");
        respostas = [];
        // Resetar esquemas
        for (const key in esquemas) {
            esquemas[key] = [];
        }

        const perguntas = document.querySelectorAll('input[type="number"]:not(#idade)');
        perguntas.forEach((input, index) => {
            const perguntaTexto = input.previousElementSibling.textContent;
            const valor = parseInt(input.value);
            respostas.push({ pergunta: perguntaTexto, valor: valor });
            atribuirRespostasAosEsquemas(index + 1, valor);
        });

        const mediasEsquemas = calcularMedias(esquemas);
        const esquemasCentrais = identificarEsquemasCentrais(mediasEsquemas);

        resultadoDiv.innerHTML = "";

        const nomePaciente = document.getElementById("nome").value.trim();
        const idadePaciente = document.getElementById("idade").value.trim();
        const dataNascimento = document.getElementById("data").value ? new Date(document.getElementById("data").value).toLocaleDateString('pt-BR') : "";
        const dataPreenchimento = new Date().toLocaleDateString('pt-BR');

        const headerInfo = document.createElement("div");
        headerInfo.innerHTML = `<h2>Relatório de Avaliação de Esquemas</h2>
                                <p><strong>Nome:</strong> ${nomePaciente}</p>
                                <p><strong>Idade:</strong> ${idadePaciente}</p>
                                <p><strong>Data de Nascimento:</strong> ${dataNascimento}</p>
                                <p><strong>Data do Preenchimento:</strong> ${dataPreenchimento}</p>`;
        resultadoDiv.appendChild(headerInfo);

        const respostaSection = document.createElement("div");
        respostaSection.innerHTML = "<h3>Interpretação dos Resultados</h3>";
        if (Object.keys(esquemasCentrais).length > 0) {
            for (const [esquema, media] of Object.entries(esquemasCentrais)) {
                const interpretacaoItem = document.createElement("p");
                interpretacaoItem.textContent = `O esquema ${esquema} é predominante, com uma pontuação média de ${media.toFixed(2)}.`;
                respostaSection.appendChild(interpretacaoItem);
            }
        } else {
            const interpretacaoItem = document.createElement("p");
            interpretacaoItem.textContent = "Nenhum esquema foi identificado como predominante.";
            respostaSection.appendChild(interpretacaoItem);
        }

        resultadoDiv.appendChild(respostaSection);

        const perguntasRespostasSection = document.createElement("div");
        perguntasRespostasSection.innerHTML = "<h3>Perguntas e Respostas</h3>";
        respostas.forEach((resposta, index) => {
            const respostaItem = document.createElement("p");
            respostaItem.textContent = `${index + 1}. ${resposta.pergunta} Resposta: ${resposta.valor}`;
            perguntasRespostasSection.appendChild(respostaItem);
        });

        resultadoDiv.appendChild(perguntasRespostasSection);
        relatorioSecao.hidden = false;
    }

    function atribuirRespostasAosEsquemas(indice, valor) {
        if ([1, 2, 20, 38, 56, 74].includes(indice)) {
            esquemas['Abandono'].push(valor);
        } else if ([3, 21, 39, 57, 75].includes(indice)) {
            esquemas['Desconfiança/Abuso'].push(valor);
        } else if ([19, 37, 55, 73].includes(indice)) {
            esquemas['Privação Emocional'].push(valor);
        } else if ([4, 5, 22, 23, 40, 41, 58, 59, 77].includes(indice)) {
            esquemas['Imperfeição/Vergonha'].push(valor);
        } else if ([6, 24, 42, 60, 78].includes(indice)) {
            esquemas['Isolamento Social/Alienação'].push(valor);
        } else if ([7, 25, 43, 61, 79].includes(indice)) {
            esquemas['Dependência/Incompetência'].push(valor);
        } else if ([8, 26, 44, 62, 80].includes(indice)) {
            esquemas['Vulnerabilidade ao Perigo'].push(valor);
        } else if ([9, 27, 45, 63, 81].includes(indice)) {
            esquemas['Emaranhamento'].push(valor);
        } else if ([10, 28, 46, 64, 82].includes(indice)) {
            esquemas['Subjugação'].push(valor);
        } else if ([11, 29, 47, 65, 83].includes(indice)) {
            esquemas['Autossacrifício'].push(valor);
        } else if ([12, 30, 48, 66, 84].includes(indice)) {
            esquemas['Inibição Emocional'].push(valor);
        } else if ([13, 31, 49, 67, 85].includes(indice)) {
            esquemas['Padrões Inflexíveis'].push(valor);
        } else if ([14, 32, 50, 68, 86].includes(indice)) {
            esquemas['Direito/Grandiosidade'].push(valor);
        } else if ([15, 33, 51, 69, 87].includes(indice)) {
            esquemas['Autocontrole Insuficiente'].push(valor);
        } else if ([16, 34, 52, 70, 88].includes(indice)) {
            esquemas['Busca de Aprovação'].push(valor);
        } else if ([17, 35, 53, 71, 89].includes(indice)) {
            esquemas['Pessimismo'].push(valor);
        } else if ([18, 36, 54, 72, 90].includes(indice)) {
            esquemas['Punição'].push(valor);
        }
    }

    function calcularMedias(esquemas) {
        const medias = {};
        for (const [esquema, respostas] of Object.entries(esquemas)) {
            const soma = respostas.reduce((acc, val) => acc + val, 0);
            medias[esquema] = respostas.length > 0 ? soma / respostas.length : 0;
        }
        return medias;
    }

    function identificarEsquemasCentrais(mediasEsquemas) {
        const esquemasCentrais = {};
        for (const [esquema, media] of Object.entries(mediasEsquemas)) {
            if (media >= 4.5) {
                esquemasCentrais[esquema] = media;
            }
        }
        return esquemasCentrais;
    }

    function exportarPDF() {
        const nomePaciente = document.getElementById("nome").value.trim();
        const idadePaciente = document.getElementById("idade").value.trim();
        const dataNascimento = document.getElementById("data").value ? new Date(document.getElementById("data").value).toLocaleDateString('pt-BR') : "";
        const dataPreenchimento = new Date().toLocaleDateString('pt-BR');

        const doc = new jsPDF({
            orientation: "portrait",
            unit: "mm",
            format: "a4"
        });

        // Cabeçalho do relatório
        doc.setFontSize(16);
        doc.setFont("helvetica", "bold");
        doc.text(`Relatório de Avaliação de Esquemas`, 105, 20, { align: "center" });
        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        doc.text(`Nome: ${nomePaciente}`, 15, 30);
        doc.text(`Idade: ${idadePaciente}`, 15, 40);
        doc.text(`Data de Nascimento: ${dataNascimento}`, 15, 50);
        doc.text(`Data do Preenchimento: ${dataPreenchimento}`, 15, 60);

        // Interpretação dos Resultados
        let yPosition = 70;
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.text(`Interpretação dos Resultados`, 15, yPosition);
        yPosition += 10;
        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");

        const mediasEsquemas = calcularMedias(esquemas);
        const esquemasCentrais = identificarEsquemasCentrais(mediasEsquemas);

        if (Object.keys(esquemasCentrais).length > 0) {
            for (const [esquema, media] of Object.entries(esquemasCentrais)) {
                const interpretacaoTexto = `O esquema ${esquema} é predominante, com uma pontuação média de ${media.toFixed(2)}.`;
                const linhasInterpretacao = doc.splitTextToSize(interpretacaoTexto, 180);
                doc.text(linhasInterpretacao, 15, yPosition);
                yPosition += (linhasInterpretacao.length * 10);
            }
        } else {
            doc.text("Nenhum esquema foi identificado como predominante.", 15, yPosition);
            yPosition += 10;
        }

        // Tabela de Perguntas e Respostas
        yPosition += 10;
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.text(`Perguntas e Respostas`, 15, yPosition);
        yPosition += 10;

        const tabelaDados = respostas.map((resposta, index) => [index + 1, resposta.pergunta, resposta.valor]);

        doc.autoTable({
            head: [['Nº', 'Pergunta', 'Resposta']],
            body: tabelaDados,
            startY: yPosition,
            theme: 'grid',
            styles: {
                fontSize: 9,
                cellPadding: 2,
            },
            headStyles: {
                fillColor: [0, 123, 255],
                halign: 'center',
                valign: 'middle',
            },
            columnStyles: {
                0: { cellWidth: 10, halign: 'center' },
                1: { cellWidth: 120 },
                2: { cellWidth: 20, halign: 'center' },
            },
            margin: { left: 15, right: 15 },
            pageBreak: 'auto',
            tableWidth: 'wrap',
        });

        // Adicionando Gráfico
        const canvas = document.createElement('canvas');
        canvas.width = 400;
        canvas.height = 200;
        const ctx = canvas.getContext('2d');

        const labels = Object.keys(mediasEsquemas);
        const data = Object.values(mediasEsquemas);

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Pontuação Média dos Esquemas',
                    data: data,
                    backgroundColor: 'rgba(0, 123, 255, 0.6)',
                    borderColor: 'rgba(0, 123, 255, 1)',
                    borderWidth: 1,
                }],
            },
            options: {
                responsive: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 6,
                    },
                },
            },
        });

        // Espera o gráfico ser renderizado
        setTimeout(() => {
            const imgData = canvas.toDataURL('image/png');
            const imgProps = doc.getImageProperties(imgData);
            const pdfWidth = doc.internal.pageSize.getWidth() - 30;
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

            doc.addPage();
            doc.setFontSize(14);
            doc.setFont("helvetica", "bold");
            doc.text(`Gráfico de Pontuação Média dos Esquemas`, 105, 20, { align: "center" });
            doc.addImage(imgData, 'PNG', 15, 30, pdfWidth, pdfHeight);

            const nomeArquivo = `resultado_questionario_dos_esquemas_${nomePaciente || 'paciente'}.pdf`;
            doc.save(nomeArquivo);
        }, 1000);
    }

    window.gerarRelatorio = gerarRelatorio;
    window.exportarPDF = exportarPDF;

    adicionarFocoInicial();
});
