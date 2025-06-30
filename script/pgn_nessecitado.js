document.addEventListener("DOMContentLoaded", function () {
  const abrirModalBtn = document.getElementById("abrirModalBtn");
  const modal = document.getElementById("modalCadastro");
  const fecharModal = document.getElementById("fecharModal");
  const cadastroForm = document.getElementById("cadastroForm");

  abrirModalBtn.onclick = () => {
    modal.style.display = "block";
  };

  fecharModal.onclick = () => {
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  // ✅ Quando o formulário for enviado, redireciona para a tela de verificação
  cadastroForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Aqui você pode validar campos se quiser antes de redirecionar
    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value.trim();

    if (!nome || !email || !senha) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    // Simula o envio e redireciona
    alert("Cadastro realizado com sucesso!");
    window.location.href = "pgn_verificaçao.html";
  });
});



document.addEventListener("DOMContentLoaded", function () {
  // Login Modal
  const abrirLoginModalBtn = document.getElementById("abrirLoginModal");
  const modalLogin = document.getElementById("modalLogin");
  const fecharLoginModal = document.getElementById("fecharLoginModal");
  const loginForm = document.getElementById("loginForm");

  abrirLoginModalBtn.onclick = () => {
    modalLogin.style.display = "block";
  };

  fecharLoginModal.onclick = () => {
    modalLogin.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == modalLogin) {
      modalLogin.style.display = "none";
    }
  };

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const email = document.getElementById("loginEmail").value.trim();
    const senha = document.getElementById("loginSenha").value.trim();

    if (!email || !senha) {
      alert("Preencha todos os campos.");
      return;
    }

    alert("Login realizado com sucesso!");
    window.location.href = "pgn_atuaçao.html";
  });
});
