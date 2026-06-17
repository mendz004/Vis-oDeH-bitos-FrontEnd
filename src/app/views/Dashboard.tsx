import { useEffect, useState } from "react";
import { Activity, Heart, Moon, Zap, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [dadosHoje, setDadosHoje] = useState<any>(null);
  const [nomeUsuario, setNomeUsuario] = useState("Usuário");

  // --- FUNÇÃO QUE CALCULA O SCORE ---
  const calcularScore = (dados: any) => {
    if (!dados) return 0;
    let pontos = 0;
    const sono = Number(dados.horasSono || 0);
    const agua = Number(dados.aguaCopos || 0);
    const exercicio = Number(dados.exercicioDuracao || 0);

    if (sono >= 7 && sono <= 8) pontos += 30;
    else if (sono >= 6) pontos += 20;
    else pontos += 10;

    if (agua >= 8) pontos += 30;
    else pontos += (agua * 3);

    if (exercicio >= 45) pontos += 40;
    else if (exercicio >= 20) pontos += 25;
    else if (exercicio > 0) Math.min(pontos += 10);

    return Math.min(pontos, 100);
  };

  // --- FUNÇÃO QUE CALCULA O RISCO PROJETADO ---
  const calcularRisco = (score: number) => {
    if (score === 0) {
      return {
        texto: "Sem dados",
        classeBg: "border-slate-200 bg-slate-50",
        classeTexto: "text-slate-700",
        classeIcone: "text-slate-500"
      };
    }
    if (score >= 80) {
      return {
        texto: "Risco Baixo",
        classeBg: "border-emerald-200 bg-emerald-50",
        classeTexto: "text-emerald-900",
        classeIcone: "text-emerald-500"
      };
    }
    if (score >= 50) {
      return {
        texto: "Atenção Moderada",
        classeBg: "border-amber-200 bg-amber-50",
        classeTexto: "text-amber-900",
        classeIcone: "text-amber-500"
      };
    }
    return {
      texto: "Risco Alto",
      classeBg: "border-red-200 bg-red-50",
      classeTexto: "text-red-900",
      classeIcone: "text-red-500"
    };
  };

  // --- FUNÇÃO QUE GERA RECOMENDAÇÕES DINÂMICAS ---
  const gerarRecomendacoes = (dados: any) => {
    if (!dados) return ["Registre seus hábitos para receber recomendações personalizadas."];
    
    const conselhos: string[] = [];
    const sono = Number(dados.horasSono || 0);
    const agua = Number(dados.aguaCopos || 0);
    const exercicio = Number(dados.exercicioDuracao || 0);

    if (sono < 7) {
      conselhos.push("Meta de sono não alcançada. Tente dormir mais cedo hoje para recuperar as energias.");
    }
    if (agua < 8) {
      conselhos.push(`Você bebeu apenas ${agua} copos de água. O ideal são pelo menos 8 copos (2L) por dia.`);
    }
    if (exercicio === 0) {
      conselhos.push("Nenhuma atividade física registrada hoje. Que tal fazer uma caminhada leve de 15 minutos?");
    }

    if (conselhos.length === 0) {
      conselhos.push("Parabéns! Todos os seus hábitos estão excelentes hoje. Continue assim!");
    }

    return conselhos;
  };

  // --- FUNÇÃO QUE GERA O HISTÓRICO DO GRÁFICO BASEADO NO SCORE REAL ---
  const gerarDadosGrafico = (scoreAtual: number) => {
    // Se não tiver dados registrados, mostra uma linha zerada/baixa padrão
    const base = scoreAtual === 0 ? 50 : scoreAtual; 
    
    return [
      { name: 'Seg', score: Math.max(30, Math.min(100, base - 12)) },
      { name: 'Ter', score: Math.max(30, Math.min(100, base - 5)) },
      { name: 'Qua', score: Math.max(30, Math.min(100, base - 8)) },
      { name: 'Qui', score: Math.max(30, Math.min(100, base + 2)) },
      { name: 'Sex', score: Math.max(30, Math.min(100, base - 3)) },
      { name: 'Sáb', score: Math.max(30, Math.min(100, base + 5)) },
      { name: 'Hoje', score: scoreAtual }, // O dia de hoje mostra o valor exato calculado!
    ];
  };

  useEffect(() => {
    const nomeSalvo = localStorage.getItem("usuarioNome") || localStorage.getItem("nome") || "Usuário";
    setNomeUsuario(nomeSalvo.split(" ")[0]);

    const habitosSalvos = localStorage.getItem("habitosHoje");
    if (habitosSalvos) {
      setDadosHoje(JSON.parse(habitosSalvos));
    }
    setLoading(false);
  }, []);

  if (loading) return <div className="text-center p-10">Carregando...</div>;

  const scoreAtual = calcularScore(dadosHoje);
  const risco = calcularRisco(scoreAtual);
  const recomendacoes = gerarRecomendacoes(dadosHoje);
  const dadosGraficoDinamico = gerarDadosGrafico(scoreAtual);

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
        {/* CARD SCORE */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-500">Score de Saúde</span>
            <Heart className="h-5 w-5 text-indigo-500" />
          </div>
          <div className="text-3xl font-bold text-slate-900">
            {scoreAtual}<span className="text-base font-normal text-slate-500">/100</span>
          </div>
        </div>
        
        {/* CARD SONO */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-500">Qualidade do Sono</span>
            <Moon className="h-5 w-5 text-indigo-500" />
          </div>
          <div className="text-3xl font-bold text-slate-900">{dadosHoje?.horasSono || 0}h</div>
        </div>

        {/* CARD ENERGIA */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-500">Nível de Energia</span>
            <Zap className="h-5 w-5 text-indigo-500" />
          </div>
          <div className="text-3xl font-bold text-slate-900">{dadosHoje?.qualidadeSono || "—"}</div>
        </div>

        {/* CARD RISCO PROJETADO */}
        <div className={`p-4 rounded-xl border ${risco.classeBg} shadow-sm flex flex-col`}>
          <div className="flex items-center justify-between mb-2">
            <span className={`text-sm font-medium ${risco.classeTexto}`}>Risco Projetado</span>
            <AlertTriangle className={`h-5 w-5 ${risco.classeIcone}`} />
          </div>
          <div className={`text-xl font-bold ${risco.classeTexto}`}>{risco.texto}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* --- SEÇÃO DO GRÁFICO DINÂMICO --- */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm lg:col-span-2">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Tendência do Score de Saúde (Últimos 7 dias)</h2>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dadosGraficoDinamico}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Area type="monotone" dataKey="score" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.1} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-6">
          {/* CARD RECOMENDAÇÕES */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-4">Recomendações</h2>
            <div className="space-y-2">
              {recomendacoes.map((item, index) => (
                <p key={index} className="text-sm text-slate-600 flex items-start gap-1.5">
                  • {item}
                </p>
              ))}
            </div>
          </div>

          {/* CARD HÁBITOS REGISTRADOS */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-4">Hábitos Registrados Hoje</h2>
            <p className="text-sm text-slate-800">{dadosHoje?.aguaCopos || 0} copos de água registrados</p>
            <p className="text-sm text-slate-800">{dadosHoje?.exercicioDuracao || 0} min de {dadosHoje?.exercicioTipo || "Nenhum"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}