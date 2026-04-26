import { TextInput, TextInputProps, StyleSheet } from "react-native";
import { colors } from "../styles/colors";
import React from "react";

interface InputProps extends TextInputProps {}

export default function Input({ style, ...rest }: InputProps) {
	return (
		<TextInput
			style={[styles.input, style]}
			placeholderTextColor={colors.gray[400]}
			{...rest}
		/>
	);
}

const styles = StyleSheet.create({
	input: {
		borderWidth: 1,
		borderColor: "#000",
		borderRadius: 24,
		padding: 16,
	},
});