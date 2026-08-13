import { colors } from 'src/styles/colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	headerActions: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 18,
	},
	center: {
		backgroundColor: colors.background,
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1,
		gap: 8,
	},
	validade: {
		justifyContent: 'space-between',
		flexDirection: 'row',
		alignItems: 'center',
	},
	validadeInfo: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 6,
	},
	status: {
		textTransform: 'uppercase',
		letterSpacing: 0.5,
		fontWeight: '700',
		fontSize: 12,
	},
	footer: {
		gap: 12,
	},
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
