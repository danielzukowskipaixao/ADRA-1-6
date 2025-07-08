function abrirModalDoacao() {
  document.getElementById('modalDoacao').classList.remove('hidden');
  document.getElementById('modalDoacao').classList.add('fade-in');
}

function fecharModalDoacao() {
  const modal = document.getElementById('modalDoacao');
  modal.classList.add('fade-out');
  setTimeout(() => {
    modal.classList.remove('fade-out');
    modal.classList.add('hidden');
  }, 300);
}

function abrirModalTransferencia() {
  document.getElementById('modalTransferencia').classList.remove('hidden');
  document.getElementById('modalTransferencia').classList.add('fade-in');
}

function fecharModalTransferencia() {
  const modal = document.getElementById('modalTransferencia');
  modal.classList.add('fade-out');
  setTimeout(() => {
    modal.classList.remove('fade-out');
    modal.classList.add('hidden');
  }, 300);
}

window.onclick = function (event) {
  if (event.target.classList.contains('modal')) {
    fecharModalDoacao();
    fecharModalTransferencia();
  }
};
