# Questionário de Esquemas de Young

Este projeto é uma implementação do **Questionário de Esquemas de Young (YSQ-S3)**, traduzido e adaptado para o português por Carlos Eduardo Seixas e Silvio Vasconcellos, com permissão do Schema Therapy Institute. A ferramenta é utilizada para apoiar psicólogos na prática clínica, proporcionando insights sobre os esquemas emocionais dos pacientes a partir de suas respostas ao questionário. 

## Visão Geral

O questionário visa identificar esquemas emocionais que influenciam o comportamento e a visão de mundo do indivíduo. Ele é dividido em categorias específicas, como “Abandono” e “Privação Emocional”, e cada resposta é pontuada para calcular uma média, destacando quais esquemas são mais predominantes.

Este projeto inclui funcionalidades que:
- Geram opções de respostas automáticas para cada pergunta;
- Validam o preenchimento do questionário, assegurando que todas as perguntas são respondidas;
- Calculam as médias dos esquemas e identificam os principais esquemas emocionais predominantes;
- Exportam um relatório detalhado em PDF com os resultados e interpretação dos esquemas.

## Funcionalidades

- **Geração de Relatório PDF**: Utilizando a biblioteca `jsPDF`, o sistema cria um PDF contendo o nome, idade, data de preenchimento e interpretação dos resultados do paciente.
- **Identificação de Esquemas Predominantes**: O sistema calcula e identifica automaticamente os esquemas que apresentam pontuação média elevada (≥ 4.5).
- **Acessibilidade**: Desenvolvido com foco em acessibilidade, o questionário é compatível com leitores de tela e permite navegação eficiente via teclado, promovendo uma experiência inclusiva e acessível.

## Como Usar

1. Preencha todas as perguntas do questionário, avaliando como cada afirmação reflete suas emoções e experiências.
2. Após o preenchimento, clique no botão para gerar o relatório.
3. O sistema validará o preenchimento e, em caso de sucesso, exibirá o relatório.
4. Caso deseje, o relatório completo pode ser exportado em formato PDF.

## Tecnologias Utilizadas

- **JavaScript**: Lógica do formulário, cálculo de médias, validação e manipulação de DOM.
- **jsPDF**: Geração e exportação do relatório em PDF.
- **HTML/CSS**: Estrutura e design do formulário, incluindo suporte a acessibilidade.

## Direitos Autorais

A tradução e adaptação deste questionário para o português foram realizadas por **Carlos Eduardo Seixas** e **Silvio Vasconcellos**. O uso e a distribuição do questionário devem respeitar os direitos adquiridos junto ao **Schema Therapy Institute**.

> © 2005 Jeffrey Young, Ph.D. Todos os direitos reservados. Reprodução sem autorização por escrito é proibida.

## Contribuindo

Contribuições são bem-vindas! Para contribuir com o projeto, por favor:
1. Realize um fork do repositório.
2. Crie uma branch para a sua feature (`git checkout -b feature/nova-funcionalidade`).
3. Faça o commit das suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`).
4. Envie para a branch (`git push origin feature/nova-funcionalidade`).
5. Abra um Pull Request.

## Licença

Este projeto é disponibilizado conforme os termos de licenciamento aplicáveis ao uso do Questionário de Esquemas de Young.
