import { TextInput, TextInputProps } from "react-native";
import { colors } from "src/styles/colors";
import { styles } from "./styles";
import React, { useMemo } from "react";

interface InputProps extends TextInputProps {}

export default function Input({ style, ...rest }: InputProps) {
	// Memoizado para não recriar o array de estilo a cada tecla digitada:
	// uma nova referência a cada render força o Android a resincronizar o
	// texto nativo com o estado do JS, o que cancela a composição do IME
	// e impede digitar acentos (á, ç, ã...) corretamente.
	const combinedStyle = useMemo(() => [styles.input, style], [style]);

	return (
		<TextInput
			style={combinedStyle}
			placeholderTextColor={colors.text.muted}
			{...rest}
		/>
	);
}
