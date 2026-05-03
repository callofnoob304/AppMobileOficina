import { ScrollView, ScrollViewProps, StyleSheet } from "react-native";
import React from "react";

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

const styles = StyleSheet.create({
	content: {
		flexGrow: 1,
	},
});