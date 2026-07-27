import { StatusOrcamento } from "../types/orcamento";
import { colors } from "../styles/colors";

// Cor de destaque associada a cada situação do orçamento (usada em badges).
export function corStatus(status: StatusOrcamento): string {
  switch (status) {
    case "Concluído":
      return colors.green[400];
    case "Atualizado":
      return colors.yellow[400];
    case "Pendente":
    default:
      return colors.text.muted;
  }
}
