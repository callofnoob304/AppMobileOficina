import { Text, TextProps, View, StyleSheet, ViewStyle } from "react-native";
import React from "react";

interface LabelProps extends TextProps {
	center?: boolean;
	linha?: boolean;
	title?: string;
	label?: string;
	containerStyle?: ViewStyle;
}

export default function Label({ title, label, center, linha, style, containerStyle, ...rest }: LabelProps) {
	return (
		<View style={[linha ? styles.row : styles.column, containerStyle]}>
			{title && (
				<Text
					style={[styles.title, center && styles.center, style]}
					{...rest}
				>
					{title}
				</Text>
			)}

			{label && (
				<Text
					style={[styles.label, center && styles.center, style]}
					{...rest}
				>
					{label}
				</Text>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	row: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	column: {
		gap: 4,
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
	},
	label: {
		fontSize: 16,
	},
	center: {
		alignSelf: "center",
	},
});