import {
  Lightbulb,
  TrendingUp,
  ChevronRight,
  Activity,
  Moon,
  Utensils,
} from "lucide-react";
import { useEffect, useState } from "react";
import { buscarRecomendacoes, Recomendacao } from "../../api/api";

export function Recomendacoes() {
  const [recomendacoes, setRecomendacoes] = useState<Recomendacao[]>([]);
  const [loading, setLoading] = useState(true);

  const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");

  useEffect(() => {
    async function carregar() {
      try {
        const data = await buscarRecomendacoes(usuario.id);
        setRecomendacoes(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    if (usuario?.id) carregar();
  }, []);

  function iconePorCategoria(categoria: string) {
    switch (categoria.toLowerCase()) {
      case "sono":
        return Moon;
      case "exercicio":
        return Activity;
      case "alimentacao":
        return Utensils;
      default:
        return Lightbulb;
    }
  }

  function corPrioridade(prioridade: string) {
    switch (prioridade) {
      case "ALTA":
        return "bg-red-100 text-red-700";
      case "MEDIA":
        return "bg-amber-100 text-amber-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  }

  if (loading) {
    return <p className="p-6 text-slate-600">Carregando recomendações...</p>;
  }

  return (
      <div className="space-y-6">
        <header>
          <h1 className="text-2xl font-bold text-slate-900">
            Recomendações Personalizadas
          </h1>
          <p className="text-slate-600">
            Ações baseadas nos seus hábitos reais.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recomendacoes.map((rec, index) => {
            const Icon = iconePorCategoria(rec.categoria);

            return (
                <div
                    key={index}
                    className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col hover:border-indigo-300 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-indigo-600">
                      <Icon className="h-5 w-5" />
                      <span className="font-bold text-sm">
                    {rec.categoria}
                  </span>
                    </div>

                    <span
                        className={`text-xs px-2 py-1 rounded font-bold ${corPrioridade(
                            rec.prioridade
                        )}`}
                    >
                  {rec.prioridade}
                </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                    {rec.titulo}
                  </h3>

                  <p className="text-sm text-slate-600 mb-4 flex-1">
                    {rec.descricao}
                  </p>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-sm">
                <span className="text-slate-500 font-medium flex items-center gap-1">
                  <TrendingUp className="h-4 w-4 text-emerald-500" />
                  {rec.impacto} impacto
                </span>

                    <span className="text-indigo-600 font-medium flex items-center">
                  Detalhes <ChevronRight className="h-4 w-4" />
                </span>
                  </div>
                </div>
            );
          })}
        </div>
      </div>
  );
}