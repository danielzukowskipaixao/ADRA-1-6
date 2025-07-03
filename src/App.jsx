import './index.css';
import logo from './assets/adra-logo.png';
import { useState } from 'react';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isRegisterFlipped, setIsRegisterFlipped] = useState(false);
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
      setIsRegisterFlipped(false);
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
          <div className="flex gap-2">
            <button onClick={() => setShowModal(true)} className="px-5 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-all">
              Fazer Login
            </button>
            <button onClick={() => { setShowRegister(true); setShowModal(false); }} className="px-5 py-2 rounded-full bg-gray-200 text-blue-600 hover:bg-blue-100 transition-all">
              Cadastrar-se
            </button>
          </div>
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
            <a href="/pgn_doador.html" onClick={() => localStorage.setItem('tipoUsuario', 'doador')} className="px-6 py-3 bg-green-600 text-white rounded-full font-semibold hover:bg-green-700 transition-all">
              Quero Ajudar
            </a>
            <a href="/pgn_necessitado.html" onClick={() => localStorage.setItem('tipoUsuario', 'necessitado')} className="px-6 py-3 bg-yellow-500 text-white rounded-full font-semibold hover:bg-yellow-600 transition-all">
              Preciso de Ajuda
            </a>
          </div>
        </div>
      </section>

      {/* MODAIS LOGIN E CADASTRO */}
      {(showModal || showRegister) && (
        <div id="overlay" onClick={handleOverlayClick} className="fixed inset-0 bg-black/50 flex justify-center pt-10 z-50">
          <div className="relative w-[90%] max-w-md [perspective:1000px]">
            <div className={`relative w-full transition-transform duration-700 [transform-style:preserve-3d] ${showModal ? (isFlipped ? 'rotate-y-180' : '') : (isRegisterFlipped ? 'rotate-y-180' : '')}`}>
              {!showRegister ? (
                <>
                  {/* Login - Doador */}
                  <div className="absolute w-full backface-hidden bg-white rounded-3xl p-8 shadow-2xl">
                    <button onClick={() => setShowModal(false)} className="absolute top-3 right-4 text-gray-500 hover:text-red-500 text-xl">×</button>
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Entrar como Doador</h2>
                    <form onSubmit={(e) => { e.preventDefault(); localStorage.setItem('tipoUsuario', 'doador'); window.location.href = '/pgn_doador.html'; }} className="flex flex-col gap-4">
                      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-mail" className="px-4 py-2 border border-gray-300 rounded-md" />
                      <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="Senha" className="px-4 py-2 border border-gray-300 rounded-md" />
                      <button type="submit" className="bg-blue-600 text-white rounded-md py-2 hover:bg-blue-700">Entrar</button>
                    </form>
                    <div className="mt-4 text-center">
                      <p className="text-sm">Sou <button className="text-yellow-600 hover:underline" onClick={() => setIsFlipped(true)}>Necessitado</button></p>
                      <p className="text-sm mt-2">Não tem conta? <button onClick={() => { setShowModal(false); setShowRegister(true); setTipoUsuario('doador'); }} className="text-blue-600 hover:underline">Cadastrar-se</button></p>
                    </div>
                  </div>

                  {/* Login - Necessitado */}
                  <div className="absolute w-full backface-hidden bg-white rounded-3xl p-8 shadow-2xl rotate-y-180">
                    <button onClick={() => setShowModal(false)} className="absolute top-3 right-4 text-gray-500 hover:text-red-500 text-xl">×</button>
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Entrar como Necessitado</h2>
                    <form onSubmit={(e) => { e.preventDefault(); localStorage.setItem('tipoUsuario', 'necessitado'); window.location.href = '/pgn_atuacao.html'; }} className="flex flex-col gap-4">
                      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-mail" className="px-4 py-2 border border-gray-300 rounded-md" />
                      <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="Senha" className="px-4 py-2 border border-gray-300 rounded-md" />
                      <button type="submit" className="bg-yellow-500 text-white rounded-md py-2 hover:bg-yellow-600">Entrar</button>
                    </form>
                    <div className="mt-4 text-center">
                      <p className="text-sm">Sou <button className="text-green-700 hover:underline" onClick={() => setIsFlipped(false)}>Doador</button></p>
                      <p className="text-sm mt-2">Não tem conta? <button onClick={() => { setShowModal(false); setShowRegister(true); setTipoUsuario('necessitado'); }} className="text-blue-600 hover:underline">Cadastrar-se</button></p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Cadastro - Doador */}
                  <div className="absolute w-full backface-hidden bg-white rounded-3xl p-8 shadow-2xl">
                    <button onClick={() => setShowRegister(false)} className="absolute top-3 right-4 text-gray-500 hover:text-red-500 text-xl">×</button>
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Cadastrar como Doador</h2>
                    <form onSubmit={handleRegister} className="flex flex-col gap-4">
                      <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome completo" className="px-4 py-2 border border-gray-300 rounded-md" />
                      <input type="text" value={cpf} onChange={(e) => setCpf(e.target.value)} placeholder="CPF" className="px-4 py-2 border border-gray-300 rounded-md" />
                      <input type="text" value={endereco} onChange={(e) => setEndereco(e.target.value)} placeholder="Endereço" className="px-4 py-2 border border-gray-300 rounded-md" />
                      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-mail" className="px-4 py-2 border border-gray-300 rounded-md" />
                      <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="Senha" className="px-4 py-2 border border-gray-300 rounded-md" />
                      <button type="submit" className="bg-blue-600 text-white rounded-md py-2 hover:bg-blue-700">Cadastrar</button>
                    </form>
                    <p className="text-sm mt-4 text-center">Sou <button onClick={() => { setIsRegisterFlipped(true); setTipoUsuario('necessitado'); }} className="text-yellow-600 hover:underline">Necessitado</button></p>
                  </div>

                  {/* Cadastro - Necessitado */}
                  <div className="absolute w-full backface-hidden bg-white rounded-3xl p-8 shadow-2xl rotate-y-180">
                    <button onClick={() => setShowRegister(false)} className="absolute top-3 right-4 text-gray-500 hover:text-red-500 text-xl">×</button>
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Cadastrar como Necessitado</h2>
                    <form onSubmit={handleRegister} className="flex flex-col gap-4">
                      <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome completo" className="px-4 py-2 border border-gray-300 rounded-md" />
                      <input type="text" value={cpf} onChange={(e) => setCpf(e.target.value)} placeholder="CPF" className="px-4 py-2 border border-gray-300 rounded-md" />
                      <input type="text" value={endereco} onChange={(e) => setEndereco(e.target.value)} placeholder="Endereço" className="px-4 py-2 border border-gray-300 rounded-md" />
                      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-mail" className="px-4 py-2 border border-gray-300 rounded-md" />
                      <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="Senha" className="px-4 py-2 border border-gray-300 rounded-md" />
                      <button type="submit" className="bg-yellow-500 text-white rounded-md py-2 hover:bg-yellow-600">Cadastrar</button>
                    </form>
                    <p className="text-sm mt-4 text-center">Sou <button onClick={() => { setIsRegisterFlipped(false); setTipoUsuario('doador'); }} className="text-green-700 hover:underline">Doador</button></p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* PROJETOS COM INFORMAÇÃO REAL DA ADRA */}
      <section className="py-20 px-4 bg-white" id="projetos">
        <div className="max-w-7xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">O que a ADRA Faz</h2>
          <p className="text-gray-600">Conheça ações reais da ADRA que estão transformando vidas no Brasil.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <div className="bg-white border rounded-2xl p-6 shadow-md hover:shadow-xl transition-all">
            <img src="/imagens/o-que-fazemos-img.jpg" alt="Educação ADRA" className="h-36 w-full object-cover rounded-md mb-4" />
            <h3 className="text-xl font-semibold text-gray-800">Educação</h3>
            <p className="text-gray-600 mt-2">A ADRA mantém escolas como a ETAM no Amazonas, oferecendo ensino técnico para jovens ribeirinhos, além de projetos como Gol de Esperança e ADRA Runners.</p>
          </div>

          <div className="bg-white border rounded-2xl p-6 shadow-md hover:shadow-xl transition-all">
            <img src="/imagens/MG_9215-1024x683.jpg" alt="Saúde ADRA" className="h-36 w-full object-cover rounded-md mb-4" />
            <h3 className="text-xl font-semibold text-gray-800">Saúde</h3>
            <p className="text-gray-600 mt-2">Investimentos em clínicas móveis, projetos odontológicos como "Devolvendo Sorrisos", apoio a comunidades ribeirinhas e refugiados em parceria com a USAID.</p>
          </div>

          <div className="bg-white border rounded-2xl p-6 shadow-md hover:shadow-xl transition-all">
            <img src="/imagens/VOLUNTARIOS_346A0608.jpg" alt="Ajuda Humanitária ADRA" className="h-36 w-full object-cover rounded-md mb-4" />
            <h3 className="text-xl font-semibold text-gray-800">Ajuda Humanitária</h3>
            <p className="text-gray-600 mt-2">Distribuição de alimentos, água, kits de higiene e roupas em desastres naturais por meio da Carreta Solidária. Mais de 770 mil pessoas beneficiadas em 2022.</p>
          </div>
        </div>

        <div className="text-center mt-12">
          <a href="https://adra.org.br/projetos" target="_blank" className="text-blue-600 font-semibold hover:underline">Saiba mais no site oficial da ADRA &rarr;</a>
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
