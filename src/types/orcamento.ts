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

export type StatusOrcamento = 'Atualizado' | 'Concluído' | 'Pendente';

export interface Orcamento {
	id: string;
	numero: number;
	criadoEm: number;
	concluidoEm?: number;
	status: StatusOrcamento;
	cliente: Cliente;
	veiculo: Veiculo;
	itens: OrcamentoItem[];
	total: number;
}
