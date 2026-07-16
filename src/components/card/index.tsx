import { View, ViewProps, TouchableOpacity } from "react-native";
import { styles } from "./styles";
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
