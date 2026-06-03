import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Info } from "lucide-react";

const data1Year = [
  { month: 'Agora', atual: 15, projetado: 15 },
  { month: 'Mês 3', atual: 15, projetado: 14.5 },
  { month: 'Mês 6', atual: 15, projetado: 13.8 },
  { month: 'Mês 9', atual: 15, projetado: 13.2 },
  { month: '1 Ano', atual: 15, projetado: 12.5 },
];

const data5Years = [
  { year: 'Agora', atual: 15, projetado: 15 },
  { year: 'Ano 1', atual: 15, projetado: 12.5 },
  { year: 'Ano 2', atual: 15, projetado: 11.0 },
  { year: 'Ano 3', atual: 15, projetado: 9.5 },
  { year: 'Ano 4', atual: 15, projetado: 8.2 },
  { year: '5 Anos', atual: 15, projetado: 7.0 },
];

export function Projecao() {
  const [horizon, setHorizon] = useState("5y");
  
  const data = horizon === "1y" ? data1Year : data5Years;
  const xAxisKey = horizon === "1y" ? "month" : "year";

  return (
    <div className="space-y-6">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Minha Projeção</h1>
          <p className="text-slate-600">Simulação educacional do seu futuro com base nos hábitos atuais.</p>
        </div>
        <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200">
          <button onClick={() => setHorizon("1y")} className={`px-4 py-1.5 text-sm font-medium rounded-md ${horizon === '1y' ? 'bg-white shadow text-slate-900' : 'text-slate-600 hover:text-slate-900'}`}>1 Ano</button>
          <button onClick={() => setHorizon("5y")} className={`px-4 py-1.5 text-sm font-medium rounded-md ${horizon === '5y' ? 'bg-white shadow text-slate-900' : 'text-slate-600 hover:text-slate-900'}`}>5 Anos</button>
          <button onClick={() => setHorizon("10y")} className={`px-4 py-1.5 text-sm font-medium rounded-md ${horizon === '10y' ? 'bg-white shadow text-slate-900' : 'text-slate-600 hover:text-slate-900'}`}>10+ Anos</button>
        </div>
      </header>

      <div className="bg-indigo-50 border border-indigo-200 p-4 rounded-lg flex gap-3 text-indigo-800 text-sm">
        <Info className="h-5 w-5 text-indigo-600 shrink-0" />
        <p>Você tem menos de 7 dias registrados. A projeção atual baseia-se em dados limitados. Continue registrando para maior precisão!</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-6">Risco Cardiovascular Projetado (%)</h2>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid key="grid" strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis key="xaxis" dataKey={xAxisKey} tick={{fill: '#64748b', fontSize: 12}} axisLine={false} tickLine={false} />
                  <YAxis key="yaxis" tick={{fill: '#64748b', fontSize: 12}} axisLine={false} tickLine={false} />
                  <Tooltip key="tooltip" contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Legend key="legend" wrapperStyle={{ fontSize: '14px', paddingTop: '10px' }} />
                  <Line key="line1" type="monotone" name="Risco se manter hábitos atuais" dataKey="atual" stroke="#94a3b8" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                  <Line key="line2" type="monotone" name="Risco se adotar recomendações" dataKey="projetado" stroke="#10b981" strokeWidth={3} activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-slate-500 mt-4 italic">* Baseado no modelo Framingham simplificado para fins educativos.</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">IMC Projetado</h3>
            <div className="text-2xl font-bold text-slate-900 mb-1">26.5 <span className="text-base font-normal text-slate-500">→</span> 24.0</div>
            <p className="text-sm text-emerald-600 font-medium">Melhora esperada no período</p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Qualidade de Sono</h3>
            <div className="text-2xl font-bold text-slate-900 mb-1">Regular <span className="text-base font-normal text-slate-500">→</span> Excelente</div>
            <p className="text-sm text-emerald-600 font-medium">Baseado na higiene do sono</p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Energia Diária</h3>
            <div className="text-2xl font-bold text-slate-900 mb-1">Média <span className="text-base font-normal text-slate-500">→</span> Alta</div>
            <p className="text-sm text-emerald-600 font-medium">Aumento devido à atividade física</p>
          </div>
          
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm text-slate-600">
            <p className="font-medium text-slate-800 mb-1">Referências Científicas</p>
            <p className="text-xs">As estimativas são calculadas utilizando referências baseadas em guidelines da OMS, AHA e estudos populacionais.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
