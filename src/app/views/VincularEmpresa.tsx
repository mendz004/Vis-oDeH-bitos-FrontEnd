import { FormEvent, useState } from "react";
import { Building2, Plus, Link as LinkIcon, CheckCircle2 } from "lucide-react";
import { vincularFuncionario } from "../../api/api";
import { cadastrarEmpresa } from "../../api/api";

export function VincularEmpresa() {
  const [activeTab, setActiveTab] = useState("vincular"); // "vincular" | "cadastrar"
  const [status, setStatus] = useState("");

  const [codigoEmpresa, setCodigoEmpresa] = useState("");
  const [departamento, setDepartamento] = useState("");

  const [nomeEmpresa, setNomeEmpresa] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [quantidadeColaboradores, setQuantidadeColaboradores] = useState("");

  const handleVincular = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Evita que a página recarregue
    setStatus("Vinculando... aguarde.");

    try {
      const usuarioId = 1; // Substitua pelo ID do usuário logado.
      await vincularFuncionario(codigoEmpresa, departamento, usuarioId);

      setStatus("Sua conta foi vinculada à empresa com sucesso!");
      setCodigoEmpresa("");
      setDepartamento("");
    } catch (erro) {
      console.error("Erro ao vincular:", erro);
      setStatus("Erro ao vincular conta. Verifique o código da empresa.");
    }
  };

  const handleCadastrar = async (e: React.FormEvent) => {
    e.preventDefault(); // Evita que a página recarregue
    
    setStatus("Cadastrando empresa... aguarde.");

    try {
      // Novamente, o ID do usuário deve vir do seu contexto de login/autenticação
      const usuarioId = 1; 

      // Chama o seu mensageiro da API
      const resposta = await cadastrarEmpresa(nomeEmpresa, cnpj, usuarioId);

      // Mensagem de sucesso
      setStatus("Empresa cadastrada com sucesso! Você agora é um administrador e pode acessar o Painel Admin.");
      
      // Limpa os campos do formulário
      setNomeEmpresa("");
      setCnpj("");

    } catch (erro) {
      console.error("Erro ao cadastrar empresa:", erro);
      setStatus("Erro ao cadastrar empresa. Verifique os dados e tente novamente.");
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">Vincular Empresa</h1>
        <p className="text-slate-600">Vincule-se a uma empresa existente ou cadastre a sua para acessar o Painel Corporativo.</p>
      </header>

      <div className="flex gap-4 border-b border-slate-200">
        <button 
          onClick={() => { setActiveTab("vincular"); setStatus(""); }}
          className={`pb-3 text-sm font-medium border-b-2 transition-colors ${activeTab === "vincular" ? "border-indigo-600 text-indigo-600" : "border-transparent text-slate-500 hover:text-slate-700"}`}
        >
          Sou Funcionário (Vincular)
        </button>
        <button 
          onClick={() => { setActiveTab("cadastrar"); setStatus(""); }}
          className={`pb-3 text-sm font-medium border-b-2 transition-colors ${activeTab === "cadastrar" ? "border-indigo-600 text-indigo-600" : "border-transparent text-slate-500 hover:text-slate-700"}`}
        >
          Sou Gestor/RH (Cadastrar)
        </button>
      </div>

      {status && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-lg flex items-center gap-3">
          <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
          <p className="font-medium">{status}</p>
        </div>
      )}

      {activeTab === "vincular" && (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-indigo-100 p-3 rounded-lg text-indigo-600">
              <LinkIcon className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Vincular à Empresa</h2>
              <p className="text-sm text-slate-500">Insira o código fornecido pelo RH da sua empresa.</p>
            </div>
          </div>

          <form onSubmit={handleVincular} className="space-y-4 max-w-md">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Código da Empresa</label>
              <input type="text" required placeholder="Ex: EMP-12345" className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Seu Departamento</label>
              <select className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none bg-white">
                <option>Selecione...</option>
                <option>Marketing</option>
                <option>Vendas</option>
                <option>Serviços</option>
                <option>RH</option>
              </select>
            </div>
            <button type="submit" className="bg-indigo-600 text-white px-6 py-2.5 rounded-md font-medium hover:bg-indigo-700 transition-colors w-full">
              Vincular Minha Conta
            </button>
          </form>
        </div>
      )}

      {activeTab === "cadastrar" && (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-indigo-100 p-3 rounded-lg text-indigo-600">
              <Building2 className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Cadastrar Empresa</h2>
              <p className="text-sm text-slate-500">Crie o perfil da sua empresa e convide colaboradores.</p>
            </div>
          </div>

          <form onSubmit={handleCadastrar} className="space-y-4 max-w-md">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Nome da Empresa</label>
              <input type="text" required placeholder="Sua Empresa LTDA" className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">CNPJ</label>
              <input type="text" required placeholder="00.000.000/0000-00" className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Número de Colaboradores Estimado</label>
              <select className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none bg-white">
                <option>10 - 50</option>
                <option>51 - 200</option>
                <option>201 - 500</option>
                <option>Mais de 500</option>
              </select>
            </div>
            <button type="submit" className="bg-indigo-600 text-white px-6 py-2.5 rounded-md font-medium hover:bg-indigo-700 transition-colors w-full flex justify-center items-center gap-2">
              <Plus className="h-4 w-4" /> Cadastrar Empresa e Acessar Admin
            </button>
          </form>
          
          <div className="mt-6 p-4 bg-slate-50 rounded-lg text-sm text-slate-600">
            <p><strong>Nota:</strong> Ao cadastrar uma empresa, seu usuário receberá permissão de Administrador e o item "Painel Admin" ficará disponível no menu para acompanhar as estatísticas anonimizadas da equipe.</p>
          </div>
        </div>
      )}
    </div>
  );
}
