import OrcamentoClienteVeiculo from "src/screens/orcamento/orcamentoClienteVeiculo";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import OrcamentoServicos from "src/screens/orcamento/orcamentoServicos";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import OrcamentoResumo from "src/screens/orcamento/orcamentoResumo";
import { NavigationContainer } from "@react-navigation/native";
import Configuracoes from "../screens/configuracoes";
import Historico from "../screens/historico";
import Home from "../screens/home";
import React from "react";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="OrcamentoClienteVeiculo" component={OrcamentoClienteVeiculo} />
			<Stack.Screen name="OrcamentoServicos" component={OrcamentoServicos} />
			<Stack.Screen name="OrcamentoResumo" component={OrcamentoResumo} />
			<Stack.Screen name="Home" component={Home} />
		</Stack.Navigator>
	);
}

export default function Routes() {
	return (
		<NavigationContainer>
			<Tab.Navigator
				screenOptions={({ route }) => ({
					headerShown: false,
					tabBarActiveTintColor: "#007AFF",
					tabBarInactiveTintColor: "gray",

					tabBarIcon: ({ color, size }) => {
						const icons: Record<string, any> = {
							Início: "home",
							Histórico: "history",
							Configurações: "cog-outline",
						};

						const iconName = icons[route.name] ?? "help-circle";

						return (
							<Icon name={iconName} size={size} color={color} />
						);
					},
				})}
			>
				<Tab.Screen name="Início" component={HomeStack} />
				<Tab.Screen name="Histórico" component={Historico} />
				<Tab.Screen name="Configurações" component={Configuracoes} />
			</Tab.Navigator>
		</NavigationContainer>
	);
}