import { NavigationProp, useFocusEffect, useNavigation } from "@react-navigation/native";
import { View, StyleSheet, FlatList, RefreshControl } from "react-native";
import { Input, Label, OrcamentoCard } from "@components";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { OrcamentoStackParamList } from "src/navigation/types";
import { OrcamentoService } from "src/services/orcamentoService";
import { Orcamento } from "src/types/orcamento";
import { colors } from "src/styles/colors";
import { spacing } from "src/styles/theme";
import React, { useCallback, useMemo, useState } from "react";

export default function Historico() {
	const navigator = useNavigation<NavigationProp<OrcamentoStackParamList>>();
	const [orcamentos, setOrcamentos] = useState<Orcamento[]>([]);
	const [carregando, setCarregando] = useState(false);
	const [busca, setBusca] = useState("");

	const carregar = useCallback(async () => {
		setCarregando(true);
		setOrcamentos(await OrcamentoService.listar());
		setCarregando(false);
	}, []);

	useFocusEffect(
		useCallback(() => {
			carregar();
		}, [carregar])
	);

	const filtrados = useMemo(() => {
		const termo = busca.trim().toLowerCase();
		if (!termo) return orcamentos;
		return orcamentos.filter((o) =>
			[o.numero.toString(), o.cliente.nome, o.veiculo.nome, o.veiculo.placa]
				.filter(Boolean)
				.some((campo) => campo.toLowerCase().includes(termo))
		);
	}, [orcamentos, busca]);

	return (
		<SafeAreaView style={styles.safe} edges={['top']}>
			<View style={styles.container}>
				<Label title="Histórico" style={{ marginBottom: 4 }} />
				<Label muted label="Orçamentos salvos (últimos 10 dias)" style={{ fontSize: 13, marginBottom: 12 }} />

				<Input
					placeholder="Buscar por cliente, veículo, placa ou nº"
					value={busca}
					onChangeText={setBusca}
					style={{ marginBottom: 12 }}
				/>

				<FlatList
					data={filtrados}
					keyExtractor={(item) => item.id}
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{ gap: spacing.md, paddingBottom: 24 }}
					refreshControl={<RefreshControl refreshing={carregando} onRefresh={carregar} tintColor={colors.yellow[400]} />}
					renderItem={({ item }) => (
						<OrcamentoCard
							orcamento={item}
							onPress={() => navigator.navigate("OrcamentoDetalhe", { id: item.id })}
						/>
					)}
					ListEmptyComponent={
						<View style={styles.empty}>
							<Icon name="folder-open-outline" size={44} color={colors.text.muted} />
							<Label muted label={busca ? "Nenhum resultado para a busca." : "Nenhum orçamento salvo ainda."} center />
						</View>
					}
				/>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	safe: {
		flex: 1,
		backgroundColor: colors.background,
	},
	container: {
		flex: 1,
		padding: spacing.xl,
	},
	empty: {
		alignItems: "center",
		gap: 10,
		paddingVertical: 60,
	},
});
