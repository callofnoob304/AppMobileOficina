import OrcamentoClienteVeiculo from 'src/screens/orcamento/orcamentoClienteVeiculo';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import OrcamentoServicos from 'src/screens/orcamento/orcamentoServicos';
import OrcamentoDetalhe from 'src/screens/orcamento/orcamentoDetalhe';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import OrcamentoResumo from 'src/screens/orcamento/orcamentoResumo';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Configuracoes from '../screens/configuracoes';
import Historico from '../screens/historico';
import { colors } from '../styles/colors';
import Home from '../screens/home';
import React from 'react';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const navTheme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		background: colors.background,
		card: colors.surface,
		text: colors.text.primary,
		border: colors.border,
		primary: colors.yellow[400],
	},
};

function HomeStack() {
	return (
		<Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
			<Stack.Screen name="Home" component={Home} />
			<Stack.Screen name="OrcamentoClienteVeiculo" component={OrcamentoClienteVeiculo} />
			<Stack.Screen name="OrcamentoServicos" component={OrcamentoServicos} />
			<Stack.Screen name="OrcamentoResumo" component={OrcamentoResumo} />
			<Stack.Screen name="OrcamentoDetalhe" component={OrcamentoDetalhe} />
		</Stack.Navigator>
	);
}

function HistoricoStack() {
	return (
		<Stack.Navigator initialRouteName="Historico" screenOptions={{ headerShown: false }}>
			<Stack.Screen name="Historico" component={Historico} />
			<Stack.Screen name="OrcamentoDetalhe" component={OrcamentoDetalhe} />
			<Stack.Screen name="OrcamentoClienteVeiculo" component={OrcamentoClienteVeiculo} />
			<Stack.Screen name="OrcamentoServicos" component={OrcamentoServicos} />
			<Stack.Screen name="OrcamentoResumo" component={OrcamentoResumo} />
		</Stack.Navigator>
	);
}

export default function Routes() {
	const insets = useSafeAreaInsets();

	return (
		<NavigationContainer theme={navTheme}>
			<Tab.Navigator
				screenOptions={({ route }) => ({
					headerShown: false,
					tabBarActiveTintColor: colors.yellow[400],
					tabBarInactiveTintColor: colors.text.muted,
					tabBarStyle: {
						backgroundColor: colors.surface,
						borderTopColor: colors.border,
						height: 62 + insets.bottom,
						paddingBottom: 8 + insets.bottom,
						paddingTop: 6,
					},
					tabBarLabelStyle: {
						fontSize: 12,
					},
					tabBarIcon: ({ color, size }) => {
						const icons: Record<string, string> = {
							Início: 'home',
							Histórico: 'history',
							Configurações: 'cog-outline',
						};

						const iconName = icons[route.name] ?? 'help-circle';

						return <Icon name={iconName} size={size} color={color} />;
					},
				})}
			>
				<Tab.Screen name="Início" component={HomeStack} />
				<Tab.Screen name="Histórico" component={HistoricoStack} />
				<Tab.Screen name="Configurações" component={Configuracoes} />
			</Tab.Navigator>
		</NavigationContainer>
	);
}
