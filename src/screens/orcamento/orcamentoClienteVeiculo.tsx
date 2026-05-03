import { NavigationProp, ParamListBase, useNavigation } from "@react-navigation/native";
import { Button, Container, Content, Input, Label } from "@components";
import React from "react";

export default function OrcamentoClienteVeiculo() {
	const navigator: NavigationProp<ParamListBase> = useNavigation();

	return (
		<Container>
			<Content>
				<Label title={"Novo orçamento, insirar os dados do cliente e do veículo"} />

				<Input placeholder="Teste"/>

				{/* <Button title={"Avançar"} onPress={() => navigator.navigate('OrcamentoServicos')}/> */}
			</Content>
		</Container>
	);
}
