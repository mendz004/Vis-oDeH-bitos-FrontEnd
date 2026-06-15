import { Outlet, Link, useLocation } from "react-router-dom";
import { 
  Activity, 
  LayoutDashboard, 
  PlusCircle, 
  TrendingUp, 
  GitCompare, 
  Bell, 
  Lightbulb, 
  FileText, 
  Settings,
  Menu,
  X,
  UserCircle,
  Building2
} from "lucide-react";
import { useState } from "react";

export function DashboardLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Registrar Hoje", path: "/dashboard/registrar", icon: PlusCircle },
    { name: "Minha Projeção", path: "/dashboard/projecao", icon: TrendingUp },
    { name: "Comparar", path: "/dashboard/comparar", icon: GitCompare },
    { name: "Alertas", path: "/dashboard/alertas", icon: Bell },
    { name: "Recomendações", path: "/dashboard/recomendacoes", icon: Lightbulb },
    { name: "Relatórios", path: "/dashboard/relatorios", icon: FileText },
    { name: "Vincular Empresa", path: "/dashboard/vincular-empresa", icon: Building2 },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">
      {/* Sidebar for desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200">
        <div className="p-4 border-b border-slate-200 flex items-center gap-2 text-indigo-600">
          <Activity className="h-6 w-6" />
          <span className="font-bold">Visão de Hábitos</span>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive 
                    ? "bg-indigo-50 text-indigo-700" 
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <Icon className={`h-5 w-5 ${isActive ? "text-indigo-700" : "text-slate-400"}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-slate-200">
          <Link to="/admin" className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900">
            <Settings className="h-5 w-5 text-slate-400" />
            Painel Admin
          </Link>
          <div className="mt-4 flex items-center gap-3 px-3 py-2">
            <UserCircle className="h-8 w-8 text-slate-400" />
            <div className="flex flex-col">
              <span className="text-sm font-medium">Kauê Silva</span>
              <span className="text-xs text-slate-500">Sair</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 z-50 flex items-center justify-between px-4">
        <div className="flex items-center gap-2 text-indigo-600">
          <Activity className="h-6 w-6" />
          <span className="font-bold">Visão de Hábitos</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 -mr-2 text-slate-600">
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-white z-40 overflow-y-auto border-t border-slate-200">
          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-3 rounded-md text-base font-medium ${
                    isActive 
                      ? "bg-indigo-50 text-indigo-700" 
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <Icon className={`h-5 w-5 ${isActive ? "text-indigo-700" : "text-slate-400"}`} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col md:pt-0 pt-16 h-screen overflow-y-auto">
        <div className="flex-1 max-w-6xl w-full mx-auto p-4 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
