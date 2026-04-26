import { NavigationProp, ParamListBase, useNavigation } from "@react-navigation/native";
import { Button, Container, Label } from "@components";
import React from "react";

export default function OrcamentoServicos() {
	const navigator: NavigationProp<ParamListBase> = useNavigation();

	return (
		<Container>
			<Label title={"Serviços e peças"} />

			<Button title={"Avançar"} onPress={() => navigator.navigate('OrcamentoResumo')}/>
		</Container>
	);
}
