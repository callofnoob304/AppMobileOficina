import { View, ViewProps, StyleSheet } from "react-native";
import React from "react";

type Props = ViewProps & {
	children?: React.ReactNode;
};

export default function Content({ children, style, ...rest }: Props) {
	return (
		<View style={[styles.content, style]} {...rest}>
			{children}
		</View>
	);
}

const styles = StyleSheet.create({
	content: {
		flex: 1,
	},
});