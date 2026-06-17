import { FormEvent, useState } from "react";
import { Building2, Plus, Link as LinkIcon, CheckCircle2 } from "lucide-react";
import { vincularFuncionario, cadastrarEmpresa } from "../../api/api";

export function VincularEmpresa() {
  const [activeTab, setActiveTab] = useState("vincular");
  const [status, setStatus] = useState("");

  const [codigoEmpresa, setCodigoEmpresa] = useState("");
  const [departamento, setDepartamento] = useState("");

  const [nomeEmpresa, setNomeEmpresa] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [quantidadeColaboradores, setQuantidadeColaboradores] = useState("10 - 50");

  const handleVincular = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("Vinculando... aguarde.");

    try {
      // 💡 Pega diretamente o ID salvo no Local Storage
      const idSalvo = localStorage.getItem("usuarioId"); 
      
      if (!idSalvo) {
        setStatus("Erro: Usuário não encontrado. Faça login novamente.");
        return;
      }

      // Converte o id de texto para número
      const usuarioId = Number(idSalvo); 

      await vincularFuncionario(codigoEmpresa, departamento, usuarioId);

      setStatus("Sua conta foi vinculada à empresa com sucesso!");
      setCodigoEmpresa("");
      setDepartamento("");
    } catch (erro: any) {
      console.error("Erro ao vincular:", erro);
      setStatus(erro.message || "Erro ao vincular conta. Verifique os dados.");
    }
  };

  const handleCadastrar = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Cadastrando empresa... aguarde.");

    try {
      // 💡 Pega diretamente o ID salvo no Local Storage aqui também
      const idSalvo = localStorage.getItem("usuarioId"); 
      
      if (!idSalvo) {
        setStatus("Erro: Usuário não encontrado. Faça login novamente.");
        return;
      }

      const usuarioId = Number(idSalvo); 

      const resposta = await cadastrarEmpresa(nomeEmpresa, cnpj, usuarioId);

      const codigoDaEmpresa = resposta.codigoAcesso || "ERRO-AO-CARREGAR-CODIGO";

      setStatus(`Empresa cadastrada com sucesso! O código para seus funcionários se vincularem é: ${codigoDaEmpresa}`);
      
      localStorage.setItem("isGestor", "true");
      window.dispatchEvent(new Event("storage"));

      setNomeEmpresa("");
      setCnpj("");
    } catch (erro: any) {
      console.error("Erro ao cadastrar empresa:", erro);
      setStatus(erro.message || "Erro ao cadastrar empresa. Verifique os dados e tente novamente.");
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
          {/* ... cabeçalho do vincular ... */}
          <form onSubmit={handleVincular} className="space-y-4 max-w-md mt-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Código da Empresa</label>
              <input 
                type="text" 
                required 
                value={codigoEmpresa}
                onChange={(e) => setCodigoEmpresa(e.target.value)}
                placeholder="Ex: EMP-12345" 
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Seu Departamento</label>
              <select 
                value={departamento}
                onChange={(e) => setDepartamento(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
              >
                <option value="">Selecione...</option>
                <option value="Marketing">Marketing</option>
                <option value="Vendas">Vendas</option>
                <option value="Serviços">Serviços</option>
                <option value="RH">RH</option>
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
          {/* ... cabeçalho do cadastrar ... */}
          <form onSubmit={handleCadastrar} className="space-y-4 max-w-md mt-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Nome da Empresa</label>
              <input 
                type="text" 
                required 
                value={nomeEmpresa}
                onChange={(e) => setNomeEmpresa(e.target.value)}
                placeholder="Sua Empresa LTDA" 
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">CNPJ</label>
              <input 
                type="text" 
                required 
                value={cnpj}
                onChange={(e) => setCnpj(e.target.value)}
                placeholder="00.000.000/0000-00" 
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Número de Colaboradores Estimado</label>
              <select 
                value={quantidadeColaboradores}
                onChange={(e) => setQuantidadeColaboradores(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
              >
                <option value="10 - 50">10 - 50</option>
                <option value="51 - 200">51 - 200</option>
                <option value="201 - 500">201 - 500</option>
                <option value="Mais de 500">Mais de 500</option>
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