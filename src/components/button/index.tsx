import { TouchableOpacity, TouchableOpacityProps, Text, View } from 'react-native';
import { styles } from './styles';
import React from 'react';

type Variant = 'primary' | 'outline' | 'ghost';

interface ButtonProps extends TouchableOpacityProps {
	title: string;
	variant?: Variant;
	bgColor?: string;
	icon?: React.ReactNode;
}

export default function Button({ title, variant = 'primary', bgColor, icon, style, disabled, ...rest }: ButtonProps) {
	return (
		<TouchableOpacity
			style={[
				styles.button,
				variant === 'primary' && styles.primary,
				variant === 'outline' && styles.outline,
				variant === 'ghost' && styles.ghost,
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
						variant === 'primary' && styles.textPrimary,
						(variant === 'outline' || variant === 'ghost') && styles.textAccent,
					]}
				>
					{title}
				</Text>
			</View>
		</TouchableOpacity>
	);
}
