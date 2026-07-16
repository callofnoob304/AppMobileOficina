import { StyleSheet, Alert, ActivityIndicator, Image, TouchableOpacity, View } from "react-native";
import { Button, Card, Container, Content, Input, Label } from "@components";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { launchImageLibrary } from "react-native-image-picker";
import { StorageService } from "src/services/storageService";
import { DadosOficina, OFICINA_PADRAO } from "src/types/oficina";
import { colors } from "src/styles/colors";
import { radius, spacing } from "src/styles/theme";
import { isValidCpfCnpj, isValidTelefone, maskCpfCnpj, maskTelefone } from "src/utils/validators";
import React, { useEffect, useState } from "react";

export default function Configuracoes() {
	const [dados, setDados] = useState<DadosOficina>(OFICINA_PADRAO);
	const [carregando, setCarregando] = useState(true);

	useEffect(() => {
		StorageService.get("oficina").then((salvo) => {
			if (salvo) setDados({ ...OFICINA_PADRAO, ...salvo });
			setCarregando(false);
		});
	}, []);

	function atualizar(campo: keyof DadosOficina, valor: string) {
		setDados((prev) => ({ ...prev, [campo]: valor }));
	}

	async function escolherLogo() {
		const resultado = await launchImageLibrary({
			mediaType: "photo",
			includeBase64: true,
			maxWidth: 512,
			maxHeight: 512,
			quality: 0.8,
		});

		if (resultado.didCancel || resultado.errorCode) return;

		const asset = resultado.assets?.[0];
		if (!asset?.base64) return;

		const tipo = asset.type ?? "image/jpeg";
		atualizar("logoUri", `data:${tipo};base64,${asset.base64}`);
	}

	function removerLogo() {
		atualizar("logoUri", "");
	}

	async function salvar() {
		if (dados.telefone.trim() && !isValidTelefone(dados.telefone)) {
			Alert.alert("Telefone inválido", "Informe um telefone com DDD (10 ou 11 dígitos).");
			return;
		}
		if (dados.cnpj.trim() && !isValidCpfCnpj(dados.cnpj)) {
			Alert.alert("CNPJ inválido", "Confira o CNPJ informado.");
			return;
		}

		await StorageService.set("oficina", dados);
		Alert.alert("Pronto!", "Dados da oficina salvos com sucesso.");
	}

	if (carregando) {
		return (
			<Container style={styles.center}>
				<ActivityIndicator color={colors.yellow[400]} />
			</Container>
		);
	}

	return (
		<Container>
			<Label title="Configurações" style={{ marginBottom: 4 }} />
			<Label muted label="Dados usados no cabeçalho dos orçamentos" style={{ fontSize: 13, marginBottom: 16 }} />

			<Content style={{ gap: 16, paddingBottom: 100 }}>
				<Card style={{ gap: 10 }}>
					<View style={styles.cardHeader}>
						<Icon name="image-outline" size={20} color={colors.yellow[400]} />
						<Label label="Logo da empresa" style={{ fontWeight: "700" }} />
					</View>

					<View style={styles.logoRow}>
						<TouchableOpacity style={styles.logoPreview} onPress={escolherLogo}>
							<Image
								source={dados.logoUri ? { uri: dados.logoUri } : require("../../assets/logo_app.png")}
								style={styles.logoImage}
							/>
						</TouchableOpacity>

						<View style={{ gap: 6 }}>
							<Button
								title={dados.logoUri ? "Alterar logo" : "Escolher logo"}
								variant="outline"
								onPress={escolherLogo}
								style={styles.logoButton}
							/>
							{dados.logoUri ? (
								<Button title="Remover logo" variant="ghost" onPress={removerLogo} style={styles.logoButton} />
							) : null}
						</View>
					</View>
				</Card>

				<Card style={{ gap: 10 }}>
					<View style={styles.cardHeader}>
						<Icon name="wrench-outline" size={20} color={colors.yellow[400]} />
						<Label label="Dados da oficina" style={{ fontWeight: "700" }} />
					</View>

					<Input placeholder="Nome da oficina" value={dados.nome} onChangeText={(v) => atualizar("nome", v)} />
					<Input placeholder="Responsável" value={dados.responsavel} onChangeText={(v) => atualizar("responsavel", v)} />
					<Input
						placeholder="Telefone"
						keyboardType="phone-pad"
						value={dados.telefone}
						onChangeText={(v) => atualizar("telefone", maskTelefone(v))}
						maxLength={15}
					/>
					<Input placeholder="Endereço" value={dados.endereco} onChangeText={(v) => atualizar("endereco", v)} />
					<Input
						placeholder="CNPJ"
						keyboardType="numbers-and-punctuation"
						value={dados.cnpj}
						onChangeText={(v) => atualizar("cnpj", maskCpfCnpj(v))}
						maxLength={18}
					/>
				</Card>
			</Content>

			<Button title="Salvar" onPress={salvar} icon={<Icon name="content-save-outline" size={20} color={colors.text.inverse} />} />
		</Container>
	);
}

const styles = StyleSheet.create({
	center: {
		alignItems: "center",
		justifyContent: "center",
	},
	cardHeader: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
		marginBottom: 4,
	},
	logoRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: spacing.md,
	},
	logoPreview: {
		width: 72,
		height: 72,
		borderRadius: radius.md,
		borderWidth: 1,
		borderColor: colors.border,
		backgroundColor: colors.surfaceAlt,
		alignItems: "center",
		justifyContent: "center",
		overflow: "hidden",
	},
	logoImage: {
		width: "100%",
		height: "100%",
	},
	logoButton: {
		width: 180,
		paddingVertical: spacing.sm,
	},
});
