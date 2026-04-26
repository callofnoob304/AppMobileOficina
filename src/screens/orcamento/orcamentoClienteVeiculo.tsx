import { NavigationProp, ParamListBase, useNavigation } from "@react-navigation/native";
import { Button, Container, Label } from "@components";
import React from "react";

export default function OrcamentoClienteVeiculo() {
	const navigator: NavigationProp<ParamListBase> = useNavigation();

	return (
		<Container>
			<Label title={"Novo orçamento, insirar os dados do cliente e do veículo"} />

			<Button title={"Avançar"} onPress={() => navigator.navigate('OrcamentoServicos')}/>
		</Container>
	);
}
