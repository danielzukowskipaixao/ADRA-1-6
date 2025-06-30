document.getElementById('verificacaoForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const codigo = document.getElementById('codigo').value.trim();
    
    if (codigo === "") {
        alert('Por favor, insira o código de verificação.');
        return;
    }

    if (codigo === "123456") { // Simulação de código correto
        alert('Conta verificada com sucesso!');
        window.location.href = 'dashboard.html'; // Redireciona para a página principal
    } else {
        alert('Código incorreto. Tente novamente.');
    }
});

document.getElementById('reenviar').addEventListener('click', function(event) {
    event.preventDefault();
    // Adicionando uma simulação de envio do código
    alert('Um novo código foi enviado para seu e-mail.');
});
