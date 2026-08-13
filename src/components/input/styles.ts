import { radius, spacing } from 'src/styles/theme';
import { colors } from 'src/styles/colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	input: {
		backgroundColor: colors.surface,
		borderColor: colors.border,
		color: colors.text.primary,
		borderRadius: radius.md,
		padding: spacing.lg,
		borderWidth: 1,
		fontSize: 16,
	},
});
