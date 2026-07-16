import { StyleSheet } from "react-native";
import { spacing } from "src/styles/theme";

export const styles = StyleSheet.create({
	content: {
		padding: spacing.xl,
		gap: spacing.lg,
		paddingBottom: 40,
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		gap: spacing.md,
	},
	logo: {
		width: 52,
		height: 52,
		borderRadius: 12,
	},
	stats: {
		flexDirection: "row",
		gap: spacing.md,
	},
	statCard: {
		flex: 1,
		gap: 4,
	},
	sectionHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginTop: spacing.sm,
	},
	empty: {
		alignItems: "center",
		gap: 8,
		paddingVertical: spacing.xxl,
	},
});
