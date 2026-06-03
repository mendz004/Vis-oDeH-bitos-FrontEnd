import { useState } from "react";
import { ArrowRight, Activity, TrendingDown } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

export function Comparar() {
  const [sleep, setSleep] = useState(6);
  const [exercise, setExercise] = useState(0);

  // Simple mock calculation
  const currentRisk = 18; // base risk
  const simulatedRisk = Math.max(5, currentRisk - (sleep - 6) * 1.5 - (exercise / 30) * 2);

  const data = [
    { name: "Risco Cardiovascular %", Atual: currentRisk, Simulado: Number(simulatedRisk.toFixed(1)) }
  ];

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">Comparar Cenários</h1>
        <p className="text-slate-600">Altere seus hábitos à direita e veja o impacto instantâneo na sua saúde projetada.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Coluna Esquerda - Cenário Atual */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm opacity-90">
          <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-slate-400"></span>
            Cenário Atual
          </h2>
          
          <div className="space-y-6">
            <div>
              <p className="text-sm font-medium text-slate-500 mb-1">Sono Diário</p>
              <p className="text-xl font-bold text-slate-800">6 horas</p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 mb-1">Exercício Físico</p>
              <p className="text-xl font-bold text-slate-800">0 min / semana</p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 mb-1">Alimentação</p>
              <p className="text-xl font-bold text-slate-800">Regular</p>
            </div>
          </div>
        </div>

        {/* Coluna Direita - Cenário Simulado */}
        <div className="bg-white p-6 rounded-xl border-2 border-indigo-500 shadow-md">
          <h2 className="text-lg font-bold text-indigo-700 mb-4 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-indigo-500 animate-pulse"></span>
            Cenário Simulado
          </h2>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-1">
                <label className="text-sm font-medium text-slate-700">Sono Diário</label>
                <span className="text-sm font-bold text-indigo-600">{sleep} horas</span>
              </div>
              <input 
                type="range" 
                min="4" max="10" step="0.5" 
                value={sleep} 
                onChange={(e) => setSleep(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <label className="text-sm font-medium text-slate-700">Exercício (min/sem)</label>
                <span className="text-sm font-bold text-indigo-600">{exercise} min</span>
              </div>
              <input 
                type="range" 
                min="0" max="300" step="15" 
                value={exercise} 
                onChange={(e) => setExercise(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>

            <button className="w-full py-2 bg-indigo-100 text-indigo-700 font-medium rounded-md hover:bg-indigo-200 transition-colors mt-4">
              Salvar como Meta de Hábitos
            </button>
          </div>
        </div>
      </div>

      {/* Resultados da Comparação */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mt-8">
        <h2 className="text-xl font-bold text-slate-900 mb-6">Impacto Estimado em 5 Anos</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid key="grid" strokeDasharray="3 3" vertical={false} />
                <XAxis key="xaxis" dataKey="name" />
                <YAxis key="yaxis" />
                <Tooltip key="tooltip" cursor={{fill: 'transparent'}} />
                <Legend key="legend" />
                <Bar key="bar1" dataKey="Atual" fill="#94a3b8" radius={[4, 4, 0, 0]} barSize={50} />
                <Bar key="bar2" dataKey="Simulado" fill="#4f46e5" radius={[4, 4, 0, 0]} barSize={50} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="space-y-4">
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <TrendingDown className="h-5 w-5 text-emerald-600" />
                <h3 className="font-bold text-emerald-900">Redução de Risco</h3>
              </div>
              <p className="text-sm text-emerald-800">
                Ao adotar o cenário simulado, você pode reduzir seu risco cardiovascular de <strong>{currentRisk}%</strong> para <strong>{simulatedRisk.toFixed(1)}%</strong> em 5 anos.
              </p>
            </div>
            
            <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="h-5 w-5 text-indigo-600" />
                <h3 className="font-bold text-indigo-900">Ganhos Adicionais Estimados</h3>
              </div>
              <ul className="text-sm text-indigo-800 list-disc pl-5 space-y-1">
                {sleep > 7 && <li>Melhora significativa na recuperação muscular e cognitiva.</li>}
                {exercise > 150 && <li>Aumento substancial da capacidade respiratória.</li>}
                {(sleep <= 7 && exercise <= 150) && <li>Ajuste os controles acima para ver mais ganhos!</li>}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
