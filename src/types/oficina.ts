// Dados cadastrais da oficina, usados no cabeçalho do orçamento e no PDF.

export interface DadosOficina {
  nome: string;
  responsavel: string;
  telefone: string;
  endereco: string;
  cnpj: string;
}

export const OFICINA_PADRAO: DadosOficina = {
  nome: "WEIRICH — Mecânica Automotiva",
  responsavel: "",
  telefone: "",
  endereco: "",
  cnpj: "",
};
