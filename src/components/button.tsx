import { TouchableOpacity, TouchableOpacityProps, StyleSheet, Text, View } from "react-native";
import { colors } from "../styles/colors";
import { radius, spacing } from "../styles/theme";
import React from "react";

type Variant = "primary" | "outline" | "ghost";

interface ButtonProps extends TouchableOpacityProps {
	title: string;
	variant?: Variant;
	bgColor?: string;
	icon?: React.ReactNode;
}

export default function Button({ title, variant = "primary", bgColor, icon, style, disabled, ...rest }: ButtonProps) {
	return (
		<TouchableOpacity
			style={[
				styles.button,
				variant === "primary" && styles.primary,
				variant === "outline" && styles.outline,
				variant === "ghost" && styles.ghost,
				bgColor ? { backgroundColor: bgColor } : null,
				disabled && styles.disabled,
				style,
			]}
			activeOpacity={0.8}
			disabled={disabled}
			{...rest}
		>
			<View style={styles.content}>
				{icon}
				<Text
					style={[
						styles.text,
						variant === "primary" && styles.textPrimary,
						(variant === "outline" || variant === "ghost") && styles.textAccent,
					]}
				>
					{title}
				</Text>
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	button: {
		width: "100%",
		paddingVertical: spacing.lg,
		paddingHorizontal: spacing.lg,
		borderRadius: radius.xl,
		alignItems: "center",
		justifyContent: "center",
	},
	content: {
		flexDirection: "row",
		alignItems: "center",
		gap: spacing.sm,
	},
	primary: {
		backgroundColor: colors.yellow[400],
	},
	outline: {
		backgroundColor: "transparent",
		borderWidth: 1.5,
		borderColor: colors.yellow[400],
	},
	ghost: {
		backgroundColor: colors.surfaceAlt,
	},
	disabled: {
		opacity: 0.4,
	},
	text: {
		fontSize: 16,
		fontWeight: "700",
	},
	textPrimary: {
		color: colors.text.inverse,
	},
	textAccent: {
		color: colors.yellow[400],
	},
});
