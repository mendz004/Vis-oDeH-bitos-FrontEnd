import { useState } from "react";
import { Activity } from "lucide-react";
import { cadastrarUsuario, loginUsuario } from "../../api/api";
import { Link, useLocation, useNavigate } from "react-router-dom";

export function Login() {
  const location = useLocation();
  const navigate = useNavigate();
  const isRegister = location.pathname === "/cadastro";

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [idade, setIdade] = useState("");
  const [sexoBiologico, setSexoBiologico] = useState("Masculino");

  const [erro, setErro] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro(""); 

    try {
      if (isRegister) {
        // LÓGICA DE CADASTRO
        await cadastrarUsuario({
          nome,
          email,
          senha,
          idade: Number(idade),
          sexoBiologico
        });
        
        alert("Cadastro realizado com sucesso! Faça login para continuar.");
        navigate("/login"); 

      } else {
        // LÓGICA DE LOGIN
        const resposta = await loginUsuario({ email, senha });
        
        // 🔑 1. GUARDA O ID DO USUÁRIO NO NAVEGADOR
        const idUsuario = resposta?.id || resposta?.usuarioId || resposta?.user?.id;
        
        if (idUsuario) {
          localStorage.setItem("usuarioId", String(idUsuario));
        } else {
          console.warn("Aviso: O backend não retornou um ID de usuário válido na resposta.");
        }
        
        
        // Tenta pegar o nome direto, ou dentro de um objeto 'user'/'usuario' que o Java costuma mandar
        const nomeUsuario = resposta?.nome || resposta?.usuarioNome || resposta?.user?.nome || resposta?.usuario?.nome;
        
        if (nomeUsuario) {
          localStorage.setItem("nome", String(nomeUsuario));
        } else {
          // Se o backend ainda não mandar o nome no login, salvamos o e-mail provisoriamente 
          // ou um padrão para não quebrar a tela
          localStorage.setItem("nome", email.split("@")[0]);
          console.warn("Aviso: O backend não retornou o nome. Usando o prefixo do e-mail.");
        }
        
        navigate("/dashboard"); 
      }
    } catch (error: any) {
      console.error("Erro na operação:", error);
      setErro(error.message || "Ocorreu um erro de conexão.");
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-sm border border-slate-200">
        <div className="text-center mb-8">
          <Activity className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-900">
            {isRegister ? "Crie sua conta" : "Acesse sua conta"}
          </h2>
          <p className="text-slate-600 mt-2">
            {isRegister ? "Comece a rastrear seus hábitos hoje." : "Bem-vindo de volta ao Visão de Hábitos."}
          </p>
        </div>

        {/* Mostra mensagem de erro caso exista */}
        {erro && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 border border-red-200 rounded-md text-sm text-center">
            {erro}
          </div>
        )}

        {/* 3. CONECTANDO O FORMULÁRIO À FUNÇÃO */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {isRegister && (
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Nome completo</label>
              <input 
                type="text" 
                required
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                placeholder="Kaue Oliveira da Silva" 
              />
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">E-mail</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" 
              placeholder="kaue@exemplo.com" 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Senha</label>
            <input 
              type="password" 
              required
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" 
              placeholder="••••••••" 
            />
          </div>

          {isRegister && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Idade</label>
                <input 
                  type="number" 
                  required
                  value={idade}
                  onChange={(e) => setIdade(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                  placeholder="21" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Sexo Biológico</label>
                <select 
                  value={sexoBiologico}
                  onChange={(e) => setSexoBiologico(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                >
                  <option value="Masculino">Masculino</option>
                  <option value="Feminino">Feminino</option>
                </select>
              </div>
            </div>
          )}

          {!isRegister && (
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input id="remember-me" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-slate-300 rounded" />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-700">Lembrar acesso</label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">Esqueceu a senha?</a>
              </div>
            </div>
          )}

          <button 
            type="submit" 
            className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-6"
          >
            {isRegister ? "Finalizar Cadastro" : "Entrar"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-600">
          {isRegister ? (
            <p>Já possui conta? <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">Faça login</Link></p>
          ) : (
            <p>Não tem uma conta? <Link to="/cadastro" className="font-medium text-indigo-600 hover:text-indigo-500">Cadastre-se</Link></p>
          )}
        </div>
      </div>
    </div>
  );

}
