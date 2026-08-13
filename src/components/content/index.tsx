import { ScrollView, ScrollViewProps } from 'react-native';
import { styles } from './styles';
import React from 'react';

type Props = ScrollViewProps & {
	children?: React.ReactNode;
};

export default function Content({ children, style, ...rest }: Props) {
	return (
		<ScrollView
			contentContainerStyle={[styles.content, style]}
			keyboardShouldPersistTaps="handled"
			showsVerticalScrollIndicator={false}
			{...rest}
		>
			{children}
		</ScrollView>
	);
}
