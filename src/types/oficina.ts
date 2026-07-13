// Dados cadastrais da oficina, usados no cabeçalho do orçamento e no PDF.

export interface DadosOficina {
  nome: string;
  responsavel: string;
  telefone: string;
  endereco: string;
  cnpj: string;
  logoUri: string; // imagem da logo em data URI (base64), definida em Configurações
}

export const OFICINA_PADRAO: DadosOficina = {
  nome: "",
  responsavel: "",
  telefone: "",
  endereco: "",
  cnpj: "",
  logoUri: "",
};
