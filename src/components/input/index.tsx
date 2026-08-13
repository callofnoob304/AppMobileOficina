import { TextInput, TextInputProps } from 'react-native';
import { colors } from 'src/styles/colors';
import React, { useMemo } from 'react';
import { styles } from './styles';

interface InputProps extends TextInputProps {}

export default function Input({ style, ...rest }: InputProps) {
	const combinedStyle = useMemo(() => [styles.input, style], [style]);

	return <TextInput style={combinedStyle} placeholderTextColor={colors.text.muted} {...rest} />;
}
