import { NavigationProp, ParamListBase, useNavigation } from "@react-navigation/native";
import { Button, Container, Label } from "@components";
import React from "react";

export default function OrcamentoResumo() {
	const navigator: NavigationProp<ParamListBase> = useNavigation();

	return (
		<Container>
			<Label title={"Resumo do orçamento"} />

			<Button title={"Gerar pdf"} onPress={() => navigator.navigate('Home')}/>
		</Container>
	);
}
