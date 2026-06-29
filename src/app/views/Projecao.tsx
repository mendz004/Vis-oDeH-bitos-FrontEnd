import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Info } from "lucide-react";

import { buscarMinhaProjecao } from "../../api/api";

type Projecao = {
  data: string;
  atual: number;
  projetado: number;
  imc?: number;
  sono?: string;
  energia?: string;
};

export function Projecao() {
  const [horizon, setHorizon] = useState<"1y" | "5y" | "10y">("5y");
  const [dados, setDados] = useState<Projecao[]>([]);
  const [loading, setLoading] = useState(true);

  const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");

  useEffect(() => {
    async function carregar() {
      try {
        const response = await buscarMinhaProjecao(usuario.id);

        // backend pode retornar lista direta ou dentro de content
        const data = response.content ?? response;

        setDados(data);
      } catch (err) {
        console.error("Erro ao carregar projeção:", err);
      } finally {
        setLoading(false);
      }
    }

    if (usuario?.id) {
      carregar();
    }
  }, []);

  if (loading) {
    return <p className="p-6 text-slate-600">Carregando projeção...</p>;
  }

  const dataFiltrada =
      horizon === "1y"
          ? dados.slice(0, 5)
          : horizon === "5y"
              ? dados.slice(0, 6)
              : dados;

  return (
      <div className="space-y-6">
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Minha Projeção
            </h1>
            <p className="text-slate-600">
              Simulação baseada nos seus hábitos reais.
            </p>
          </div>

          <div className="flex bg-slate-100 p-1 rounded-lg border">
            {["1y", "5y", "10y"].map((h) => (
                <button
                    key={h}
                    onClick={() => setHorizon(h as any)}
                    className={`px-4 py-1.5 text-sm font-medium rounded-md ${
                        horizon === h
                            ? "bg-white shadow text-slate-900"
                            : "text-slate-600"
                    }`}
                >
                  {h === "1y" ? "1 Ano" : h === "5y" ? "5 Anos" : "10+ Anos"}
                </button>
            ))}
          </div>
        </header>

        <div className="bg-indigo-50 border border-indigo-200 p-4 rounded-lg flex gap-3 text-indigo-800 text-sm">
          <Info className="h-5 w-5 text-indigo-600 shrink-0" />
          <p>
            Projeção baseada nos seus hábitos registrados no sistema.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* GRÁFICO */}
          <div className="lg:col-span-2 bg-white p-6 rounded-xl border shadow-sm">
            <h2 className="text-lg font-bold mb-6">
              Risco Cardiovascular Projetado (%)
            </h2>

            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dataFiltrada}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="data" />
                  <YAxis />
                  <Tooltip />
                  <Legend />

                  <Line
                      type="monotone"
                      dataKey="atual"
                      name="Atual"
                      stroke="#94a3b8"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                  />

                  <Line
                      type="monotone"
                      dataKey="projetado"
                      name="Projetado"
                      stroke="#10b981"
                      strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* CARDS LATERAIS */}
          <div className="space-y-4">
            <div className="bg-white p-5 rounded-xl border shadow-sm">
              <h3 className="text-sm font-bold text-slate-500 uppercase">
                IMC Projetado
              </h3>

              <div className="text-2xl font-bold text-slate-900">
                {dataFiltrada[0]?.imc ?? "--"}
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border shadow-sm">
              <h3 className="text-sm font-bold text-slate-500 uppercase">
                Qualidade de Sono
              </h3>

              <div className="text-lg font-bold">
                {dataFiltrada[0]?.sono ?? "--"}
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border shadow-sm">
              <h3 className="text-sm font-bold text-slate-500 uppercase">
                Energia
              </h3>

              <div className="text-lg font-bold">
                {dataFiltrada[0]?.energia ?? "--"}
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border text-xs text-slate-600">
              Baseado em dados reais do usuário.
            </div>
          </div>
        </div>
      </div>
  );
}