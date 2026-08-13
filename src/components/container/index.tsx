import { View, ViewProps, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';
import React from 'react';

type Props = ViewProps & {
	children?: React.ReactNode;
	noPadding?: boolean;
};

export default function Container({ children, style, noPadding, ...rest }: Props) {
	return (
		<SafeAreaView style={styles.safeArea} edges={['top']}>
			<KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
				<View style={[styles.container, noPadding && styles.noPadding, style]} {...rest}>
					{children}
				</View>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
}
