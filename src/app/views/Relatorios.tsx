import { Download, Link as LinkIcon, Eye, Info, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { baixarPdfBackend, gerarLinkBackend } from "../../api/api"; 

export function Relatorios() {
  const [period, setPeriod] = useState("30d");
  const [status, setStatus] = useState("");
  const [linkGerado, setLinkGerado] = useState(""); 

  const [secoes, setSecoes] = useState({
    resumoGeral: true,
    graficosTendencia: true,
    historicoAlertas: true,
    projecoesLongoPrazo: false,
  });

  const toggleSecao = (nomeDaSecao: keyof typeof secoes) => {
    setSecoes((prev) => ({
      ...prev,
      [nomeDaSecao]: !prev[nomeDaSecao],
    }));
  };

  const traduzirPeriodoParaJava = (p: string) => {
    switch (p) {
      case '7d': return "7_DIAS";
      case '30d': return "30_DIAS";
      case '3m': return "3_MESES";
      case '1y': return "1_ANO";
      default: return "30_DIAS";
    }
  };

  const traduzirSecoesParaJava = () => {
    const lista: string[] = [];
    if (secoes.resumoGeral) lista.push("RESUMO");
    if (secoes.graficosTendencia) lista.push("GRAFICOS");
    if (secoes.historicoAlertas) lista.push("ALERTAS");
    if (secoes.projecoesLongoPrazo) lista.push("PROJECOES");
    return lista;
  };

  const prepararDados = () => {
    const idSalvo = localStorage.getItem("usuarioId") || localStorage.getItem("usuarioid");
    return {
      usuarioId: Number(idSalvo),
      periodo: traduzirPeriodoParaJava(period),
      secoes: traduzirSecoesParaJava()
    };
  };

  const handleExportarPDF = async () => {
    setStatus("Gerando PDF... aguarde. Isso pode levar alguns segundos.");
    setLinkGerado("");
    const dados = prepararDados();
    
    if (!dados.usuarioId) {
      setStatus("Erro: Usuário não encontrado. Faça login novamente.");
      return;
    }

    try {
      const blob = await baixarPdfBackend(dados.usuarioId, dados.periodo, dados.secoes);
      
      const url = window.URL.createObjectURL(blob);
      const linkDownload = document.createElement('a');
      linkDownload.href = url;
      linkDownload.download = `relatorio-saude-${dados.periodo}.pdf`; 
      document.body.appendChild(linkDownload);
      linkDownload.click();
      linkDownload.remove();
      window.URL.revokeObjectURL(url); // Limpa a memória

      setStatus("PDF gerado e baixado com sucesso!");
    } catch (erro: any) {
      console.error("Erro ao gerar PDF:", erro);
      setStatus("Erro ao baixar o PDF. Tente novamente.");
    }
  };

  const handleGerarLink = async () => {
    setStatus("Gerando link seguro... aguarde.");
    setLinkGerado("");
    const dados = prepararDados();

    if (!dados.usuarioId) {
      setStatus("Erro: Usuário não encontrado.");
      return;
    }

    try {
      const resposta = await gerarLinkBackend(dados.usuarioId, dados.periodo, dados.secoes);
      
      const urlCompleta = `http://localhost:8080${resposta.linkCompartilhamento}`;
      
      setStatus("Link gerado com sucesso! Ele expirará em 72 horas.");
      setLinkGerado(urlCompleta);
    } catch (erro: any) {
      console.error("Erro ao gerar link:", erro);
      setStatus("Erro ao gerar o link. Tente novamente.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">Relatórios e Exportação</h1>
        <p className="text-slate-600">Gere resumos em PDF ou links temporários para compartilhar com seu médico.</p>
      </header>

      {/* Caixa de Mensagem de Status e Link */}
      {status && (
        <div className={`p-4 rounded-lg flex flex-col gap-2 border ${status.includes("Erro") ? "bg-red-50 border-red-200 text-red-800" : "bg-emerald-50 border-emerald-200 text-emerald-800"}`}>
          <div className="flex items-center gap-3">
            <CheckCircle2 className={`h-5 w-5 shrink-0 ${status.includes("Erro") ? "hidden" : "text-emerald-600"}`} />
            <p className="font-medium">{status}</p>
          </div>
          
          {/* Mostra o link copiável se tiver sido gerado */}
          {linkGerado && (
            <div className="ml-8 mt-1 p-3 bg-white rounded border border-emerald-200 flex items-center justify-between">
              <span className="text-sm font-mono text-slate-600 truncate mr-4">{linkGerado}</span>
              <button 
                onClick={() => navigator.clipboard.writeText(linkGerado)}
                className="text-sm font-medium text-emerald-700 hover:text-emerald-800"
              >
                Copiar
              </button>
            </div>
          )}
        </div>
      )}

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900 mb-4">Configurar Relatório</h2>
        
        <div className="space-y-6">
          {/* Seção de Período */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Período</label>
            <div className="flex gap-2">
              {['7d', '30d', '3m', '1y'].map((p) => (
                <button 
                  key={p}
                  onClick={() => setPeriod(p)}
                  className={`px-4 py-2 text-sm font-medium rounded-md border transition-colors ${period === p ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                >
                  {p === '7d' ? '7 Dias' : p === '30d' ? '30 Dias' : p === '3m' ? '3 Meses' : '1 Ano'}
                </button>
              ))}
            </div>
          </div>

          {/* Seções a Incluir */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Seções a incluir</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="flex items-center gap-2 p-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors">
                <input type="checkbox" checked={secoes.resumoGeral} onChange={() => toggleSecao('resumoGeral')} className="text-indigo-600 rounded" />
                <span className="text-sm font-medium text-slate-700">Resumo Geral de Saúde</span>
              </label>
              <label className="flex items-center gap-2 p-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors">
                <input type="checkbox" checked={secoes.graficosTendencia} onChange={() => toggleSecao('graficosTendencia')} className="text-indigo-600 rounded" />
                <span className="text-sm font-medium text-slate-700">Gráficos de Tendência</span>
              </label>
              <label className="flex items-center gap-2 p-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors">
                <input type="checkbox" checked={secoes.historicoAlertas} onChange={() => toggleSecao('historicoAlertas')} className="text-indigo-600 rounded" />
                <span className="text-sm font-medium text-slate-700">Histórico de Alertas</span>
              </label>
              <label className="flex items-center gap-2 p-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors">
                <input type="checkbox" checked={secoes.projecoesLongoPrazo} onChange={() => toggleSecao('projecoesLongoPrazo')} className="text-indigo-600 rounded" />
                <span className="text-sm font-medium text-slate-700">Projeções a Longo Prazo</span>
              </label>
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="pt-4 border-t border-slate-200 flex flex-wrap gap-4">
            <button onClick={handleExportarPDF} className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-md font-medium hover:bg-indigo-700 transition-colors">
              <Download className="h-4 w-4" /> Exportar PDF
            </button>
            <button onClick={handleGerarLink} className="flex items-center gap-2 bg-white text-slate-700 border border-slate-300 px-5 py-2.5 rounded-md font-medium hover:bg-slate-50 transition-colors">
              <LinkIcon className="h-4 w-4" /> Gerar Link Compartilhável
            </button>
          </div>
        </div>
      </div>

      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm text-slate-600 flex gap-3">
        <Info className="h-5 w-5 text-slate-400 shrink-0" />
        <div>
          <p className="font-medium text-slate-800 mb-1">Privacidade de Dados</p>
          <p>Os links compartilháveis expiram automaticamente após 72 horas para proteger seus dados de saúde em conformidade com a LGPD.</p>
        </div>
      </div>
    </div>
  );
}