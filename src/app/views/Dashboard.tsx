import { useEffect, useState } from "react";
import { Activity, Heart, Moon, Zap, AlertTriangle, ChevronRight, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const dataGraficoEstatico = [
  { name: 'Seg', score: 65 },
  { name: 'Ter', score: 68 },
  { name: 'Qua', score: 72 },
  { name: 'Qui', score: 70 },
  { name: 'Sex', score: 75 },
  { name: 'Sáb', score: 80 },
  { name: 'Dom', score: 78 },
];

export function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [dadosHoje, setDadosHoje] = useState<any>(null);
  const [nomeUsuario, setNomeUsuario] = useState("Usuário");

  useEffect(() => {
    // Simulação pura, sem nenhuma chamada de API externa
    const nomeSalvo = localStorage.getItem("usuarioNome") || localStorage.getItem("nome") || "Kauê";
    setNomeUsuario(nomeSalvo.split(" ")[0]);

    setDadosHoje({
      horasSono: 8,
      qualidadeSono: "Boa",
      aguaCopos: 10,
      exercicioDuracao: 60,
      exercicioTipo: "Caminhada"
    });
    setLoading(false);
  }, []);

  if (loading) return <div className="text-center p-10">Carregando...</div>;

  return (
    <div className="space-y-6">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Olá, {nomeUsuario}</h1>
          <p className="text-slate-600">Aqui está o resumo da sua saúde hoje.</p>
        </div>
        <Link to="/dashboard/registrar" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 font-medium inline-flex items-center justify-center gap-2">
          <Activity className="h-4 w-4" /> Registrar Hábitos Hoje
        </Link>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-500">Score de Saúde</span>
            <Heart className="h-5 w-5 text-indigo-500" />
          </div>
          <div className="text-3xl font-bold text-slate-900">78<span className="text-base font-normal text-slate-500">/100</span></div>
        </div>
        
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-500">Qualidade do Sono</span>
            <Moon className="h-5 w-5 text-indigo-500" />
          </div>
          <div className="text-3xl font-bold text-slate-900">{dadosHoje?.horasSono}h</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-500">Nível de Energia</span>
            <Zap className="h-5 w-5 text-indigo-500" />
          </div>
          <div className="text-3xl font-bold text-slate-900">Bom</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-red-200 bg-red-50 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-red-700">Risco Projetado</span>
            <AlertTriangle className="h-5 w-5 text-red-500" />
          </div>
          <div className="text-xl font-bold text-red-900">Atenção Moderada</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm lg:col-span-2">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Tendência do Score de Saúde (Últimos 7 dias)</h2>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dataGraficoEstatico}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="score" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.1} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-4">Recomendações</h2>
            <p className="text-xs text-slate-600">Tente dormir mais cedo hoje.</p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-4">Hábitos Registrados Hoje</h2>
            <p className="text-sm text-slate-800">{dadosHoje?.aguaCopos} copos de água registrados</p>
            <p className="text-sm text-slate-800">{dadosHoje?.exercicioDuracao} min de {dadosHoje?.exercicioTipo}</p>
          </div>
        </div>
      </div>
    </div>
  );
}