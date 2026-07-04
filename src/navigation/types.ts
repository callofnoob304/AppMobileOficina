import { Cliente, Veiculo, OrcamentoItem } from "../types/orcamento";

export type OrcamentoStackParamList = {
	Home: undefined;
	Historico: undefined;
	OrcamentoClienteVeiculo: undefined;
	OrcamentoServicos: { cliente: Cliente; veiculo: Veiculo };
	OrcamentoResumo: { cliente: Cliente; veiculo: Veiculo; itens: OrcamentoItem[] };
	OrcamentoDetalhe: { id: string };
};
