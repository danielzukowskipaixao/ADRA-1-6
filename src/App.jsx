// src/App.jsx
import './index.css';
import logo from './assets/adra-logo.png';
import { useState } from 'react';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [tipoUsuario, setTipoUsuario] = useState('doador');

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [endereco, setEndereco] = useState('');

  const handleOverlayClick = (e) => {
    if (e.target.id === 'overlay') {
      setShowModal(false);
      setShowRegister(false);
      setIsFlipped(false);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.setItem('tipoUsuario', tipoUsuario);
    if (tipoUsuario === 'necessitado') {
      window.location.href = '/pgn_atuacao.html';
    } else {
      window.location.href = '/pgn_doador.html';
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    localStorage.setItem('tipoUsuario', tipoUsuario);
    alert('Cadastro enviado!');
    window.location.href = '/pgn_verificacao.html';
  };

  return (
    <div className="min-h-screen flex flex-col justify-between font-[Poppins] bg-[#007A5E]">

      {/* HEADER */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src={logo} alt="ADRA" className="h-10" />
            <h1 className="text-xl font-bold text-gray-800">ADRA Brasil</h1>
          </div>
          <button onClick={() => setShowModal(true)} className="px-5 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-all">
            Fazer Login
          </button>
        </div>
      </header>

      {/* HERO */}
      <section className="flex-1 flex items-center justify-center text-center px-6 py-16">
        <div className="bg-white/60 backdrop-blur-xl p-10 rounded-3xl shadow-2xl max-w-2xl">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Transformando Vidas com Amor</h2>
          <p className="text-lg text-gray-700 mb-6">
            A ADRA atua com solidariedade e justiça, ajudando comunidades com educação, saúde e alimentação.
          </p>
          <div className="flex justify-center gap-4 mt-4">
            <a
              href="/pgn_doador.html"
              onClick={() => localStorage.setItem('tipoUsuario', 'doador')}
              className="px-6 py-3 bg-green-600 text-white rounded-full font-semibold hover:bg-green-700 transition-all"
            >
              Quero Ajudar
            </a>
            <a
              href="/pgn_necessitado.html"
              onClick={() => localStorage.setItem('tipoUsuario', 'necessitado')}
              className="px-6 py-3 bg-yellow-500 text-white rounded-full font-semibold hover:bg-yellow-600 transition-all"
            >
              Preciso de Ajuda
            </a>
          </div>
        </div>
      </section>

      {/* MODAL LOGIN/CADASTRO COM FLIP */}
{(showModal || showRegister) && (
  <div
    id="overlay"
    onClick={handleOverlayClick}
    className="fixed inset-0 bg-black/50 flex justify-center pt-10 z-50"
  >
    <div className="relative w-[90%] max-w-md [perspective:1000px]">
      <div className={`relative w-full transition-transform duration-700 [transform-style:preserve-3d] ${isFlipped ? 'rotate-y-180' : ''}`}>
        
        {/* Face Doador */}
        <div className="absolute w-full backface-hidden bg-white rounded-3xl p-8 shadow-2xl">
          <button onClick={() => setShowModal(false)} className="absolute top-3 right-4 text-gray-500 hover:text-red-500 text-xl">×</button>
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Entrar como Doador</h2>
          <form onSubmit={(e) => {
            e.preventDefault();
            localStorage.setItem('tipoUsuario', 'doador');
            window.location.href = '/pgn_doador.html';
          }} className="flex flex-col gap-4">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-mail" className="px-4 py-2 border border-gray-300 rounded-md" />
            <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="Senha" className="px-4 py-2 border border-gray-300 rounded-md" />
            <button type="submit" className="bg-blue-600 text-white rounded-md py-2 hover:bg-blue-700">Entrar</button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-sm">Sou <button className="text-yellow-600 hover:underline" onClick={() => { setIsFlipped(true); }}>Necessitado</button></p>
            <p className="text-sm mt-2">Não tem conta? <button onClick={() => { setShowModal(false); setShowRegister(true); setTipoUsuario('doador'); }} className="text-blue-600 hover:underline">Cadastrar-se</button></p>
          </div>
        </div>

        {/* Face Necessitado */}
        <div className="absolute w-full backface-hidden bg-white rounded-3xl p-8 shadow-2xl rotate-y-180">
          <button onClick={() => setShowModal(false)} className="absolute top-3 right-4 text-gray-500 hover:text-red-500 text-xl">×</button>
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Entrar como Necessitado</h2>
          <form onSubmit={(e) => {
            e.preventDefault();
            localStorage.setItem('tipoUsuario', 'necessitado');
            window.location.href = '/pgn_atuacao.html';
          }} className="flex flex-col gap-4">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-mail" className="px-4 py-2 border border-gray-300 rounded-md" />
            <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="Senha" className="px-4 py-2 border border-gray-300 rounded-md" />
            <button type="submit" className="bg-yellow-500 text-white rounded-md py-2 hover:bg-yellow-600">Entrar</button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-sm">Sou <button className="text-green-700 hover:underline" onClick={() => { setIsFlipped(false); }}>Doador</button></p>
            <p className="text-sm mt-2">Não tem conta? <button onClick={() => { setShowModal(false); setShowRegister(true); setTipoUsuario('necessitado'); }} className="text-blue-600 hover:underline">Cadastrar-se</button></p>
          </div>
        </div>

      </div>
    </div>
  </div>
)}

      {/* MODAL CADASTRO */}
      {showRegister && (
        <div id="overlay" onClick={handleOverlayClick} className="fixed inset-0 bg-black/50 flex justify-center pt-10 z-50">
          <div className="bg-white rounded-3xl p-8 w-[90%] max-w-md shadow-2xl relative animate-fade-in">
            <button onClick={() => { setShowRegister(false); setTipoUsuario(''); }} className="absolute top-3 right-4 text-gray-500 hover:text-red-500 text-xl">×</button>
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Criar Conta</h2>
            <form onSubmit={handleRegister} className="flex flex-col gap-4">
              <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome completo" className="px-4 py-2 border border-gray-300 rounded-md" />
              <input type="text" value={cpf} onChange={(e) => setCpf(e.target.value)} placeholder="CPF" className="px-4 py-2 border border-gray-300 rounded-md" />
              <input type="text" value={endereco} onChange={(e) => setEndereco(e.target.value)} placeholder="Endereço" className="px-4 py-2 border border-gray-300 rounded-md" />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-mail" className="px-4 py-2 border border-gray-300 rounded-md" />
              <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="Senha" className="px-4 py-2 border border-gray-300 rounded-md" />
              <button type="submit" className="bg-blue-600 text-white rounded-md py-2 hover:bg-blue-700">Cadastrar</button>
            </form>
          </div>
        </div>
      )}

      {/* PROJETOS */}
      <section className="py-20 px-4 bg-white" id="projetos">
        <div className="max-w-7xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">Nossos Projetos</h2>
          <p className="text-gray-600">Conheça algumas das iniciativas que fazem a diferença todos os dias.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <div className="bg-white/60 backdrop-blur-lg border border-white/40 rounded-2xl p-6 shadow-md hover:shadow-2xl transition-all duration-300">
            <img src="/imagens/educacao.png" alt="Educação" className="h-16 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800">Educação</h3>
            <p className="text-gray-600 mt-2">Oferecemos acesso ao conhecimento como ferramenta de transformação.</p>
          </div>

          <div className="bg-white/60 backdrop-blur-lg border border-white/40 rounded-2xl p-6 shadow-md hover:shadow-2xl transition-all duration-300">
            <img src="/imagens/saude.png" alt="Saúde" className="h-16 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800">Saúde</h3>
            <p className="text-gray-600 mt-2">Atendimentos médicos e apoio psicológico em comunidades carentes.</p>
          </div>

          <div className="bg-white/60 backdrop-blur-lg border border-white/40 rounded-2xl p-6 shadow-md hover:shadow-2xl transition-all duration-300">
            <img src="/imagens/alimento.png" alt="Alimentação" className="h-16 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800">Alimentação</h3>
            <p className="text-gray-600 mt-2">Distribuição de cestas básicas e incentivo à agricultura familiar.</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-800 text-white py-6 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">&copy; 2025 ADRA Brasil. Todos os direitos reservados.</p>
          <div className="flex gap-4 text-sm text-gray-300 mt-4 md:mt-0">
            <a href="#">Política de Privacidade</a>
            <a href="#">Termos de Uso</a>
            <a href="#">Contato</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
