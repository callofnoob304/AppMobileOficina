export interface DadosOficina {
	nome: string;
	responsavel: string;
	telefone: string;
	endereco: string;
	cnpj: string;
	logoUri: string;
}

export const OFICINA_PADRAO: DadosOficina = {
	nome: '',
	responsavel: '',
	telefone: '',
	endereco: '',
	cnpj: '',
	logoUri: '',
};
