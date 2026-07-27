import { StyleSheet } from "react-native";
import { colors } from "src/styles/colors";

export const styles = StyleSheet.create({
	card: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
	},
	topRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	numero: {
		fontSize: 12,
		fontWeight: "700",
		color: colors.yellow[400],
	},
	status: {
		fontSize: 11,
		fontWeight: "700",
		textTransform: "uppercase",
		letterSpacing: 0.5,
	},
	total: {
		fontSize: 16,
		fontWeight: "700",
		marginTop: 4,
	},
});
