import { useState } from "react";
import { Link, useLocation } from "react-router";
import { Activity } from "lucide-react";

export function Login() {
  const location = useLocation();
  const isRegister = location.pathname === "/cadastro";

  return (
    <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-sm border border-slate-200">
        <div className="text-center mb-8">
          <Activity className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-900">
            {isRegister ? "Crie sua conta" : "Acesse sua conta"}
          </h2>
          <p className="text-slate-600 mt-2">
            {isRegister ? "Comece a rastrear seus hábitos hoje." : "Bem-vindo de volta ao Visão de Hábitos."}
          </p>
        </div>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          {isRegister && (
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Nome completo</label>
              <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Kaue Oliveira da Silva" />
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">E-mail</label>
            <input type="email" className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="kaue@exemplo.com" />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Senha</label>
            <input type="password" className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="••••••••" />
          </div>

          {isRegister && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Idade</label>
                <input type="number" className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="21" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Sexo Biológico</label>
                <select className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white">
                  <option>Masculino</option>
                  <option>Feminino</option>
                </select>
              </div>
            </div>
          )}

          {!isRegister && (
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input id="remember-me" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-slate-300 rounded" />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-700">Lembrar acesso</label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">Esqueceu a senha?</a>
              </div>
            </div>
          )}

          <Link to="/dashboard" className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-6">
            {isRegister ? "Finalizar Cadastro" : "Entrar"}
          </Link>
        </form>

        <div className="mt-6 text-center text-sm text-slate-600">
          {isRegister ? (
            <p>Já possui conta? <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">Faça login</Link></p>
          ) : (
            <p>Não tem uma conta? <Link to="/cadastro" className="font-medium text-indigo-600 hover:text-indigo-500">Cadastre-se</Link></p>
          )}
        </div>
      </div>
    </div>
  );
}
