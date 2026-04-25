import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "../screens/home";
import React from "react";

const { Navigator, Screen } = createNativeStackNavigator();

export default function Routes() {
	return (
		<NavigationContainer>
			<Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
				<Screen name="Home" component={Home} />
			</Navigator>
		</NavigationContainer>
	);
}
