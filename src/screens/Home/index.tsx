import { NavigationProp, useFocusEffect, useNavigation } from '@react-navigation/native';
import { View, Image, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { Button, Card, Container, Label, OrcamentoCard } from '@components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { OrcamentoService } from 'src/services/orcamentoService';
import { DadosOficina, OFICINA_PADRAO } from 'src/types/oficina';
import { OrcamentoStackParamList } from 'src/navigation/types';
import { StorageService } from 'src/services/storageService';
import React, { useCallback, useState } from 'react';
import { Orcamento } from 'src/types/orcamento';
import { formatBRL } from 'src/utils/format';
import { colors } from 'src/styles/colors';
import { spacing } from 'src/styles/theme';
import { styles } from './styles';

export default function Home() {
	const navigator = useNavigation<NavigationProp<OrcamentoStackParamList>>();
	const [orcamentos, setOrcamentos] = useState<Orcamento[]>([]);
	const [oficina, setOficina] = useState<DadosOficina>(OFICINA_PADRAO);
	const [carregando, setCarregando] = useState(false);

	const carregar = useCallback(async () => {
		setCarregando(true);
		const [lista, salvo] = await Promise.all([OrcamentoService.listar(), StorageService.get('oficina')]);
		setOrcamentos(lista.filter(o => o.status !== 'Concluído'));
		setOficina(salvo ? { ...OFICINA_PADRAO, ...salvo } : OFICINA_PADRAO);
		setCarregando(false);
	}, []);

	useFocusEffect(
		useCallback(() => {
			carregar();
		}, [carregar]),
	);

	const total = orcamentos.reduce((acc, o) => acc + o.total, 0);
	const recentes = orcamentos.slice(0, 5);

	function irParaHistorico() {
		navigator.getParent()?.navigate('Histórico' as never);
	}

	return (
		<Container noPadding>
			<ScrollView
				contentContainerStyle={styles.content}
				showsVerticalScrollIndicator={false}
				refreshControl={<RefreshControl refreshing={carregando} onRefresh={carregar} tintColor={colors.yellow[400]} />}
			>
				<View style={styles.header}>
					<Image
						source={oficina.logoUri ? { uri: oficina.logoUri } : require('../../assets/icon/play_store_icon_512.png')}
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
					onPress={() => navigator.navigate('OrcamentoClienteVeiculo')}
					icon={<Icon name="plus-circle-outline" size={20} color={colors.text.inverse} />}
				/>

				<View style={styles.sectionHeader}>
					<Label label="Recentes" style={{ fontWeight: '700', fontSize: 18 }} />
					{orcamentos.length > 0 && (
						<TouchableOpacity onPress={irParaHistorico}>
							<Label label="Ver concluídos" style={{ color: colors.yellow[400], fontSize: 14 }} />
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
						{recentes.map(o => (
							<OrcamentoCard key={o.id} orcamento={o} onPress={() => navigator.navigate('OrcamentoDetalhe', { id: o.id })} />
						))}
					</View>
				)}
			</ScrollView>
		</Container>
	);
}
