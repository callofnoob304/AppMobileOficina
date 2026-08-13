import { SafeAreaProvider } from 'react-native-safe-area-context';
import { colors } from './src/styles/colors';
import Routes from './src/navigation/routes';
import { StatusBar } from 'react-native';
import React from 'react';

export default function App() {
	return (
		<SafeAreaProvider>
			<StatusBar barStyle="light-content" backgroundColor={colors.background} />
			<Routes />
		</SafeAreaProvider>
	);
}
