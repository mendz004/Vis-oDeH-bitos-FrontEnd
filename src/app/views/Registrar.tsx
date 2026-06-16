import { useState } from "react";
import { Moon, Utensils, Activity, Save, AlertCircle } from "lucide-react";
import { salvarHabitos } from "../../api/api"; // Importando a função do api.ts

export function Registrar() {
  const [saveStatus, setSaveStatus] = useState("idle");
  const [erro, setErro] = useState("");

  // --- ESTADOS CONTROLANDO OS CAMPOS DO FORMULÁRIO ---
  // Sono
  const [horasSono, setHorasSono] = useState("6.5");
  const [qualidadeSono, setQualidadeSono] = useState("Boa");

  // Alimentação
  const [gruposAlimentares, setGruposAlimentares] = useState<string[]>([]);
  const [aguaCopos, setAguaCopos] = useState("5");

  // Exercício Físico
  const [exercicioTipo, setExercicioTipo] = useState("Nenhum");
  const [exercicioDuracao, setExercicioDuracao] = useState("0");
  const [exercicioIntensidade, setExercicioIntensidade] = useState("Leve");

  // Função para marcar/desmarcar os checkboxes de alimentação
  const handleCheckboxChange = (item: string) => {
    setGruposAlimentares((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  // --- ENVIAR DADOS PARA O BACKEND ---
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveStatus("saving");
    setErro("");

    // 🔑 Resgata o ID que foi guardado pelo Login do seu amigo
    const usuarioId = Number(localStorage.getItem("usuarioId"));

    if (!usuarioId) {
      setErro("Usuário não identificado. Por favor, faça login novamente.");
      setSaveStatus("idle");
      return;
    }

    // Estrutura o JSON exatamente como o backend precisa
    const dadosHabitos = {
      dataRegistro: new Date().toISOString().split("T")[0], // YYYY-MM-DD (Data de hoje)
      horasSono: Number(horasSono),
      qualidadeSono,
      gruposAlimentares,
      aguaCopos: Number(aguaCopos),
      exercicioTipo,
      exercicioDuracao: Number(exercicioDuracao),
      exercicioIntensidade,
    };

    try {
      // Dispara para a rota do seu amigo passando o ID e o Payload
      await salvarHabitos(usuarioId, dadosHabitos);
      setSaveStatus("success");
      
      // Reseta o status de sucesso depois de 3 segundos
      setTimeout(() => setSaveStatus("idle"), 3000);
    } catch (err: any) {
      console.error("Erro ao salvar hábitos:", err);
      setErro(err.message || "Erro de conexão com o servidor.");
      setSaveStatus("idle");
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">Registrar Hábitos Hoje</h1>
        <p className="text-slate-600">Mantenha seu diário de saúde atualizado para melhores projeções.</p>
      </header>

      {/* Alerta de Sucesso */}
      {saveStatus === "success" && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-lg flex items-center gap-3">
          <Save className="h-5 w-5 text-emerald-600" />
          <p className="font-medium">Hábitos registrados com sucesso!</p>
        </div>
      )}

      {/* Alerta de Erro */}
      {erro && (
        <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg flex items-center gap-3">
          <AlertCircle className="h-5 w-5 text-red-600" />
          <p className="font-medium">{erro}</p>
        </div>
      )}

      <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg flex gap-3 text-amber-800 text-sm">
        <AlertCircle className="h-5 w-5 text-amber-600 shrink-0" />
        <p>Aviso: Salvar novos dados de hoje substituirá qualquer registro feito anteriormente nesta mesma data.</p>
      </div>

      <form className="space-y-6" onSubmit={handleSave}>
        {/* Card: Sono */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Moon className="h-5 w-5 text-indigo-600" />
            <h2 className="text-lg font-bold text-slate-900">Sono</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Horas dormidas</label>
              <input 
                type="number" 
                step="0.5" 
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none" 
                placeholder="Ex: 7.5" 
                value={horasSono}
                onChange={(e) => setHorasSono(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Qualidade do sono</label>
              <select 
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
                value={qualidadeSono}
                onChange={(e) => setQualidadeSono(e.target.value)}
              >
                <option value="Ruim">Ruim</option>
                <option value="Razoável">Razoável</option>
                <option value="Boa">Boa</option>
                <option value="Excelente">Excelente</option>
              </select>
            </div>
          </div>
        </div>

        {/* Card: Alimentação */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Utensils className="h-5 w-5 text-indigo-600" />
            <h2 className="text-lg font-bold text-slate-900">Alimentação</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Grupos alimentares consumidos (selecione vários)</label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {['Frutas', 'Vegetais', 'Carboidratos Complexos', 'Proteína Magra', 'Doces/Açúcar', 'Ultraprocessados'].map(item => (
                  <label key={item} className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" 
                      checked={gruposAlimentares.includes(item)}
                      onChange={() => handleCheckboxChange(item)}
                    />
                    {item}
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Porções de água (Copos de 200ml)</label>
              <input 
                type="number" 
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none" 
                value={aguaCopos}
                onChange={(e) => setAguaCopos(e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        {/* Card: Exercício Físico */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="h-5 w-5 text-indigo-600" />
            <h2 className="text-lg font-bold text-slate-900">Exercício Físico</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Tipo</label>
              <select 
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
                value={exercicioTipo}
                onChange={(e) => setExercicioTipo(e.target.value)}
              >
                <option value="Nenhum">Nenhum</option>
                <option value="Caminhada">Caminhada</option>
                <option value="Corrida">Corrida</option>
                <option value="Musculação">Musculação</option>
                <option value="Esporte / Outro">Esporte / Outro</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Duração (minutos)</label>
              <input 
                type="number" 
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none" 
                value={exercicioDuracao}
                onChange={(e) => setExercicioDuracao(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Intensidade</label>
              <select 
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
                value={exercicioIntensidade}
                onChange={(e) => setExercicioIntensidade(e.target.value)}
              >
                <option value="Leve">Leve</option>
                <option value="Moderada">Moderada</option>
                <option value="Intensa">Intensa</option>
              </select>
            </div>
          </div>
        </div>

        {/* Botão de Envio */}
        <div className="flex justify-end pt-4">
          <button 
            type="submit" 
            disabled={saveStatus === "saving"}
            className="bg-indigo-600 text-white px-6 py-2.5 rounded-md font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2 disabled:opacity-70"
          >
            <Save className="h-4 w-4" />
            {saveStatus === "saving" ? "Salvando..." : "Salvar Registros"}
          </button>
        </div>
      </form>
    </div>
  );
}