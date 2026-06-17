const BASE_URL = "http://localhost:8080";

// USUARIO

export async function cadastrarUsuario(dadosUsuario: any) {
  const response = await fetch(`${BASE_URL}/usuarios/cadastrar`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nome: dadosUsuario.nomeCompleto || dadosUsuario.nome,
      email: dadosUsuario.email,
      senha: dadosUsuario.senha,
      idade: dadosUsuario.idade ? Number(dadosUsuario.idade) : null,
      sexo: dadosUsuario.sexoBiologico 
    }),
  });

  const textoResposta = await response.text();

  if (!response.ok) {
    throw new Error(textoResposta || "Erro no cadastro. Verifique os campos.");
  }

  return textoResposta ? JSON.parse(textoResposta) : {};
}

export async function loginUsuario(credenciais: any) {
  const response = await fetch(`${BASE_URL}/usuarios/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: credenciais.email,
      senha: credenciais.senha 
      
    }),
  });

  const textoResposta = await response.text();

  if (!response.ok) {
    throw new Error(textoResposta || "Erro ao fazer login.");
  }

  try {
    return textoResposta ? JSON.parse(textoResposta) : {};
  } catch (e) {
    return { mensagem: textoResposta };
  }
}

// =====================================================
//  EMPRESA
// =====================================================

export async function cadastrarEmpresa(nome: string, cnpj: string, usuarioId: number) {
    const response = await fetch(`${BASE_URL}/empresas/cadastrar?usuarioId=${usuarioId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, cnpj })
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error("Erro do Backend:", errorData);
        throw new Error("Erro na validação do backend");
    }

    return response.json();
}

export async function vincularFuncionario(codigoEmpresa: string, departamento: string, usuarioId: number) {
    const response = await fetch(`${BASE_URL}/empresas/vincular?usuarioId=${usuarioId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ codigoEmpresa, departamento }) 
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const mensagemErro = errorData?.erro || "Erro na validação do backend ao vincular";
        throw new Error(mensagemErro);
    }

    return response.json();
}

/**
 * Retorna se o usuário é gestor, funcionário vinculado ou sem vínculo.
 * O frontend usa isso para decidir se exibe o "Painel Admin" no menu.
 *
 * Respostas possíveis:
 *   Gestor      → { isGestor: true, nomeEmpresa, codigoAcesso }
 *   Funcionário → { isGestor: false, vinculado: true, nomeEmpresa, departamento }
 *   Sem vínculo → { isGestor: false, vinculado: false }
 */
export async function buscarStatus(usuarioId: number) {
    const response = await fetch(`${BASE_URL}/empresas/status?usuarioId=${usuarioId}`);
    return response.json();
}

// =====================================================
//  PAINEL CORPORATIVO
// =====================================================

/**
 * Busca os dados do Painel Corporativo.
 * Só funciona se o usuarioId for gestor de uma empresa.
 * O parâmetro departamento é opcional — quando não enviado, retorna todos.
 */
export async function buscarPainel(usuarioId: number, departamento?: string) {
    const params = departamento ? `&departamento=${departamento}` : "";
    const response = await fetch(`${BASE_URL}/empresas/painel?usuarioId=${usuarioId}${params}`);
    return response.json();
}

/**
 * Lista os departamentos da empresa para preencher o filtro do painel.
 */
export async function listarDepartamentos(usuarioId: number) {
    const response = await fetch(`${BASE_URL}/empresas/departamentos?usuarioId=${usuarioId}`);
    return response.json();
}

// =====================================================
//  RELATÓRIOS
// =====================================================

/**
 * Gera e baixa o PDF diretamente.
 * Uso:
 *   const blob = await gerarRelatorio(1, "30_DIAS", ["RESUMO", "GRAFICOS"]);
 *   const url = URL.createObjectURL(blob);
 *   const link = document.createElement("a");
 *   link.href = url;
 *   link.download = "relatorio.pdf";
 *   link.click();
 *
 * Períodos: "7_DIAS" | "30_DIAS" | "3_MESES" | "1_ANO"
 * Seções:   "RESUMO" | "GRAFICOS" | "ALERTAS" | "PROJECOES"
 */
export async function gerarRelatorio(usuarioId: number, periodo: string, secoes: string[]) {
    const response = await fetch(`${BASE_URL}/relatorios/gerar?usuarioId=${usuarioId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ periodo, secoes })
    });
    return response.blob();
}

/**
 * Gera o PDF e retorna um link compartilhável válido por 72h.
 * Resposta: { idRelatorio, linkCompartilhamento, dataExpiracao, mensagem }
 */
export async function compartilharRelatorio(usuarioId: number, periodo: string, secoes: string[]) {
    const response = await fetch(`${BASE_URL}/relatorios/compartilhar?usuarioId=${usuarioId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ periodo, secoes })
    });
    return response.json();
}

// =====================================================
//  HÁBITOS
// =====================================================

export async function salvarHabitos(usuarioId: number, dadosHabitos: any) {
    // Nota: Confirme com quem fez o backend se a rota é exatamente "/habitos"
    const response = await fetch(`${BASE_URL}/habitos?usuarioId=${usuarioId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dadosHabitos)
    });

    if (!response.ok) {
        throw new Error("Erro ao salvar os hábitos do dia.");
    }

    return response.json();
}

// Buscar hábitos do dia atual para preencher a Dashboard
export async function buscarHabitosHoje(usuarioId: number) {
  const response = await fetch(`${BASE_URL}/habitos/hoje?usuarioId=${usuarioId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Erro ao buscar hábitos do dia.");
  }

  return response.json(); // Devolve os dados que o Java achar
}