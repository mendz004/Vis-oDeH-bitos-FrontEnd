import { useEffect, useState } from "react";
import { Activity, TrendingDown, ArrowRight } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import { compararProjecao } from "../../api/api"; // ajuste o path

type Comparacao = {
  riscoAtual: number;
  riscoIdeal: number;
  diferenca: number;
  mensagem: string;
};

export function Comparar() {
  const [comparacao, setComparacao] = useState<Comparacao | null>(null);
  const [loading, setLoading] = useState(true);

  const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");

  useEffect(() => {
    async function carregar() {
      try {
        const data = await compararProjecao(usuario.id);
        setComparacao(data);
      } catch (err) {
        console.error("Erro ao carregar comparação:", err);
      } finally {
        setLoading(false);
      }
    }

    if (usuario?.id) {
      carregar();
    }
  }, []);

  if (loading) {
    return (
        <div className="p-6 text-slate-600">
          Carregando comparação de cenários...
        </div>
    );
  }

  if (!comparacao) {
    return (
        <div className="p-6 text-red-600">
          Não foi possível carregar a comparação.
        </div>
    );
  }

  const data = [
    {
      name: "Risco Cardiovascular %",
      Atual: comparacao.riscoAtual,
      Simulado: comparacao.riscoIdeal,
    },
  ];

  return (
      <div className="space-y-6">
        <header>
          <h1 className="text-2xl font-bold text-slate-900">
            Comparar Cenários
          </h1>
          <p className="text-slate-600">
            Veja o impacto dos seus hábitos na saúde projetada.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Atual */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-4">
              Cenário Atual
            </h2>

            <p className="text-3xl font-bold text-slate-800">
              {comparacao.riscoAtual}%
            </p>

            <p className="text-sm text-slate-500 mt-2">
              Risco cardiovascular atual baseado nos seus hábitos registrados.
            </p>
          </div>

          {/* Simulado */}
          <div className="bg-white p-6 rounded-xl border-2 border-indigo-500 shadow-md">
            <h2 className="text-lg font-bold text-indigo-700 mb-4">
              Cenário Ideal
            </h2>

            <p className="text-3xl font-bold text-indigo-600">
              {comparacao.riscoIdeal}%
            </p>

            <p className="text-sm text-slate-500 mt-2">
              Projeção caso você adote hábitos mais saudáveis.
            </p>
          </div>
        </div>

        {/* Gráfico */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h2 className="text-xl font-bold mb-6">
            Impacto da Mudança de Hábitos
          </h2>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Atual" fill="#94a3b8" />
                <Bar dataKey="Simulado" fill="#4f46e5" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Mensagem do backend */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown className="h-5 w-5 text-emerald-600" />
              <h3 className="font-bold text-emerald-900">
                Diferença de Risco
              </h3>
            </div>

            <p className="text-sm text-emerald-800">
              Você pode reduzir seu risco em{" "}
              <strong>{comparacao.diferenca}%</strong> ao melhorar seus hábitos.
            </p>
          </div>

          <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="h-5 w-5 text-indigo-600" />
              <h3 className="font-bold text-indigo-900">Análise</h3>
            </div>

            <p className="text-sm text-indigo-800">
              {comparacao.mensagem}
            </p>
          </div>
        </div>
      </div>
  );
}