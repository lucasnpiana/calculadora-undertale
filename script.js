(function () {

  // ESTADO (o que a calculadora "lembra")
  var atual = '0';          
  var acumulado = null;     
  var operador = null;     
  var expressao = '';       
  var novoNumero = false;   
  var erro = false;        
  var memoria = null;      
  var ultimaOp = null;     
  var ultimoB = 0;

  var SIM = { '+': '+', '-': '−', '*': '×', '/': '÷' };  
  var telaValor = document.getElementById('val');
  var telaExpr = document.getElementById('expr');

  // AUXILIARES (formatar e calcular)

  function arredondar(n) { return parseFloat(n.toPrecision(15)); }
  function txt(n) { return String(arredondar(n)); }

  // padrão brasileiro
  function formatar(s) {
    if (s.indexOf('e') > -1) return s.replace('.', ',');
    var negativo = s[0] === '-';
    if (negativo) s = s.slice(1);
    var partes = s.split('.');
    var inteiro = partes[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return (negativo ? '-' : '') + inteiro + (partes.length > 1 ? ',' + partes[1] : '');
  }

  // Faz a conta; erros viram mensagens na tela
  function calcular(a, b, o) {
    if (o === '+') return a + b;
    if (o === '-') return a - b;
    if (o === '*') return a * b;
    if (b === 0) throw new Error(a === 0 ? 'Resultado indefinido' : 'Não é possível dividir por zero');
    return a / b;
  }

  // Texto "5 +" para quando há uma operação pendente
  function prefixo() {
    return operador !== null ? formatar(txt(acumulado)) + ' ' + SIM[operador] + ' ' : '';
  }

  // TELA
  function atualizarTela() {
    var t = erro ? atual : formatar(atual);
    telaValor.textContent = t;
    telaExpr.textContent = expressao;
    var n = t.length;  // números longos usam fonte menor
    telaValor.style.fontSize = n > 22 ? '9px' : n > 16 ? '13px' : n > 11 ? '18px' : '';
    document.getElementById('mc').disabled = document.getElementById('mr').disabled = (memoria === null);
  }

  function limparTudo() {
    atual = '0'; acumulado = null; operador = null;
    expressao = ''; novoNumero = false; erro = false;
  }

  // AÇÕES DAS TECLAS
  function digito(d) {
    if (novoNumero && operador === null) expressao = '';  
    if (novoNumero) { atual = '0'; novoNumero = false; }
    if (d === '.') {
      if (atual.indexOf('.') < 0) atual += '.';
      return;
    }
    if (atual.replace(/[-.]/g, '').length >= 16) return;  
    atual = (atual === '0') ? d : (atual === '-0' ? '-' + d : atual + d);
  }

  function operacao(o) {
    if (operador !== null && novoNumero) { 
      operador = o;
      expressao = prefixo();
      return;
    }
    var v = parseFloat(atual);
    acumulado = operador !== null ? arredondar(calcular(acumulado, v, operador)) : v;
    operador = o;
    atual = txt(acumulado);
    novoNumero = true;
    expressao = prefixo();
  }

  function igual() {
    var a, b, o;
    if (operador !== null) {                 
      a = acumulado; o = operador; b = parseFloat(atual);
      ultimaOp = o; ultimoB = b;
    } else if (ultimaOp) {                   
      a = parseFloat(atual); o = ultimaOp; b = ultimoB;
    } else {                                 
      expressao = formatar(atual) + ' =';
      novoNumero = true;
      return;
    }
    var r = arredondar(calcular(a, b, o));
    expressao = formatar(txt(a)) + ' ' + SIM[o] + ' ' + formatar(txt(b)) + ' =';
    atual = txt(r); acumulado = null; operador = null; novoNumero = true;
  }

  function unario(k) { 
    var v = parseFloat(atual), r;
    var rotulo = formatar(txt(v));
    if (k === 'inv') { r = calcular(1, v, '/'); rotulo = '1/(' + rotulo + ')'; }
    else if (k === 'sq') { r = v * v; rotulo = 'sqr(' + rotulo + ')'; }
    else {
      if (v < 0) throw new Error('Entrada inválida');
      r = Math.sqrt(v); rotulo = '√(' + rotulo + ')';
    }
    expressao = prefixo() + rotulo;
    atual = txt(r); novoNumero = true;
  }

  function porcentagem() {  
    var r = operador !== null ? arredondar(acumulado * parseFloat(atual) / 100) : 0;
    atual = txt(r); novoNumero = true;
    expressao = prefixo() + formatar(atual);
  }

  function apagar() {  
    if (novoNumero) {
      if (operador === null) expressao = '';
      return;
    }
    atual = atual.slice(0, -1);
    if (atual === '' || atual === '-') atual = '0';
  }

  function negar() {  // ±
    if (parseFloat(atual) === 0 && atual.indexOf('.') < 0) return;
    atual = atual[0] === '-' ? atual.slice(1) : '-' + atual;
  }

  function usarMemoria(k) {
    var v = parseFloat(atual);
    if (k === 'mc') memoria = null;
    else if (k === 'mr') atual = txt(memoria);
    else if (k === 'mp') memoria = arredondar((memoria || 0) + v);
    else if (k === 'mm') memoria = arredondar((memoria || 0) - v);
    else if (k === 'ms') memoria = v;
    novoNumero = true;
  }

  // DISTRIBUIDOR (recebe a tecla e chama a ação certa)
  function apertar(k) {
    try {
      if (erro) {  
        var recomeca = k === 'c' || k === 'ce' || k === 'bs' || /^[0-9.]$/.test(k);
        if (!recomeca) return;
        limparTudo();
        if (/^[0-9.]$/.test(k)) digito(k);
        atualizarTela();
        return;
      }
      switch (k) {
        case '=': igual(); break;
        case 'c': limparTudo(); ultimaOp = null; break;
        case 'ce': atual = '0'; novoNumero = false; if (operador === null) expressao = ''; break;
        case 'bs': apagar(); break;
        case 'neg': negar(); break;
        case 'pct': porcentagem(); break;
        case 'inv': case 'sq': case 'rt': unario(k); break;
        case 'mc': case 'mr': case 'mp': case 'mm': case 'ms': usarMemoria(k); break;
        default:
          if (/^[0-9.]$/.test(k)) digito(k);
          else operacao(k);  // + - * /
      }
    } catch (e) {  
      erro = true; atual = e.message;
      acumulado = null; operador = null; expressao = ''; novoNumero = true;
    }
    atualizarTela();
  }

  // EVENTOS (mouse e teclado)
  document.querySelector('.calc').addEventListener('click', function (e) {
    var b = e.target.closest('button[data-k]');
    if (b && !b.disabled) apertar(b.dataset.k);
  });

  var TECLAS = { Enter: '=', '=': '=', Backspace: 'bs', Escape: 'c', Delete: 'ce', '%': 'pct', ',': '.', '@': 'rt' };
  document.addEventListener('keydown', function (e) {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    var k = TECLAS[e.key] || (/^[0-9+\-*\/.]$/.test(e.key) ? e.key : null);
    if (k) {
      e.preventDefault();
      if (document.activeElement) document.activeElement.blur();
      apertar(k);
    }
  });

  atualizarTela(); 
})();