import { StorageService } from "./storageService";
import { Orcamento, Cliente, Veiculo, OrcamentoItem } from "../types/orcamento";

// Regras de negócio e persistência dos orçamentos.
// Tudo é salvo no AsyncStorage; orçamentos com mais de 10 dias são
// removidos automaticamente sempre que a lista é lida.

export const VALIDADE_DIAS = 10;
const MS_DIA = 24 * 60 * 60 * 1000;

// Retorna true se o orçamento ainda está dentro da validade de 10 dias.
function estaVigente(orcamento: Orcamento, agora = Date.now()): boolean {
  return agora - orcamento.criadoEm < VALIDADE_DIAS * MS_DIA;
}

export function calcularTotal(itens: OrcamentoItem[]): number {
  return itens.reduce((acc, i) => acc + i.quantidade * i.valorUnitario, 0);
}

export const OrcamentoService = {
  // Lê todos os orçamentos válidos, descartando (e apagando) os expirados.
  async listar(): Promise<Orcamento[]> {
    const salvos = (await StorageService.get("orcamentos")) ?? [];
    const agora = Date.now();
    const vigentes = salvos.filter((o) => estaVigente(o, agora));

    // Se algo expirou, regrava a lista já limpa (auto-deleção).
    if (vigentes.length !== salvos.length) {
      await StorageService.set("orcamentos", vigentes);
    }

    // Mais recentes primeiro.
    return vigentes.sort((a, b) => b.criadoEm - a.criadoEm);
  },

  // Busca um orçamento específico pelo id.
  async buscarPorId(id: string): Promise<Orcamento | null> {
    const lista = await this.listar();
    return lista.find((o) => o.id === id) ?? null;
  },

  // Gera o próximo número sequencial amigável (#1, #2, ...).
  async proximoNumero(): Promise<number> {
    const ultimo = (await StorageService.get("ultimoNumero")) ?? 0;
    return ultimo + 1;
  },

  // Cria e persiste um novo orçamento.
  async criar(dados: {
    cliente: Cliente;
    veiculo: Veiculo;
    itens: OrcamentoItem[];
  }): Promise<Orcamento> {
    const lista = await this.listar();
    const numero = await this.proximoNumero();

    const orcamento: Orcamento = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      numero,
      criadoEm: Date.now(),
      cliente: dados.cliente,
      veiculo: dados.veiculo,
      itens: dados.itens,
      total: calcularTotal(dados.itens),
    };

    await StorageService.set("orcamentos", [orcamento, ...lista]);
    await StorageService.set("ultimoNumero", numero);

    return orcamento;
  },

  // Remove um orçamento manualmente.
  async remover(id: string): Promise<void> {
    const lista = await this.listar();
    await StorageService.set(
      "orcamentos",
      lista.filter((o) => o.id !== id)
    );
  },
};
