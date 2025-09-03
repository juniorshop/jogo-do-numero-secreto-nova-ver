//Chamando a função tocarSomDosBotoes
tocarSomDosBotoes('meuBotao','meuSom');//Som para o botão de chute
// < ----- Inicializando as variáveis ----- >
let listaDeNumerosSorteados = new Array(10);
let quantidadeDeNumerosSorteadosNaLista = listaDeNumerosSorteados.length;
//let listaDeNumerosSorteados = [];
//let numeroLimite = 10; não precissa mais
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

//função para tocar Som nos Botoes: Adicionar e Sortear amigo chamado por function sortearAmigo() e function sortearAmigo()
function tocarSomDosBotoes(id1,id2) {
    // Obtém referências para o botão e o elemento de áudio
    //const botao = document.getElementById('adicionar');
    //const audio = document.getElementById('meuSom');
	const botao = document.getElementById(id1);
    const audio = document.getElementById(id2);
    // Adiciona um ouvinte de evento de clique ao botão
    botao.addEventListener('click', function() {
        // Para garantir que o som comece do início, mesmo se já estiver tocando
        audio.currentTime = 0;
        // Toca o som
        audio.play();
    });
	return;
}

function tocarSomDeErros(arquivoSom) {
   // 1. Crie uma nova instância do objeto Audio
	const meuSom = new Audio(arquivoSom); // Substitua pelo caminho real do seu ficheiro MP3
	// 2. Defina uma condição
	// 3. Use a estrutura if else
	meuSom.play(); // Toca o som
	return;
}

//Essa função é para validar a entrada no campo número
function verificaChute(chute){
  document.getElementById("number").style.borderColor = "#000";//Restaura a cor de antes do CSS
  document.getElementById("number").style.backgroundColor = "#FFF";//Restaura a cor de antes CSS
  if(chute == ""){
	//alert("Por favor, insira um nome valido!");
	let mensagemTentativas = "Por favor, insira um número!";
    exibirTextoNaTela('p', mensagemTentativas);
	document.getElementById("number").style.borderColor = "red";
	document.getElementById("number").style.backgroundColor = "#FFB6C1";
	document.getElementById("number").focus();
    return false;
  }
  return true;
}

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;//Mudei a fonte no CSS
	//Acertou!
	//Antes era 1 um tentativa, 2 dois tentativas.
	//Você descobriu o número secreto na 1ª tentativa! - Agora sim a pronuncia sai igual ao texto
	//Você descobriu o número secreto na 2ª tentativa!- Agora sim a pronuncia sai igual ao texto
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');//Mudei a fonte no CSS
    exibirTextoNaTela('p', `.: Escolha um número entre 1 e ${quantidadeDeNumerosSorteadosNaLista} :.`);//Mudei a fonte no CSS
}

exibirMensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;
	resultadoChute = verificaChute(chute);
	
  if (resultadoChute == true) { 
		if (chute == numeroSecreto) {
			//exibirTextoNaTela('h2', `<span style='color: green;'>Acertou</span>`);
			tocarSomDeErros('acertou-faustão.mp3');// Toca o som p/ acertos
			exibirTextoNaTela('h1', 'Acertou!');//Mudei a fonte no CSS
		
			//let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
			//Essa linha foi um avanço na econômia de códio substituindo a linha acima e suas variáveis. 
			//O que mudou tudo foi ${tentativas}ª
			//e a frase é pronunciada de forma correta. Antes era 1 um tentativa, 2 dois tentativas. Agora se resolveu esse problema.
			let mensagemTentativas = `Você descobriu o número secreto na ${tentativas}ª tentativa!`;
			exibirTextoNaTela('p', mensagemTentativas);
			document.getElementById('reiniciar').removeAttribute('disabled');
		} else {
			if (chute > numeroSecreto) {
				exibirTextoNaTela('p', 'O número secreto é menor');
				tocarSomDeErros('goofy-chute.mp3');// Toca o som p/ erros
			} else {
				exibirTextoNaTela('p', 'O número secreto é maior');
				tocarSomDeErros('goofy-chute.mp3');// Toca o som p/ erros
			}
			tentativas++;
			limparCampo();//Para limpar o campo número
		}
	}
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * quantidadeDeNumerosSorteadosNaLista + 1);
    //let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;
	
	if (listaDeNumerosSorteados[listaDeNumerosSorteados - 1] === undefined) {
		console.log("Nâo Está cheioO último elemento do listaDeNumerosSorteados não existe ou é undefined.");
		
	} else {
			console.log(`Está cheio e O último elemento do Array1 é: ${listaDeNumerosSorteados[listaDeNumerosSorteados - 1]}`);
			listaDeNumerosSorteados.length = 0;
	}

    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}
//Para limpar o campo número
function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
	//tocarSomDosBotoes('reiniciar','meuSom1');
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
	//Som para o botão de Reiniciar jogo
	// Obtém referências para o botão e o elemento de áudio
    const botao1 = document.getElementById('reiniciar');
    const audio = document.getElementById('meuSom1');

    // Adiciona um ouvinte de evento de clique ao botão
    botao1.addEventListener('click', function() {
        // Para garantir que o som comece do início, mesmo se já estiver tocando
        audio.currentTime = 0;
        // Toca o som
        audio.play();
    });
	//tocarSomDosBotoes('reiniciar','meuSom1');
	return;
}







