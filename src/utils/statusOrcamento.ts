import { StatusOrcamento } from '../types/orcamento';
import { colors } from '../styles/colors';

export function corStatus(status: StatusOrcamento): string {
	switch (status) {
		case 'Atualizado':
			return colors.blue[300];

		case 'Concluído':
			return colors.green[400];

		case 'Pendente':
			return colors.yellow[400];

		default:
			return colors.text.muted;
	}
}
