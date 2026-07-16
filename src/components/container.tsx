import { View, ViewProps, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../styles/colors";
import { spacing } from "../styles/theme";
import React from "react";

type Props = ViewProps & {
	children?: React.ReactNode;
	noPadding?: boolean;
};

// Wrapper padrão de tela: aplica safe area (topo) e evita que o teclado
// cubra o conteúdo (Android/iOS), para não precisar repetir isso em cada tela.
export default function Container({ children, style, noPadding, ...rest }: Props) {
	return (
		<SafeAreaView style={styles.safeArea} edges={['top']}>
			<KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? "padding" : "height"}>
				<View style={[styles.container, noPadding && styles.noPadding, style]} {...rest}>
					{children}
				</View>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: colors.background,
	},
	flex: {
		flex: 1,
	},
	container: {
		flex: 1,
		padding: spacing.xl,
		backgroundColor: colors.background,
	},
	noPadding: {
		padding: 0,
	},
});
