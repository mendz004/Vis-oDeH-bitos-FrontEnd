import { Download, Link as LinkIcon, FileText, Calendar, Eye, Info } from "lucide-react";
import { useState } from "react";

export function Relatorios() {
  const [period, setPeriod] = useState("30d");

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">Relatórios e Exportação</h1>
        <p className="text-slate-600">Gere resumos em PDF ou links temporários para compartilhar com seu médico.</p>
      </header>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900 mb-4">Configurar Relatório</h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Período</label>
            <div className="flex gap-2">
              {['7d', '30d', '3m', '1y'].map((p) => (
                <button 
                  key={p}
                  onClick={() => setPeriod(p)}
                  className={`px-4 py-2 text-sm font-medium rounded-md border ${period === p ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                >
                  {p === '7d' ? '7 Dias' : p === '30d' ? '30 Dias' : p === '3m' ? '3 Meses' : '1 Ano'}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Seções a incluir</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="flex items-center gap-2 p-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
                <input type="checkbox" defaultChecked className="text-indigo-600 rounded" />
                <span className="text-sm font-medium text-slate-700">Resumo Geral de Saúde</span>
              </label>
              <label className="flex items-center gap-2 p-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
                <input type="checkbox" defaultChecked className="text-indigo-600 rounded" />
                <span className="text-sm font-medium text-slate-700">Gráficos de Tendência</span>
              </label>
              <label className="flex items-center gap-2 p-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
                <input type="checkbox" defaultChecked className="text-indigo-600 rounded" />
                <span className="text-sm font-medium text-slate-700">Histórico de Alertas</span>
              </label>
              <label className="flex items-center gap-2 p-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
                <input type="checkbox" className="text-indigo-600 rounded" />
                <span className="text-sm font-medium text-slate-700">Projeções a Longo Prazo</span>
              </label>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 flex flex-wrap gap-4">
            <button className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-md font-medium hover:bg-indigo-700 transition-colors">
              <Download className="h-4 w-4" /> Exportar PDF
            </button>
            <button className="flex items-center gap-2 bg-white text-slate-700 border border-slate-300 px-5 py-2.5 rounded-md font-medium hover:bg-slate-50 transition-colors">
              <LinkIcon className="h-4 w-4" /> Gerar Link Compartilhável
            </button>
            <button className="flex items-center gap-2 bg-white text-slate-700 border border-slate-300 px-5 py-2.5 rounded-md font-medium hover:bg-slate-50 transition-colors ml-auto">
              <Eye className="h-4 w-4" /> Pré-visualizar
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
