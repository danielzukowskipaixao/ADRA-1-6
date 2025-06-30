<?php
$host = "localhost";
$user = "root";
$senha = "";
$banco = "adra"; // nome do seu banco

$conn = new mysqli($host, $user, $senha, $banco);
if ($conn->connect_error) {
    die("Erro na conexão: " . $conn->connect_error);
}

$nome = $_POST['nome'];
$email = $_POST['email'];
$senha = password_hash($_POST['senha'], PASSWORD_DEFAULT);
$telefone = $_POST['telefone'];
$endereço = $_POST['endereço'];
$cidade = $_POST['estado'];


$sql = "INSERT INTO usuarios (nome, email, senha, telefone, endereco, estado) VALUES (?, ?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssssss", $nome, $email, $senha, $telefone, $endereco, $cidade);

if ($stmt->execute()) {
    echo "Usuário cadastrado com sucesso!";
} else {
    echo "Erro ao cadastrar: " . $conn->error;
}

$stmt->close();
$conn->close();
?>