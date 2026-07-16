import { StyleSheet } from "react-native";
import { colors } from "src/styles/colors";
import { radius, spacing } from "src/styles/theme";

export const styles = StyleSheet.create({
	center: {
		alignItems: "center",
		justifyContent: "center",
	},
	cardHeader: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
		marginBottom: 4,
	},
	logoRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: spacing.md,
	},
	logoPreview: {
		width: 72,
		height: 72,
		borderRadius: radius.md,
		borderWidth: 1,
		borderColor: colors.border,
		backgroundColor: colors.surfaceAlt,
		alignItems: "center",
		justifyContent: "center",
		overflow: "hidden",
	},
	logoImage: {
		width: "100%",
		height: "100%",
	},
	logoButton: {
		width: 180,
		paddingVertical: spacing.sm,
	},
});
