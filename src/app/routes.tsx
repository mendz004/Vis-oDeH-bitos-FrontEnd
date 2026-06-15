import { createBrowserRouter } from "react-router-dom";
import { PublicLayout } from "./components/PublicLayout";
import { DashboardLayout } from "./components/DashboardLayout";
import { LandingPage } from "./views/LandingPage";
import { Login } from "./views/Login";
import { Dashboard } from "./views/Dashboard";
import { Registrar } from "./views/Registrar";
import { Projecao } from "./views/Projecao";
import { Comparar } from "./views/Comparar";
import { Alertas } from "./views/Alertas";
import { Recomendacoes } from "./views/Recomendacoes";
import { Relatorios } from "./views/Relatorios";
import { VincularEmpresa } from "./views/VincularEmpresa";
import { Admin } from "./views/Admin";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: PublicLayout,
    children: [
      { index: true, Component: LandingPage },
      { path: "login", Component: Login },
      { path: "cadastro", Component: Login },
    ],
  },
  {
    path: "/dashboard",
    Component: DashboardLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: "registrar", Component: Registrar },
      { path: "projecao", Component: Projecao },
      { path: "comparar", Component: Comparar },
      { path: "alertas", Component: Alertas },
      { path: "recomendacoes", Component: Recomendacoes },
      { path: "relatorios", Component: Relatorios },
      { path: "vincular-empresa", Component: VincularEmpresa },
    ],
  },
  {
    path: "/admin",
    Component: DashboardLayout,
    children: [
      { index: true, Component: Admin },
    ],
  }
]);
