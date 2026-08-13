import { radius, spacing } from 'src/styles/theme';
import { colors } from 'src/styles/colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	button: {
		paddingHorizontal: spacing.lg,
		paddingVertical: spacing.lg,
		justifyContent: 'center',
		borderRadius: radius.xl,
		alignItems: 'center',
		width: '100%',
	},
	content: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: spacing.sm,
	},
	primary: {
		backgroundColor: colors.yellow[400],
	},
	outline: {
		borderColor: colors.yellow[400],
		backgroundColor: 'transparent',
		borderWidth: 1.5,
	},
	ghost: {
		backgroundColor: colors.surfaceAlt,
	},
	disabled: {
		opacity: 0.4,
	},
	text: {
		fontWeight: '700',
		fontSize: 16,
	},
	textPrimary: {
		color: colors.text.inverse,
	},
	textAccent: {
		color: colors.yellow[400],
	},
});
