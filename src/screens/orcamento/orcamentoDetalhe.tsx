import { NavigationProp, RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Button, Container, Content, Label, Card, ScreenHeader } from "@components";
import { View, StyleSheet, Alert, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { OrcamentoStackParamList } from "src/navigation/types";
import { OrcamentoService } from "src/services/orcamentoService";
import { PdfService } from "src/services/pdfService";
import { Orcamento } from "src/types/orcamento";
import { formatBRL, formatDataHora, diasRestantes } from "src/utils/format";
import { colors } from "src/styles/colors";
import React, { useEffect, useState } from "react";

function InfoRow({ label, value }: { label: string; value?: string }) {
	if (!value) return null;
	return (
		<View style={styles.infoRow}>
			<Label muted label={label} style={{ fontSize: 14 }} />
			<Label label={value} style={{ fontSize: 14, flex: 1, textAlign: "right" }} />
		</View>
	);
}

export default function OrcamentoDetalhe() {
	const navigator = useNavigation<NavigationProp<OrcamentoStackParamList>>();
	const { id } = useRoute<RouteProp<OrcamentoStackParamList, "OrcamentoDetalhe">>().params;

	const [orcamento, setOrcamento] = useState<Orcamento | null>(null);
	const [carregando, setCarregando] = useState(true);
	const [gerandoPdf, setGerandoPdf] = useState(false);

	useEffect(() => {
		OrcamentoService.buscarPorId(id).then((o) => {
			setOrcamento(o);
			setCarregando(false);
		});
	}, [id]);

	async function compartilharPdf() {
		if (!orcamento) return;
		try {
			setGerandoPdf(true);
			await PdfService.compartilhar(orcamento);
		} catch {
			Alert.alert("Erro ao gerar PDF", "Não foi possível gerar ou compartilhar o orçamento. Tente novamente.");
		} finally {
			setGerandoPdf(false);
		}
	}

	function excluir() {
		Alert.alert("Excluir orçamento", "Tem certeza que deseja excluir este orçamento?", [
			{ text: "Cancelar", style: "cancel" },
			{
				text: "Excluir",
				style: "destructive",
				onPress: async () => {
					await OrcamentoService.remover(id);
					navigator.goBack();
				},
			},
		]);
	}

	if (carregando) {
		return (
			<SafeAreaView style={styles.center} edges={['top']}>
				<ActivityIndicator color={colors.yellow[400]} />
			</SafeAreaView>
		);
	}

	if (!orcamento) {
		return (
			<SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={['top']}>
				<Container>
					<ScreenHeader title="Orçamento" onBack={() => navigator.goBack()} />
					<View style={styles.center}>
						<Icon name="file-remove-outline" size={40} color={colors.text.muted} />
						<Label muted label="Orçamento não encontrado ou expirado." />
					</View>
				</Container>
			</SafeAreaView>
		);
	}

	const dias = diasRestantes(orcamento.criadoEm);

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={['top']}>
			<Container>
				<ScreenHeader
					title={`Orçamento Nº ${orcamento.numero}`}
					subtitle={formatDataHora(orcamento.criadoEm)}
					onBack={() => navigator.goBack()}
					right={
						<Icon name="trash-can-outline" size={24} color={colors.red[400]} onPress={excluir} />
					}
				/>

				<Content style={{ gap: 16, paddingBottom: 120 }}>
					<View style={styles.validade}>
						<Icon name="clock-outline" size={16} color={colors.yellow[400]} />
						<Label muted label={dias > 0 ? `Expira em ${dias} dia${dias > 1 ? "s" : ""}` : "Expira hoje"} style={{ fontSize: 13 }} />
					</View>

					<Card style={{ gap: 6 }} highlight>
						<Label label="Cliente" style={{ fontWeight: "700", marginBottom: 4 }} />
						<InfoRow label="Nome" value={orcamento.cliente.nome} />
						<InfoRow label="Telefone" value={orcamento.cliente.telefone} />
						<InfoRow label="CPF/CNPJ" value={orcamento.cliente.cpfCnpj} />
					</Card>

					<Card style={{ gap: 6 }} highlight>
						<Label label="Veículo" style={{ fontWeight: "700", marginBottom: 4 }} />
						<InfoRow label="Veículo" value={orcamento.veiculo.nome} />
						<InfoRow label="Modelo" value={orcamento.veiculo.modelo} />
						<InfoRow label="Ano" value={orcamento.veiculo.ano} />
						<InfoRow label="Placa" value={orcamento.veiculo.placa} />
						<InfoRow label="Km" value={orcamento.veiculo.km} />
					</Card>

					<Card style={{ gap: 4 }}>
						<Label label={`Itens (${orcamento.itens.length})`} style={{ fontWeight: "700", marginBottom: 6 }} />
						{orcamento.itens.map((item) => (
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
						<Label title={formatBRL(orcamento.total)} style={{ color: colors.yellow[400] }} />
					</View>
				</Content>

				<Button
					title={gerandoPdf ? "Gerando PDF..." : "Compartilhar PDF"}
					variant="outline"
					disabled={gerandoPdf}
					onPress={compartilharPdf}
					icon={
						gerandoPdf ? (
							<ActivityIndicator color={colors.yellow[400]} />
						) : (
							<Icon name="file-pdf-box" size={20} color={colors.yellow[400]} />
						)
					}
				/>
			</Container>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	center: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		gap: 8,
		backgroundColor: colors.background,
	},
	validade: {
		flexDirection: "row",
		alignItems: "center",
		gap: 6,
	},
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
