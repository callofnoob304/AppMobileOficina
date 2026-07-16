import { StyleSheet } from "react-native";
import { colors } from "src/styles/colors";

export const styles = StyleSheet.create({
	row: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 12,
		borderBottomWidth: 1,
		borderBottomColor: colors.border,
	},
	addButton: {
		backgroundColor: colors.yellow[400],
		justifyContent: 'center',
		alignItems: 'center',
		width: 52,
		height: 52,
		borderRadius: 12,
	},
	empty: {
		alignItems: 'center',
		gap: 8,
		paddingVertical: 24,
	},
	footer: {
		gap: 12,
	},
	totalRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
});
