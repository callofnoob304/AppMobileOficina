import { NavigationProp, RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Button, Container, Content, Label, Card, ScreenHeader } from "@components";
import { View, Alert, ActivityIndicator } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { OrcamentoStackParamList } from "src/navigation/types";
import { OrcamentoService } from "src/services/orcamentoService";
import { PdfService } from "src/services/pdfService";
import { Orcamento } from "src/types/orcamento";
import { formatBRL, formatDataHora, diasRestantes } from "src/utils/format";
import { corStatus } from "src/utils/statusOrcamento";
import { colors } from "src/styles/colors";
import { styles } from "./styles";
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
	const [concluindo, setConcluindo] = useState(false);

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

	function concluir() {
		Alert.alert(
			"Concluir orçamento",
			"O orçamento sairá da tela inicial e passará a aparecer no Histórico. Deseja continuar?",
			[
				{ text: "Cancelar", style: "cancel" },
				{
					text: "Concluir",
					onPress: async () => {
						setConcluindo(true);
						const atualizado = await OrcamentoService.concluir(id);
						setOrcamento(atualizado);
						setConcluindo(false);
					},
				},
			]
		);
	}

	function editar() {
		if (!orcamento) return;
		navigator.navigate("OrcamentoClienteVeiculo", {
			orcamentoId: orcamento.id,
			cliente: orcamento.cliente,
			veiculo: orcamento.veiculo,
			itens: orcamento.itens,
		});
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
			<Container style={styles.center}>
				<ActivityIndicator color={colors.yellow[400]} />
			</Container>
		);
	}

	if (!orcamento) {
		return (
			<Container>
				<ScreenHeader title="Orçamento" onBack={() => navigator.goBack()} />
				<View style={styles.center}>
					<Icon name="file-remove-outline" size={40} color={colors.text.muted} />
					<Label muted label="Orçamento não encontrado ou expirado." />
				</View>
			</Container>
		);
	}

	const concluido = orcamento.status === "Concluído";
	const inicioValidade = concluido && orcamento.concluidoEm ? orcamento.concluidoEm : orcamento.criadoEm;
	const dias = diasRestantes(inicioValidade);

	return (
		<Container>
			<ScreenHeader
				title={`Orçamento Nº ${orcamento.numero}`}
				subtitle={formatDataHora(orcamento.criadoEm)}
				onBack={() => navigator.goBack()}
				right={
					<View style={styles.headerActions}>
						<Icon name="pencil-outline" size={22} color={colors.yellow[400]} onPress={editar} />
						<Icon name="trash-can-outline" size={24} color={colors.red[400]} onPress={excluir} />
					</View>
				}
			/>

			<Content style={{ gap: 16, paddingBottom: 120 }}>
				<View style={styles.validade}>
					<Label label={orcamento.status} style={[styles.status, { color: corStatus(orcamento.status) }]} />
					<View style={styles.validadeInfo}>
						<Icon name="clock-outline" size={16} color={corStatus(orcamento.status)} />
						<Label muted label={dias > 0 ? `Expira em ${dias} dia${dias > 1 ? "s" : ""}` : "Expira hoje"} style={{ fontSize: 13 }} />
					</View>
				</View>

				<Card style={{ gap: 6, borderLeftColor: corStatus(orcamento.status) }} highlight>
					<Label label="Cliente" style={{ fontWeight: "700", marginBottom: 4 }} />
					<InfoRow label="Nome" value={orcamento.cliente.nome} />
					<InfoRow label="Telefone" value={orcamento.cliente.telefone} />
					<InfoRow label="CPF/CNPJ" value={orcamento.cliente.cpfCnpj} />
				</Card>

				<Card style={{ gap: 6, borderLeftColor: corStatus(orcamento.status) }} highlight>
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

			<View style={styles.footer}>
				{!concluido && (
					<Button
						title={concluindo ? "Concluindo..." : "Concluir orçamento"}
						disabled={concluindo}
						onPress={concluir}
						icon={
							concluindo ? (
								<ActivityIndicator color={colors.text.inverse} />
							) : (
								<Icon name="check-circle-outline" size={20} color={colors.text.inverse} />
							)
						}
					/>
				)}
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
			</View>
		</Container>
	);
}
