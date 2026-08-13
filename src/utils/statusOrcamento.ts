import { StatusOrcamento } from "../types/orcamento";
import { colors } from "../styles/colors";

// Cor de destaque associada a cada situação do orçamento (usada em badges).
export function corStatus(status: StatusOrcamento): string {
  switch (status) {
    case "Concluído":
      return colors.green[400];

    case "Atualizado":
      return colors.blue[300];

    case "Pendente":
      return colors.yellow[400];

    default:
      return colors.text.muted;
  }
}
