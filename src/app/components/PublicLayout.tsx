import { Outlet, Link } from "react-router";
import { Activity } from "lucide-react";

export function PublicLayout() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      <header className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-indigo-600">
            <Activity className="h-8 w-8" />
            <span className="text-xl font-bold tracking-tight">Visão de Hábitos</span>
          </Link>
          <nav className="flex items-center gap-4">
            <Link to="/login" className="text-sm font-medium text-slate-600 hover:text-slate-900">Entrar</Link>
            <Link to="/cadastro" className="text-sm font-medium bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors">Cadastre-se</Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Activity className="h-8 w-8 mx-auto mb-4 text-slate-600" />
          <p className="mb-4">Visão de Hábitos — Simulador de Impactos de Hábitos</p>
          <p className="text-sm text-slate-500 max-w-2xl mx-auto">
            Aviso legal: As projeções apresentadas possuem caráter educativo e não substituem avaliação médica.
            Sempre consulte um profissional de saúde para orientações personalizadas.
          </p>
        </div>
      </footer>
    </div>
  );
}
