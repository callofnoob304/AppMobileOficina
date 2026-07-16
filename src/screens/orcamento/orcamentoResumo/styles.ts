import { StyleSheet } from "react-native";
import { colors } from "src/styles/colors";

export const styles = StyleSheet.create({
	infoRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		gap: 12,
	},
	itemRow: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingVertical: 6,
		borderBottomWidth: 1,
		borderBottomColor: colors.border,
	},
	totalRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 4,
	},
});
