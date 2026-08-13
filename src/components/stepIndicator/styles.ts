import { colors } from 'src/styles/colors';
import { spacing } from 'src/styles/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		marginBottom: spacing.lg,
		flexDirection: 'row',
		alignItems: 'center',
		gap: spacing.xs,
	},
	item: {
		alignItems: 'center',
		gap: 4,
	},
	dot: {
		backgroundColor: colors.surfaceAlt,
		borderColor: colors.border,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 14,
		borderWidth: 1,
		height: 28,
		width: 28,
	},
	dotActive: {
		backgroundColor: colors.yellow[400],
		borderColor: colors.yellow[400],
	},
	dotText: {
		color: colors.text.muted,
		fontWeight: '700',
		fontSize: 13,
	},
	dotTextActive: {
		color: colors.text.inverse,
	},
	label: {
		color: colors.text.muted,
		fontSize: 11,
	},
	labelActive: {
		color: colors.text.primary,
	},
	line: {
		backgroundColor: colors.border,
		marginBottom: 16,
		width: 28,
		height: 2,
	},
	lineActive: {
		backgroundColor: colors.yellow[400],
	},
});
