import { View, StyleSheet, KeyboardAvoidingView, Platform, Alert, ActivityIndicator } from "react-native";
import { Button, Card, Content, Input, Label } from "@components";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { StorageService } from "src/services/storageService";
import { DadosOficina, OFICINA_PADRAO } from "src/types/oficina";
import { colors } from "src/styles/colors";
import { spacing } from "src/styles/theme";
import { isValidCpfCnpj, isValidTelefone, maskCpfCnpj, maskTelefone } from "src/utils/validators";
import React, { useEffect, useState } from "react";

export default function Configuracoes() {
	const [dados, setDados] = useState<DadosOficina>(OFICINA_PADRAO);
	const [carregando, setCarregando] = useState(true);

	useEffect(() => {
		StorageService.get("oficina").then((salvo) => {
			if (salvo) setDados(salvo);
			setCarregando(false);
		});
	}, []);

	function atualizar(campo: keyof DadosOficina, valor: string) {
		setDados((prev) => ({ ...prev, [campo]: valor }));
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
			<SafeAreaView style={[styles.safe, styles.center]} edges={['top']}>
				<ActivityIndicator color={colors.yellow[400]} />
			</SafeAreaView>
		);
	}

	return (
		<SafeAreaView style={styles.safe} edges={['top']}>
			<KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? "padding" : undefined}>
				<View style={styles.container}>
					<Label title="Configurações" style={{ marginBottom: 4 }} />
					<Label muted label="Dados usados no cabeçalho dos orçamentos" style={{ fontSize: 13, marginBottom: 16 }} />

					<Content style={{ gap: 16, paddingBottom: 100 }}>
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
				</View>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	safe: {
		flex: 1,
		backgroundColor: colors.background,
	},
	center: {
		alignItems: "center",
		justifyContent: "center",
	},
	container: {
		flex: 1,
		padding: spacing.xl,
	},
	cardHeader: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
		marginBottom: 4,
	},
});
