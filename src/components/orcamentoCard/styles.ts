import { colors } from 'src/styles/colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	card: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
	topRow: {
		justifyContent: 'space-between',
		flexDirection: 'row',
		alignItems: 'center',
	},
	numero: {
		color: colors.yellow[400],
		fontWeight: '700',
		fontSize: 12,
	},
	status: {
		textTransform: 'uppercase',
		letterSpacing: 0.5,
		fontWeight: '700',
		fontSize: 11,
	},
	total: {
		fontWeight: '700',
		fontSize: 16,
		marginTop: 4,
	},
});
