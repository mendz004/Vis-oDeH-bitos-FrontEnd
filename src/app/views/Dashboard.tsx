import { Activity, Heart, Moon, Zap, AlertTriangle, ChevronRight } from "lucide-react";
import { Link } from "react-router";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: 'Seg', score: 65 },
  { name: 'Ter', score: 68 },
  { name: 'Qua', score: 72 },
  { name: 'Qui', score: 70 },
  { name: 'Sex', score: 75 },
  { name: 'Sáb', score: 80 },
  { name: 'Dom', score: 78 },
];

export function Dashboard() {
  return (
    <div className="space-y-6">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Olá, Kauê</h1>
          <p className="text-slate-600">Aqui está o resumo da sua saúde hoje.</p>
        </div>
        <Link to="/dashboard/registrar" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 font-medium inline-flex items-center justify-center gap-2">
          <Activity className="h-4 w-4" /> Registrar Hábitos Hoje
        </Link>
      </header>

      {/* Top Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-500">Score de Saúde</span>
            <Heart className="h-5 w-5 text-indigo-500" />
          </div>
          <div className="text-3xl font-bold text-slate-900">78<span className="text-base font-normal text-slate-500">/100</span></div>
          <span className="text-xs text-emerald-600 mt-2 font-medium">+3 pts vs semana passada</span>
        </div>
        
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-500">Qualidade do Sono</span>
            <Moon className="h-5 w-5 text-indigo-500" />
          </div>
          <div className="text-3xl font-bold text-slate-900">6.5<span className="text-base font-normal text-slate-500">h</span></div>
          <span className="text-xs text-amber-600 mt-2 font-medium">Abaixo da recomendação (8h)</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-500">Nível de Energia</span>
            <Zap className="h-5 w-5 text-indigo-500" />
          </div>
          <div className="text-3xl font-bold text-slate-900">Bom</div>
          <span className="text-xs text-slate-500 mt-2 font-medium">Estável desde ontem</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-red-200 bg-red-50 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-red-700">Risco Projetado</span>
            <AlertTriangle className="h-5 w-5 text-red-500" />
          </div>
          <div className="text-xl font-bold text-red-900">Atenção Moderada</div>
          <span className="text-xs text-red-700 mt-2 font-medium">Cardiovascular em 5 anos</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm lg:col-span-2">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Tendência do Score de Saúde (Últimos 7 dias)</h2>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs key="defs">
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid key="grid" strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis key="xaxis" dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis key="yaxis" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip key="tooltip" 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Area key="area" type="monotone" dataKey="score" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Actions & Alerts */}
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center justify-between">
              Recomendações <span className="bg-indigo-100 text-indigo-700 text-xs px-2 py-1 rounded-full">2 Novas</span>
            </h2>
            <div className="space-y-3">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                <h3 className="text-sm font-bold text-slate-800">Aumentar horas de sono</h3>
                <p className="text-xs text-slate-600 mt-1">Tente dormir 30 min mais cedo hoje. Seu sono está abaixo da média.</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                <h3 className="text-sm font-bold text-slate-800">Caminhada Leve</h3>
                <p className="text-xs text-slate-600 mt-1">20 minutos de caminhada hoje reduzem seu risco cardiovascular projetado.</p>
              </div>
            </div>
            <Link to="/dashboard/recomendacoes" className="mt-4 text-sm text-indigo-600 font-medium flex items-center hover:text-indigo-700">
              Ver todas <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-4">Hábitos Recentes</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-800">Salada no almoço</p>
                  <p className="text-xs text-slate-500">Hoje, 12:30</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-800">Sono de 6h</p>
                  <p className="text-xs text-slate-500">Hoje, 07:00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
