const letrasMinusculas = 'abcdefghijklmnopqrstuvwxyz';
const letrasMaiusculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numeros = '0123456789';
const caracteresEspeciais = '!@#$%^&*()_+-=[]{}|;:,.<>?';

function gerarSenha() {
    const comprimento = parseInt(document.getElementById('comprimento').value);
    const opcoes = {
        minusculas: document.getElementById('minusculas').checked,
        maiusculas: document.getElementById('maiusculas').checked,
        numeros: document.getElementById('numeros').checked,
        especiais: document.getElementById('especiais').checked
    };

    let caracteres = '';
    if (opcoes.minusculas) caracteres += letrasMinusculas;
    if (opcoes.maiusculas) caracteres += letrasMaiusculas;
    if (opcoes.numeros) caracteres += numeros;
    if (opcoes.especiais) caracteres += caracteresEspeciais;

    if (!caracteres) {
        alert('Selecione pelo menos uma opção de caracteres!');
        return;
    }

    let senha = '';
    for (let contador = 0; contador < comprimento; contador++) {
        const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
        senha += caracteres[indiceAleatorio];
    }

    document.getElementById('senha').value = senha;
}

function copiarSenha() {
    const entradaSenha = document.getElementById('senha');
    entradaSenha.select();
    document.execCommand('copy');
    
    const botaoCopiar = document.querySelector('.botao-copiar');
    const textoOriginal = botaoCopiar.textContent;
    botaoCopiar.textContent = 'Copiado!';
    setTimeout(() => {
        botaoCopiar.textContent = textoOriginal;
    }, 2000);
}