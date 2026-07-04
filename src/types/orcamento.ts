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

export interface Orcamento {
  id: string;
  numero: number; // número sequencial amigável (ex.: #1042)
  criadoEm: number; // timestamp em ms
  cliente: Cliente;
  veiculo: Veiculo;
  itens: OrcamentoItem[];
  total: number;
}
