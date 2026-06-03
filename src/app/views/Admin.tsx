import { Users, Activity, TrendingDown, Moon, AlertTriangle, ShieldCheck } from "lucide-react";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const sleepData = [
  { name: 'Jan', media: 6.2 },
  { name: 'Fev', media: 6.4 },
  { name: 'Mar', media: 6.5 },
  { name: 'Abr', media: 6.8 },
  { name: 'Mai', media: 7.1 },
];

const riskData = [
  { name: 'Marketing', alto: 4, moderado: 12, baixo: 25 },
  { name: 'Vendas', alto: 8, moderado: 15, baixo: 20 },
  { name: 'Engenharia', alto: 2, moderado: 8, baixo: 40 },
  { name: 'RH', alto: 1, moderado: 5, baixo: 15 },
];

export function Admin() {
  return (
    <div className="space-y-6">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Painel Corporativo</h1>
          <p className="text-slate-600">Visão agregada de saúde corporativa. Dados anonimizados.</p>
        </div>
        <div className="flex gap-2">
          <select className="px-3 py-2 border border-slate-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option>Todos Departamentos</option>
            <option>Marketing</option>
            <option>Vendas</option>
            <option>Serviços</option>
          </select>
          <select className="px-3 py-2 border border-slate-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option>Últimos 3 meses</option>
            <option>Últimos 6 meses</option>
            <option>Este ano</option>
          </select>
        </div>
      </header>

      <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-lg flex gap-3 text-emerald-800 text-sm">
        <ShieldCheck className="h-5 w-5 text-emerald-600 shrink-0" />
        <p><strong>Privacidade LGPD:</strong> Todos os dados apresentados neste painel são agregados e anonimizados. Segmentos com menos de 10 colaboradores estão agrupados para impedir a identificação individual.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-500">Total Colaboradores</span>
            <Users className="h-5 w-5 text-indigo-500" />
          </div>
          <div className="text-3xl font-bold text-slate-900">148</div>
          <span className="text-xs text-slate-500 mt-2 font-medium">92% de adesão</span>
        </div>
        
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-500">Score Médio da Empresa</span>
            <Activity className="h-5 w-5 text-indigo-500" />
          </div>
          <div className="text-3xl font-bold text-slate-900">72<span className="text-base font-normal text-slate-500">/100</span></div>
          <span className="text-xs text-emerald-600 mt-2 font-medium">+4 pts no semestre</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-500">Média de Sono</span>
            <Moon className="h-5 w-5 text-indigo-500" />
          </div>
          <div className="text-3xl font-bold text-slate-900">6.8<span className="text-base font-normal text-slate-500">h</span></div>
          <span className="text-xs text-amber-600 mt-2 font-medium">Atenção sugerida</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-500">Redução de Risco Projetado</span>
            <TrendingDown className="h-5 w-5 text-emerald-500" />
          </div>
          <div className="text-3xl font-bold text-slate-900">12%</div>
          <span className="text-xs text-emerald-600 mt-2 font-medium">Desde a implantação</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Evolução da Qualidade do Sono Média</h2>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sleepData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs key="defs">
                  <linearGradient id="colorSleep" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid key="grid" strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis key="xaxis" dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis key="yaxis" domain={[5, 8]} axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip key="tooltip" />
                <Area key="area" type="monotone" dataKey="media" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorSleep)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Distribuição de Risco Projetado por Departamento</h2>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={riskData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid key="grid" strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis key="xaxis" dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis key="yaxis" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip key="tooltip" cursor={{fill: 'transparent'}} />
                <Bar key="bar1" dataKey="alto" stackId="a" fill="#ef4444" name="Alto Risco" />
                <Bar key="bar2" dataKey="moderado" stackId="a" fill="#f59e0b" name="Moderado" />
                <Bar key="bar3" dataKey="baixo" stackId="a" fill="#10b981" name="Baixo Risco" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-900">Alertas Coletivos Frequentes</h2>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
            <div className="flex items-center gap-3">
              <div className="bg-amber-100 p-2 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="font-bold text-slate-800">Sedentarismo (Vendas)</p>
                <p className="text-xs text-slate-500">65% do departamento não atingiu a meta semanal.</p>
              </div>
            </div>
            <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700">Criar Campanha</button>
          </div>
          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
            <div className="flex items-center gap-3">
              <div className="bg-red-100 p-2 rounded-lg">
                <Moon className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="font-bold text-slate-800">Privação de Sono (Geral)</p>
                <p className="text-xs text-slate-500">Pico de alertas de sono ruim nas últimas duas semanas.</p>
              </div>
            </div>
            <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700">Criar Campanha</button>
          </div>
        </div>
      </div>
    </div>
  );
}
