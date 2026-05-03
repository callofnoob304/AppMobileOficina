import { NavigationProp, ParamListBase, useNavigation } from "@react-navigation/native";
import { Button, Container, Content, Input, Label } from "@components";
import { View, KeyboardAvoidingView, Platform } from "react-native";
import React, { useState } from "react";

export default function OrcamentoClienteVeiculo() {
	const navigator: NavigationProp<ParamListBase> = useNavigation();

	const [telefone, setTelefone] = useState('');
	const [cliente, setCliente] = useState('');
	const [veiculo, setVeiculo] = useState('');
	const [cpfCnpj, setCpfCnpj] = useState('');
	const [modelo, setModelo] = useState('');
	const [placa, setPlaca] = useState('');
	const [ano, setAno] = useState('');
	const [km, setKm] = useState('');

	return (
		<KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? "padding" : 'height'}>
			<Container>
				<Content style={{ gap: 40, paddingBottom: 100 }}>
					<Label title={"Novo orçamento, preencha os dados de acordo!"} />

					<View style={{ gap: 8 }}>
						<Label label={"Insira os dados do cliente"} />

						<Input placeholder="Cliente" value={cliente} onChangeText={setCliente} />
						<Input placeholder="Telefone" value={telefone} onChangeText={setTelefone} />
						<Input placeholder="CPF/CNPJ" value={cpfCnpj} onChangeText={setCpfCnpj} />
					</View>

					<View style={{ gap: 8 }}>
						<Label label={"Insira os dados do Veiculo"} />

						<Input placeholder="Veículo" value={veiculo} onChangeText={setVeiculo} />
						<Input placeholder="Modelo" value={modelo} onChangeText={setModelo} />
						<View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 8 }}>
							<Input style={{ flex: 1 }} placeholder="Ano" value={ano} onChangeText={setAno} />
							<Input style={{ flex: 1 }} placeholder="Placa" value={placa} onChangeText={setPlaca} />
							<Input style={{ flex: 1 }} placeholder="Km" value={km} onChangeText={setKm} />
						</View>
					</View>
				</Content>

				<Button title={"Avançar"} onPress={() => navigator.navigate('OrcamentoServicos', {cliente, telefone, cpfCnpj, veiculo, modelo, ano, placa, km})} />
			</Container>
		</KeyboardAvoidingView>
	);
}
