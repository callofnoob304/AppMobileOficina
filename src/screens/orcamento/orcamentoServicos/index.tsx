import { Button, Container, Content, Input, Label, Card, ScreenHeader, StepIndicator } from '@components';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { FlatList, TouchableOpacity, View, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { OrcamentoStackParamList } from 'src/navigation/types';
import { calcularTotal } from 'src/services/orcamentoService';
import { formatBRL, parseValor } from 'src/utils/format';
import { OrcamentoItem } from 'src/types/orcamento';
import { colors } from 'src/styles/colors';
import { styles } from './styles';
import React from 'react';

export default function OrcamentoServicos() {
	const navigator = useNavigation<NavigationProp<OrcamentoStackParamList>>();
	const { orcamentoId, cliente, veiculo, itens: itensIniciais } = useRoute<RouteProp<OrcamentoStackParamList, 'OrcamentoServicos'>>().params;

	const [quantidade, setQuantidade] = React.useState('');
	const [itens, setItens] = React.useState<OrcamentoItem[]>(itensIniciais ?? []);
	const [valor, setValor] = React.useState('');
	const [descricao, setDescricao] = React.useState('');

	const adicionarItem = () => {
		const qtd = quantidade ? Number(quantidade) : 1;
		const vlr = parseValor(valor);

		if (!descricao.trim()) {
			Alert.alert('Descrição obrigatória', 'Informe o serviço ou peça.');
			return;
		}
		if (vlr < 0) {
			Alert.alert('Valor inválido', 'Informe um valor maior ou igual à zero.');
			return;
		}

		const novoItem: OrcamentoItem = {
			id: `${Date.now()}`,
			descricao: descricao.trim(),
			quantidade: qtd > 0 ? qtd : 1,
			valorUnitario: vlr,
		};

		setItens(prev => [...prev, novoItem]);
		setDescricao('');
		setQuantidade('');
		setValor('');
	};

	const removerItem = (id: string) => {
		setItens(prev => prev.filter(i => i.id !== id));
	};

	const total = calcularTotal(itens);

	function avancar() {
		if (itens.length === 0) {
			Alert.alert('Adicione itens', 'Inclua ao menos um serviço ou peça no orçamento.');
			return;
		}
		navigator.navigate('OrcamentoResumo', { orcamentoId, cliente, veiculo, itens });
	}

	const renderItem = ({ item }: { item: OrcamentoItem }) => (
		<View style={styles.row}>
			<View style={{ flex: 1 }}>
				<Label label={item.descricao} />
				<Label muted label={`${item.quantidade} × ${formatBRL(item.valorUnitario)}`} style={{ fontSize: 13 }} />
			</View>
			<Label label={formatBRL(item.quantidade * item.valorUnitario)} style={{ fontWeight: '700' }} />
			<TouchableOpacity onPress={() => removerItem(item.id)} hitSlop={8} style={{ marginLeft: 12 }}>
				<Icon name="trash-can-outline" size={22} color={colors.red[400]} />
			</TouchableOpacity>
		</View>
	);

	return (
		<Container>
			<ScreenHeader title="Serviços e peças" subtitle="Etapa 2 · Itens do orçamento" onBack={() => navigator.goBack()} />
			<StepIndicator current={2} total={3} labels={['Dados', 'Serviços', 'Resumo']} />

			<Content style={{ gap: 20, paddingBottom: 120 }}>
				<Card style={{ gap: 10 }}>
					<Label label="Adicionar item" style={{ fontWeight: '700' }} />
					<Input placeholder="Serviço ou peça" value={descricao} onChangeText={setDescricao} />
					<View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
						<Input style={{ flex: 1 }} placeholder="Qtd" keyboardType="number-pad" value={quantidade} onChangeText={setQuantidade} />
						<Input style={{ flex: 1.6 }} placeholder="Valor unit." keyboardType="decimal-pad" value={valor} onChangeText={setValor} />
						<TouchableOpacity style={styles.addButton} onPress={adicionarItem}>
							<Icon name="plus" size={26} color={colors.text.inverse} />
						</TouchableOpacity>
					</View>
				</Card>

				<View>
					<Label label={`Itens (${itens.length})`} style={{ fontWeight: '700', marginBottom: 8 }} />
					<FlatList data={itens} keyExtractor={item => item.id} renderItem={renderItem} scrollEnabled={false}
						ListEmptyComponent={
							<View style={styles.empty}>
								<Icon name="clipboard-text-outline" size={32} color={colors.text.muted} />
								<Label muted label="Nenhum item adicionado" />
							</View>
						}
					/>
				</View>
			</Content>

			<View style={styles.footer}>
				<View style={styles.totalRow}>
					<Label muted label="Total do orçamento" />
					<Label title={formatBRL(total)} style={{ color: colors.yellow[400] }} />
				</View>
				<Button title="Avançar" onPress={avancar} disabled={itens.length === 0} />
			</View>
		</Container>
	);
}
