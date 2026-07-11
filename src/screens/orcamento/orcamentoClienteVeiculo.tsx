import { NavigationProp, RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Button, Container, Content, Input, Label, ScreenHeader, StepIndicator } from "@components";
import { View, KeyboardAvoidingView, Platform, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { OrcamentoStackParamList } from "src/navigation/types";
import { colors } from "src/styles/colors";
import { isValidCpfCnpj, isValidTelefone, maskCpfCnpj, maskMilhar, maskTelefone } from "src/utils/validators";
import React, { useState } from "react";

export default function OrcamentoClienteVeiculo() {
	const navigator = useNavigation<NavigationProp<OrcamentoStackParamList>>();
	const params = useRoute<RouteProp<OrcamentoStackParamList, "OrcamentoClienteVeiculo">>().params;
	const orcamentoId = params?.orcamentoId;
	const editando = !!orcamentoId;

	const [telefone, setTelefone] = useState(params?.cliente?.telefone ?? '');
	const [cliente, setCliente] = useState(params?.cliente?.nome ?? '');
	const [veiculo, setVeiculo] = useState(params?.veiculo?.nome ?? '');
	const [cpfCnpj, setCpfCnpj] = useState(params?.cliente?.cpfCnpj ?? '');
	const [modelo, setModelo] = useState(params?.veiculo?.modelo ?? '');
	const [placa, setPlaca] = useState(params?.veiculo?.placa ?? '');
	const [ano, setAno] = useState(params?.veiculo?.ano ?? '');
	const [km, setKm] = useState(params?.veiculo?.km ?? '');

	function avancar() {
		if (!cliente.trim()) {
			Alert.alert("Informe o cliente", "O nome do cliente é obrigatório para continuar.");
			return;
		}
		if (!veiculo.trim()) {
			Alert.alert("Informe o veículo", "Descreva o veículo para continuar.");
			return;
		}
		if (telefone.trim() && !isValidTelefone(telefone)) {
			Alert.alert("Telefone inválido", "Informe um telefone com DDD (10 ou 11 dígitos).");
			return;
		}
		if (cpfCnpj.trim() && !isValidCpfCnpj(cpfCnpj)) {
			Alert.alert("CPF/CNPJ inválido", "Confira o CPF ou CNPJ informado.");
			return;
		}

		navigator.navigate('OrcamentoServicos', {
			orcamentoId,
			cliente: { nome: cliente.trim(), telefone: telefone.trim(), cpfCnpj: cpfCnpj.trim() },
			veiculo: {
				nome: veiculo.trim(),
				modelo: modelo.trim(),
				ano: ano.trim(),
				placa: placa.trim().toUpperCase(),
				km: km.trim(),
			},
			itens: params?.itens,
		});
	}

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={['top']}>
			<KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? "padding" : undefined}>
				<Container>
					<ScreenHeader
						title={editando ? "Editar orçamento" : "Novo orçamento"}
						subtitle="Etapa 1 · Cliente e veículo"
						onBack={() => navigator.goBack()}
					/>
					<StepIndicator current={1} total={3} labels={["Dados", "Serviços", "Resumo"]} />

					<Content style={{ gap: 28, paddingBottom: 100 }}>
						<View style={{ gap: 10 }}>
							<Label label="Dados do cliente" style={{ fontWeight: "700" }} />

							<Input placeholder="Nome do cliente *" value={cliente} onChangeText={setCliente} />
							<Input
								placeholder="Telefone"
								keyboardType="phone-pad"
								value={telefone}
								onChangeText={(v) => setTelefone(maskTelefone(v))}
								maxLength={15}
							/>
							<Input
								placeholder="CPF / CNPJ"
								keyboardType="numbers-and-punctuation"
								value={cpfCnpj}
								onChangeText={(v) => setCpfCnpj(maskCpfCnpj(v))}
								maxLength={18}
							/>
						</View>

						<View style={{ gap: 10 }}>
							<Label label="Dados do veículo" style={{ fontWeight: "700" }} />

							<Input placeholder="Veículo * (ex.: Fiat Uno)" value={veiculo} onChangeText={setVeiculo} />
							<Input placeholder="Modelo / versão" value={modelo} onChangeText={setModelo} />
							<View style={{ flexDirection: 'row', gap: 8 }}>
								<Input style={{ flex: 1 }} placeholder="Ano" keyboardType="number-pad" value={ano} onChangeText={setAno} />
								<Input style={{ flex: 1.2 }} placeholder="Placa" autoCapitalize="characters" value={placa} onChangeText={(v) => setPlaca(v.toUpperCase())} />
								<Input style={{ flex: 1 }} placeholder="Km" keyboardType="number-pad" value={km} onChangeText={(v) => setKm(maskMilhar(v))} />
							</View>
						</View>
					</Content>

					<Button title="Avançar" onPress={avancar} />
				</Container>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
}
