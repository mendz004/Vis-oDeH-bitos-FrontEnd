import { Lightbulb, TrendingUp, ChevronRight, Activity, Moon, Utensils } from "lucide-react";

export function Recomendacoes() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">Recomendações Personalizadas</h1>
        <p className="text-slate-600">Ações práticas priorizadas pelo impacto estimado na sua saúde.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col hover:border-indigo-300 transition-colors cursor-pointer group">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-indigo-600">
              <Moon className="h-5 w-5" />
              <span className="font-bold text-sm">Sono</span>
            </div>
            <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded font-bold">Alta Prioridade</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">Adicionar 1 hora de sono</h3>
          <p className="text-sm text-slate-600 mb-4 flex-1">Seu histórico mostra média de 6h. Aumentar para 7h pode reduzir seu risco projetado em até 12%.</p>
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-sm">
            <span className="text-slate-500 font-medium flex items-center gap-1"><TrendingUp className="h-4 w-4 text-emerald-500" /> Alto Impacto</span>
            <span className="text-indigo-600 font-medium flex items-center">Como fazer <ChevronRight className="h-4 w-4" /></span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col hover:border-indigo-300 transition-colors cursor-pointer group">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-indigo-600">
              <Activity className="h-5 w-5" />
              <span className="font-bold text-sm">Exercício</span>
            </div>
            <span className="bg-amber-100 text-amber-700 text-xs px-2 py-1 rounded font-bold">Média Prioridade</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">Caminhada de 20min</h3>
          <p className="text-sm text-slate-600 mb-4 flex-1">Iniciar com 3x na semana melhora indicadores cardiovasculares e disposição diária.</p>
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-sm">
            <span className="text-slate-500 font-medium flex items-center gap-1"><TrendingUp className="h-4 w-4 text-emerald-500" /> Médio Impacto</span>
            <span className="text-indigo-600 font-medium flex items-center">Ver plano <ChevronRight className="h-4 w-4" /></span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col hover:border-indigo-300 transition-colors cursor-pointer group">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-indigo-600">
              <Utensils className="h-5 w-5" />
              <span className="font-bold text-sm">Alimentação</span>
            </div>
            <span className="bg-slate-100 text-slate-700 text-xs px-2 py-1 rounded font-bold">Manutenção</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">Manter hidratação</h3>
          <p className="text-sm text-slate-600 mb-4 flex-1">Você bateu a meta de água nos últimos 3 dias. Continue com 2.5L diários.</p>
          <div className="w-full bg-slate-100 rounded-full h-2 mb-4">
            <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '100%' }}></div>
          </div>
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-sm">
            <span className="text-emerald-600 font-bold flex items-center gap-1">Hábito Consolidado</span>
          </div>
        </div>
      </div>
    </div>
  );
}
