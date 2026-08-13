export function formatBRL(valor: number): string {
	const seguro = Number.isFinite(valor) ? valor : 0;
	return seguro.toLocaleString('pt-BR', {
		style: 'currency',
		currency: 'BRL',
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	});
}

export function parseValor(texto: string): number {
	if (!texto) return 0;
	const limpo = texto
		.replace(/[^\d.,-]/g, '')
		.replace(/\.(?=\d{3}(\D|$))/g, '')
		.replace(',', '.');
	const numero = parseFloat(limpo);
	return Number.isFinite(numero) ? numero : 0;
}

export function formatData(timestamp: number): string {
	return new Date(timestamp).toLocaleDateString('pt-BR', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
	});
}

export function formatDataHora(timestamp: number): string {
	const data = new Date(timestamp);
	const dia = data.toLocaleDateString('pt-BR', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
	});
	const hora = data.toLocaleTimeString('pt-BR', {
		hour: '2-digit',
		minute: '2-digit',
	});
	return `${dia} às ${hora}`;
}

export function diasRestantes(criadoEm: number, validadeDias = 10): number {
	const MS_DIA = 24 * 60 * 60 * 1000;
	const expira = criadoEm + validadeDias * MS_DIA;
	const restante = Math.ceil((expira - Date.now()) / MS_DIA);
	return Math.max(0, restante);
}
