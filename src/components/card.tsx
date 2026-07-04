import { View, ViewProps, StyleSheet, TouchableOpacity } from "react-native";
import { colors } from "../styles/colors";
import { radius, spacing } from "../styles/theme";
import React from "react";

type Props = ViewProps & {
	children?: React.ReactNode;
	onPress?: () => void;
	highlight?: boolean;
};

export default function Card({ children, style, onPress, highlight, ...rest }: Props) {
	const content = (
		<View style={[styles.card, highlight && styles.highlight, style]} {...rest}>
			{children}
		</View>
	);

	if (onPress) {
		return (
			<TouchableOpacity onPress={onPress} activeOpacity={0.7}>
				{content}
			</TouchableOpacity>
		);
	}

	return content;
}

const styles = StyleSheet.create({
	card: {
		backgroundColor: colors.surface,
		borderRadius: radius.lg,
		padding: spacing.lg,
		borderWidth: 1,
		borderColor: colors.border,
	},
	highlight: {
		borderLeftWidth: 4,
		borderLeftColor: colors.yellow[400],
	},
});
