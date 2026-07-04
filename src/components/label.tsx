import { Text, TextProps, View, StyleSheet, ViewStyle } from "react-native";
import { colors } from "../styles/colors";
import React from "react";

interface LabelProps extends TextProps {
	containerStyle?: ViewStyle;
	center?: boolean;
	linha?: boolean;
	muted?: boolean;
	title?: string;
	label?: string;
}

export default function Label({ title, label, center, linha, muted, style, containerStyle, ...rest }: LabelProps) {
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
					style={[styles.label, muted && styles.muted, center && styles.center, style]}
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
		alignItems: "center",
	},
	column: {
		gap: 4,
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
		color: colors.text.primary,
	},
	label: {
		fontSize: 16,
		color: colors.text.primary,
	},
	muted: {
		color: colors.text.secondary,
	},
	center: {
		alignSelf: "center",
		textAlign: "center",
	},
});
