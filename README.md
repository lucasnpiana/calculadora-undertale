<div align="center">

# Calculadora Undertale

**Calculadora inspirada na calculadora do Windows, com o visual do jogo Undertale.**

[Sobre](#-sobre-o-projeto) •
[Funcionalidades](#-funcionalidades) •
[Tecnologias](#tecnologias) •
[Como executar](#como-executar) •
[Autor](#autor)

</div>

---

> 🎓 **Projeto educacional:** desenvolvido durante meu bootcamp, como parte do curso **JavaScript do básico ao avançado (c/ Node.js e projetos)**.

## 📌 Sobre o projeto

A **Calculadora Undertale** é uma aplicação web que realiza operações matemáticas e simula o comportamento da calculadora padrão do Windows: expressão na linha de cima, memória, repetição da última conta com `=` e suporte ao teclado.

O projeto foi desenvolvido para colocar em prática os conhecimentos adquiridos durante o curso JavaScript do básico ao avançado (c/ Node.js e projetos). Como quis fazer algo diferente de uma calculadora comum, usei como inspiração visual um jogo de que gosto muito, o **Undertale**: caixa de diálogo preta com borda branca, fonte pixelada e o coração vermelho (SOUL) que aparece na tecla selecionada.

## 🚀 Funcionalidades

- **Operações básicas:** soma, subtração, multiplicação e divisão.
- **Operações especiais:** porcentagem, inverso (`1/x`), quadrado (`x²`), raiz quadrada (`√x`) e troca de sinal (`±`).
- **Limpeza:** `CE` limpa o número atual, `C` limpa tudo e `DEL` apaga um dígito.
- **Memória:** `MC`, `MR`, `M+`, `M-` e `MS`.
- **Repetição de conta:** apertar `=` várias vezes repete a última operação, como no Windows.
- **Formato brasileiro:** vírgula decimal e ponto de milhar.
- **Tratamento de erros:** mensagens como "Não é possível dividir por zero".
- **Suporte ao teclado:** funciona com mouse e teclado.
- **Interface responsiva:** adaptação a diferentes tamanhos de tela.
- **Visual Undertale:** coração vermelho na tecla selecionada, cores inspiradas no menu de batalha e sem animações, como no jogo.

<a id="tecnologias"></a>

## 🛠️ Tecnologias utilizadas

| Tecnologia | Utilização |
|---|---|
| JavaScript | Lógica da calculadora |
| HTML5 | Estrutura das páginas |
| CSS3 | Estilização da interface (variáveis, grid e pseudo-elementos) |
| Google Fonts | Fonte pixelada Press Start 2P |

## 📂 Estrutura do projeto

```text
calculadora-undertale/
│
├── index.html    # Estrutura: visor, botões de memória e teclas
├── style.css     # Visual no estilo Undertale
├── script.js     # Lógica da calculadora
└── README.md
```

<a id="como-executar"></a>

## ⚙️ Como executar o projeto

### Pré-requisitos

- Um navegador atualizado
- [Git](https://git-scm.com/) (para clonar o repositório)

Não é necessário instalar nenhuma dependência.

### Passo a passo

**1. Clone o repositório**

```bash
git clone https://github.com/lucasnpiana/calculadora-undertale.git
```

**2. Acesse a pasta do projeto**

```bash
cd calculadora-undertale
```

**3. Abra no navegador**

Dê dois cliques no arquivo `index.html`.

> A fonte pixelada é carregada do Google Fonts, então é preciso ter internet para ela aparecer. Sem internet, a calculadora usa uma fonte monoespaçada comum.

## ⌨️ Atalhos do teclado

| Tecla | Ação |
|---|---|
| `0-9` | Dígitos |
| `,` ou `.` | Vírgula decimal |
| `+ - * /` | Operadores |
| `Enter` ou `=` | Calcular |
| `Backspace` | Apagar um dígito (`DEL`) |
| `Delete` | Limpar o número atual (`CE`) |
| `Esc` | Limpar tudo (`C`) |
| `%` | Porcentagem |
| `@` | Raiz quadrada |

## 🧠 Como funciona

O código do `script.js` é dividido em seções:

| Seção | O que faz |
|---|---|
| Estado | Variáveis que guardam o número atual, o operador, a memória e a última conta |
| Auxiliares | Arredondamento, formatação brasileira e a função que calcula |
| Tela | Atualiza o visor e ajusta o tamanho da fonte para números longos |
| Ações das teclas | Uma função para cada tipo de tecla (dígito, operador, igual, memória...) |
| Distribuidor | A função `apertar` recebe a tecla e chama a ação certa, com `try/catch` para erros |
| Eventos | Clique do mouse e teclado chegam à mesma função |

## 🎯 Objetivos de aprendizagem

- Manipulação do **DOM** e uso de **eventos** (`click` e `keydown`).
- **Delegação de eventos:** um único `click` para todos os botões, com `data-k` e `closest()`.
- Organização do **estado** da aplicação em variáveis e funções pequenas.
- Tratamento de erros com **`try/catch`** e **`throw`**.
- Erros de **ponto flutuante** (`0.1 + 0.2`) e como arredondar o resultado.
- **Formatação de números** no padrão brasileiro.
- **CSS** com variáveis, `grid`, pseudo-elementos (o coração é um `::before`) e design responsivo.
- Boas práticas de organização de arquivos e comentários no código.

## 📚 Contexto acadêmico

Este projeto faz parte da minha jornada de aprendizado em desenvolvimento web, desenvolvido durante um bootcamp no curso **JavaScript do básico ao avançado (c/ Node.js e projetos)**. O objetivo é consolidar o conhecimento por meio da prática, construindo uma aplicação funcional e dando a ela uma identidade própria.

## 🤝 Contribuições

Sugestões e feedbacks são bem-vindos! Se quiser contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/minha-feature`)
3. Faça o commit das alterações (`git commit -m "feat: minha feature"`)
4. Envie para a branch (`git push origin feature/minha-feature`)
5. Abra um Pull Request

<a id="autor"></a>

## 👨‍💻 Autor

**Lucas Nickele Piana**  
Desenvolvedor em formação | JavaScript • Node.js

- 🐙 **GitHub:** [github.com/lucasnpiana](https://github.com/lucasnpiana)
- 💼 **LinkedIn:** [linkedin.com/in/lucasnpiana](https://www.linkedin.com/in/lucasnpiana)
- 📧 **E-mail:** [lucasnickelepiana@gmail.com](mailto:lucasnickelepiana@gmail.com)

## 📝 Licença

Este projeto foi criado para fins educacionais e de aprendizado. Sinta-se à vontade para estudá-lo e usá-lo como referência.

## 🙏 Créditos

- Fonte [Press Start 2P](https://fonts.google.com/specimen/Press+Start+2P), disponível no Google Fonts.
- **Undertale** é um jogo criado por Toby Fox. Este é um projeto de fã, feito apenas para estudo, sem fins comerciais e sem ligação com o criador do jogo.

---

<div align="center">

⭐ Se este projeto te ajudou ou te inspirou, deixe uma estrela no repositório!

Feito por [Lucas Nickele Piana](https://github.com/lucasnpiana)

</div>
