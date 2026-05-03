import { NavigationProp, ParamListBase, useNavigation, useRoute } from "@react-navigation/native";
import { Button, Container, Content, Input, Label } from "@components";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { FlatList, KeyboardAvoidingView, Platform, TouchableOpacity, View } from "react-native";
import React from "react";

interface Params {
	telefone: string;
	cliente: string;
	cpfCnpj: string;
	veiculo: string;
	modelo: string;
	placa: string;
	ano: string;
	km: string;
}

export default function OrcamentoServicos() {
	const navigator: NavigationProp<ParamListBase> = useNavigation();
	const { telefone, cliente, cpfCnpj, veiculo, modelo, ano, placa, km } = useRoute().params as Params;

	const [quantidade, setQuantidade] = React.useState('');
	const [itens, setItens] = React.useState<any[]>([]);
	const [valor, setValor] = React.useState('');
	const [item, setItem] = React.useState('');

	const adicionarItem = () => {
		if (!item || !quantidade || !valor) return;

		const novoItem = {
			id: Date.now(),
			item,
			quantidade: Number(quantidade),
			valor: Number(valor)
		};

		setItens(prev => [...prev, novoItem]);

		setItem('');
		setQuantidade('');
		setValor('');
	};

	const total = itens.reduce((acc, i) => {
		return acc + (i.quantidade * i.valor);
	}, 0);

	const renderItem = ({ item }: any) => (
		<View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, paddingVertical: 8 }} >
			<Label label={item.item} style={{ width: COL_ITEM, flexWrap: 'wrap' }} />
			<Label label={`${item.quantidade}x`} style={{ width: COL_QTD, textAlign: 'right' }} />
			<Label label={`R$ ${item.valor.toFixed(2)}`} style={{ width: COL_VALOR, textAlign: 'right' }} />
			<Label label={`R$ ${(item.quantidade * item.valor).toFixed(2)}`} style={{ width: COL_TOTAL, textAlign: 'right' }} />
		</View>
	);

	const COL_ITEM = 120;
	const COL_QTD = 50;
	const COL_VALOR = 90;
	const COL_TOTAL = 100;

	return (
		<KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? "padding" : 'height'}>
			<Container>
				<Content style={{ gap: 40, paddingBottom: 100 }}>
					<Label title={"Adicione os serviços e peças ao orçamento!"} />

					<View style={{ gap: 8 }}>
						<Label label={"Serviço/Peça"} />

						<Input style={{ flex: 2 }} placeholder="Item" value={item} onChangeText={setItem} />

						<View style={{ gap: 8, flexDirection: 'row', alignItems: 'center' }} >
							<Input style={{ flex: 1 }} placeholder="Qtd" keyboardType="numeric" value={quantidade} onChangeText={setQuantidade} />
							<Input style={{ flex: 1 }} placeholder="Valor" keyboardType="numeric" value={valor} onChangeText={setValor} />

							<TouchableOpacity style={{ backgroundColor: '#000', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 12, borderRadius: 8, height: 56 }}
								onPress={adicionarItem}
							>
								<Icon name="plus" size={28} color="#FFF" />
							</TouchableOpacity>
						</View>
					</View>

					<FlatList
						data={itens}
						keyExtractor={(item) => item.id.toString()}
						renderItem={renderItem}
						scrollEnabled={false}
						ListHeaderComponent={
							<View style={{ flexDirection: 'row', borderBottomWidth: 2, paddingBottom: 6, marginTop: 16 }} >
								<Label label="Item" style={{ width: COL_ITEM }} />
								<Label label="Qtd" style={{ width: COL_QTD, textAlign: 'right' }} />
								<Label label="Vl. Unit" style={{ width: COL_VALOR, textAlign: 'right' }} />
								<Label label="Total" style={{ width: COL_TOTAL, textAlign: 'right' }} />
							</View>
						}
						ListEmptyComponent={
							<Label label="Nenhum item adicionado" />
						}
					/>

					<Label title={`Total: R$ ${total.toFixed(2)}`} />
				</Content>

				<Button title={"Avançar"} onPress={() => navigator.navigate('OrcamentoResumo')} />
			</Container>
		</KeyboardAvoidingView>
	);
}