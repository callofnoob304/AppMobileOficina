import { colors } from 'src/styles/colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	infoRow: {
		justifyContent: 'space-between',
		flexDirection: 'row',
		alignItems: 'center',
		gap: 12,
	},
	itemRow: {
		borderBottomColor: colors.border,
		justifyContent: 'space-between',
		flexDirection: 'row',
		alignItems: 'center',
		borderBottomWidth: 1,
		paddingVertical: 6,
	},
	totalRow: {
		justifyContent: 'space-between',
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 4,
	},
});
