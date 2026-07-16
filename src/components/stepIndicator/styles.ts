import { StyleSheet } from "react-native";
import { colors } from "src/styles/colors";
import { spacing } from "src/styles/theme";

export const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: spacing.xs,
		marginBottom: spacing.lg,
	},
	item: {
		alignItems: "center",
		gap: 4,
	},
	dot: {
		width: 28,
		height: 28,
		borderRadius: 14,
		backgroundColor: colors.surfaceAlt,
		borderWidth: 1,
		borderColor: colors.border,
		alignItems: "center",
		justifyContent: "center",
	},
	dotActive: {
		backgroundColor: colors.yellow[400],
		borderColor: colors.yellow[400],
	},
	dotText: {
		color: colors.text.muted,
		fontWeight: "700",
		fontSize: 13,
	},
	dotTextActive: {
		color: colors.text.inverse,
	},
	label: {
		fontSize: 11,
		color: colors.text.muted,
	},
	labelActive: {
		color: colors.text.primary,
	},
	line: {
		width: 28,
		height: 2,
		backgroundColor: colors.border,
		marginBottom: 16,
	},
	lineActive: {
		backgroundColor: colors.yellow[400],
	},
});
