import { StyleSheet } from "react-native";
import { colors } from "src/styles/colors";
import { radius, spacing } from "src/styles/theme";

export const styles = StyleSheet.create({
	button: {
		width: "100%",
		paddingVertical: spacing.lg,
		paddingHorizontal: spacing.lg,
		borderRadius: radius.xl,
		alignItems: "center",
		justifyContent: "center",
	},
	content: {
		flexDirection: "row",
		alignItems: "center",
		gap: spacing.sm,
	},
	primary: {
		backgroundColor: colors.yellow[400],
	},
	outline: {
		backgroundColor: "transparent",
		borderWidth: 1.5,
		borderColor: colors.yellow[400],
	},
	ghost: {
		backgroundColor: colors.surfaceAlt,
	},
	disabled: {
		opacity: 0.4,
	},
	text: {
		fontSize: 16,
		fontWeight: "700",
	},
	textPrimary: {
		color: colors.text.inverse,
	},
	textAccent: {
		color: colors.yellow[400],
	},
});
