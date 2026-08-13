import { colors } from 'src/styles/colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	row: {
		justifyContent: 'space-between',
		flexDirection: 'row',
		alignItems: 'center',
	},
	column: {
		gap: 4,
	},
	title: {
		color: colors.text.primary,
		fontWeight: 'bold',
		fontSize: 20,
	},
	label: {
		color: colors.text.primary,
		fontSize: 16,
	},
	muted: {
		color: colors.text.secondary,
	},
	center: {
		alignSelf: 'center',
		textAlign: 'center',
	},
});
