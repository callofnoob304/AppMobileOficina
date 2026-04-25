import { View, ViewProps, StyleSheet } from "react-native";
import React from "react";

type Props = ViewProps & {
	children?: React.ReactNode;
};

export default function Container({ children, style, ...rest }: Props) {
	return (
		<View style={[styles.container, style]} {...rest}>
			{children}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 24,
	},
});