import { StyleSheet } from "react-native";
import { colors } from "src/styles/colors";

export const styles = StyleSheet.create({
	row: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	column: {
		gap: 4,
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
		color: colors.text.primary,
	},
	label: {
		fontSize: 16,
		color: colors.text.primary,
	},
	muted: {
		color: colors.text.secondary,
	},
	center: {
		alignSelf: "center",
		textAlign: "center",
	},
});
