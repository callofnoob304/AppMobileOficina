import { NavigationProp, useFocusEffect, useNavigation } from "@react-navigation/native";
import { View, StyleSheet, Image, ScrollView, TouchableOpacity, RefreshControl } from "react-native";
import { Button, Card, Label, OrcamentoCard } from "@components";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { OrcamentoStackParamList } from "src/navigation/types";
import { OrcamentoService } from "src/services/orcamentoService";
import { StorageService } from "src/services/storageService";
import { DadosOficina, OFICINA_PADRAO } from "src/types/oficina";
import { Orcamento } from "src/types/orcamento";
import { formatBRL } from "src/utils/format";
import { colors } from "src/styles/colors";
import { spacing } from "src/styles/theme";
import React, { useCallback, useState } from "react";

export default function Home() {
	const navigator = useNavigation<NavigationProp<OrcamentoStackParamList>>();
	const [orcamentos, setOrcamentos] = useState<Orcamento[]>([]);
	const [oficina, setOficina] = useState<DadosOficina>(OFICINA_PADRAO);
	const [carregando, setCarregando] = useState(false);

	const carregar = useCallback(async () => {
		setCarregando(true);
		const [lista, salvo] = await Promise.all([
			OrcamentoService.listar(),
			StorageService.get("oficina"),
		]);
		setOrcamentos(lista);
		setOficina(salvo ? { ...OFICINA_PADRAO, ...salvo } : OFICINA_PADRAO);
		setCarregando(false);
	}, []);

	useFocusEffect(
		useCallback(() => {
			carregar();
		}, [carregar])
	);

	const total = orcamentos.reduce((acc, o) => acc + o.total, 0);
	const recentes = orcamentos.slice(0, 5);

	function irParaHistorico() {
		navigator.getParent()?.navigate("Histórico" as never);
	}

	return (
		<SafeAreaView style={styles.safe} edges={['top']}>
			<ScrollView
				contentContainerStyle={styles.content}
				showsVerticalScrollIndicator={false}
				refreshControl={<RefreshControl refreshing={carregando} onRefresh={carregar} tintColor={colors.yellow[400]} />}
			>
				<View style={styles.header}>
					<Image
						source={oficina.logoUri ? { uri: oficina.logoUri } : require("../../assets/logo_app.png")}
						style={styles.logo}
					/>
					<View style={{ flex: 1 }}>
						<Label title={oficina.nome} style={{ letterSpacing: 1 }} numberOfLines={1} ellipsizeMode="tail" />
						{oficina.responsavel ? (
							<Label muted label={oficina.responsavel} style={{ fontSize: 13 }} numberOfLines={1} ellipsizeMode="tail" />
						) : null}
					</View>
				</View>

				<View style={styles.stats}>
					<Card style={styles.statCard}>
						<Icon name="file-document-multiple-outline" size={22} color={colors.yellow[400]} />
						<Label title={String(orcamentos.length)} />
						<Label muted label="Orçamentos ativos" style={{ fontSize: 12 }} />
					</Card>
					<Card style={styles.statCard}>
						<Icon name="cash-multiple" size={22} color={colors.yellow[400]} />
						<Label title={formatBRL(total)} style={{ fontSize: 18 }} />
						<Label muted label="Valor total" style={{ fontSize: 12 }} />
					</Card>
				</View>

				<Button
					title="Novo orçamento"
					onPress={() => navigator.navigate("OrcamentoClienteVeiculo")}
					icon={<Icon name="plus-circle-outline" size={20} color={colors.text.inverse} />}
				/>

				<View style={styles.sectionHeader}>
					<Label label="Recentes" style={{ fontWeight: "700", fontSize: 18 }} />
					{orcamentos.length > 0 && (
						<TouchableOpacity onPress={irParaHistorico}>
							<Label label="Ver todos" style={{ color: colors.yellow[400], fontSize: 14 }} />
						</TouchableOpacity>
					)}
				</View>

				{recentes.length === 0 ? (
					<Card style={styles.empty}>
						<Icon name="clipboard-text-clock-outline" size={40} color={colors.text.muted} />
						<Label muted label="Nenhum orçamento nos últimos 10 dias." center />
						<Label muted label="Crie um novo para começar." center style={{ fontSize: 13 }} />
					</Card>
				) : (
					<View style={{ gap: spacing.md }}>
						{recentes.map((o) => (
							<OrcamentoCard
								key={o.id}
								orcamento={o}
								onPress={() => navigator.navigate("OrcamentoDetalhe", { id: o.id })}
							/>
						))}
					</View>
				)}
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	safe: {
		flex: 1,
		backgroundColor: colors.background,
	},
	content: {
		padding: spacing.xl,
		gap: spacing.lg,
		paddingBottom: 40,
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		gap: spacing.md,
	},
	logo: {
		width: 52,
		height: 52,
		borderRadius: 12,
	},
	stats: {
		flexDirection: "row",
		gap: spacing.md,
	},
	statCard: {
		flex: 1,
		gap: 4,
	},
	sectionHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginTop: spacing.sm,
	},
	empty: {
		alignItems: "center",
		gap: 8,
		paddingVertical: spacing.xxl,
	},
});
