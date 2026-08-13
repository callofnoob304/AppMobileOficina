import { Text, TextProps, View, ViewStyle } from 'react-native';
import { styles } from './styles';
import React from 'react';

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
				<Text style={[styles.title, center && styles.center, style]} {...rest}>
					{title}
				</Text>
			)}

			{label && (
				<Text style={[styles.label, muted && styles.muted, center && styles.center, style]} {...rest}>
					{label}
				</Text>
			)}
		</View>
	);
}
