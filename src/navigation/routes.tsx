import OrcamentoClienteVeiculo from "src/screens/orcamento/orcamentoClienteVeiculo";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OrcamentoServicos from "src/screens/orcamento/orcamentoServicos";
import OrcamentoResumo from "src/screens/orcamento/orcamentoResumo";
import { NavigationContainer } from "@react-navigation/native";
import Home from "../screens/home";
import React from "react";

const { Navigator, Screen } = createNativeStackNavigator();

export default function Routes() {
	return (
		<NavigationContainer>
			<Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
				<Screen name="OrcamentoClienteVeiculo" component={OrcamentoClienteVeiculo} />
				<Screen name="OrcamentoServicos" component={OrcamentoServicos} />
				<Screen name="OrcamentoResumo" component={OrcamentoResumo} />
				<Screen name="Home" component={Home} />
			</Navigator>
		</NavigationContainer>
	);
}
