import { TouchableOpacity, TouchableOpacityProps, StyleSheet } from "react-native";
import Label from "./label";
import React from "react";

interface ButtonProps extends TouchableOpacityProps {
	bgColor?: string;
	title: string;
}

export default function Button({ title, bgColor, style, ...rest }: ButtonProps) {
	return (
		<TouchableOpacity
			style={[styles.button, bgColor && { backgroundColor: bgColor }, style]}
			activeOpacity={0.75}
			{...rest}
		>
			<Label center label={title} />
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	button: {
		width: "100%",
		padding: 12,
		borderRadius: 24,
		backgroundColor: "#3B82F6",
	},
});