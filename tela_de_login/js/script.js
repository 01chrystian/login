function exibirOpcao(jaCadastrado) {
    var opcaoLogin = document.getElementById('opcaoLogin');
    var opcaoSuporte = document.getElementById('opcaoSuporte');

    if (jaCadastrado) {
        opcaoLogin.style.display = 'block';
        opcaoSuporte.style.display = 'none';
    } else {
        opcaoLogin.style.display = 'none';
        opcaoSuporte.style.display = 'block';
    }
}

function logarComGoogle() {
    // Lógica para autenticação com o Google aqui
    window.location.href = 'https://qbahxt.conteige.cloud/'
}

function abrirModalSuporte() {
    exibirPopup("Enviar E-mail para Suporte", "<form id='emailForm'><div class='mb-3'><label for='email' class='form-label'>E-mail:</label><input type='email' class='form-control' id='email' name='email' required></div><div class='modal-footer'><button type='button' class='btn btn-secondary' onclick='fecharPopup()'>Fechar</button><button type='button' class='btn btn-primary' onclick='enviarEmail()'>Enviar</button></div></form>");
}

document.getElementById('emailForm').addEventListener('submit', function (event) {
    event.preventDefault();
    var email = document.getElementById('email').value;
    if (email) {
        // Lógica para enviar o e-mail para o suporte aqui
        fecharPopup();
        exibirPopup("Sucesso", "E-mail enviado com sucesso!");
        enviarEmail();
    } else {
        exibirPopup("Erro", "Por favor, insira um e-mail válido.");
    }
});

function exibirPopup(title, content) {
    var popupContainer = document.getElementById('popupContainer');
    var popupTitle = document.getElementById('popupTitle');
    var popupContent = document.getElementById('popupContent');
    popupTitle.textContent = title;
    popupContent.innerHTML = content;
    popupContainer.style.display = 'flex';
}

function fecharPopup() {
    var popupContainer = document.getElementById('popupContainer');
    popupContainer.style.display = 'none';
}

function enviarEmail() {
    var email = document.getElementById('email').value;
    const xhr = new XMLHttpRequest();
    const url = 'http://localhost:3000/enviar/email/suporte';
    const token = '2730266471202'; // O mesmo token definido no servidor

    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                // Requisição autorizada
                const response = JSON.parse(xhr.response);
                if (response) {
                    exibirPopup("", 'Carregando...');
                    setTimeout(() => {
                        exibirPopup("Sucesso", `${response?.success} <div class='modal-footer'><button type='button' class='btn btn-secondary' onclick='fecharPopup()'>Fechar</button></div>`);
                    }, 1000);
                }
            }

            if (xhr.status === 500) {
                // Requisição autorizada
                const response = JSON.parse(xhr.response);
                exibirPopup("Error", `${response?.error} <div class='modal-footer'><button type='button' class='btn btn-secondary' onclick='fecharPopup()'>Fechar</button></div>`);
            }

            if (xhr.status === 401) {
                const error = JSON.parse(xhr.response);
                exibirPopup("Aviso", `${error?.error}! <div class='modal-footer'><button type='button' class='btn btn-secondary' onclick='fecharPopup()'>Fechar</button></div>`);
            }
        }
    };

    const requestBody = JSON.stringify({
        email: email,
        token: token
    });
    xhr.send(requestBody);
}


