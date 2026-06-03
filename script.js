let pinguim = document.getElementById("pinguim");
let itens = 0;
let tempo = 60;
let jogoRodando = false;
let pulando = false;
let altura = 0;
let posicaoY = 0;
let obstaculos = document.getElementsByClassName("obstaculo");
let obstaculoAtivo = 0;
let base = 20;
let movimento;
let subida;
let descida;
let peixe = document.getElementById("peixe");
let tempoPeixe = 0;
let pegouPeixe = false;
let posItemX = 800 + Math.random() * 400;
let itemMovimento;
let interacao = false;
let inicioJogo = false;
let cronometro;
let montanha = 0;
document.getElementById("montanha").style.left = "0px";
let montanha1 = 720;
document.getElementById("montanha1").style.left = "720px";
let movimentoMontanha;
let nuvem = 0;
let nuvem1 = 760;
let movimentoNuvens;
let arvore = 400;
document.getElementById("arvore").style.left = "400px";
let arvore1 = 800;
document.getElementById("arvore1").style.left = "800px";
let movimentoArvore;

function comecar() {
  document.getElementById("telaInicial").style.display = "none"; 
  document.getElementById("telaGameOver").style.display = "none";

  jogoRodando = true;
  interacao = true;
  inicioJogo = true;

  pinguim.src = "img/pinguim7.png";
  pinguim.style.width = "60px";

  for (let i = 0; i < obstaculos.length; i++) {
    let posicaoObstaculo = 820 + i * 820;
    obstaculos[i].style.left = posicaoObstaculo + "px";
  }
  posItemX = 800;
  obstaculoAtivo = 0;

  peixe.style.left = posItemX + "px";
  let alturaPeixe = 90 + Math.random() * 40;
  peixe.style.bottom = alturaPeixe + "px";
  document.getElementById("montanha").style.left = "0px";
  document.getElementById("montanha1").style.left = "720px";
  
  montanha = 0;
  montanha1 = 720;

  iniciarCronometro();
  iniciarMovimento();
  iniciarPeixe();
  iniciarMontanha();
  iniciarNuvens();
  iniciarArvore();
}

function iniciarCronometro() {

  cronometro = setInterval(function() {
    tempo--;

    document.getElementById("tempo").innerText = "Tempo: " + tempo;

    if (tempo <= 0) {
      clearInterval(cronometro);
      clearInterval(movimentoNuvens);
      document.getElementById("telaGameOver").style.display = "flex";
      jogoRodando = false;
    }
  }, 1000);
}

function pular() {
  if (!jogoRodando){ 
    return;
  }
  if (pulando) {
    return;
  }
  if(!inicioJogo) {
    return;
  }

  pulando = true;

  let altura = 0;
  subida = setInterval(function() {

    if (altura >= 100) {
      clearInterval(subida);

      descida = setInterval(function() {
        altura -= 5;
        posicaoY = altura;
        pinguim.style.bottom = (posicaoY + base) + "px";

        if (altura <= 0) {
          clearInterval(descida);
          pulando = false;
        }
      }, 30);

    } else {
      altura += 5;
      posicaoY = altura;
      pinguim.style.bottom = (posicaoY + base) + "px";
    }
    }, 30);
}

function iniciarMovimento() {

  movimento = setInterval(function () {

    if (!jogoRodando) {
      return;
    }

    let obstaculoPosicao = obstaculos[obstaculoAtivo];
    let posicaoObstaculo = parseInt(obstaculoPosicao.style.left || "820");

    posicaoObstaculo -= 5;
    obstaculoPosicao.style.left = posicaoObstaculo + "px";

    if (posicaoObstaculo < -60) {
      posicaoObstaculo = 820;
      obstaculoPosicao.style.left = posicaoObstaculo + "px";

      if (Math.random() < 0.5) {
        obstaculoPosicao.src = "img/picogrande.png";
        obstaculoPosicao.style.width = "60px";
      } else {
        obstaculoPosicao.src = "img/picomedio.png";
        obstaculoPosicao.style.width = "40px";
      }
    
      obstaculoAtivo++;
      if (obstaculoAtivo >= obstaculos.length) {
        obstaculoAtivo = 0;
      }
      obstaculos[obstaculoAtivo].style.left = "820px";
    }

    let pinguimEsquerda = pinguim.offsetLeft + 15;
    let pinguimDireita = pinguim.offsetLeft + pinguim.offsetWidth - 30;
    let pinguimBaixo = pinguim.offsetTop;
  
    for (let i = 0; i < obstaculos.length; i++) {
      let obstaculoPosicao = obstaculos[i];
      let obsEsq = obstaculoPosicao.offsetLeft;

      if (pinguimDireita > obsEsq && pinguimEsquerda < obsEsq + obstaculoPosicao.offsetWidth && pinguimBaixo > 150) {

        jogoRodando = false;

        pinguim.src = "img/pinguim8.png";
        pinguim.style.width = "85px";

        document.getElementById("telaGameOver").style.display = "flex";

        clearInterval(movimento);
        clearInterval(itemMovimento);
        clearInterval(cronometro);
        clearInterval(movimentoNuvens);
        clearInterval(movimentoMontanha);
        clearInterval(movimentoArvore);
        clearInterval(subida);
        clearInterval(descida);

        descida = setInterval(function() {
          let alturaAtual = parseInt(pinguim.style.bottom || base + 'px') - base;
          alturaAtual = Math.max(0, alturaAtual - 5);

          if (alturaAtual <= 0) {
            clearInterval(descida);
            pinguim.style.bottom = base + "px";
          } else {
            pinguim.style.bottom = (alturaAtual + base) + "px";
          }
        }, 30);
        break;
      }
    }
  }, 30);
}

function iniciarPeixe() {
  itemMovimento = setInterval(function () {

    if (!jogoRodando) {
      return;
    };

    posItemX -= 5;
    peixe.style.left = posItemX + "px";
    tempoPeixe++;

    if (!pegouPeixe && pinguim.offsetLeft + pinguim.offsetWidth > peixe.offsetLeft && pinguim.offsetLeft < peixe.offsetLeft + peixe.offsetWidth && pinguim.offsetTop + pinguim.offsetHeight > peixe.offsetTop) {
      itens++;
      posItemX = -100;
      peixe.style.left = posItemX + "px";
      document.getElementById("itens").innerText = "Itens: " + itens;
      pegouPeixe = true;
    }

    if (posItemX < -50 && tempoPeixe > 200) {
      posItemX = 800 + Math.random() * 300;
      peixe.style.left = posItemX + "px";
      let alturaPeixe = 90 + Math.random() * 40;
      peixe.style.bottom = alturaPeixe + "px";
      let tamanhoPeixe = 25 + Math.random() * 20;
      peixe.style.width = tamanhoPeixe + "px";

      tempoPeixe = 0;
      pegouPeixe = false;
    }
  }, 30);
}

function reiniciar() {
  if (!inicioJogo) {
    return;
  }

  pinguim.src = "img/pinguim7.png";
  pinguim.style.width = "60px";

  obstaculoAtivo = 0;

  for (let i = 0; i < obstaculos.length; i++) {
    let posicaoObstaculo = 820 + i * 820;
    obstaculos[i].style.left = posicaoObstaculo + "px";
  }

  clearInterval(movimento);
  clearInterval(itemMovimento);
  clearInterval(cronometro);
  clearInterval(movimentoNuvens);
  clearInterval(movimentoMontanha);
  clearInterval(movimentoArvore);
  clearInterval(subida);
  clearInterval(descida);

  jogoRodando = true;
  pulando = false;
  tempo = 60;
  itens = 0; 
  posicaoX = 800;
  posItemX = 800;
  montanha = 0;
  montanha1 = 720;
  arvore = 400;
  arvore1 = 800;
  nuvem = 0;
  nuvem1 = 760;

  document.getElementById("arvore").style.left = "400px";
  document.getElementById("arvore1").style.left = "800px";
  document.getElementById("montanha").style.left = "0px";
  document.getElementById("montanha1").style.left = "720px";
  document.getElementById("mensagem").innerText = "";
  document.getElementById("itens").innerText = "Itens: 0";
  document.getElementById("tempo").innerText = "Tempo: 60";
  document.getElementById("telaGameOver").style.display = "none";

  let alturaPeixe = 90 + Math.random() * 40;
  peixe.style.bottom = alturaPeixe + "px";
  pinguim.style.bottom = base + "px";
  peixe.style.left = posItemX + "px";

  iniciarMovimento();
  iniciarPeixe();
  iniciarCronometro();
  iniciarMontanha();
  iniciarNuvens();
  iniciarArvore();
}

function iniciarMontanha() {

  clearInterval(movimentoMontanha);

  movimentoMontanha = setInterval(function() {

    if (!jogoRodando) {
      return;
    }

    montanha -= 1;
    montanha1 -= 1;

    document.getElementById("montanha").style.left = montanha + "px";
    document.getElementById("montanha1").style.left = montanha1 + "px";

    if (montanha < -720) {
      montanha = 720;
    }

    if (montanha1 < -720) {
      montanha1 = 720;
    }
  }, 30);
}

function iniciarNuvens() {

  if (movimentoNuvens) {
    clearInterval(movimentoNuvens);
  }

  movimentoNuvens = setInterval(function() {

    if (!jogoRodando) {
      return;
    }

    nuvem -= 0.2;
    nuvem1 -= 0.2;

    document.getElementById("nuvens").style.left = nuvem + "px";
    document.getElementById("nuvens1").style.left = nuvem1 + "px";

    if (nuvem < -760) {
      nuvem = 800;
    }

    if (nuvem1 < -760) {
      nuvem1 = 800;
    }
  }, 30);
}

function iniciarArvore() {

  clearInterval(movimentoArvore);

  movimentoArvore = setInterval(function() {

    if (!jogoRodando) {
      return;
    }

    arvore -= 1.7;
    arvore1 -= 1.7;

    document.getElementById("arvore").style.left = arvore + "px";
    document.getElementById("arvore1").style.left = arvore1 + "px";

    if (arvore < -120) {
      arvore = 800;
    }

    if (arvore1 < -120) {
      arvore1 = 800;
    }
  }, 30);
}

