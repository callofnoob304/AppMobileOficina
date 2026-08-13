import { colors } from 'src/styles/colors';
import { spacing } from 'src/styles/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	container: {
		justifyContent: 'space-between',
		marginBottom: spacing.lg,
		flexDirection: 'row',
		alignItems: 'center',
	},
	left: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: spacing.xs,
		flex: 1,
	},
	back: {
		marginLeft: -6,
	},
	titles: {
		flex: 1,
	},
	title: {
		color: colors.text.primary,
		fontWeight: 'bold',
		fontSize: 22,
	},
	subtitle: {
		color: colors.text.secondary,
		fontSize: 14,
		marginTop: 2,
	},
});
