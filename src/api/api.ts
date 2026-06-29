const BASE_URL = "http://localhost:8080";

// =====================================================
// TIPOS
// =====================================================

export type Comparacao = {
    riscoAtual: number;
    riscoIdeal: number;
    diferenca: number;
    mensagem: string;
};

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
// Adicione isto no seu arquivo api.ts

export const baixarPdfBackend = async (usuarioId: number, periodo: string, secoes: string[]) => {
  const response = await fetch(`http://localhost:8080/relatorios/gerarpdf/${usuarioId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ periodo, secoes }),
  });

  if (!response.ok) {
    throw new Error("Erro ao gerar o PDF no servidor.");
  }

  return await response.blob();
};

export const gerarLinkBackend = async (usuarioId: number, periodo: string, secoes: string[]) => {
  const response = await fetch(`http://localhost:8080/relatorios/compartilhar/${usuarioId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ periodo, secoes }),
  });

  if (!response.ok) {
    throw new Error("Erro ao gerar o link de compartilhamento.");
  }

  return await response.json();
};

// =====================================================
//  HÁBITOS
// =====================================================

export async function salvarHabitos(
  usuarioId: number,
  dadosHabitos: any
) {
  const response = await fetch(`${BASE_URL}/habitos/save`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dadosHabitos),
  });

  if (!response.ok) {
    const erro = await response.text();
    throw new Error(erro);
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

// =====================================================
// ALERTAS
// =====================================================

export async function cadastrarAlerta(dadosAlerta: any) {
    const response = await fetch(`${BASE_URL}/alertas/cadastrar`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(dadosAlerta),
    });

    if (!response.ok) {
        throw new Error(await response.text());
    }

    return response.json();
}

export async function listarAlertas(page = 0, size = 10) {
    const response = await fetch(
        `${BASE_URL}/alertas/listar?page=${page}&size=${size}`
    );

    if (!response.ok) {
        throw new Error("Erro ao listar alertas.");
    }

    return response.json();
}

export async function buscarAlerta(id: number) {
    const response = await fetch(`${BASE_URL}/alertas/${id}`);

    if (!response.ok) {
        throw new Error("Alerta não encontrado.");
    }

    return response.json();
}

export async function editarAlerta(id: number, dadosAlerta: any) {
    const response = await fetch(`${BASE_URL}/alertas/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(dadosAlerta),
    });

    if (!response.ok) {
        throw new Error(await response.text());
    }

    return response.json();
}

export async function excluirAlerta(id: number) {
    const response = await fetch(`${BASE_URL}/alertas/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error("Erro ao excluir alerta.");
    }
}

// =====================================================
// PROJEÇÕES DE SAÚDE
// =====================================================

export async function cadastrarProjecao(dadosProjecao: any) {
    const response = await fetch(`${BASE_URL}/projecoes-saude/cadastrar`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(dadosProjecao),
    });

    if (!response.ok) {
        throw new Error(await response.text());
    }

    return response.json();
}

export async function listarProjecoes(page = 0, size = 10) {
    const response = await fetch(
        `${BASE_URL}/projecoes-saude/listar?page=${page}&size=${size}`
    );

    if (!response.ok) {
        throw new Error("Erro ao listar projeções.");
    }

    return response.json();
}

export async function buscarProjecao(id: number) {
    const response = await fetch(`${BASE_URL}/projecoes-saude/${id}`);

    if (!response.ok) {
        throw new Error("Projeção não encontrada.");
    }

    return response.json();
}

export async function editarProjecao(id: number, dadosProjecao: any) {
    const response = await fetch(`${BASE_URL}/projecoes-saude/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(dadosProjecao),
    });

    if (!response.ok) {
        throw new Error(await response.text());
    }

    return response.json();
}

export async function excluirProjecao(id: number) {
    const response = await fetch(`${BASE_URL}/projecoes-saude/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error("Erro ao excluir projeção.");
    }
}

export async function buscarMinhaProjecao(usuarioId: number) {

    const response = await fetch(
        `${BASE_URL}/projecoes-saude/usuario/${usuarioId}`
    );

    if (!response.ok) {
        throw new Error("Erro ao buscar projeções.");
    }

    return response.json();
}

export async function compararProjecao(
    usuarioId: number
): Promise<Comparacao> {
    const response = await fetch(
        `${BASE_URL}/projecoes-saude/usuario/${usuarioId}/comparar`
    );

    if (!response.ok) {
        throw new Error("Erro ao comparar projeção.");
    }

    return response.json(); // ✅ CORRIGIDO AQUI
}

export async function buscarRecomendacoes(usuarioId: number) {

    const response = await fetch(
        `${BASE_URL}/projecoes-saude/usuario/${usuarioId}/recomendacoes`
    );

    if (!response.ok) {
        throw new Error("Erro ao buscar recomendações.");
    }

    return response.json();
}
export type Recomendacao = {
    categoria: string;
    titulo: string;
    descricao: string;
    prioridade: "ALTA" | "MEDIA" | "BAIXA";
    impacto: "ALTO" | "MEDIO" | "BAIXO";
};