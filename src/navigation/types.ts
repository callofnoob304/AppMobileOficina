import { Cliente, Veiculo, OrcamentoItem } from "../types/orcamento";

export type OrcamentoStackParamList = {
	Home: undefined;
	Historico: undefined;
	OrcamentoClienteVeiculo: { orcamentoId?: string; cliente?: Cliente; veiculo?: Veiculo; itens?: OrcamentoItem[] } | undefined;
	OrcamentoServicos: { orcamentoId?: string; cliente: Cliente; veiculo: Veiculo; itens?: OrcamentoItem[] };
	OrcamentoResumo: { orcamentoId?: string; cliente: Cliente; veiculo: Veiculo; itens: OrcamentoItem[] };
	OrcamentoDetalhe: { id: string };
};
