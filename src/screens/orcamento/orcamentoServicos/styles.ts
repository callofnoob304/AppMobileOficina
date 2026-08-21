import { colors } from 'src/styles/colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	row: {
		borderBottomColor: colors.border,
		flexDirection: 'row',
		alignItems: 'center',
		borderBottomWidth: 1,
		paddingVertical: 12,
	},
	rowEditing: {
		backgroundColor: colors.surfaceAlt,
		borderRadius: 8,
		paddingHorizontal: 8,
	},
	addButton: {
		backgroundColor: colors.yellow[400],
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 12,
		height: 52,
		width: 52,
	},
	empty: {
		alignItems: 'center',
		paddingVertical: 24,
		gap: 8,
	},
	footer: {
		gap: 12,
	},
	totalRow: {
		justifyContent: 'space-between',
		flexDirection: 'row',
		alignItems: 'center',
	},
});
