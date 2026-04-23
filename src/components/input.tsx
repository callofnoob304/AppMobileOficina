import { TextInput, TextInputProps } from "react-native";
import { colors } from "../styles/colors";
import React from "react";

interface InputProps extends TextInputProps { }

export default ({ ...rest }: InputProps) => {
	return (
		<TextInput
			style={{ borderWidth: 1, borderColor: "#000", borderRadius: 24, padding: 16 }}
			placeholderTextColor={colors.gray[400]}
			{...rest}
		/>
	)
}
