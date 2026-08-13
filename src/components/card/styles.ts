import { radius, spacing } from 'src/styles/theme';
import { colors } from 'src/styles/colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	card: {
		backgroundColor: colors.surface,
		borderColor: colors.border,
		borderRadius: radius.lg,
		padding: spacing.lg,
		borderWidth: 1,
	},
	highlight: {
		borderLeftColor: colors.yellow[400],
		borderLeftWidth: 4,
	},
});
