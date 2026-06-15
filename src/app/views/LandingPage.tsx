import { Link } from "react-router-dom";
import { TrendingUp, Shield, Zap, Activity } from "lucide-react";

export function LandingPage() {
  return (
    <div className="flex-1">
      {/* Hero Section */}
      <section className="bg-white py-20 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-6">
            Descubra o impacto das suas <span className="text-indigo-600">escolhas diárias</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mb-10">
            Acompanhe seus hábitos, simule cenários e visualize projeções de saúde baseadas em evidências. Assuma o controle do seu futuro hoje.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/cadastro" className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-medium text-lg hover:bg-indigo-700 transition-colors">
              Começar Agora
            </Link>
            <Link to="/login" className="bg-white text-slate-700 border border-slate-300 px-8 py-3 rounded-lg font-medium text-lg hover:bg-slate-50 transition-colors">
              Acessar Conta
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">Funcionalidades</h2>
            <p className="text-slate-600 mt-4 max-w-2xl mx-auto">Nossa plataforma utiliza dados de saúde para criar projeções educacionais sobre o impacto do seu estilo de vida ao longo dos anos.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
              <div className="h-12 w-12 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center mb-4">
                <Activity className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Registro Simplificado</h3>
              <p className="text-slate-600">Registre seu sono, alimentação e exercícios diários em menos de 1 minuto com nossa interface intuitiva.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
              <div className="h-12 w-12 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Projeções Educativas</h3>
              <p className="text-slate-600">Visualize estimativas científicas de como seus hábitos atuais podem impactar sua saúde em 1, 5 ou 10 anos.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
              <div className="h-12 w-12 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Prevenção Inteligente</h3>
              <p className="text-slate-600">Receba alertas preventivos e compare diferentes cenários de estilo de vida para tomar decisões melhores.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
