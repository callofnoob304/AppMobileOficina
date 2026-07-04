import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
import { colors } from "./src/styles/colors";
import Routes from "./src/navigation/routes";
import React from "react";

export default function App() {
	return (
		<SafeAreaProvider>
			<StatusBar barStyle="light-content" backgroundColor={colors.background} />
			<Routes />
		</SafeAreaProvider>
	);
}
