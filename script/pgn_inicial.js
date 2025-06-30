document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("loginModal");
    const loginText = document.getElementById("login");
    const closeModal = document.querySelector(".close");
    const loginForm = document.getElementById("loginForm");
  
    // Abre o modal
    loginText.onclick = function () {
      modal.style.display = "flex";
      setTimeout(() => {
        modal.classList.add("show");
      }, 100);
    };
  
    // Fecha ao clicar no X
    closeModal.onclick = function () {
      modal.classList.remove("show");
      setTimeout(() => {
        modal.style.display = "none";
      }, 300);
    };
  
    // Fecha ao clicar fora do conteúdo
    window.onclick = function (event) {
      if (event.target === modal) {
        modal.classList.remove("show");
        setTimeout(() => {
          modal.style.display = "none";
        }, 300);
      }
    };
  
    // Redireciona após login
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();
  
      const usuario = document.getElementById("username").value.trim();
      const senha = document.getElementById("password").value.trim();
  
      if (!usuario || !senha) {
        alert("Por favor, preencha todos os campos.");
        return;
      }
  
      alert("Login realizado com sucesso!");
      window.location.href = "pgn_atuaçao.html";
    });
  });
  


  // Modal "Mais"
const abrirMaisBtn = document.getElementById("abrirMaisBtn");
const modalMais = document.getElementById("modalMais");
const fecharMaisBtn = document.querySelector(".close-mais");

abrirMaisBtn.onclick = function () {
  modalMais.style.display = "flex";
};

fecharMaisBtn.onclick = function () {
  modalMais.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modalMais) {
    modalMais.style.display = "none";
  }
};


// Mostrar/Ocultar senha
document.getElementById("togglePassword").addEventListener("click", function () {
  const passField = document.getElementById("password");
  passField.type = passField.type === "password" ? "text" : "password";
});

// Abrir cadastro (exemplo de redirecionamento ou abertura futura de modal)
document.getElementById("abrirCadastro").addEventListener("click", function (e) {
  e.preventDefault();
  alert("Tela de cadastro será implementada!");
});
