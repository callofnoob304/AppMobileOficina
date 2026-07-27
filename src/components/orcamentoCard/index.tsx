import { View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { colors } from "src/styles/colors";
import { formatBRL, formatData } from "src/utils/format";
import { corStatus } from "src/utils/statusOrcamento";
import { Orcamento } from "src/types/orcamento";
import Card from "src/components/card";
import Label from "src/components/label";
import { styles } from "./styles";
import React from "react";

interface Props {
	orcamento: Orcamento;
	onPress: () => void;
}

export default function OrcamentoCard({ orcamento, onPress }: Props) {
	return (
		<Card onPress={onPress} highlight style={styles.card}>
			<View style={{ flex: 1, gap: 2 }}>
				<View style={styles.topRow}>
					<Label label={`Nº ${orcamento.numero}`} style={styles.numero} />
					<Label muted label={formatData(orcamento.criadoEm)} style={{ fontSize: 12 }} />
				</View>
				<Label label={orcamento.status} style={[styles.status, { color: corStatus(orcamento.status) }]} />
				<Label label={orcamento.cliente.nome} style={{ fontWeight: "700" }} numberOfLines={1} />
				<Label
					muted
					label={[orcamento.veiculo.nome, orcamento.veiculo.placa].filter(Boolean).join(" · ")}
					style={{ fontSize: 13 }}
					numberOfLines={1}
				/>
				<Label label={formatBRL(orcamento.total)} style={styles.total} />
			</View>
			<Icon name="chevron-right" size={24} color={colors.text.muted} />
		</Card>
	);
}
