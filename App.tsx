import { SafeAreaProvider } from "react-native-safe-area-context";
import Routes from "./src/navigation/routes";
import React from "react";

export default function App() {
	return (
		<SafeAreaProvider>
			<Routes/>
		</SafeAreaProvider>
	);
}