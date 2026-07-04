import { CommonActions, NavigationProp, RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Button, Container, Content, Label, Card, ScreenHeader, StepIndicator } from "@components";
import { View, KeyboardAvoidingView, Platform, Alert, StyleSheet, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { OrcamentoStackParamList } from "src/navigation/types";
import { OrcamentoService } from "src/services/orcamentoService";
import { OrcamentoItem } from "src/types/orcamento";
import { formatBRL } from "src/utils/format";
import { colors } from "src/styles/colors";
import React, { useState } from "react";

function InfoRow({ label, value }: { label: string; value?: string }) {
	if (!value) return null;
	return (
		<View style={styles.infoRow}>
			<Label muted label={label} style={{ fontSize: 14 }} />
			<Label label={value} style={{ fontSize: 14, flex: 1, textAlign: "right" }} />
		</View>
	);
}

export default function OrcamentoResumo() {
	const navigator = useNavigation<NavigationProp<OrcamentoStackParamList>>();
	const { cliente, veiculo, itens } = useRoute<RouteProp<OrcamentoStackParamList, "OrcamentoResumo">>().params;
	const [salvando, setSalvando] = useState(false);

	const total = itens.reduce((acc: number, i: OrcamentoItem) => acc + i.quantidade * i.valorUnitario, 0);

	async function concluir() {
		try {
			setSalvando(true);
			const orcamento = await OrcamentoService.criar({ cliente, veiculo, itens });

			navigator.dispatch(
				CommonActions.reset({ index: 0, routes: [{ name: "Home" }] })
			);

			Alert.alert(
				"Orçamento salvo!",
				`Orçamento Nº ${orcamento.numero} de ${cliente.nome} foi salvo. Ele ficará disponível por 10 dias.`
			);
		} catch (e) {
			setSalvando(false);
			Alert.alert("Erro", "Não foi possível salvar o orçamento. Tente novamente.");
		}
	}

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={['top']}>
			<KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? "padding" : undefined}>
				<Container>
					<ScreenHeader title="Resumo" subtitle="Etapa 3 · Confira e conclua" onBack={() => navigator.goBack()} />
					<StepIndicator current={3} total={3} labels={["Dados", "Serviços", "Resumo"]} />

					<Content style={{ gap: 16, paddingBottom: 120 }}>
						<Card style={{ gap: 6 }} highlight>
							<Label label="Cliente" style={{ fontWeight: "700", marginBottom: 4 }} />
							<InfoRow label="Nome" value={cliente.nome} />
							<InfoRow label="Telefone" value={cliente.telefone} />
							<InfoRow label="CPF/CNPJ" value={cliente.cpfCnpj} />
						</Card>

						<Card style={{ gap: 6 }} highlight>
							<Label label="Veículo" style={{ fontWeight: "700", marginBottom: 4 }} />
							<InfoRow label="Veículo" value={veiculo.nome} />
							<InfoRow label="Modelo" value={veiculo.modelo} />
							<InfoRow label="Ano" value={veiculo.ano} />
							<InfoRow label="Placa" value={veiculo.placa} />
							<InfoRow label="Km" value={veiculo.km} />
						</Card>

						<Card style={{ gap: 4 }}>
							<Label label={`Itens (${itens.length})`} style={{ fontWeight: "700", marginBottom: 6 }} />
							{itens.map((item: OrcamentoItem) => (
								<View key={item.id} style={styles.itemRow}>
									<View style={{ flex: 1 }}>
										<Label label={item.descricao} style={{ fontSize: 14 }} />
										<Label muted label={`${item.quantidade} × ${formatBRL(item.valorUnitario)}`} style={{ fontSize: 12 }} />
									</View>
									<Label label={formatBRL(item.quantidade * item.valorUnitario)} style={{ fontSize: 14, fontWeight: "600" }} />
								</View>
							))}
						</Card>

						<View style={styles.totalRow}>
							<Label title="Total" />
							<Label title={formatBRL(total)} style={{ color: colors.yellow[400] }} />
						</View>
					</Content>

					<Button
						title={salvando ? "Salvando..." : "Concluir orçamento"}
						onPress={concluir}
						disabled={salvando}
						icon={salvando ? <ActivityIndicator color={colors.text.inverse} /> : undefined}
					/>
				</Container>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	infoRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		gap: 12,
	},
	itemRow: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingVertical: 6,
		borderBottomWidth: 1,
		borderBottomColor: colors.border,
	},
	totalRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 4,
	},
});
