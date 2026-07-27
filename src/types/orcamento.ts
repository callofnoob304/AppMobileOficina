// Modelo de dados de um orçamento da oficina.

export interface OrcamentoItem {
  id: string;
  descricao: string;
  quantidade: number;
  valorUnitario: number;
}

export interface Cliente {
  nome: string;
  telefone: string;
  cpfCnpj: string;
}

export interface Veiculo {
  nome: string;
  modelo: string;
  ano: string;
  placa: string;
  km: string;
}

// Pendente: criado e ainda não mexido. Atualizado: dados foram editados.
// Concluído: trabalho finalizado — sai da Home e passa a aparecer no Histórico.
export type StatusOrcamento = "Pendente" | "Atualizado" | "Concluído";

export interface Orcamento {
  id: string;
  numero: number; // número sequencial amigável (ex.: #1042)
  criadoEm: number; // timestamp em ms
  concluidoEm?: number; // timestamp em ms de quando virou "Concluído"
  status: StatusOrcamento;
  cliente: Cliente;
  veiculo: Veiculo;
  itens: OrcamentoItem[];
  total: number;
}
