import { AlertTriangle, Info, AlertCircle, CheckCircle2 } from "lucide-react";
import { Link } from "react-router";

export function Alertas() {
  const alertas = [
    {
      id: 1,
      tipo: "alto",
      titulo: "Privação de Sono Crônica",
      descricao: "Você registrou menos de 6h de sono por 5 dias consecutivos. Isso aumenta significativamente o risco cardiovascular projetado a longo prazo.",
      data: "Hoje, 08:30",
      visto: false,
      icon: AlertTriangle,
      color: "text-red-600",
      bg: "bg-red-50",
      border: "border-red-200"
    },
    {
      id: 2,
      tipo: "moderado",
      titulo: "Tendência de Sedentarismo",
      descricao: "Nenhuma atividade física moderada registrada na última semana. O sedentarismo é um fator de risco modificável importante.",
      data: "Ontem, 18:00",
      visto: false,
      icon: AlertCircle,
      color: "text-amber-600",
      bg: "bg-amber-50",
      border: "border-amber-200"
    },
    {
      id: 3,
      tipo: "atencao",
      titulo: "Baixa ingestão de água",
      descricao: "Sua média de consumo de água está em 1L/dia, abaixo do recomendado para seu perfil.",
      data: "2 dias atrás",
      visto: true,
      icon: Info,
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-200"
    }
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Alertas de Risco</h1>
          <p className="text-slate-600">Avisos preventivos baseados nos seus padrões de hábitos.</p>
        </div>
      </header>

      <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
        {alertas.map((alerta) => {
          const Icon = alerta.icon;
          return (
            <div key={alerta.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-white ${alerta.bg} ${alerta.color} shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2`}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-slate-200 bg-white shadow-sm flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <h3 className={`font-bold ${alerta.color}`}>{alerta.titulo}</h3>
                  <span className="text-xs font-medium text-slate-400">{alerta.data}</span>
                </div>
                <p className="text-sm text-slate-600 mb-4">{alerta.descricao}</p>
                <div className="flex items-center gap-3 mt-auto">
                  <Link to="/dashboard/comparar" className="text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded transition-colors">
                    Comparar Cenário
                  </Link>
                  {!alerta.visto && (
                    <button className="text-xs font-medium text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3" /> Marcar visto
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
