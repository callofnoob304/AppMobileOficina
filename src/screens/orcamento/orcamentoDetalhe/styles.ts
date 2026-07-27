import { StyleSheet } from "react-native";
import { colors } from "src/styles/colors";

export const styles = StyleSheet.create({
	headerActions: {
		flexDirection: "row",
		alignItems: "center",
		gap: 18,
	},
	center: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		gap: 8,
		backgroundColor: colors.background,
	},
	validade: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	validadeInfo: {
		flexDirection: "row",
		alignItems: "center",
		gap: 6,
	},
	status: {
		fontSize: 12,
		fontWeight: "700",
		textTransform: "uppercase",
		letterSpacing: 0.5,
	},
	footer: {
		gap: 12,
	},
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
