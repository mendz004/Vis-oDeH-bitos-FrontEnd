import { useState } from "react";
import { Moon, Utensils, Activity, Save, AlertCircle } from "lucide-react";

export function Registrar() {
  const [saveStatus, setSaveStatus] = useState("idle");

  const handleSave = () => {
    setSaveStatus("saving");
    setTimeout(() => setSaveStatus("success"), 1000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">Registrar Hábitos Hoje</h1>
        <p className="text-slate-600">Mantenha seu diário de saúde atualizado para melhores projeções.</p>
      </header>

      {saveStatus === "success" && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-lg flex items-center gap-3">
          <Save className="h-5 w-5 text-emerald-600" />
          <p className="font-medium">Hábitos registrados com sucesso!</p>
        </div>
      )}

      <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg flex gap-3 text-amber-800 text-sm">
        <AlertCircle className="h-5 w-5 text-amber-600 shrink-0" />
        <p>Aviso: Salvar novos dados de hoje substituirá qualquer registro feito anteriormente nesta mesma data.</p>
      </div>

      <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
        {/* Sono */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Moon className="h-5 w-5 text-indigo-600" />
            <h2 className="text-lg font-bold text-slate-900">Sono</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Horas dormidas</label>
              <input type="number" step="0.5" className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Ex: 7.5" defaultValue="6.5" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Qualidade do sono</label>
              <select className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none bg-white">
                <option>Ruim</option>
                <option>Razoável</option>
                <option>Boa</option>
                <option>Excelente</option>
              </select>
            </div>
          </div>
        </div>

        {/* Alimentação */}
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
                  <label key={item} className="flex items-center gap-2 text-sm text-slate-700">
                    <input type="checkbox" className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                    {item}
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Porções de água (Copos de 200ml)</label>
              <input type="number" className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none" defaultValue="5" />
            </div>
          </div>
        </div>

        {/* Exercício */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="h-5 w-5 text-indigo-600" />
            <h2 className="text-lg font-bold text-slate-900">Exercício Físico</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Tipo</label>
              <select className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none bg-white">
                <option>Nenhum</option>
                <option>Caminhada</option>
                <option>Corrida</option>
                <option>Musculação</option>
                <option>Esporte / Outro</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Duração (minutos)</label>
              <input type="number" className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none" defaultValue="0" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Intensidade</label>
              <select className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none bg-white">
                <option>Leve</option>
                <option>Moderada</option>
                <option>Intensa</option>
              </select>
            </div>
          </div>
        </div>

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
