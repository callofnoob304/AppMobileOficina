import { NavigationProp, ParamListBase, useNavigation } from "@react-navigation/native";
import Button from "../../components/button";
import { Text, View } from "react-native";
import React from "react";

export default function Home() {
	const navigator: NavigationProp<ParamListBase> = useNavigation();

	return (
		<View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#3B82F6" }}>
			<Text style={{color: "#000", textAlign: "center", fontSize: 20, fontWeight: "600", marginBottom: 16}}>
				App mobile oficina mecanica
			</Text>

			<Button title="Livros" bgColor="red-400" onPress={() => navigator.navigate("ControleLeitura")} />
		</View>
	);
}
