import { View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { colors } from "../styles/colors";
import { formatBRL, formatData } from "../utils/format";
import { Orcamento } from "../types/orcamento";
import Card from "./card";
import Label from "./label";
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

const styles = StyleSheet.create({
	card: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
	},
	topRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	numero: {
		fontSize: 12,
		fontWeight: "700",
		color: colors.yellow[400],
	},
	total: {
		fontSize: 16,
		fontWeight: "700",
		marginTop: 4,
	},
});
