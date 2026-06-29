import { useEffect, useState } from "react";
import {
  AlertTriangle,
  AlertCircle,
  Info,
  CheckCircle2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { listarAlertas } from "../../api/api"; //

export function Alertas() {

  const [alertas, setAlertas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarAlertas();
  }, []);

  async function carregarAlertas() {
    try {
      const response = await listarAlertas();

      // O Spring Page retorna o conteúdo em response.content
      setAlertas(response.content);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function obterEstilo(tipo: string) {
    switch (tipo.toUpperCase()) {

      case "ALTO":
        return {
          icon: AlertTriangle,
          color: "text-red-600",
          bg: "bg-red-50",
          border: "border-red-200",
        };

      case "MODERADO":
        return {
          icon: AlertCircle,
          color: "text-amber-600",
          bg: "bg-amber-50",
          border: "border-amber-200",
        };

      default:
        return {
          icon: Info,
          color: "text-blue-600",
          bg: "bg-blue-50",
          border: "border-blue-200",
        };
    }
  }

  if (loading) {
    return <p>Carregando alertas...</p>;
  }

  return (
      <div className="space-y-6 max-w-4xl mx-auto">

        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Alertas de Risco
            </h1>

            <p className="text-slate-600">
              Avisos preventivos baseados nos seus padrões de hábitos.
            </p>
          </div>
        </header>

        <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">

          {alertas.map((alerta) => {

            const estilo = obterEstilo(alerta.tipo);
            const Icon = estilo.icon;

            return (

                <div
                    key={alerta.id}
                    className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
                >

                  <div
                      className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-white ${estilo.bg} ${estilo.color} shadow shrink-0 md:order-1`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>

                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-slate-200 bg-white shadow-sm flex flex-col">

                    <div className="flex justify-between mb-2">

                      <h3 className={`font-bold ${estilo.color}`}>
                        {alerta.tipo}
                      </h3>

                      <span className="text-xs text-slate-500">
                    {alerta.data}
                  </span>

                    </div>

                    <p className="text-sm text-slate-600 mb-4">
                      {alerta.descricao}
                    </p>

                    <div className="flex gap-3">

                      <Link
                          to="/dashboard/comparar"
                          className="text-xs font-medium bg-slate-100 hover:bg-slate-200 px-3 py-1 rounded"
                      >
                        Comparar Cenário
                      </Link>

                      {!alerta.visualizacao && (
                          <button className="text-xs text-indigo-600 flex items-center gap-1">
                            <CheckCircle2 className="h-3 w-3" />
                            Marcar visto
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