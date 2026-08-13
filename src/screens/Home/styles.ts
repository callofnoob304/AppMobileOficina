import { spacing } from 'src/styles/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	content: {
		padding: spacing.xl,
		paddingBottom: 40,
		gap: spacing.lg,
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: spacing.md,
	},
	logo: {
		borderRadius: 12,
		height: 52,
		width: 52,
	},
	stats: {
		flexDirection: 'row',
		gap: spacing.md,
	},
	statCard: {
		flex: 1,
		gap: 4,
	},
	sectionHeader: {
		justifyContent: 'space-between',
		marginTop: spacing.sm,
		flexDirection: 'row',
		alignItems: 'center',
	},
	empty: {
		paddingVertical: spacing.xxl,
		alignItems: 'center',
		gap: 8,
	},
});
