import { View, ViewProps, StyleSheet } from "react-native";
import { colors } from "../styles/colors";
import { spacing } from "../styles/theme";
import React from "react";

type Props = ViewProps & {
	children?: React.ReactNode;
	noPadding?: boolean;
};

export default function Container({ children, style, noPadding, ...rest }: Props) {
	return (
		<View style={[styles.container, noPadding && styles.noPadding, style]} {...rest}>
			{children}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: spacing.xl,
		backgroundColor: colors.background,
	},
	noPadding: {
		padding: 0,
	},
});
