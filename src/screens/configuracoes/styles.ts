import { radius, spacing } from 'src/styles/theme';
import { colors } from 'src/styles/colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	center: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	cardHeader: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 4,
		gap: 8,
	},
	logoRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: spacing.md,
	},
	logoPreview: {
		backgroundColor: colors.surfaceAlt,
		borderColor: colors.border,
		justifyContent: 'center',
		borderRadius: radius.md,
		alignItems: 'center',
		overflow: 'hidden',
		borderWidth: 1,
		height: 72,
		width: 72,
	},
	logoImage: {
		height: '100%',
		width: '100%',
	},
	logoButton: {
		paddingVertical: spacing.sm,
		width: 180,
	},
});
