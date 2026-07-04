import { TextInput, TextInputProps, StyleSheet } from "react-native";
import { colors } from "../styles/colors";
import { radius, spacing } from "../styles/theme";
import React from "react";

interface InputProps extends TextInputProps {}

export default function Input({ style, ...rest }: InputProps) {
	return (
		<TextInput
			style={[styles.input, style]}
			placeholderTextColor={colors.text.muted}
			{...rest}
		/>
	);
}

const styles = StyleSheet.create({
	input: {
		borderWidth: 1,
		borderColor: colors.border,
		backgroundColor: colors.surface,
		borderRadius: radius.md,
		padding: spacing.lg,
		color: colors.text.primary,
		fontSize: 16,
	},
});
