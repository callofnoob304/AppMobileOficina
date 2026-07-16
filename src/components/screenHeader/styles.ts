import { StyleSheet } from "react-native";
import { colors } from "src/styles/colors";
import { spacing } from "src/styles/theme";

export const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: spacing.lg,
	},
	left: {
		flexDirection: "row",
		alignItems: "center",
		flex: 1,
		gap: spacing.xs,
	},
	back: {
		marginLeft: -6,
	},
	titles: {
		flex: 1,
	},
	title: {
		fontSize: 22,
		fontWeight: "bold",
		color: colors.text.primary,
	},
	subtitle: {
		fontSize: 14,
		color: colors.text.secondary,
		marginTop: 2,
	},
});
