import { Orcamento, Cliente, Veiculo, OrcamentoItem } from '../types/orcamento';
import { StorageService } from './storageService';

export const VALIDADE_DIAS = 10;
const MS_DIA = 24 * 60 * 60 * 1000;

function estaVigente(orcamento: Orcamento, agora = Date.now()): boolean {
	const inicio = orcamento.status === 'Concluído' && orcamento.concluidoEm ? orcamento.concluidoEm : orcamento.criadoEm;
	return agora - inicio < VALIDADE_DIAS * MS_DIA;
}

export function calcularTotal(itens: OrcamentoItem[]): number {
	return itens.reduce((acc, i) => acc + i.quantidade * i.valorUnitario, 0);
}

export const OrcamentoService = {
	async listar(): Promise<Orcamento[]> {
		const salvos = ((await StorageService.get('orcamentos')) ?? []).map(o => ({
			...o,
			status: o.status ?? 'Pendente',
		}));
		const agora = Date.now();
		const vigentes = salvos.filter(o => estaVigente(o, agora));

		if (vigentes.length !== salvos.length) {
			await StorageService.set('orcamentos', vigentes);
		}

		return vigentes.sort((a, b) => b.criadoEm - a.criadoEm);
	},

	async buscarPorId(id: string): Promise<Orcamento | null> {
		const lista = await this.listar();
		return lista.find(o => o.id === id) ?? null;
	},

	async proximoNumero(): Promise<number> {
		const ultimo = (await StorageService.get('ultimoNumero')) ?? 0;
		return ultimo + 1;
	},

	async criar(dados: { cliente: Cliente; veiculo: Veiculo; itens: OrcamentoItem[] }): Promise<Orcamento> {
		const lista = await this.listar();
		const numero = await this.proximoNumero();

		const orcamento: Orcamento = {
			id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
			numero,
			criadoEm: Date.now(),
			status: 'Pendente',
			cliente: dados.cliente,
			veiculo: dados.veiculo,
			itens: dados.itens,
			total: calcularTotal(dados.itens),
		};

		await StorageService.set('orcamentos', [orcamento, ...lista]);
		await StorageService.set('ultimoNumero', numero);

		return orcamento;
	},

	async remover(id: string): Promise<void> {
		const lista = await this.listar();
		await StorageService.set(
			'orcamentos',
			lista.filter(o => o.id !== id),
		);
	},

	async atualizar(id: string, dados: { cliente: Cliente; veiculo: Veiculo; itens: OrcamentoItem[] }): Promise<Orcamento> {
		const lista = await this.listar();
		const existente = lista.find(o => o.id === id);
		if (!existente) {
			throw new Error('Orçamento não encontrado.');
		}

		const atualizado: Orcamento = {
			...existente,
			cliente: dados.cliente,
			veiculo: dados.veiculo,
			itens: dados.itens,
			total: calcularTotal(dados.itens),
			status: 'Atualizado',
		};

		await StorageService.set(
			'orcamentos',
			lista.map(o => (o.id === id ? atualizado : o)),
		);

		return atualizado;
	},

	async concluir(id: string): Promise<Orcamento> {
		const lista = await this.listar();
		const existente = lista.find(o => o.id === id);
		if (!existente) {
			throw new Error('Orçamento não encontrado.');
		}

		const concluido: Orcamento = {
			...existente,
			status: 'Concluído',
			concluidoEm: Date.now(),
		};

		await StorageService.set(
			'orcamentos',
			lista.map(o => (o.id === id ? concluido : o)),
		);

		return concluido;
	},
};
